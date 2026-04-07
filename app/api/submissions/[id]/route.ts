import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

// PUT /api/submissions/[id] — approve atau reject
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status, reviewNote } = await request.json();

    if (!['approved', 'rejected'].includes(status))
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });

    const db = await readDB();
    const idx = db.submissions.findIndex(s => s.id === id);
    if (idx === -1)
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });

    db.submissions[idx] = {
      ...db.submissions[idx],
      status,
      reviewedAt: new Date().toISOString(),
      reviewNote: reviewNote ?? '',
    };

    await writeDB(db);
    return NextResponse.json({ success: true, data: db.submissions[idx] });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update submission' }, { status: 500 });
  }
}
