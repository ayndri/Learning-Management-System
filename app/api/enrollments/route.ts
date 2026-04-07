import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

// GET /api/enrollments?userId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const db = await readDB();

    const enrollments = userId
      ? db.enrollments.filter(e => e.userId === userId)
      : db.enrollments;

    return NextResponse.json({ success: true, data: enrollments });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch enrollments' }, { status: 500 });
  }
}

// POST /api/enrollments — enroll a user in a course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json({ success: false, message: 'userId and courseId are required' }, { status: 400 });
    }

    const db = await readDB();

    // Cek sudah enrolled belum
    const exists = db.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (exists) {
      return NextResponse.json({ success: true, data: exists, message: 'Already enrolled' });
    }

    const enrollment = {
      id: 'enroll-' + Date.now(),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
    };

    db.enrollments.push(enrollment);
    await writeDB(db);

    return NextResponse.json({ success: true, data: enrollment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to enroll' }, { status: 500 });
  }
}
