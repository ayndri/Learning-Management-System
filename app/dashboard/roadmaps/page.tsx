"use client";

import { useEffect, useState } from "react";
import type { Roadmap, Course } from "@/lib/db";
import Link from "next/link";

export default function StudentRoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = localStorage.getItem("user_session");
                if (!session) return;
                const u = JSON.parse(session);

                const [enrollRes, roadmapRes, coursesRes] = await Promise.all([
                    fetch(`/api/roadmap-enrollments?userId=${u.id}`),
                    fetch("/api/roadmaps"),
                    fetch("/api/courses"),
                ]);
                const [enrollJson, roadmapJson, coursesJson] = await Promise.all([
                    enrollRes.json(),
                    roadmapRes.json(),
                    coursesRes.json(),
                ]);

                if (enrollJson.success && roadmapJson.success) {
                    const enrolledIds = new Set<string>(
                        enrollJson.data.map((e: { roadmapId: string }) => e.roadmapId)
                    );
                    setRoadmaps(roadmapJson.data.filter((r: Roadmap) => enrolledIds.has(r.id)));
                }
                if (coursesJson.success) {
                    setCourses(coursesJson.data);
                }
            } catch (error) {
                console.error("Failed to fetch roadmaps:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getCourse = (id: string) => courses.find(c => c.id === id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-500 font-medium">Memuat jalur belajar...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in relative">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-indigo-900 p-8 md:p-10 text-white shadow-2xl shadow-indigo-200">
                <div className="relative z-10">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Dashboard</p>
                    <h1 className="text-2xl md:text-3xl font-black mb-2">Jalur Belajar Saya 🗺️</h1>
                    <p className="text-indigo-100 text-sm opacity-90 max-w-lg">
                        Jalur belajar yang telah kamu beli. Klik kursus di dalamnya untuk langsung mulai belajar!
                    </p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Content */}
            {roadmaps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Belum ada jalur belajar</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xs">Kamu belum membeli jalur belajar apapun. Yuk, pilih roadmap yang sesuai tujuan karirmu!</p>
                    <Link
                        href="/roadmap"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-sm"
                    >
                        Jelajahi Roadmap →
                    </Link>
                </div>
            ) : (
                <div className="space-y-8 pb-12">
                    {roadmaps.map((map) => (
                        <div key={map.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col lg:flex-row group">
                            {/* Image */}
                            <div className="lg:w-1/3 relative h-56 lg:h-auto overflow-hidden">
                                <img src={map.image} alt={map.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg">
                                    <span className="text-[10px] font-black text-green-600">✓ Terdaftar</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:w-2/3 space-y-6">
                                <div>
                                    <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">{map.level}</span>
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase italic tracking-tight">{map.title}</h3>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed border-l-4 border-indigo-400 pl-3">{map.description}</p>
                                </div>

                                {/* Course list - clickable */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-4 h-px bg-gray-300"></span> Kursus dalam Paket ({map.coursesCount})
                                    </h4>
                                    <ul className="space-y-2">
                                        {map.courseIds?.map((cId, i) => {
                                            const course = getCourse(cId);
                                            return (
                                                <li key={cId}>
                                                    {course ? (
                                                        <Link
                                                            href={`/courses/${course.id}/learn`}
                                                            className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition group/item"
                                                        >
                                                            <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[11px] font-black group-hover/item:bg-indigo-600 group-hover/item:text-white transition shrink-0">
                                                                {i + 1}
                                                            </span>
                                                            <span className="text-sm font-bold text-gray-700 truncate group-hover/item:text-indigo-700 flex-1">{course.title}</span>
                                                            <span className="text-xs text-gray-400 group-hover/item:text-indigo-500 shrink-0">Mulai Belajar →</span>
                                                        </Link>
                                                    ) : (
                                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 opacity-50">
                                                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-black text-gray-500 shrink-0">{i + 1}</span>
                                                            <span className="text-sm font-bold text-gray-400">Materi tidak tersedia</span>
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                                    <span className="font-medium">📚 {map.coursesCount} Kursus</span>
                                    <span className="font-medium">👥 {map.students.toLocaleString('id-ID')} Pelajar</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Browse more */}
            {roadmaps.length > 0 && (
                <div className="flex justify-center pb-4">
                    <Link href="/roadmap" className="text-sm font-bold text-indigo-600 hover:underline">
                        Jelajahi roadmap lainnya →
                    </Link>
                </div>
            )}
        </div>
    );
}
