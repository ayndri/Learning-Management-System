import fs from 'fs/promises';
import path from 'path';

export interface Lesson {
  id: string | number;
  title: string;
  type: 'video' | 'quiz' | 'text';
  duration: string;
  isFree: boolean;
  contentUrl?: string;
  description?: string;
  resources?: { id: number; name: string; size: string; type: string }[];
  questions?: { 
    id: number; 
    text: string; 
    options: { id: number; text: string; isCorrect: boolean }[] 
  }[];
}

export interface Section {
  id: string | number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  level: string;
  duration: string;
  status: string;
  sections?: Section[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student' | 'instructor';
  status: 'Active' | 'Banned' | 'Pending';
  avatar: string | null;
  createdAt: string;
}

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  price: number;
  sold: number;
  slots: number;
  status: 'Upcoming' | 'Live' | 'Finished';
  image: string;
  category: string;
  description: string;
  meetingLink?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: string;
  prerequisites: string[];
  courseIds: string[];
  price: number;
  coursesCount: number;
  students: number;
  status: 'Active' | 'Draft';
  image: string;
}

export interface Submission {
  id: string;
  userId: string;
  courseId: string;
  link: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNote?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
}

export interface WorkshopEnrollment {
  id: string;
  userId: string;
  workshopId: string;
  enrolledAt: string;
}

export interface RoadmapEnrollment {
  id: string;
  userId: string;
  roadmapId: string;
  enrolledAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  instructor: string;
  grade: string;
  issuedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string | null;
  name: string;
  xp: number;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

export interface DbSchema {
  courses: Course[];
  users: User[];
  workshops: Workshop[];
  roadmaps: Roadmap[];
  enrollments: Enrollment[];
  workshopEnrollments: WorkshopEnrollment[];
  roadmapEnrollments: RoadmapEnrollment[];
  submissions: Submission[];
  certificates: Certificate[];
  leaderboard: LeaderboardEntry[];
  settings: SystemSettings;
}

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function readDB(): Promise<DbSchema> {
  try {
    const fileData = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(fileData) as DbSchema;
  } catch (error) {
    return { 
      courses: [], users: [], workshops: [], roadmaps: [], enrollments: [], workshopEnrollments: [], roadmapEnrollments: [], submissions: [], certificates: [], leaderboard: [],
      settings: {
        siteName: "EduFlash",
        siteDescription: "Platform Belajar Modern",
        contactEmail: "admin@eduflash.com",
        contactPhone: "+62 812 3456 7890",
        maintenanceMode: false,
        registrationEnabled: true,
        address: "Jakarta, Indonesia",
        socialLinks: {
          facebook: "https://facebook.com/eduflash",
          instagram: "https://instagram.com/eduflash",
          twitter: "https://twitter.com/eduflash",
          linkedin: "https://linkedin.com/company/eduflash"
        }
      }
    };
  }
}

export async function writeDB(data: DbSchema): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}
