import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, count: db.roadmaps.length, data: db.roadmaps });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch roadmaps' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();

    const newRoadmap = {
      id: 'rm' + Date.now(),
      title: body.title || 'New Roadmap',
      price: body.price || 0,
      coursesCount: body.coursesCount || 0,
      students: body.students || 0,
      status: body.status || 'Draft',
      image: body.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&q=80',
    };

    db.roadmaps.push(newRoadmap as any);
    await writeDB(db);

    return NextResponse.json({ success: true, data: newRoadmap }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create roadmap' }, { status: 500 });
  }
}
