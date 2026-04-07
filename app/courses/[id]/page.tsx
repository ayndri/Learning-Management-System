"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Course } from "@/lib/db";
import Navbar from "@/components/Navbar";

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<number>(0);
    const [user, setUser] = useState<{ id: string; name: string } | null>(null);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        if (session) setUser(JSON.parse(session));

        async function load() {
            try {
                const res = await fetch(`/api/courses/${id}`);
                const json = await res.json();
                if (json.success) setCourse(json.data);
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
            <div className="min-h-screen bg-white font-sans">
                <Navbar />
                <div className="bg-gray-900 h-64 animate-pulse"></div>
                <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-10 bg-gray-100 rounded-xl animate-pulse"></div>
                        <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                    </div>
                    <div className="h-80 bg-gray-100 rounded-2xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-white font-sans">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <p className="text-gray-500 font-bold">Kursus tidak ditemukan.</p>
                    <Link href="/courses" className="text-indigo-600 font-bold hover:underline">← Kembali ke Katalog</Link>
                </div>
            </div>
        );
    }

    const isFree = course.price === 0;

    const handleEnrollFree = async () => {
        if (!user) { window.location.href = `/login?redirect=/courses/${id}`; return; }
        setEnrolling(true);
        try {
            await fetch('/api/enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, courseId: id }),
            });
            window.location.href = `/courses/${id}/learn`;
        } finally {
            setEnrolling(false);
        }
    };
    const totalLessons = course.sections?.reduce((a, s) => a + s.lessons.length, 0) ?? 0;

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">

            <Navbar />

            {/* HERO DARK */}
            <div className="bg-gray-900 text-white py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold mb-4 uppercase tracking-wider">
                        <Link href="/courses" className="hover:text-white transition">Katalog</Link>
                        <span>/</span>
                        <span className="text-white/60">{course.category}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl lg:text-4xl font-black leading-tight mb-4">{course.title}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                                <span className="bg-yellow-500/20 text-yellow-300 px-2.5 py-1 rounded-lg font-bold border border-yellow-500/30">
                                    ⭐ {course.rating} rating
                                </span>
                                <span className="text-gray-300">👥 {course.students.toLocaleString()} siswa</span>
                                <span className="text-gray-300">⏱ {course.duration}</span>
                                <span className="text-gray-300">📶 {course.level}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm">
                                    {course.instructor.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Dibuat oleh</p>
                                    <p className="text-sm font-bold text-indigo-400">{course.instructor}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-6 mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-10">

                    {/* What you'll learn */}
                    <div className="border border-gray-100 p-6 rounded-2xl bg-gray-50">
                        <h3 className="font-black text-xl mb-4 text-gray-900">Yang akan kamu pelajari</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(course.sections?.flatMap(s => s.lessons.slice(0, 1).map(l => l.title)) ?? [
                                "Membangun proyek nyata dari awal",
                                "Praktik best practices industri",
                                "Deploy ke server production",
                                "Code review & debugging"
                            ]).slice(0, 6).map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Syllabus */}
                    {course.sections && course.sections.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-black text-2xl text-gray-900">Konten Kursus</h3>
                                <span className="text-sm text-gray-400 font-medium">{course.sections.length} section · {totalLessons} materi · {course.duration}</span>
                            </div>
                            <div className="border border-gray-100 rounded-2xl divide-y divide-gray-50 overflow-hidden">
                                {course.sections.map((section, idx) => (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => setActiveSection(activeSection === idx ? -1 : idx)}
                                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                                        >
                                            <span className="font-bold text-gray-800 flex items-center gap-3 text-sm">
                                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${activeSection === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                                {section.title}
                                            </span>
                                            <span className="text-xs text-gray-400 font-medium flex-shrink-0">{section.lessons.length} materi</span>
                                        </button>
                                        {activeSection === idx && (
                                            <div className="bg-white divide-y divide-gray-50">
                                                {section.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="flex items-center justify-between px-5 py-3 text-sm">
                                                        <div className="flex items-center gap-3 text-gray-600">
                                                            <span className="text-gray-300 text-base">
                                                                {lesson.type === 'video' ? '▶' : lesson.type === 'quiz' ? '📝' : '📄'}
                                                            </span>
                                                            <span>{lesson.title}</span>
                                                            {lesson.isFree && (
                                                                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">Preview</span>
                                                            )}
                                                        </div>
                                                        <span className="text-gray-400 text-xs font-medium flex-shrink-0">{lesson.duration}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instructor */}
                    <div>
                        <h3 className="font-black text-2xl mb-6 text-gray-900">Instruktur</h3>
                        <div className="flex gap-5 items-start">
                            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg flex-shrink-0">
                                {course.instructor.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-indigo-600">{course.instructor}</h4>
                                <p className="text-gray-400 text-sm mb-3">Senior Instructor · EduFlash</p>
                                <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-600 mb-3">
                                    <span>⭐ {course.rating} Rating</span>
                                    <span>👥 {course.students.toLocaleString()} Siswa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Sticky */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden lg:-mt-36 relative z-20">

                            {/* Course Image */}
                            <div className="relative h-44 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Price */}
                                <div className="flex items-end gap-3 mb-5">
                                    {isFree ? (
                                        <span className="text-3xl font-black text-green-600">Gratis!</span>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-black text-gray-900">Rp {course.price.toLocaleString('id-ID')}</span>
                                            <span className="text-sm text-gray-400 line-through mb-1">Rp {Math.floor(course.price * 1.5).toLocaleString('id-ID')}</span>
                                        </>
                                    )}
                                </div>

                                {/* CTA */}
                                {isFree ? (
                                    <button
                                        onClick={handleEnrollFree}
                                        disabled={enrolling}
                                        className="block w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-black text-center rounded-xl transition shadow-lg shadow-green-500/30 disabled:opacity-70"
                                    >
                                        {enrolling ? 'Mendaftar...' : 'Mulai Belajar Gratis →'}
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            href={user ? `/checkout?type=course&id=${id}` : `/login?redirect=/checkout?type=course%26id=${id}`}
                                            className="block w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-center rounded-xl transition shadow-lg shadow-indigo-500/30"
                                        >
                                            Beli Sekarang
                                        </Link>
                                        <p className="text-center text-xs text-gray-400 font-medium">30 hari garansi uang kembali</p>
                                    </div>
                                )}

                                {/* Features */}
                                <div className="mt-5 pt-5 border-t border-gray-50 space-y-2.5">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Yang kamu dapatkan:</p>
                                    {[
                                        `${course.duration} video on-demand`,
                                        `${totalLessons} materi pembelajaran`,
                                        "Akses selamanya",
                                        "Sertifikat kelulusan",
                                        "Belajar di HP & Desktop",
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <div className="w-4 h-4 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-2.5 h-2.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
