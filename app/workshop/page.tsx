"use client";

import Link from "next/link";

const workshops = [
    {
        id: "ws-1",
        title: "Bedah Kode: Membangun SaaS dengan Next.js 14",
        instructor: "Budi Santoso",
        role: "Senior Frontend Engineer",
        date: "Sabtu, 12 Jan 2026",
        time: "09:00 - 12:00 WIB",
        price: 99000,
        slots: 50,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        tags: ["Live Zoom", "Rekaman", "Sertifikat"]
    },
    {
        id: "ws-2",
        title: "Workshop UI/UX: Redesign Aplikasi Gojek",
        instructor: "Sarah Putri",
        role: "Product Designer",
        date: "Minggu, 13 Jan 2026",
        time: "13:00 - 16:00 WIB",
        price: 150000,
        slots: 30,
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
        tags: ["Live Figma", "Portfolio Review"]
    }
];

export default function WorkshopPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            {/* NAVBAR */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                            ⚡
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                            Edu<span className="text-indigo-600">Flash</span>.
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/courses" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Belajar Gratis</Link>
                        <Link href="/workshop" className="text-sm font-bold text-indigo-600">Workshop</Link>
                        <Link href="/roadmap" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Jalur Belajar</Link>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition">Masuk</Link>
                        <Link href="/register" className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-md">Daftar</Link>
                    </div>
                </div>
            </nav>

            {/* HEADER HERO (Diperbaiki Tingginya) */}
            <div className="bg-indigo-900 text-white relative overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 py-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-indigo-200 text-xs font-bold tracking-wider mb-6 animate-fade-in-up">
                        UPCOMING EVENTS 📅
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight animate-fade-in-up delay-100">
                        Live Workshop & Event 🔥
                    </h1>
                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Belajar langsung dari mentor expert secara real-time. Tanya jawab sepuasnya, bedah kode, dan bangun networking profesional.
                    </p>
                </div>
            </div>

            {/* LIST WORKSHOP */}
            <div className="max-w-6xl mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="grid gap-8">
                    {workshops.map((ws) => (
                        <div key={ws.id} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center group">

                            {/* Image Date */}
                            <div className="w-full md:w-1/3 relative aspect-video rounded-2xl overflow-hidden shadow-md">
                                <img src={ws.image} alt={ws.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                                    Limited Slot!
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {ws.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-indigo-600 transition">{ws.title}</h2>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                        <span>📅</span> <span className="font-medium">{ws.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                        <span>⏰</span> <span className="font-medium">{ws.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg border-2 border-white shadow-sm">👨‍🏫</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{ws.instructor}</p>
                                        <p className="text-xs text-gray-500">{ws.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Tiket Masuk</p>
                                        <p className="text-2xl font-black text-gray-900">Rp {ws.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <Link
                                        href={`/checkout?type=workshop&id=${ws.id}`}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition shadow-lg shadow-gray-300 hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                                    >
                                        Ambil Slot →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}