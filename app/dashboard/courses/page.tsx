"use client";

import Link from "next/link";
import { useState } from "react";
import { courses } from "../../../data/courses"; // Pastikan path import ini benar

export default function MyCoursesPage() {
    const [filter, setFilter] = useState("all"); // all | in-progress | completed
    const [searchQuery, setSearchQuery] = useState("");

    // Filter logika sederhana
    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Simulasi filter status (karena data static, kita random/hardcode saja logikanya)
        // Di real app, data ini dari database
        if (filter === "completed") return matchesSearch && course.id === "html-dasar"; // Ceritanya HTML sudah selesai
        if (filter === "in-progress") return matchesSearch && course.id !== "html-dasar";
        return matchesSearch;
    });

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER & CONTROLS --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelas Saya</h1>
                    <p className="text-gray-500 text-sm">Lanjutkan pembelajaran Anda yang tertunda.</p>
                </div>

                {/* Search Bar */}
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

            {/* --- TABS FILTER --- */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {["all", "in-progress", "completed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${filter === tab
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab === "all" ? "Semua Kelas" : tab === "in-progress" ? "Sedang Berjalan" : "Selesai"}
                        </button>
                    ))}
                </nav>
            </div>

            {/* --- COURSE GRID --- */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => {
                        // Simulasi Progress Random agar terlihat variatif
                        const isCompleted = course.id === "html-dasar";
                        const progress = isCompleted ? 100 : Math.floor(Math.random() * 80) + 10;

                        return (
                            <div key={course.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col">
                                {/* Thumbnail Area */}
                                <div className={`h-40 bg-gradient-to-r ${getGradient(index)} relative flex items-center justify-center`}>
                                    <span className="text-4xl">💻</span>
                                    {isCompleted && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                            SELESAI
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>

                                    {/* Progress Bar */}
                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                            <div
                                                className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-indigo-600'}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>

                                        <Link
                                            href={`/courses/${course.id}`}
                                            className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition ${isCompleted
                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                }`}
                                        >
                                            {isCompleted ? "Ulangi Materi" : "Lanjutkan Belajar"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // State Kosong (Jika search tidak ketemu)
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900">Tidak ada kelas ditemukan</h3>
                    <p className="text-gray-500">Coba kata kunci lain atau ubah filter.</p>
                </div>
            )}
        </div>
    );
}

// Helper untuk warna warni
function getGradient(index: number) {
    const gradients = [
        "from-blue-400 to-indigo-500",
        "from-purple-400 to-pink-500",
        "from-emerald-400 to-teal-500",
        "from-orange-400 to-red-500",
    ];
    return gradients[index % gradients.length];
}