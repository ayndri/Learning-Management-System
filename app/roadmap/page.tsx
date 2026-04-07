"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Roadmap } from "@/lib/db";
import Navbar from "@/components/Navbar";

const gradients = [
    { from: "from-violet-600", to: "to-indigo-600", light: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
    { from: "from-rose-500", to: "to-orange-500", light: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
    { from: "from-emerald-500", to: "to-teal-600", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    { from: "from-blue-500", to: "to-cyan-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
];

export default function RoadmapPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadRoadmaps() {
            try {
                const res = await fetch('/api/roadmaps');
                const json = await res.json();
                if (json.success) setRoadmaps(json.data);
            } catch (error) {
                console.error("Failed to fetch roadmaps:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadRoadmaps();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            <Navbar />

            {/* HERO */}
            <div className="bg-indigo-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-indigo-200 text-xs font-bold tracking-wider mb-5">
                            STRUCTURED LEARNING PATH 🗺️
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Pilih Jalur Karirmu
                        </h1>
                        <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed mb-8">
                            Kurikulum terstruktur yang dirancang oleh expert. Dari nol sampai siap kerja dengan roadmap yang jelas dan terarah.
                        </p>
                        {/* Stats */}
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <p className="text-3xl font-black">{isLoading ? "—" : roadmaps.length}</p>
                                <p className="text-indigo-300 text-sm font-medium">Jalur Belajar</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black">{isLoading ? "—" : roadmaps.reduce((a, r) => a + r.coursesCount, 0)}+</p>
                                <p className="text-indigo-300 text-sm font-medium">Total Materi</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black">{isLoading ? "—" : roadmaps.reduce((a, r) => a + r.students, 0)}+</p>
                                <p className="text-indigo-300 text-sm font-medium">Pelajar Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CARDS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100 shadow-sm"></div>
                        ))}
                    </div>
                ) : roadmaps.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-gray-400 font-bold text-lg">Belum ada jalur belajar tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roadmaps.map((rm, index) => {
                            const g = gradients[index % gradients.length];
                            const discountedPrice = Math.floor(rm.price * 1.35);

                            return (
                                <Link
                                    key={rm.id}
                                    href={`/roadmap/${rm.id}`}
                                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
                                >
                                    {/* Image Header */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={rm.image}
                                            alt={rm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />
                                        {/* Gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${g.from} ${g.to} opacity-75`}></div>

                                        {/* Level badge */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/30">
                                            {rm.level}
                                        </div>

                                        {/* Status */}
                                        {rm.status === "Active" && (
                                            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                Aktif
                                            </div>
                                        )}

                                        {/* Title on image */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <h2 className="text-white font-black text-xl leading-tight group-hover:underline underline-offset-2">
                                                {rm.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
                                            {rm.description}
                                        </p>

                                        {/* Stats row */}
                                        <div className="flex gap-4 mb-5">
                                            <div className={`flex-1 ${g.light} ${g.border} border rounded-xl p-3 text-center`}>
                                                <p className={`text-lg font-black ${g.text}`}>{rm.coursesCount}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Kursus</p>
                                            </div>
                                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                                                <p className="text-lg font-black text-gray-900">{rm.students}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Pelajar</p>
                                            </div>
                                        </div>

                                        {/* Prerequisites */}
                                        {rm.prerequisites && rm.prerequisites.length > 0 && (
                                            <div className="mb-5">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Prasyarat</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {rm.prerequisites.map(p => (
                                                        <span key={p} className={`text-[10px] font-bold px-2.5 py-1 ${g.light} ${g.text} ${g.border} border rounded-full`}>
                                                            {p}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <div className="mt-auto pt-5 border-t border-dashed border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span className="text-sm font-bold text-green-600">Gratis diikuti</span>
                                            </div>
                                            <div className={`px-5 py-2.5 bg-gradient-to-r ${g.from} ${g.to} text-white text-sm font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105`}>
                                                Lihat Jalur →
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}
