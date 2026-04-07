"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Workshop } from "@/lib/db";
import Navbar from "@/components/Navbar";

export default function WorkshopPage() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function loadWorkshops() {
            try {
                const res = await fetch('/api/workshops');
                const json = await res.json();
                if (json.success) {
                    setWorkshops(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch workshops:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadWorkshops();
    }, []);

    const filtered = workshops.filter(ws =>
        ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            <Navbar />

            {/* HEADER HERO */}
            <div className="bg-indigo-900 text-white relative overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 py-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-indigo-200 text-xs font-bold tracking-wider mb-6">
                        UPCOMING EVENTS 📅
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        Live Workshop & Event 🔥
                    </h1>
                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                        Belajar langsung dari mentor expert secara real-time. Tanya jawab sepuasnya, bedah kode, dan bangun networking profesional.
                    </p>
                    {/* Search di hero */}
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Cari workshop atau mentor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-xl"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
            </div>

            {/* LIST WORKSHOP */}
            <div className="max-w-6xl mx-auto px-4 py-20 -mt-10 relative z-20">
                {isLoading ? (
                    <div className="grid gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-56 animate-pulse border border-gray-100 shadow-xl"></div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-xl">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900">Workshop tidak ditemukan</h3>
                        <p className="text-gray-500 mt-2 mb-6">Coba ganti kata kunci pencarian Anda.</p>
                        <button onClick={() => setSearchQuery("")} className="text-indigo-600 font-bold hover:underline">Hapus pencarian</button>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {filtered.map((ws) => (
                            <div key={ws.id} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center group">

                                {/* Image */}
                                <div className="w-full md:w-1/3 relative aspect-video rounded-2xl overflow-hidden shadow-md">
                                    <img src={ws.image} alt={ws.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                                        {ws.slots - ws.sold > 0 ? `Sisa ${ws.slots - ws.sold} Slot!` : 'Sold Out'}
                                    </div>
                                    <div className="absolute bottom-3 right-3">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${ws.status === 'Live' ? 'bg-green-500' : ws.status === 'Finished' ? 'bg-gray-500' : 'bg-indigo-600'}`}>
                                            {ws.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-wide">
                                            {ws.category}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200 uppercase tracking-wide">
                                            Live Zoom
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200 uppercase tracking-wide">
                                            Sertifikat
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-indigo-600 transition">{ws.title}</h2>

                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{ws.description}</p>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                            <span>📅</span> <span className="font-medium">{ws.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                            <span>⏰</span> <span className="font-medium">{ws.time}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg border-2 border-white shadow-sm font-bold text-indigo-600">
                                            {ws.instructor.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{ws.instructor}</p>
                                            <p className="text-xs text-gray-500">Mentor & Instruktur</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Tiket Masuk</p>
                                            <p className="text-2xl font-black text-gray-900">
                                                {ws.price === 0 ? 'Gratis' : `Rp ${ws.price.toLocaleString('id-ID')}`}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/checkout?type=workshop&id=${ws.id}`}
                                            className={`px-8 py-3 rounded-xl font-bold transition shadow-lg transform hover:-translate-y-0.5 ${ws.slots - ws.sold <= 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' : 'bg-gray-900 text-white hover:bg-indigo-600 shadow-gray-300 hover:shadow-indigo-200'}`}
                                        >
                                            {ws.slots - ws.sold <= 0 ? 'Sold Out' : 'Ambil Slot →'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
