"use client";

import { useState } from "react";

export default function DiscussPage() {
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: "Bagaimana cara center div dengan Flexbox?",
            author: "Budi Santoso",
            role: "Siswa",
            replies: 12,
            views: 340,
            tags: ["CSS", "Help"],
            isSolved: true,
            time: "2 jam yang lalu"
        },
        {
            id: 2,
            title: "Error saat install Next.js versi terbaru",
            author: "Siti Aminah",
            role: "Siswa",
            replies: 5,
            views: 120,
            tags: ["NextJS", "Bug"],
            isSolved: false,
            time: "5 jam yang lalu"
        },
        {
            id: 3,
            title: "Materi JavaScript lanjutan kapan rilis?",
            author: "Rizky Developer",
            role: "Pro Member",
            replies: 2,
            views: 85,
            tags: ["General"],
            isSolved: false,
            time: "1 hari yang lalu"
        }
    ]);

    const handleNewTopic = () => {
        alert("Fitur buat topik baru (Simulasi)");
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Forum Diskusi 💬</h1>
                    <p className="text-gray-500 text-sm">Tanya jawab seputar materi koding dengan instruktur dan siswa lain.</p>
                </div>
                <button
                    onClick={handleNewTopic}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>✏️</span> Buat Topik Baru
                </button>
            </div>

            {/* --- SEARCH & FILTER --- */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Cari topik diskusi..."
                    className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                />
            </div>

            {/* --- DISCUSSION LIST --- */}
            <div className="space-y-4">
                {topics.map((topic) => (
                    <div key={topic.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition cursor-pointer group">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                {/* Avatar Initials */}
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                                    {topic.author.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition">
                                        {topic.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                                        <span className="text-gray-500">Oleh <span className="font-semibold text-gray-700">{topic.author}</span></span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-400">{topic.time}</span>

                                        {/* Tags */}
                                        {topic.tags.map(tag => (
                                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium border border-gray-200">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-center">
                                {topic.isSolved && (
                                    <div className="hidden md:flex flex-col items-center text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                                        <span className="text-lg">✓</span>
                                        <span className="text-[10px] font-bold uppercase">Solved</span>
                                    </div>
                                )}
                                <div className="hidden md:block">
                                    <p className="font-bold text-gray-900">{topic.replies}</p>
                                    <p className="text-xs text-gray-400">Balasan</p>
                                </div>
                                <div className="hidden md:block">
                                    <p className="font-bold text-gray-900">{topic.views}</p>
                                    <p className="text-xs text-gray-400">Dilihat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}