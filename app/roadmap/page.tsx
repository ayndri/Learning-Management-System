"use client";

import Link from "next/link";

const roadmaps = [
    {
        id: "fullstack-laravel",
        title: "Fullstack Laravel Mastery",
        description: "Kuasai ekosistem PHP modern dari dasar hingga deploy aplikasi skala besar.",
        totalCourses: 5,
        duration: "4 Bulan",
        level: "Zero to Hero",
        color: "from-red-500 to-orange-500",
        skills: ["PHP 8", "Laravel 10", "MySQL", "Livewire", "Docker", "VPS"],
        price: 750000
    },
    {
        id: "frontend-react",
        title: "Modern Frontend dengan React & Next.js",
        description: "Jalur karir untuk menjadi Frontend Engineer handal standar startup unicorn.",
        totalCourses: 6,
        duration: "5 Bulan",
        level: "Beginner to Advanced",
        color: "from-blue-500 to-cyan-500",
        skills: ["HTML/CSS", "JavaScript", "React.js", "Next.js", "Tailwind", "Redux"],
        price: 850000
    },
    {
        id: "mobile-flutter",
        title: "Mobile App Developer (Flutter)",
        description: "Satu codebase untuk Android & iOS. Bangun aplikasi mobile yang performan.",
        totalCourses: 4,
        duration: "3 Bulan",
        level: "Intermediate",
        color: "from-blue-600 to-indigo-600",
        skills: ["Dart", "Flutter UI", "State Management", "API Integration", "Play Store"],
        price: 600000
    }
];

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* NAVBAR */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-gray-900">
                        ⚡ Edu<span className="text-indigo-600">Flash</span>.
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/courses" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">Katalog</Link>
                        <Link href="/workshop" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">Workshop</Link>
                        <Link href="/roadmap" className="text-sm font-bold text-indigo-600">Jalur Belajar</Link>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            <div className="py-20 text-center px-4">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pilih Jalur Karirmu 🚀</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Bingung mulai dari mana? Ikuti kurikulum terstruktur yang telah kami susun untuk mencapai tujuan karir spesifik.</p>
            </div>

            {/* ROADMAP GRID */}
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {roadmaps.map((map) => (
                        <div key={map.id} className="group bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">

                            {/* Header Gradient */}
                            <div className={`h-32 bg-gradient-to-r ${map.color} p-6 relative`}>
                                <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl">
                                    🎓
                                </div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {map.level}
                                </div>
                            </div>

                            <div className="p-6 pt-10 flex-1 flex flex-col">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{map.title}</h2>
                                <p className="text-gray-500 text-sm mb-6">{map.description}</p>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-400 font-bold uppercase">Durasi</p>
                                        <p className="font-bold text-gray-900">{map.duration}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-400 font-bold uppercase">Materi</p>
                                        <p className="font-bold text-gray-900">{map.totalCourses} Kursus</p>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-8">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Skill yang dipelajari:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {map.skills.map(skill => (
                                            <span key={skill} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400 line-through">Rp {(map.price * 1.5).toLocaleString('id-ID')}</p>
                                        <p className="text-xl font-black text-gray-900">Rp {map.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition shadow-lg">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}