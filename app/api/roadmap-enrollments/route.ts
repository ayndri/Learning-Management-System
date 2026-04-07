import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const db = await readDB();
    const data = userId
      ? db.roadmapEnrollments.filter(e => e.userId === userId)
      : db.roadmapEnrollments;
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch roadmap enrollments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();

    const exists = db.roadmapEnrollments.find(
      e => e.userId === body.userId && e.roadmapId === body.roadmapId
    );
    if (exists) {
      return NextResponse.json({ success: true, data: exists });
    }

    const newEnrollment = {
      id: 'renroll-' + Date.now(),
      userId: body.userId,
      roadmapId: body.roadmapId,
      enrolledAt: new Date().toISOString(),
    };

    db.roadmapEnrollments.push(newEnrollment);
    await writeDB(db);

    return NextResponse.json({ success: true, data: newEnrollment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create roadmap enrollment' }, { status: 500 });
  }
}
