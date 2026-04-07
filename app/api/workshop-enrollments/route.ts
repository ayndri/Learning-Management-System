import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

// GET /api/workshop-enrollments?userId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const db = await readDB();
    let data = db.workshopEnrollments ?? [];
    if (userId) data = data.filter(e => e.userId === userId);

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 });
  }
}

// POST /api/workshop-enrollments
export async function POST(request: Request) {
  try {
    const { userId, workshopId } = await request.json();
    if (!userId || !workshopId)
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });

    const db = await readDB();

    const existing = (db.workshopEnrollments ?? []).find(
      e => e.userId === userId && e.workshopId === workshopId
    );
    if (existing) return NextResponse.json({ success: true, data: existing });

    const enrollment = {
      id: 'wenroll-' + Date.now(),
      userId,
      workshopId,
      enrolledAt: new Date().toISOString(),
    };

    if (!db.workshopEnrollments) db.workshopEnrollments = [];
    db.workshopEnrollments.push(enrollment);
    await writeDB(db);

    return NextResponse.json({ success: true, data: enrollment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to enroll' }, { status: 500 });
  }
}
