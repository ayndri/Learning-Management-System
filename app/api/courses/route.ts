import { NextResponse } from 'next/server';
import { readDB, writeDB, Course } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const db = await readDB();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    let courses = [...db.courses];

    // Simple sorting support
    if (sort === 'popular') {
      courses.sort((a, b) => b.students - a.students);
    } else if (sort === 'newest') {
      courses.sort((a, b) => Number(b.id) - Number(a.id));
    }

    // Limit support
    if (limit) {
      courses = courses.slice(0, Number(limit));
    }

    return NextResponse.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();

    const newCourse: Course = {
      id: Date.now().toString(),
      title: body.title || 'New Course',
      instructor: body.instructor || 'Unknown Instructor',
      price: body.price || 0,
      rating: body.rating || 0,
      students: body.students || 0,
      image: body.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      category: body.category || 'General',
      level: body.level || 'Beginner',
      duration: body.duration || '0 Jam',
      status: body.status || 'Draft',
    };

    db.courses.push(newCourse);
    await writeDB(db);

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create course' }, { status: 500 });
  }
}
