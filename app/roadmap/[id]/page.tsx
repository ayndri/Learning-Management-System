"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Roadmap, Course } from "@/lib/db";
import Navbar from "@/components/Navbar";

export default function RoadmapDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [rmRes, coursesRes] = await Promise.all([
                    fetch(`/api/roadmaps/${id}`),
                    fetch('/api/courses'),
                ]);
                const rmJson = await rmRes.json();
                const coursesJson = await coursesRes.json();

                if (rmJson.success) {
                    const rm: Roadmap = rmJson.data;
                    setRoadmap(rm);

                    if (coursesJson.success) {
                        const included = (coursesJson.data as Course[]).filter(c =>
                            rm.courseIds.includes(c.id)
                        );
                        included.sort((a, b) => rm.courseIds.indexOf(a.id) - rm.courseIds.indexOf(b.id));
                        setCourses(included);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-28 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!roadmap) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <p className="text-gray-500 font-bold text-lg">Roadmap tidak ditemukan.</p>
                    <Link href="/roadmap" className="text-indigo-600 font-bold hover:underline">← Kembali</Link>
                </div>
            </div>
        );
    }

    const freeCourses = courses.filter(c => c.price === 0);
    const paidCourses = courses.filter(c => c.price > 0);
    const totalDuration = courses.reduce((a, c) => a + (parseInt(c.duration) || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            {/* HERO */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={roadmap.image} alt={roadmap.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-4xl mx-auto left-0 right-0">
                    <button onClick={() => router.back()} className="absolute top-6 left-4 md:left-10 flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition">
                        ← Kembali
                    </button>
                    <span className="inline-block text-[10px] font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white uppercase tracking-wider mb-3 self-start">
                        {roadmap.level}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">{roadmap.title}</h1>
                    <p className="text-white/70 text-sm max-w-2xl">{roadmap.description}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats bar */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">📚</div>
                        <div>
                            <p className="text-lg font-black text-gray-900">{courses.length} Kursus</p>
                            <p className="text-xs text-gray-400 font-medium">{freeCourses.length} gratis · {paidCourses.length} berbayar</p>
                        </div>
                    </div>
                    <div className="w-px bg-gray-100"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">⏱</div>
                        <div>
                            <p className="text-lg font-black text-gray-900">{totalDuration > 0 ? `${totalDuration} Jam` : `±${courses.length * 10} Jam`}</p>
                            <p className="text-xs text-gray-400 font-medium">Total durasi belajar</p>
                        </div>
                    </div>
                    <div className="w-px bg-gray-100"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">👥</div>
                        <div>
                            <p className="text-lg font-black text-gray-900">{roadmap.students} Pelajar</p>
                            <p className="text-xs text-gray-400 font-medium">Sudah bergabung</p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center">
                        <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-black px-4 py-2 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Jalur Gratis Diikuti
                        </span>
                    </div>
                </div>

                {/* Prerequisites */}
                {roadmap.prerequisites?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <p className="font-black text-amber-800 text-sm mb-2">Prasyarat sebelum mulai:</p>
                            <div className="flex flex-wrap gap-2">
                                {roadmap.prerequisites.map(p => (
                                    <span key={p} className="px-3 py-1 bg-white border border-amber-200 rounded-lg text-sm font-semibold text-amber-700">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Course List */}
                <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    Apa yang akan kamu pelajari
                    <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">{courses.length} kursus</span>
                </h2>

                <div className="space-y-3">
                    {courses.map((course, index) => (
                        <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group flex gap-4 p-4 md:p-5 items-center">

                            {/* Step */}
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200">
                                {index + 1}
                            </div>

                            {/* Thumbnail */}
                            <div className="w-16 h-14 md:w-20 md:h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{course.category}</span>
                                    <span className="text-gray-200">·</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{course.level}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-indigo-600 transition text-sm md:text-base">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-medium">
                                    <span>👤 {course.instructor}</span>
                                    <span>⏱ {course.duration}</span>
                                    <span>⭐ {course.rating}</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex-shrink-0 text-right">
                                {course.price === 0 ? (
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-xs font-black rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 transition"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        Gratis →
                                    </Link>
                                ) : (
                                    <div className="flex flex-col items-end gap-1.5">
                                        <span className="text-xs font-black text-gray-500">Rp {course.price.toLocaleString('id-ID')}</span>
                                        <Link
                                            href={`/checkout?type=course&id=${course.id}`}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-indigo-600 transition"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            Beli →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {courses.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-400 font-medium">Kursus belum tersedia.</p>
                        </div>
                    )}
                </div>

                {/* Bottom summary */}
                {paidCourses.length > 0 && (
                    <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="font-black text-indigo-900 text-sm">💡 Kursus berbayar dalam jalur ini</p>
                            <p className="text-xs text-indigo-500 mt-1">
                                {paidCourses.length} kursus berbayar · Total nilai Rp {paidCourses.reduce((a, c) => a + c.price, 0).toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {paidCourses.map(c => (
                                <Link
                                    key={c.id}
                                    href={`/checkout?type=course&id=${c.id}`}
                                    className="text-xs font-bold px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    {c.title.split(":")[0].trim()}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
