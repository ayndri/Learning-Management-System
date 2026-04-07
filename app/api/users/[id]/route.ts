import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const user = db.users.find(u => u.id === id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    const { password, ...safeUser } = user;
    return NextResponse.json({ success: true, data: safeUser });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await readDB();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    db.users[idx] = { ...db.users[idx], ...body };
    await writeDB(db);

    const { password, ...safeUser } = db.users[idx];
    return NextResponse.json({ success: true, data: safeUser });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const deleted = db.users.splice(idx, 1);
    await writeDB(db);

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete user' }, { status: 500 });
  }
}
