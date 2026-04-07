import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();

    const totalStudents = db.users.filter(u => u.role === 'student').length;
    const totalInstructors = db.users.filter(u => u.role === 'instructor').length;
    const totalCourses = db.courses.length;
    const publishedCourses = db.courses.filter(c => c.status === 'Published').length;
    const totalRevenue = db.courses.reduce((sum, c) => sum + (c.price * c.students), 0);
    const totalEnrollments = db.courses.reduce((sum, c) => sum + c.students, 0);
    const totalWorkshops = db.workshops.length;
    const upcomingWorkshops = db.workshops.filter(w => w.status === 'Upcoming').length;
    const totalRoadmaps = db.roadmaps.length;

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        totalInstructors,
        totalCourses,
        publishedCourses,
        totalRevenue,
        totalEnrollments,
        totalWorkshops,
        upcomingWorkshops,
        totalRoadmaps,
        totalUsers: db.users.length,
      }
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch stats' }, { status: 500 });
  }
}
