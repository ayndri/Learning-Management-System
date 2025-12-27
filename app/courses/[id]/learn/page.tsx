"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// --- DUMMY DATA LENGKAP (Struktur Nested: Section -> Lessons) ---
// Sama dengan data di Admin & Landing Page untuk konsistensi
const courseData = {
    id: "1",
    title: "Fullstack Laravel 10: Membangun E-Commerce",
    instructor: "Budi Santoso",
    description: "Panduan lengkap membangun aplikasi E-Commerce modern menggunakan Laravel 10 dan React.js. Kita akan membahas dari nol hingga deployment.",
    sections: [
        {
            id: 1,
            title: "Pengenalan & Persiapan",
            lessons: [
                {
                    id: 101,
                    title: "Apa itu Laravel?",
                    type: "video",
                    duration: "10:00",
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    description: "Pengenalan dasar framework Laravel dan kenapa kita menggunakannya.",
                    resources: []
                },
                {
                    id: 102,
                    title: "Instalasi Tools (XAMPP & Composer)",
                    type: "video",
                    duration: "15:00",
                    videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE",
                    description: "Persiapan lingkungan kerja lokal sebelum memulai coding.",
                    resources: [
                        { id: 1, name: "Panduan Instalasi.pdf", size: "1.2 MB", type: "PDF" },
                        { id: 2, name: "Link Download Tools.txt", size: "1 KB", type: "TXT" }
                    ]
                },
            ]
        },
        {
            id: 2,
            title: "Routing & Controller",
            lessons: [
                {
                    id: 201,
                    title: "Konsep Dasar Routing",
                    type: "video",
                    duration: "12:00",
                    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
                    description: "Memahami cara kerja route di Laravel.",
                    resources: [
                        { id: 3, name: "Cheatsheet Routing.png", size: "0.5 MB", type: "IMG" }
                    ]
                },
                {
                    id: 202,
                    title: "Kuis Pemahaman Routing",
                    type: "quiz",
                    duration: "5 Soal",
                    description: "Uji pemahamanmu tentang routing sebelum lanjut ke materi Controller.",
                    resources: []
                },
            ]
        }
    ]
};

// --- DUMMY DISKUSI ---
const discussions = [
    { id: 1, user: "Andi Saputra", avatar: "A", text: "Apakah materi ini cocok untuk pemula?", time: "2 jam lalu", role: "Siswa" },
    { id: 2, user: "Budi Santoso", avatar: "B", text: "Sangat cocok, karena dimulai dari dasar.", time: "1 jam lalu", role: "Instruktur" },
    { id: 3, user: "Siti Aminah", avatar: "S", text: "Terima kasih penjelasannya pak, sangat jelas!", time: "Baru saja", role: "Siswa" },
];

