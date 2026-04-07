"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Course, Lesson, Section } from "@/lib/db";

export default function CoursePlayerPage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id;

    const [course, setCourse] = useState<Course | null>(null);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discuss">("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`);
                const json = await res.json();
                if (json.success) {
                    setCourse(json.data);
                    // Set first lesson as default active
                    if (json.data.sections?.[0]?.lessons?.[0]) {
                        setActiveLesson(json.data.sections[0].lessons[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch course player data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">Menyiapkan Ruang Belajar...</p>
            </div>
        );
    }

    if (!course || !activeLesson) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white gap-6">
                <div className="text-6xl">🎓</div>
                <h1 className="text-2xl font-black text-gray-900">Materi Belum Tersedia</h1>
                <Link href="/dashboard/courses" className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">Kembali ke Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white text-gray-900 overflow-hidden font-sans">

            {/* --- SIDEBAR KURIKULUM --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-100 transform transition-transform duration-500 cubic-bezier-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none`}>

                {/* Header Sidebar */}
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <Link href="/dashboard" className="text-[10px] font-black text-indigo-600 uppercase tracking-[2px] flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                        ← Kembali
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 p-2">✕</button>
                </div>

                {/* Content Sidebar */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {course.sections?.map((section, index) => (
                        <div key={section.id} className="border-b border-gray-50">
                            <div className="px-8 py-5 bg-gray-50/50">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Bab {index + 1}: {section.title}</h3>
                            </div>
                            <div className="py-2">
                                {section.lessons.map((lesson) => {
                                    const isActive = activeLesson.id === lesson.id;
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setActiveLesson(lesson);
                                                if (window.innerWidth < 1024) setSidebarOpen(false);
                                            }}
                                            className={`w-full text-left px-8 py-4 flex items-start gap-4 transition-all duration-300 border-r-4 ${isActive ? 'bg-indigo-50/50 border-indigo-600' : 'border-transparent hover:bg-gray-50'}`}
                                        >
                                            <div className={`mt-0.5 text-lg ${isActive ? 'text-indigo-600' : 'text-gray-400 opacity-50'}`}>
                                                {lesson.type === 'video' ? '📺' : lesson.type === 'quiz' ? '📝' : '📄'}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-black leading-tight mb-1.5 tracking-tight ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{lesson.duration}</span>
                                                    {lesson.isFree && (
                                                        <span className="text-[8px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100 font-black uppercase">Free</span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">

                {/* Header Info Desktop/Mobile */}
                <div className="bg-white border-b border-gray-50 p-6 flex justify-between items-center shadow-sm z-20 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-50 rounded-xl text-indigo-600 shadow-inner">
                            {sidebarOpen ? '⇇' : '⇉'}
                        </button>
                        <div>
                            <h1 className="font-black text-gray-900 truncate pr-4 text-sm md:text-base tracking-tight uppercase italic">{activeLesson.title}</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-1/3 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]"></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">35% Progress</span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30">

                    {/* 1. PLAYER AREA */}
                    <div className="w-full bg-black aspect-video relative shadow-2xl group">
                        {activeLesson.type === 'video' ? (
                            <iframe
                                src={activeLesson.contentUrl}
                                title={activeLesson.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : activeLesson.type === 'quiz' ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-indigo-900 text-white text-center p-12">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-5xl mb-8 shadow-2xl border border-white/20 animate-bounce-slow">📝</div>
                                <h2 className="text-4xl font-black mb-4 tracking-tight">Siap Untuk Kuis? 🏆</h2>
                                <p className="text-indigo-100 mb-10 max-w-lg leading-relaxed font-medium">Uji pemahamanmu tentang materi bab ini. Kamu harus menjawab dengan benar minimal 80% untuk lanjut!</p>
                                <button
                                    className="px-12 py-5 bg-white text-indigo-700 font-black rounded-[2rem] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 uppercase tracking-[3px] text-sm"
                                >
                                    Mulai Kerjakan Sekarang 🚀
                                </button>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-400 p-12">
                                <span className="text-6xl mb-6">📄</span>
                                <p className="font-black uppercase tracking-[3px]">Materi Artikel</p>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                             <button className="bg-black/50 text-white px-4 py-2 rounded-lg text-xs font-bold backdrop-blur-md">Teater Mode</button>
                        </div>
                    </div>

                    {/* 2. CONTENT DETAILS */}
                    <div className="max-w-6xl mx-auto p-6 md:p-12">

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{activeLesson.title}</h1>
                                <div className="flex items-center gap-6">
                                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Kursus: <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 decoration-2">{course.title}</span></p>
                                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Kategori: {course.category}</p>
                                </div>
                            </div>
                            <button className="flex-shrink-0 px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                                <span className="text-lg">✓</span> Tandai Selesai
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex gap-12 border-b border-gray-100 mb-10 overflow-x-auto custom-scrollbar-hide">
                            {['overview', 'resources', 'discuss'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-5 text-[10px] font-black capitalize transition-all whitespace-nowrap relative tracking-[3px] uppercase ${activeTab === tab
                                        ? 'text-indigo-600'
                                        : 'text-gray-400 hover:text-gray-800'
                                        }`}
                                >
                                    {tab === 'overview' ? '☕ Ikhtisar' : tab === 'resources' ? '📎 Resource' : '💬 Diskusi Q&A'}
                                    {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full animate-width-full"></span>}
                                </button>
                            ))}
                        </div>

                        {/* Tab Contents */}
                        <div className="min-h-[400px]">

                            {/* IKHTISAR */}
                            {activeTab === 'overview' && (
                                <div className="animate-fade-in-up space-y-8">
                                    <div className="prose prose-indigo max-w-none">
                                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                            {activeLesson.description || "Tidak ada deskripsi tambahan untuk materi ini."}
                                        </p>
                                    </div>
                                    <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                                        <div className="w-20 h-20 bg-indigo-50 rounded-[24px] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">👨‍🏫</div>
                                        <div className="text-center md:text-left">
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1.5">Dipandu Oleh</p>
                                            <p className="text-2xl font-black text-gray-900 tracking-tight">{course.instructor}</p>
                                            <p className="text-xs font-bold text-indigo-500 mt-1">Senior Instructor at EduFlash</p>
                                        </div>
                                        <button className="md:ml-auto px-6 py-2 border-2 border-gray-50 rounded-xl text-xs font-black text-gray-400 hover:border-indigo-600 hover:text-indigo-600 transition">Profil Instruktur</button>
                                    </div>
                                </div>
                            )}

                            {/* RESOURCES */}
                            {activeTab === 'resources' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                                    {(!activeLesson.resources || activeLesson.resources.length === 0) ? (
                                        <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-4 border-dashed border-gray-50">
                                            <p className="text-gray-300 font-black uppercase tracking-[4px] text-sm">No Resources Available</p>
                                        </div>
                                    ) : (
                                        activeLesson.resources.map((file) => (
                                            <div key={file.id} className="bg-white border border-gray-50 p-6 rounded-3xl flex items-center justify-between hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 cursor-pointer group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xs shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                                        {file.type}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 text-sm tracking-tight line-clamp-1">{file.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-300 hover:text-indigo-600 transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* DISCUSS */}
                            {activeTab === 'discuss' && (
                                <div className="space-y-12 animate-fade-in-up">
                                    {/* Input Diskusi */}
                                    <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm">
                                        <div className="flex gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-800 flex-shrink-0 shadow-lg flex items-center justify-center text-white font-black">JD</div>
                                            <div className="flex-1">
                                                <textarea
                                                    placeholder="Bagikan pertanyaan atau pemikiranmu..."
                                                    className="w-full bg-gray-50 border-none rounded-3xl p-6 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition resize-none h-32 placeholder-gray-400 font-medium"
                                                ></textarea>
                                                <div className="flex justify-end mt-4">
                                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-[2rem] text-xs font-black transition-all shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 uppercase tracking-[2px]">
                                                        Posting Diskusi 🚀
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center py-10 opacity-30">
                                        <p className="text-[10px] font-black uppercase tracking-[5px]">-- Akhir dari Riwayat Diskusi --</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
