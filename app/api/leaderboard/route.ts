import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();

    // Get admin user IDs to exclude from leaderboard
    const adminIds = new Set(
      db.users.filter(u => u.role === 'admin').map(u => u.id)
    );

    // Filter out admins and sort by XP descending
    const leaderboard = (db.leaderboard || [])
      .filter(entry => !entry.userId || !adminIds.has(entry.userId))
      .sort((a, b) => b.xp - a.xp);

    return NextResponse.json({ success: true, count: leaderboard.length, data: leaderboard });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
