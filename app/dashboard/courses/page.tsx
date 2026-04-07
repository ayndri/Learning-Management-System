"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Course } from "@/lib/db";

export default function MyCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function loadEnrolledCourses() {
            try {
                const session = localStorage.getItem("user_session");
                if (!session) { setIsLoading(false); return; }
                const { id: userId } = JSON.parse(session);

                // Ambil enrollment user
                const enrollRes = await fetch(`/api/enrollments?userId=${userId}`);
                const enrollJson = await enrollRes.json();
                if (!enrollJson.success || enrollJson.data.length === 0) {
                    setIsLoading(false);
                    return;
                }

                const enrolledCourseIds: string[] = enrollJson.data.map((e: any) => e.courseId);

                // Ambil semua kursus lalu filter yang sudah di-enroll
                const coursesRes = await fetch('/api/courses');
                const coursesJson = await coursesRes.json();
                if (coursesJson.success) {
                    const enrolled = coursesJson.data.filter((c: Course) => enrolledCourseIds.includes(c.id));
                    setCourses(enrolled);
                }
            } catch (err) {
                console.error("Failed to load enrolled courses:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadEnrolledCourses();
    }, []);

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        if (filter === "free") return matchesSearch && course.price === 0;
        if (filter === "paid") return matchesSearch && course.price > 0;
        return matchesSearch;
    });

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelas Saya</h1>
                    <p className="text-gray-500 text-sm">Kursus yang sudah kamu daftarkan.</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari kelas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none w-full md:w-64 text-gray-900"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* TABS */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[
                        { key: "all", label: "Semua" },
                        { key: "free", label: "Gratis" },
                        { key: "paid", label: "Berbayar" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${filter === tab.key
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* LOADING */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
                            <div className="h-40 bg-gray-200"></div>
                            <div className="p-6 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded-lg w-full mt-3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col group">
                            <div className="relative h-40 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                        course.level === 'Beginner' ? 'bg-green-500 text-white' :
                                        course.level === 'Intermediate' ? 'bg-yellow-500 text-white' :
                                        'bg-red-500 text-white'
                                    }`}>
                                        {course.level}
                                    </span>
                                </div>
                                {course.price === 0 && (
                                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        GRATIS
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                    {course.duration}
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition">{course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>

                                <div className="mt-auto">
                                    <Link
                                        href={`/courses/${course.id}/learn`}
                                        className="block w-full text-center py-2.5 rounded-xl text-sm font-bold transition bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                                    >
                                        Lanjutkan Belajar →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada kelas</h3>
                    <p className="text-gray-500 text-sm mb-6">Kamu belum mendaftar ke kursus apapun.</p>
                    <Link
                        href="/courses"
                        className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 transition"
                    >
                        Jelajahi Kursus →
                    </Link>
                </div>
            )}
        </div>
    );
}
