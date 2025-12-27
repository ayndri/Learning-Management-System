"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// --- DUMMY DATA ---
const allCourses = [
    {
        id: "1",
        title: "Fullstack Laravel 10: Membangun E-Commerce",
        instructor: "Budi Santoso",
        price: 250000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        category: "Web Development",
        level: "Intermediate"
    },
    {
        id: "2",
        title: "Mastering React.js & Next.js 13",
        instructor: "Sarah Putri",
        price: 150000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        category: "Frontend",
        level: "Advanced"
    },
    {
        id: "3",
        title: "UI/UX Design Masterclass: Figma to Code",
        instructor: "Rizky Dev",
        price: 200000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80",
        category: "Design",
        level: "Beginner"
    },
    {
        id: "4",
        title: "Python untuk Data Science Pemula",
        instructor: "Andi Data",
        price: 0,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
        category: "Data Science",
        level: "Beginner"
    },
    {
        id: "5",
        title: "Membangun API dengan Golang",
        instructor: "Budi Santoso",
        price: 300000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1627398242450-8df41780ee77?w=800&q=80",
        category: "Backend",
        level: "Advanced"
    },
];

export default function CourseCatalogPage() {
    // State Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // List Kategori Unik
    const categories = ["All", "Web Development", "Frontend", "Backend", "Design", "Data Science"];
    const levels = ["All", "Beginner", "Intermediate", "Advanced"];

    // Logika Filter
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

            {/* --- NAVBAR SEDERHANA --- */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-extrabold text-xl tracking-tight">Edu<span className="text-indigo-600">Flash</span>.</Link>
                    <div className="flex gap-4">
                        <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-indigo-600">Masuk</Link>
                        <Link href="/register" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Daftar</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* --- HEADER & SEARCH --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Eksplorasi Kelas</h1>
                        <p className="text-gray-500">Temukan {filteredCourses.length} materi pembelajaran terbaik.</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-2">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Cari judul materi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                            className="md:hidden p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* --- SIDEBAR FILTER (Desktop) --- */}
                    <aside className={`w-full md:w-64 flex-shrink-0 space-y-8 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>

                        {/* Filter Kategori */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCategory === cat ? 'border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                                            {selectedCategory === cat && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                        />
                                        <span className={`text-sm ${selectedCategory === cat ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filter Level */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Tingkat Kesulitan</h3>
                            <div className="space-y-2">
                                {levels.map(lvl => (
                                    <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedLevel === lvl ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                                            {selectedLevel === lvl && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="level"
                                            className="hidden"
                                            checked={selectedLevel === lvl}
                                            onChange={() => setSelectedLevel(lvl)}
                                        />
                                        <span className={`text-sm ${selectedLevel === lvl ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>{lvl}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* --- COURSE GRID --- */}
                    <div className="flex-1 w-full">
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium">Tidak ada kursus yang cocok dengan filter Anda.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedLevel("All"); }}
                                    className="mt-4 text-indigo-600 font-bold hover:underline"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <div key={course.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 overflow-hidden">

                                        {/* Image Area */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            <p className="text-xs font-bold text-indigo-600 mb-1">{course.category}</p>
                                            <h3 className="font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-indigo-600 transition">
                                                {course.title}
                                            </h3>

                                            <div className="flex items-center gap-1 mb-4">
                                                <span className="text-yellow-400 text-sm">★</span>
                                                <span className="text-xs font-bold text-gray-700">{course.rating}</span>
                                                <span className="text-xs text-gray-400 ml-2">by {course.instructor}</span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <span className="font-extrabold text-gray-900">
                                                    {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString('id-ID')}`}
                                                </span>
                                                <Link href={`/courses/${course.id}`} className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition">
                                                    Detail
                                                </Link>
                                            </div>
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