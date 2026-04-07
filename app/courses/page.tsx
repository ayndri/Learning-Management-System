"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import type { Course } from "@/lib/db";
import Navbar from "@/components/Navbar";

export default function CourseCatalogPage() {
    // Data State
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        async function loadCourses() {
            try {
                const res = await fetch('/api/courses');
                const json = await res.json();
                if(json.success) {
                    setAllCourses(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadCourses();
    }, []);

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
    }, [allCourses, searchQuery, selectedCategory, selectedLevel]);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            <Navbar />

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
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col overflow-hidden h-[380px]">
                                        <div className="h-48 w-full bg-gray-200"></div>
                                        <div className="p-5 flex-1 flex flex-col gap-3">
                                            <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                                            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                                            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                                <div className="h-6 w-1/3 bg-gray-200 rounded-full"></div>
                                                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredCourses.length === 0 ? (
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
                                            {course.image && <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />}

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
                                                    {course.price === 0 ? "GRATIS" : `Rp ${typeof course.price === 'number' ? course.price.toLocaleString('id-ID') : course.price}`}
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