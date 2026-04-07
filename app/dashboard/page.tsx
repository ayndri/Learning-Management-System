"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Course } from "@/lib/db";

interface UserSession {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function StudentDashboardPage() {
    const [user, setUser] = useState<UserSession | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user session
        try {
            const session = localStorage.getItem("user_session");
            if (session) setUser(JSON.parse(session));
        } catch {}

        // Load courses from API
        async function loadCourses() {
            try {
                const res = await fetch('/api/courses?limit=3');
                const json = await res.json();
                if (json.success) setCourses(json.data);
            } catch (err) {
                console.error("Failed to load courses:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadCourses();
    }, []);

    const firstName = user?.name?.split(' ')[0] || 'User';

    // Stats dinamis
    const userStats = [
        { label: "Kursus Tersedia", value: isLoading ? "..." : courses.length.toString(), icon: "🎓", color: "bg-green-100 text-green-600" },
        { label: "Total Enrollment", value: isLoading ? "..." : courses.reduce((s, c) => s + c.students, 0).toLocaleString('id-ID'), icon: "👥", color: "bg-blue-100 text-blue-600" },
        { label: "Kategori", value: isLoading ? "..." : [...new Set(courses.map(c => c.category))].length.toString(), icon: "📚", color: "bg-yellow-100 text-yellow-600" },
    ];

    const lastPlayed = courses.length > 0 ? courses[0] : null;

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Halo, {firstName}! 👋</h1>
                    <p className="text-gray-500 mt-1 text-sm">Mari lanjutkan progres belajarmu hari ini.</p>
                </div>
                <Link
                    href="/courses"
                    className="bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition shadow-lg shadow-gray-200 inline-flex items-center gap-2"
                >
                    <span>+</span> Cari Kelas Baru
                </Link>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                            {isLoading ? (
                                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- HERO: CONTINUE LEARNING --- */}
            {isLoading ? (
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg animate-pulse">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-2xl"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-full mt-6"></div>
                            <div className="h-10 bg-gray-200 rounded-xl w-40 mt-4"></div>
                        </div>
                    </div>
                </div>
            ) : lastPlayed ? (
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                        Kursus Populer
                    </h2>

                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl opacity-50"></div>

                        <div className="w-full md:w-1/3 relative aspect-video rounded-2xl overflow-hidden shadow-md">
                            <img src={lastPlayed.image} alt={lastPlayed.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-indigo-600 text-2xl shadow-lg pl-1 cursor-pointer hover:scale-110 transition">
                                    ▶
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">{lastPlayed.category}</span>
                                <span className="text-xs text-gray-500">• {lastPlayed.instructor}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{lastPlayed.title}</h3>
                            <p className="text-gray-500 mb-4 text-sm">
                                Level: <span className="font-bold text-gray-700">{lastPlayed.level}</span> • Durasi: <span className="font-bold text-gray-700">{lastPlayed.duration}</span>
                            </p>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-yellow-400 text-lg">★</span>
                                <span className="font-bold text-gray-900">{lastPlayed.rating}</span>
                                <span className="text-gray-400 text-sm">({lastPlayed.students.toLocaleString('id-ID')} siswa)</span>
                            </div>

                            <Link
                                href={`/courses/${lastPlayed.id}`}
                                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                            >
                                Lihat Detail →
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
                    <p className="text-4xl mb-3">📚</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Kursus</h3>
                    <p className="text-sm text-gray-500 mb-4">Mulai jelajahi kursus yang tersedia di platform.</p>
                    <Link href="/courses" className="inline-flex px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
                        Jelajahi Kursus
                    </Link>
                </div>
            )}

            {/* --- GRID: KURSUS LAINNYA --- */}
            {!isLoading && courses.length > 1 && (
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-6 mt-4">Kursus Lainnya</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.slice(1).map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col group">
                                <div className="relative h-40 overflow-hidden">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                        {course.duration}
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${course.level === 'Beginner' ? 'bg-green-500 text-white' :
                                            course.level === 'Intermediate' ? 'bg-yellow-500 text-white' :
                                                'bg-red-500 text-white'
                                            }`}>
                                            {course.level}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition">{course.title}</h3>
                                    <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-yellow-400 text-sm">★</span>
                                        <span className="text-sm font-bold text-gray-700">{course.rating}</span>
                                        <span className="text-xs text-gray-400">• {course.students.toLocaleString('id-ID')} siswa</span>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-lg font-black text-gray-900">
                                            {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString('id-ID')}`}
                                        </span>
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="text-indigo-600 font-bold text-sm hover:underline"
                                        >
                                            Detail →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}