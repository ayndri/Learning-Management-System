import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const idx = db.workshops.findIndex(w => w.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'Workshop not found' }, { status: 404 });

    db.workshops.splice(idx, 1);
    await writeDB(db);
    return NextResponse.json({ success: true, message: 'Workshop deleted' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete workshop' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await readDB();
    const idx = db.workshops.findIndex(w => w.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'Workshop not found' }, { status: 404 });

    db.workshops[idx] = { ...db.workshops[idx], ...body };
    await writeDB(db);
    return NextResponse.json({ success: true, data: db.workshops[idx] });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update workshop' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const db = await readDB();
      const workshop = db.workshops.find(w => w.id === id);
      if (!workshop) return NextResponse.json({ success: false, message: 'Workshop not found' }, { status: 404 });
  
      return NextResponse.json({ success: true, data: workshop });
    } catch {
      return NextResponse.json({ success: false, message: 'Failed to fetch workshop' }, { status: 500 });
    }
}
