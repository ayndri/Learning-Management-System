"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// --- DUMMY DATA LENGKAP ---
const allCourses = [
    {
        id: "1",
        title: "Fullstack Laravel 10: Membangun E-Commerce",
        instructor: "Budi Santoso",
        price: 250000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        category: "Web Development",
        level: "Intermediate",
        duration: "20 Jam"
    },
    {
        id: "2",
        title: "Mastering React.js & Next.js 13",
        instructor: "Sarah Putri",
        price: 150000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        category: "Frontend",
        level: "Advanced",
        duration: "15 Jam"
    },
    {
        id: "3",
        title: "UI/UX Design Masterclass: Figma to Code",
        instructor: "Rizky Dev",
        price: 200000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1653647054667-c99dc7f914ef?w=800&q=80",
        category: "Design",
        level: "Beginner",
        duration: "12 Jam"
    },
    {
        id: "4",
        title: "Python untuk Data Science Pemula",
        instructor: "Andi Data",
        price: 0,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
        category: "Data Science",
        level: "Beginner",
        duration: "8 Jam"
    },
    {
        id: "5",
        title: "Membangun API dengan Golang",
        instructor: "Budi Santoso",
        price: 300000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        category: "Backend",
        level: "Advanced",
        duration: "18 Jam"
    },
    {
        id: "6",
        title: "Digital Marketing Strategy 2025",
        instructor: "Citra Marketing",
        price: 100000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
        category: "Business",
        level: "Beginner",
        duration: "10 Jam"
    }
];

export default function CourseCatalogPage() {
    // State Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Opsi Filter
    const categories = ["All", "Web Development", "Frontend", "Backend", "Design", "Data Science", "Business"];
    const levels = ["All", "Beginner", "Intermediate", "Advanced"];

    // Logika Filter Realtime
    const filteredCourses = useMemo(() => {
        return allCourses.filter((course) => {
            const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = selectedCategory === "All" || course.category === selectedCategory;
            const matchLevel = selectedLevel === "All" || course.level === selectedLevel;
            return matchSearch && matchCategory && matchLevel;
        });
    }, [searchQuery, selectedCategory, selectedLevel]);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* --- NAVBAR SIMPLE (Untuk halaman dalam) --- */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">⚡</div>
                        <span className="font-extrabold text-xl tracking-tight text-gray-900">Edu<span className="text-indigo-600">Flash</span>.</span>
                    </Link>
                    <div className="flex gap-4 items-center justify-center">
                        <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition">Masuk</Link>
                        <Link href="/register" className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-lg shadow-gray-200 hover:shadow-indigo-200 transform hover:-translate-y-0.5">
                            Daftar Gratis
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* --- HEADER & SEARCH --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Eksplorasi Kelas 🚀</h1>
                        <p className="text-gray-500 text-lg">Temukan skill baru dari {filteredCourses.length} materi terbaik kami.</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 group">
                            <input
                                type="text"
                                placeholder="Cari judul materi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={
                                    {
                                        paddingLeft: '48px',
                                        paddingRight: '12px',
                                    }
                                }
                                className="w-full py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 group-hover:bg-white"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>

                        {/* Mobile Filter Toggle Button */}
                        <button
                            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                            className="md:hidden p-3 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* --- SIDEBAR FILTER (Desktop) --- */}
                    <aside className={`w-full md:w-64 flex-shrink-0 space-y-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>

                        {/* Filter Kategori */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                📂 Kategori
                            </h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                                            {selectedCategory === cat && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                        />
                                        <span className={`text-sm ${selectedCategory === cat ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Filter Level */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                📊 Tingkat Kesulitan
                            </h3>
                            <div className="space-y-2">
                                {levels.map(lvl => (
                                    <label key={lvl} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${selectedLevel === lvl ? 'border-indigo-600' : 'border-gray-300'}`}>
                                            {selectedLevel === lvl && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="level"
                                            className="hidden"
                                            checked={selectedLevel === lvl}
                                            onChange={() => setSelectedLevel(lvl)}
                                        />
                                        <span className={`text-sm ${selectedLevel === lvl ? 'text-indigo-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{lvl}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedLevel("All"); }}
                            className="w-full py-2 text-xs font-bold text-gray-500 hover:text-indigo-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        >
                            Reset Filter
                        </button>

                    </aside>

                    {/* --- COURSE GRID --- */}
                    <div className="flex-1 w-full">
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-900">Tidak ditemukan</h3>
                                <p className="text-gray-500 mt-2 mb-6">Coba ganti kata kunci atau reset filter Anda.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedLevel("All"); }}
                                    className="text-indigo-600 font-bold hover:underline"
                                >
                                    Hapus semua filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                                {filteredCourses.map((course) => (
                                    <div key={course.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col hover:-translate-y-1 overflow-hidden">

                                        {/* Image Area */}
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />

                                            {/* Badge Level */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-sm ${course.level === 'Beginner' ? 'bg-green-100/90 text-green-700' :
                                                    course.level === 'Intermediate' ? 'bg-yellow-100/90 text-yellow-700' :
                                                        'bg-red-100/90 text-red-700'
                                                    }`}>
                                                    {course.level}
                                                </span>
                                            </div>

                                            {/* Badge Price */}
                                            <div className="absolute bottom-3 right-3">
                                                <span className="px-2 py-2 bg-white/90 backdrop-blur rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                                                    {course.price === 0 ? "GRATIS" : `Rp ${course.price.toLocaleString('id-ID')}`}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{course.category}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                                                    <span>⏱ {course.duration}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-indigo-600 transition">
                                                {course.title}
                                            </h3>

                                            <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                        {course.instructor.charAt(0)}
                                                    </div>
                                                    <span className="text-xs text-gray-500 font-medium truncate max-w-[80px]">{course.instructor}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                                                    <span>★</span> {course.rating}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="mt-4 block w-full py-2.5 bg-gray-50 text-gray-600 font-bold text-center rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition group-hover:shadow-lg"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}