import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

// GET /api/submissions?userId=xxx  OR  ?courseId=xxx  OR  ?status=pending
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    const db = await readDB();
    let data = db.submissions ?? [];

    if (userId) data = data.filter(s => s.userId === userId);
    if (courseId) data = data.filter(s => s.courseId === courseId);
    if (status) data = data.filter(s => s.status === status);

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch submissions' }, { status: 500 });
  }
}

// POST /api/submissions — kirim project
export async function POST(request: Request) {
  try {
    const { userId, courseId, link, description } = await request.json();
    if (!userId || !courseId || !link || !description)
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });

    const db = await readDB();

    // Cek sudah pernah submit belum
    const existing = db.submissions.find(s => s.userId === userId && s.courseId === courseId);
    if (existing) {
      // Update ulang jika rejected
      if (existing.status === 'rejected') {
        existing.link = link;
        existing.description = description;
        existing.status = 'pending';
        existing.submittedAt = new Date().toISOString();
        delete existing.reviewedAt;
        delete existing.reviewNote;
        await writeDB(db);
        return NextResponse.json({ success: true, data: existing });
      }
      return NextResponse.json({ success: true, data: existing, message: 'Already submitted' });
    }

    const submission = {
      id: 'sub-' + Date.now(),
      userId,
      courseId,
      link,
      description,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
    };

    db.submissions.push(submission);
    await writeDB(db);

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to submit' }, { status: 500 });
  }
}
