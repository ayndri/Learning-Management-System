"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { courses } from "../../../data/courses";

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.id as string;
    const course = courses.find((c) => c.id === courseId);

    // --- STATE TAB ---
    // Default tab yang aktif adalah 'overview' (Ikhtisar)
    const [activeTab, setActiveTab] = useState("overview");

    // --- DUMMY DATA SILABUS ---
    const syllabus = [
        { id: 1, title: "Pengenalan & Persiapan Tools", duration: "10:00", isLocked: false, videoUrl: course?.videoUrl || "" },
        { id: 2, title: "Struktur Dasar HTML/Code", duration: "15:30", isLocked: false, videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE" },
        { id: 3, title: "Memahami Tag & Elemen", duration: "20:00", isLocked: false, videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU" },
        { id: 4, title: "Studi Kasus: Membuat Portfolio", duration: "45:00", isLocked: true, videoUrl: "" },
        { id: 5, title: "Quiz: Evaluasi Materi", duration: "05:00", isLocked: true, videoUrl: "" },
    ];

    // --- DUMMY DATA DISKUSI (KOMENTAR) ---
    const discussions = [
        { id: 1, user: "Budi Santoso", avatar: "B", text: "Mas, apakah materi ini cocok untuk pemula yang belum tahu coding sama sekali?", time: "2 jam yang lalu", role: "Siswa" },
        { id: 2, user: "Admin EduFlash", avatar: "A", text: "Halo Budi, sangat cocok! Materi ini didesain dari nol.", time: "1 jam yang lalu", role: "Instruktur" },
        { id: 3, user: "Siti Aminah", avatar: "S", text: "Menit 10:30 suaranya agak kecil ya kak, mohon diperbaiki.", time: "Baru saja", role: "Siswa" },
    ];

    // --- DUMMY DATA FILE PENDUKUNG ---
    const resources = [
        { id: 1, name: "Slide Presentasi Bab 1.pdf", size: "2.4 MB", type: "PDF" },
        { id: 2, name: "Source Code Latihan.zip", size: "15 MB", type: "ZIP" },
        { id: 3, name: "Cheatsheet HTML5.png", size: "500 KB", type: "IMG" },
    ];

    const [activeLesson, setActiveLesson] = useState(syllabus[0]);

    if (!course) {
        return <div className="min-h-screen flex items-center justify-center text-white">Kursus tidak ditemukan.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col animate-fade-in-up">

            {/* HEADER */}
            <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/courses" className="text-gray-400 hover:text-white transition">
                        &larr; Kembali
                    </Link>
                    <div className="h-6 w-px bg-gray-600 hidden md:block"></div>
                    <h1 className="font-bold text-sm md:text-lg truncate max-w-xs md:max-w-md">
                        {course.title}
                    </h1>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <span>Progress: 20%</span>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-1/5"></div>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* PLAYER AREA */}
                <div className="flex-1 overflow-y-auto bg-black flex flex-col custom-scrollbar">
                    <div className="aspect-video w-full bg-black relative">
                        <iframe
                            key={activeLesson.id}
                            width="100%"
                            height="100%"
                            src={activeLesson.videoUrl}
                            title={activeLesson.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full pb-20">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
                                <p className="text-gray-400 text-sm">Episode {activeLesson.id} • {activeLesson.duration}</p>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition shadow-lg shadow-indigo-500/20">
                                Tandai Selesai
                            </button>
                        </div>

                        {/* --- TAB NAVIGATION --- */}
                        <div className="flex gap-8 mt-8 border-b border-gray-700">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`pb-4 font-medium text-sm transition-all relative ${activeTab === "overview" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-200"
                                    }`}
                            >
                                Ikhtisar
                            </button>
                            <button
                                onClick={() => setActiveTab("discuss")}
                                className={`pb-4 font-medium text-sm transition-all relative ${activeTab === "discuss" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-200"
                                    }`}
                            >
                                Diskusi Q&A <span className="ml-1 text-xs bg-gray-700 text-white px-1.5 rounded-full">3</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("files")}
                                className={`pb-4 font-medium text-sm transition-all relative ${activeTab === "files" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400 hover:text-gray-200"
                                    }`}
                            >
                                File Pendukung
                            </button>
                        </div>

                        {/* --- TAB CONTENT AREA --- */}
                        <div className="mt-6 min-h-[200px]">

                            {/* 1. KONTEN IKHTISAR */}
                            {activeTab === "overview" && (
                                <div className="animate-fade-in-up">
                                    <h3 className="font-bold text-lg mb-4 text-white">Deskripsi Materi</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                                        {course.description} Di video ini kita akan membahas secara mendalam tentang teknik dasar
                                        yang diperlukan untuk menguasai topik ini. Pastikan Anda sudah menonton video sebelumnya agar tidak bingung.
                                        <br /><br />
                                        <strong>Apa yang akan Anda pelajari:</strong>
                                    </p>
                                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 mb-8 ml-2">
                                        <li>Memahami konsep dasar framework.</li>
                                        <li>Instalasi tools yang dibutuhkan.</li>
                                        <li>Best practice dalam penulisan kode.</li>
                                    </ul>

                                    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-white">Sudah paham materi ini?</p>
                                            <p className="text-sm text-gray-400">Uji pemahamanmu dengan kuis singkat.</p>
                                        </div>
                                        <Link href="/dashboard/quiz" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition border border-gray-600 w-full sm:w-auto text-center">
                                            Mulai Kuis
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* 2. KONTEN DISKUSI */}
                            {activeTab === "discuss" && (
                                <div className="space-y-6 animate-fade-in-up">
                                    {/* Input Komentar */}
                                    <div className="flex gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <textarea
                                                placeholder="Tulis pertanyaan atau diskusi..."
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition resize-none h-24"
                                            ></textarea>
                                            <div className="flex justify-end mt-2">
                                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                                                    Kirim Komentar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* List Komentar */}
                                    {discussions.map((chat) => (
                                        <div key={chat.id} className="flex gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${chat.role === 'Instruktur' ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                                                {chat.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-sm text-gray-200">{chat.user}</span>
                                                    {chat.role === 'Instruktur' && (
                                                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded border border-indigo-500/30">Instruktur</span>
                                                    )}
                                                    <span className="text-xs text-gray-500">• {chat.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 leading-relaxed">{chat.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 3. KONTEN FILE PENDUKUNG */}
                            {activeTab === "files" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                                    {resources.map((file) => (
                                        <div key={file.id} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center justify-between hover:bg-gray-750 transition group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs group-hover:text-white group-hover:bg-indigo-600 transition">
                                                    {file.type}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-gray-200 group-hover:text-white transition">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{file.size}</p>
                                                </div>
                                            </div>
                                            <button className="text-gray-500 hover:text-white p-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* SIDEBAR PLAYLIST (KANAN) */}
                <div className="w-full lg:w-96 bg-gray-900 border-l border-gray-800 flex flex-col h-[50vh] lg:h-auto overflow-hidden">
                    <div className="p-4 border-b border-gray-800 bg-gray-850">
                        <h3 className="font-bold text-white">Daftar Materi</h3>
                        <p className="text-xs text-gray-400 mt-1">5 Episode (1j 30m)</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {syllabus.map((item, index) => {
                            const isActive = activeLesson.id === item.id;
                            return (
                                <button
                                    key={item.id}
                                    disabled={item.isLocked}
                                    onClick={() => setActiveLesson(item)}
                                    className={`w-full text-left p-4 flex gap-4 transition-colors border-b border-gray-800 ${isActive
                                        ? "bg-indigo-600/10 border-l-4 border-l-indigo-500"
                                        : "hover:bg-gray-800 border-l-4 border-l-transparent"
                                        } ${item.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {item.isLocked ? (
                                            <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded text-gray-500 text-xs">🔒</span>
                                        ) : isActive ? (
                                            <span className="w-6 h-6 flex items-center justify-center bg-indigo-600 rounded-full text-white text-xs animate-pulse">▶</span>
                                        ) : (
                                            <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full text-gray-400 text-xs">{index + 1}</span>
                                        )}
                                    </div>

                                    <div>
                                        <p className={`text-sm font-medium line-clamp-2 ${isActive ? "text-indigo-400" : "text-gray-200"}`}>
                                            {item.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                📄 Video • {item.duration}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}