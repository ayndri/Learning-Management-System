import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password wajib diisi.' },
        { status: 400 }
      );
    }

    const db = await readDB();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email atau password salah!' },
        { status: 401 }
      );
    }

    // Return user data without password
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      data: safeUser,
      message: 'Login berhasil!',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
