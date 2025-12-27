"use client";

import Link from "next/link";

export default function StudentDashboardPage() {
    // --- DATA DUMMY ---

    // 1. Statistik User
    const userStats = [
        { label: "Kursus Selesai", value: "3", icon: "🎓", color: "bg-green-100 text-green-600" },
        { label: "Jam Belajar", value: "12h", icon: "⏰", color: "bg-blue-100 text-blue-600" },
        { label: "Sertifikat", value: "1", icon: "🏆", color: "bg-yellow-100 text-yellow-600" },
    ];

    // 2. Kelas yang dimiliki siswa (Enrolled Courses dengan Progress)
    const myCourses = [
        {
            id: "1",
            title: "Fullstack Laravel 10",
            instructor: "Budi Santoso",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
            progress: 75, // Persentase selesai
            totalLessons: 40,
            completedLessons: 30,
            lastLesson: "Middleware & Security",
        },
        {
            id: "2",
            title: "Mastering React.js",
            instructor: "Sarah Putri",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
            progress: 10,
            totalLessons: 120,
            completedLessons: 12,
            lastLesson: "Component Lifecycle",
        },
        {
            id: "3",
            title: "UI/UX Design Masterclass",
            instructor: "Rizky Dev",
            thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80",
            progress: 0, // Belum mulai
            totalLessons: 25,
            completedLessons: 0,
            lastLesson: "Introduction",
        },
    ];

    // Kursus terakhir yang ditonton (untuk Hero Section)
    const lastPlayed = myCourses[0];

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Halo, Rizky! 👋</h1>
                    <p className="text-gray-500 mt-1 text-sm">Mari lanjutkan progres belajarmu hari ini.</p>
                </div>
                <Link
                    href="/dashboard/courses"
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
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- HERO: CONTINUE LEARNING --- */}
            <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                    Lanjutkan Belajar
                </h2>

                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl opacity-50"></div>

                    {/* Thumbnail */}
                    <div className="w-full md:w-1/3 relative aspect-video rounded-2xl overflow-hidden shadow-md">
                        <img src={lastPlayed.thumbnail} alt={lastPlayed.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-indigo-600 text-2xl shadow-lg pl-1 cursor-pointer hover:scale-110 transition">
                                ▶
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">Course Terakhir</span>
                            <span className="text-xs text-gray-500">• {lastPlayed.instructor}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{lastPlayed.title}</h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            Materi selanjutnya: <span className="font-bold text-gray-700">"{lastPlayed.lastLesson}"</span>
                        </p>

                        {/* Progress Bar Besar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-indigo-600">{lastPlayed.progress}% Selesai</span>
                                <span className="text-gray-400">{lastPlayed.completedLessons}/{lastPlayed.totalLessons} Materi</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${lastPlayed.progress}%` }}></div>
                            </div>
                        </div>

                        <Link
                            href={`/courses/${lastPlayed.id}`}
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                        >
                            Lanjutkan Materi →
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- GRID: KELAS LAINNYA --- */}
            <section>
                <h2 className="text-lg font-bold text-gray-800 mb-6 mt-12">Kelas Saya Lainnya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.slice(1).map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col group">
                            <div className="relative h-40 overflow-hidden">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                    {course.totalLessons} Materi
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition">{course.title}</h3>
                                <p className="text-xs text-gray-500 mb-4">{course.instructor}</p>

                                <div className="mt-auto">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                                        <span>PROGRESS</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                                        <div className={`h-full rounded-full ${course.progress > 0 ? 'bg-indigo-500' : 'bg-gray-300'}`} style={{ width: `${course.progress}%` }}></div>
                                    </div>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className={`block w-full py-2.5 rounded-lg text-center text-sm font-bold border transition ${course.progress > 0
                                            ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        {course.progress > 0 ? "Lanjutkan" : "Mulai Belajar"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}