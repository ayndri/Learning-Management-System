"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Course } from "@/lib/db";

export default function CourseSalesPage() {
    const params = useParams();
    const courseId = params.id;
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number | string | null>(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`);
                const json = await res.json();
                if (json.success) {
                    setCourse(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch course detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-[4px] text-xs">Mempersiapkan Kurikulum...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <h1 className="text-2xl font-black text-gray-900">Kursus Tidak Ditemukan</h1>
                <Link href="/courses" className="mt-4 text-indigo-600 font-bold underline">Kembali ke Katalog</Link>
            </div>
        );
    }

    const syllabus = course.sections || [];
    const totalLessons = syllabus.reduce((acc, sec) => acc + sec.lessons.length, 0);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans pb-32">

            {/* --- NAVBAR SIMPLE --- */}
            <nav className="border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="font-black text-2xl tracking-tighter italic uppercase">
                        Edu<span className="text-indigo-600">Flash</span><span className="text-indigo-600">.</span>
                    </Link>
                    <div className="flex gap-8 items-center">
                        <Link href="/courses" className="text-xs font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest transition">Katalog</Link>
                        <Link href="/login" className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-xl uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition">Masuk</Link>
                    </div>
                </div>
            </nav>

            {/* --- HEADER HERO --- */}
            <div className="bg-gray-900 text-white py-20 lg:py-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black mb-8 uppercase tracking-[4px]">
                            <Link href="/courses" className="hover:text-white transition">Academy</Link>
                            <span className="text-gray-700">/</span>
                            <span className="text-gray-300">{course.category}</span>
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tighter italic">
                            {course.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-[2px] mb-12">
                            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-sm italic">⭐ {course.rating} Rating</span>
                            <span className="text-gray-400 border-l border-gray-800 pl-8">🎓 {course.students.toLocaleString()} Siswa Terdaftar</span>
                            <span className="text-gray-400 border-l border-gray-800 pl-8">🌐 Bahasa Indonesia</span>
                            <span className="text-indigo-400 border-l border-gray-800 pl-8">🛡️ Akses Selamanya</span>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md w-fit">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-xl shadow-xl">👨‍🏫</div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Master Instructor</p>
                                <p className="text-lg font-black text-white italic tracking-tight">{course.instructor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-20 relative">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-20">

                    {/* What you'll learn */}
                    <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col gap-10">
                        <h3 className="font-black text-3xl text-gray-900 tracking-tight italic uppercase">Target Pembelajaran <span className="text-indigo-600">.</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                "Latihan Studi Kasus Riil",
                                "Persiapan Karir Profesional",
                                "Portfolio Project Base",
                                "Review Code Bersama",
                                "Komunitas Belajar Aktif",
                                "Sertifikat Kelulusan Resmi"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <span className="w-6 h-6 rounded-full bg-white border border-indigo-200 text-indigo-600 flex items-center justify-center text-[10px] font-black shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">✓</span>
                                    <span className="text-base text-gray-600 font-medium tracking-tight leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Syllabus */}
                    <div>
                        <div className="flex items-end justify-between mb-10 pb-6 border-b-4 border-gray-900">
                            <h3 className="font-black text-4xl text-gray-900 tracking-tighter italic uppercase">Kurikulum <span className="text-indigo-600">.</span></h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">{syllabus.length} Bab • {totalLessons} Materi</p>
                        </div>
                        
                        <div className="space-y-4">
                            {syllabus.length === 0 ? (
                                <p className="text-gray-400 italic font-medium">Kurikulum sedang disiapkan oleh instruktur.</p>
                            ) : (
                                syllabus.map((section, idx) => (
                                    <div key={section.id} className="group">
                                        <button
                                            onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                            className={`w-full flex justify-between items-center p-8 rounded-3xl transition-all duration-500 text-left border ${activeAccordion === idx 
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-2xl' 
                                                : 'bg-white text-gray-900 border-gray-100 hover:border-indigo-600'}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <span className={`text-xs font-black uppercase italic tracking-[2px] ${activeAccordion === idx ? 'text-indigo-400' : 'text-gray-400'}`}>Part {idx + 1}</span>
                                                <span className="text-xl font-black tracking-tight">{section.title}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${activeAccordion === idx ? 'text-gray-400' : 'text-gray-400'}`}>{section.lessons.length} Materi</span>
                                                <span className={`transition-transform duration-500 font-bold ${activeAccordion === idx ? 'rotate-180' : ''}`}>↓</span>
                                            </div>
                                        </button>
                                        
                                        {activeAccordion === idx && (
                                            <div className="mt-4 px-10 py-6 space-y-4 animate-fade-in-up">
                                                {section.lessons.map((lesson, lessonIdx) => (
                                                    <div key={lesson.id} className="flex justify-between items-center group/item p-4 rounded-2xl hover:bg-indigo-50 transition-colors border border-transparent">
                                                        <div className="flex items-center gap-6">
                                                            <span className="text-lg opacity-40">{lesson.type === 'video' ? '📺' : '📝'}</span>
                                                            <div>
                                                                <p className="text-sm font-black text-gray-800 tracking-tight group-hover/item:text-indigo-600 transition-colors">{lesson.title}</p>
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
                                                            </div>
                                                        </div>
                                                        {lesson.isFree ? (
                                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 px-3 py-1 rounded-sm shadow-sm ring-1 ring-indigo-200">Preview 🔓</span>
                                                        ) : (
                                                            <span className="text-[10px] font-bold text-gray-300 opacity-0 group-hover/item:opacity-100 transition-opacity">Premium 🔒</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Sticky Card) */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32">
                        <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-50 overflow-hidden lg:-mt-[500px] relative z-40">
                             {/* Preview Image/Video */}
                             <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gray-900/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse cursor-pointer hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                    <p className="mt-4 text-white text-[10px] font-black uppercase tracking-[3px]">Preview Kursus</p>
                                </div>
                             </div>

                             <div className="p-12 space-y-12">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-2">Harga Investasi</span>
                                    <div className="flex items-end gap-5">
                                        <span className="text-5xl font-black text-gray-900 tracking-tighter italic">Rp {course.price.toLocaleString('id-ID')}</span>
                                        <span className="text-xl text-gray-300 line-through decoration-red-500/30 decoration-2 mb-1">Rp {(course.price * 2).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button className="w-full py-6 bg-indigo-600 hover:bg-gray-900 text-white font-black text-base rounded-[2.5rem] transition-all shadow-2xl shadow-indigo-100 hover:shadow-indigo-200 transform hover:scale-105 active:scale-95 uppercase tracking-[3px] italic">
                                        Mulai Belajar Sekarang 🚀
                                    </button>
                                    <button className="w-full py-6 bg-white border-4 border-gray-50 text-gray-400 font-black text-xs rounded-[2.5rem] hover:border-gray-900 hover:text-gray-900 transition-all uppercase tracking-[4px]">
                                        Tambahkan ke Wishlist
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] block border-b border-gray-50 pb-4">Kurikulum Termasuk</span>
                                    <ul className="space-y-5">
                                        {[
                                            { icon: "🎥", text: `${course.duration} Video On-Demand` },
                                            { icon: "📱", text: "Akses di HP, Desktop & TV" },
                                            { icon: "📄", text: "Resource Files & Source Code" },
                                            { icon: "🎓", text: "Sertifikat Kelulusan EduFlash" }
                                        ].map((feat, i) => (
                                            <li key={i} className="flex gap-4 items-center text-sm font-bold text-gray-600">
                                                <span className="text-xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-xl">{feat.icon}</span>
                                                <span className="tracking-tight">{feat.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
