"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Workshop } from "@/lib/db";

export default function StudentWorkshopsPage() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function load() {
            try {
                const session = localStorage.getItem("user_session");
                if (!session) return;
                const u = JSON.parse(session);

                // Fetch enrollments + all workshops in parallel
                const [enrollRes, wsRes] = await Promise.all([
                    fetch(`/api/workshop-enrollments?userId=${u.id}`),
                    fetch("/api/workshops"),
                ]);
                const [enrollJson, wsJson] = await Promise.all([
                    enrollRes.json(),
                    wsRes.json(),
                ]);

                if (enrollJson.success && wsJson.success) {
                    const enrolledIds = new Set<string>(
                        enrollJson.data.map((e: { workshopId: string }) => e.workshopId)
                    );
                    setWorkshops(wsJson.data.filter((w: Workshop) => enrolledIds.has(w.id)));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const statusConfig = {
        Live: { label: "🔴 Live Sekarang", bg: "bg-red-500", text: "text-white" },
        Upcoming: { label: "🗓 Akan Datang", bg: "bg-indigo-600", text: "text-white" },
        Finished: { label: "✓ Selesai", bg: "bg-gray-400", text: "text-white" },
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 md:p-10 text-white shadow-2xl shadow-indigo-200">
                <div className="relative z-10">
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Dashboard</p>
                    <h1 className="text-2xl md:text-3xl font-black mb-2">Workshop Saya 📹</h1>
                    <p className="text-indigo-100 text-sm opacity-90 max-w-lg">
                        Workshop yang telah kamu beli. Pastikan hadir tepat waktu untuk mendapatkan pengalaman terbaik!
                    </p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 shadow-sm"></div>
                    ))}
                </div>
            ) : workshops.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                    <div className="text-6xl mb-4">🎫</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Belum ada workshop</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xs">Kamu belum membeli tiket workshop apapun. Yuk, cari workshop yang menarik!</p>
                    <Link
                        href="/workshop"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-sm"
                    >
                        Jelajahi Workshop →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {workshops.map(ws => {
                        const s = statusConfig[ws.status] ?? statusConfig.Upcoming;
                        return (
                            <div key={ws.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                <div className="relative aspect-video">
                                    <img src={ws.image} alt={ws.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${s.bg} ${s.text} ${ws.status === 'Live' ? 'animate-pulse' : ''}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg">
                                        <span className="text-[10px] font-black text-green-600">✓ Terdaftar</span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div>
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{ws.category}</span>
                                        <h3 className="font-black text-gray-900 mt-0.5 leading-tight group-hover:text-indigo-600 transition-colors">{ws.title}</h3>
                                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{ws.description}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-50 text-xs">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Tanggal</p>
                                            <p className="font-bold text-gray-700">{new Date(ws.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Waktu</p>
                                            <p className="font-bold text-gray-700">{ws.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                {ws.instructor.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{ws.instructor}</span>
                                        </div>
                                        {ws.status === 'Live' && (
                                            <span className="text-[10px] font-black text-red-500 bg-red-50 border border-red-200 px-2 py-1 rounded-lg animate-pulse">
                                                LIVE
                                            </span>
                                        )}
                                        {ws.status === 'Finished' && (
                                            <span className="text-[10px] font-bold text-gray-400">Sudah selesai</span>
                                        )}
                                    </div>

                                    {ws.status !== 'Finished' && (
                                        ws.meetingLink ? (
                                            <a
                                                href={ws.meetingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full py-3 font-bold rounded-xl text-sm text-center block transition ${
                                                    ws.status === 'Live'
                                                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200'
                                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                                                }`}
                                            >
                                                {ws.status === 'Live' ? '🔴 Gabung Sekarang' : '🔗 Buka Link Meeting'}
                                            </a>
                                        ) : (
                                            <div className="w-full py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-xl text-sm text-center">
                                                {ws.status === 'Live' ? '🔴 Sedang Berlangsung' : '🗓 Tiket Aktif'}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Browse more */}
            {workshops.length > 0 && (
                <div className="flex justify-center pb-4">
                    <Link href="/workshop" className="text-sm font-bold text-indigo-600 hover:underline">
                        Cari workshop lainnya →
                    </Link>
                </div>
            )}
        </div>
    );
}
