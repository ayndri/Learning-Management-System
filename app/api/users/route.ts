import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, count: db.users.length, data: db.users.map(({ password, ...u }) => u) });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();

    const newUser = {
      id: 'u' + Date.now(),
      name: body.name || 'New User',
      email: body.email || '',
      password: body.password || '123456',
      role: body.role || 'student',
      status: body.status || 'Active',
      avatar: body.avatar || null,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser as any);
    await writeDB(db);

    const { password, ...safeUser } = newUser;
    return NextResponse.json({ success: true, data: safeUser }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
  }
}
