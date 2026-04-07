import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const idx = db.roadmaps.findIndex(r => r.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'Roadmap not found' }, { status: 404 });

    db.roadmaps.splice(idx, 1);
    await writeDB(db);
    return NextResponse.json({ success: true, message: 'Roadmap deleted' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete roadmap' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await readDB();
    const idx = db.roadmaps.findIndex(r => r.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'Roadmap not found' }, { status: 404 });

    db.roadmaps[idx] = { ...db.roadmaps[idx], ...body };
    await writeDB(db);
    return NextResponse.json({ success: true, data: db.roadmaps[idx] });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update roadmap' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const db = await readDB();
      const roadmap = db.roadmaps.find(r => r.id === id);
      if (!roadmap) return NextResponse.json({ success: false, message: 'Roadmap not found' }, { status: 404 });
  
      return NextResponse.json({ success: true, data: roadmap });
    } catch {
      return NextResponse.json({ success: false, message: 'Failed to fetch roadmap' }, { status: 500 });
    }
}
