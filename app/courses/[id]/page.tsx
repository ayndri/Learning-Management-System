"use client";

import Link from "next/link";
import { useState } from "react";

// Dummy Data Course Detail
const course = {
    id: "1",
    title: "Fullstack Laravel 10: Membangun E-Commerce Lengkap",
    subtitle: "Pelajari cara membangun aplikasi toko online modern dengan fitur lengkap menggunakan Laravel 10, React, dan Payment Gateway.",
    rating: 4.8,
    students: 2340,
    lastUpdated: "Desember 2025",
    language: "Bahasa Indonesia",
    price: 250000,
    originalPrice: 500000,
    instructor: {
        name: "Budi Santoso",
        role: "Senior Backend Engineer",
        avatar: "https://i.pravatar.cc/150?u=budi",
        students: "12,000+",
        courses: 15,
        bio: "Budi adalah software engineer dengan pengalaman 10 tahun. Ia spesialis di PHP Laravel dan Cloud Architecture."
    },
    videoPreview: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Trailer
    features: [
        "20 Jam Video on-demand",
        "15 Artikel Pendukung",
        "Source Code Lengkap",
        "Akses Selamanya",
        "Sertifikat Kelulusan",
        "Akses di HP dan TV"
    ],
    syllabus: [
        { title: "Pengenalan & Persiapan", count: 5 },
        { title: "Database Schema & Migration", count: 8 },
        { title: "Authentication & Security", count: 6 },
        { title: "Product Management", count: 10 },
        { title: "Payment Gateway Integration", count: 7 },
    ]
};

export default function CourseSalesPage() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">

            {/* --- NAVBAR SIMPLE --- */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-extrabold text-xl tracking-tight">Edu<span className="text-indigo-600">Flash</span>.</Link>
                    <div className="flex gap-4">
                        <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-indigo-600">Masuk</Link>
                    </div>
                </div>
            </nav>

            {/* --- HEADER HERO (DARK) --- */}
            <div className="bg-gray-900 text-white py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-indigo-300 text-sm font-bold mb-4 uppercase tracking-wide">
                            <Link href="/courses" className="hover:text-white">Katalog</Link>
                            <span>/</span>
                            <span>Web Development</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl">
                            {course.subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded font-bold border border-yellow-500/30">
                                ⭐ {course.rating} (450 Review)
                            </span>
                            <span className="text-gray-300">👥 {course.students.toLocaleString()} Siswa</span>
                            <span className="text-gray-300">📅 Update: {course.lastUpdated}</span>
                            <span className="text-gray-300">🌐 {course.language}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <img src={course.instructor.avatar} alt="Instructor" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                            <div>
                                <p className="text-xs text-gray-400">Dibuat oleh</p>
                                <Link href="#instructor" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 underline">
                                    {course.instructor.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

                {/* LEFT COLUMN (Details) */}
                <div className="lg:col-span-2 space-y-12">

                    {/* What you'll learn */}
                    <div className="border border-gray-200 p-6 rounded-2xl bg-gray-50">
                        <h3 className="font-bold text-xl mb-4 text-gray-900">Apa yang akan Anda pelajari</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Membangun API dengan Laravel",
                                "Integrasi Payment Gateway Midtrans",
                                "Membuat Dashboard Admin React",
                                "Manajemen State dengan Redux",
                                "Deploy ke VPS Ubuntu",
                                "Optimasi Query Database"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <span className="text-indigo-600 mt-1">✓</span>
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Syllabus Accordion */}
                    <div>
                        <h3 className="font-bold text-2xl mb-6 text-gray-900">Konten Kursus</h3>
                        <div className="border border-gray-200 rounded-xl divide-y divide-gray-200 overflow-hidden">
                            {course.syllabus.map((section, idx) => (
                                <div key={idx}>
                                    <button
                                        onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                                    >
                                        <span className="font-bold text-gray-800 flex items-center gap-3">
                                            <span className={`transform transition-transform ${activeAccordion === idx ? 'rotate-180' : ''}`}>▼</span>
                                            {section.title}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">{section.count} Materi</span>
                                    </button>
                                    {activeAccordion === idx && (
                                        <div className="bg-white p-4 space-y-3">
                                            {[...Array(section.count)].map((_, lessonIdx) => (
                                                <div key={lessonIdx} className="flex justify-between items-center text-sm group cursor-default">
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <span className="text-gray-400 text-xs">📄</span>
                                                        <span className="group-hover:text-indigo-600 transition">Materi Pembelajaran {idx + 1}.{lessonIdx + 1}</span>
                                                    </div>
                                                    {idx === 0 && lessonIdx < 2 ? (
                                                        <span className="text-indigo-600 text-xs font-bold underline cursor-pointer">Preview</span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">05:30</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor */}
                    <div id="instructor">
                        <h3 className="font-bold text-2xl mb-6 text-gray-900">Instruktur</h3>
                        <div className="flex gap-6 items-start">
                            <img src={course.instructor.avatar} alt="Instructor" className="w-24 h-24 rounded-full object-cover shadow-md" />
                            <div>
                                <h4 className="text-lg font-bold text-indigo-600">{course.instructor.name}</h4>
                                <p className="text-gray-500 text-sm mb-4">{course.instructor.role}</p>

                                <div className="flex gap-6 text-sm mb-4 font-semibold text-gray-700">
                                    <span>⭐ 4.8 Rating</span>
                                    <span>🎓 {course.instructor.students} Siswa</span>
                                    <span>▶ {course.instructor.courses} Kursus</span>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {course.instructor.bio}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (Sticky Sidebar) */}
                <div className="lg:col-span-1 relative">
                    <div className="sticky top-24 space-y-6">

                        {/* BUY CARD */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden lg:-mt-40 z-20 relative">
                            {/* Video Preview */}
                            <div className="relative aspect-video bg-black group cursor-pointer">
                                <iframe
                                    src={course.videoPreview}
                                    className="w-full h-full pointer-events-none"
                                    title="Preview"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                        <svg className="w-6 h-6 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-0 w-full text-center text-white font-bold text-sm drop-shadow-md">
                                    Pratinjau Kursus
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-end gap-3 mb-6">
                                    <span className="text-4xl font-black text-gray-900">Rp {course.price.toLocaleString('id-ID')}</span>
                                    <span className="text-lg text-gray-400 line-through decoration-red-500 mb-1">Rp {course.originalPrice.toLocaleString('id-ID')}</span>
                                </div>

                                <div className="space-y-3">
                                    <Link href="/checkout" className="block w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center rounded-xl transition shadow-lg shadow-indigo-500/30 transform active:scale-95">
                                        Beli Sekarang
                                    </Link>
                                    <button className="block w-full py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-bold text-center rounded-xl hover:border-gray-400 hover:bg-gray-50 transition">
                                        Tambah ke Keranjang
                                    </button>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">Yang akan kamu dapatkan:</p>
                                    <ul className="space-y-2">
                                        {course.features.map((feature, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600">
                                                <span className="text-indigo-500">💎</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Corporate Training CTA */}
                        <div className="border border-gray-200 p-5 rounded-xl bg-gray-50 text-center">
                            <h4 className="font-bold text-gray-900 mb-1">Training untuk Tim?</h4>
                            <p className="text-xs text-gray-500 mb-3">Dapatkan harga spesial untuk 5+ orang.</p>
                            <button className="text-indigo-600 text-sm font-bold hover:underline">Hubungi Sales →</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}