import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const course = db.courses.find(c => c.id === id);

    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await readDB();
    const courseIndex = db.courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    db.courses[courseIndex] = { ...db.courses[courseIndex], ...body };
    await writeDB(db);

    return NextResponse.json({ success: true, data: db.courses[courseIndex] });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const courseIndex = db.courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    const deletedCourse = db.courses.splice(courseIndex, 1);
    await writeDB(db);

    return NextResponse.json({ success: true, data: deletedCourse[0], message: 'Course successfully deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete course' }, { status: 500 });
  }
}
