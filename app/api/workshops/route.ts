import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, count: db.workshops.length, data: db.workshops });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();

    const newWorkshop = {
      id: 'ws' + Date.now(),
      title: body.title || 'New Workshop',
      instructor: body.instructor || '',
      date: body.date || '',
      time: body.time || '',
      price: body.price || 0,
      sold: 0,
      slots: body.slots || 50,
      status: body.status || 'Upcoming',
      image: body.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80',
      category: body.category || '',
      description: body.description || '',
      meetingLink: body.meetingLink || '',
    };

    db.workshops.push(newWorkshop as any);
    await writeDB(db);

    return NextResponse.json({ success: true, data: newWorkshop }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create workshop' }, { status: 500 });
  }
}
