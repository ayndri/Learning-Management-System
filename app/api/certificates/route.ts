import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const db = await readDB();
    let certificates = db.certificates || [];

    // Filter by userId if provided
    if (userId) {
      certificates = certificates.filter(c => c.userId === userId);
    }

    return NextResponse.json({ success: true, count: certificates.length, data: certificates });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, courseId } = await request.json();
    if (!userId || !courseId) {
      return NextResponse.json({ success: false, message: 'userId and courseId required' }, { status: 400 });
    }

    const db = await readDB();

    const existing = db.certificates.find(c => c.userId === userId && c.courseId === courseId);
    if (existing) return NextResponse.json({ success: true, data: existing });

    const course = db.courses.find(c => c.id === courseId);
    if (!course) return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });

    const cert = {
      id: 'cert-' + Date.now(),
      userId,
      courseId,
      courseTitle: course.title,
      instructor: course.instructor,
      grade: 'A',
      issuedAt: new Date().toISOString(),
    };

    db.certificates.push(cert);
    await writeDB(db);

    return NextResponse.json({ success: true, data: cert }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create certificate' }, { status: 500 });
  }
}