export default function CoursePlayerPage() {
    const router = useRouter();
    const params = useParams();

    // State: Default aktifkan pelajaran pertama
    const [activeLesson, setActiveLesson] = useState(courseData.sections[0].lessons[0]);
    const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discuss">("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true); // Toggle Sidebar

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">

            {/* --- SIDEBAR KURIKULUM (Light Mode) --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>

                {/* Header Sidebar */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <Link href="/dashboard" className="text-xs font-bold text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition">
                        ← Kembali ke Dashboard
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">✕</button>
                </div>

                {/* Content Sidebar (List Bab & Materi) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {courseData.sections.map((section, index) => (
                        <div key={section.id} className="border-b border-gray-100">
                            <div className="px-5 py-4 bg-gray-50">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bab {index + 1}: {section.title}</h3>
                            </div>
                            <div>
                                {section.lessons.map((lesson) => {
                                    const isActive = activeLesson.id === lesson.id;
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setActiveLesson(lesson);
                                                // Tutup sidebar di mobile setelah klik
                                                if (window.innerWidth < 768) setSidebarOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-4 flex items-start gap-3 transition border-l-4 ${isActive ? 'bg-indigo-50 border-indigo-600' : 'border-transparent hover:bg-gray-50'}`}
                                        >
                                            <div className={`mt-0.5 text-xs ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                                                {lesson.type === 'video' ? '📺' : '📝'}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-medium leading-tight mb-1 ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-[10px] text-gray-400">{lesson.duration}</p>
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

                {/* Mobile Header Toggle */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-20 relative">
                    <h1 className="font-bold text-gray-800 truncate pr-4 text-sm">{activeLesson.title}</h1>
                    <button onClick={() => setSidebarOpen(true)} className="text-indigo-600 font-bold text-sm">
                        ☰ Menu
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">

                    {/* 1. PLAYER AREA */}
                    <div className="w-full bg-black aspect-video relative shadow-lg">
                        {activeLesson.type === 'video' ? (
                            <iframe
                                src={activeLesson.videoUrl}
                                title={activeLesson.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            // Tampilan Jika KUIS (Light Mode Placeholder)
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-900 text-center p-8">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mb-6 shadow-md border border-gray-100 animate-bounce-slow">📝</div>
                                <h2 className="text-3xl font-bold mb-2 text-gray-800">Saatnya Kuis!</h2>
                                <p className="text-gray-500 mb-8 max-w-md leading-relaxed">Uji pemahaman materi Anda di bab ini dengan mengerjakan kuis singkat.</p>
                                <Link
                                    href={`/quiz/${activeLesson.id}`}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-200 transform hover:-translate-y-1"
                                >
                                    Mulai Kerjakan Kuis
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 2. CONTENT DETAILS */}
                    <div className="max-w-5xl mx-auto p-6 md:p-10">

                        {/* Header Lesson Info */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">{activeLesson.title}</h1>
                                <p className="text-gray-500 text-sm">Bagian dari: <span className="text-indigo-600 font-bold">{courseData.title}</span></p>
                            </div>
                            <button className="flex-shrink-0 px-6 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition border border-indigo-100 shadow-sm">
                                Tandai Selesai ✓
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
                            {['overview', 'resources', 'discuss'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-4 text-sm font-bold capitalize transition whitespace-nowrap relative ${activeTab === tab
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                >
                                    {tab === 'overview' ? 'Ikhtisar' : tab === 'resources' ? 'File Pendukung' : 'Diskusi Q&A'}
                                    {tab === 'resources' && activeLesson.resources && activeLesson.resources.length > 0 && (
                                        <span className="ml-2 bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full border border-gray-200 font-bold">{activeLesson.resources.length}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Contents */}
                        <div className="min-h-[300px]">

                            {/* A. IKHTISAR (Deskripsi) */}
                            {activeTab === 'overview' && (
                                <div className="animate-fade-in-up text-gray-600 leading-relaxed space-y-4">
                                    <p className="text-lg text-gray-900 font-bold">Tentang Materi Ini</p>
                                    <p>{activeLesson.description}</p>
                                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mt-4 flex items-center gap-3">
                                        <span className="text-2xl">👨‍🏫</span>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Instruktur</p>
                                            <p className="text-sm font-bold text-gray-900">{courseData.instructor}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* B. FILE PENDUKUNG */}
                            {activeTab === 'resources' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                                    {(!activeLesson.resources || activeLesson.resources.length === 0) ? (
                                        <div className="col-span-2 text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
                                            <p className="text-gray-400 font-medium">Tidak ada file pendukung untuk materi ini.</p>
                                        </div>
                                    ) : (
                                        activeLesson.resources.map((file) => (
                                            <div key={file.id} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition group cursor-pointer hover:border-indigo-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                                        {file.type}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800 text-sm group-hover:text-indigo-600 transition">{file.name}</p>
                                                        <p className="text-xs text-gray-500">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-indigo-600 transition p-2 rounded-full hover:bg-gray-100">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* C. DISKUSI (Komentar) */}
                            {activeTab === 'discuss' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    {/* Input Komentar */}
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 shadow-sm"></div>
                                        <div className="flex-1">
                                            <textarea
                                                placeholder="Tulis pertanyaan atau diskusi..."
                                                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none h-24 placeholder-gray-400 shadow-sm"
                                            ></textarea>
                                            <div className="flex justify-end mt-3">
                                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5">
                                                    Kirim Komentar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* List Komentar */}
                                    <div className="space-y-6">
                                        {discussions.map((chat) => (
                                            <div key={chat.id} className="flex gap-4 group">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-sm ${chat.role === 'Instruktur' ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                                    {chat.avatar}
                                                </div>
                                                <div className="flex-1 bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-100 transition hover:bg-gray-100">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-gray-900 text-sm">{chat.user}</span>
                                                        {chat.role === 'Instruktur' && (
                                                            <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded border border-indigo-200 font-bold">Instruktur</span>
                                                        )}
                                                        <span className="text-xs text-gray-400">• {chat.time}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{chat.text}</p>
                                                </div>
                                            </div>
                                        ))}
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