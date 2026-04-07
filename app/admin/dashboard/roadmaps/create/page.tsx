"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Course } from "@/lib/db";

export default function CreateRoadmapPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "Beginner to Hero",
        prerequisites: "",
        price: 0,
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        status: "Draft"
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("/api/courses");
                const json = await res.json();
                if (json.success) setAvailableCourses(json.data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
    };

    const handleSelectCourse = (id: string) => {
        setSelectedCourses(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const originalTotal = selectedCourses.reduce((acc, id) => {
        const course = availableCourses.find(c => c.id === id);
        return acc + (course ? course.price : 0);
    }, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCourses.length < 2) {
            alert("Pilih minimal 2 kursus untuk membuat roadmap!");
            return;
        }
        setIsLoading(true);

        try {
            const payload = {
                ...formData,
                coursesCount: selectedCourses.length,
                courseIds: selectedCourses,
                prerequisites: formData.prerequisites.split(",").map(p => p.trim()).filter(p => p),
                students: 0
            };

            const res = await fetch("/api/roadmaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/dashboard/roadmaps");
                router.refresh();
            } else {
                alert("Gagal membuat roadmap.");
            }
        } catch (error) {
            console.error("Error creating roadmap:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/roadmaps" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">←</Link>
                <h1 className="text-2xl font-bold text-gray-900">Buat Paket Roadmap</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* KOLOM KIRI: Detail Roadmap */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Informasi Paket</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Roadmap</label>
                                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Frontend Master" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
                                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jelaskan apa yang akan siswa capai..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level Jalur</label>
                                    <select name="level" value={formData.level} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white outline-none">
                                        <option>Beginner to Hero</option>
                                        <option>Advanced Mastery</option>
                                        <option>Career Switch</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input name="image" type="url" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prasyarat (Pisahkan dengan koma)</label>
                                <input name="prerequisites" type="text" value={formData.prerequisites} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: HTML Dasar, CSS Layouting" />
                            </div>
                        </div>
                    </div>

                    {/* Selector Kursus */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Pilih Materi (Bundling)</h3>
                        <p className="text-sm text-gray-500 mb-4">Centang kursus yang ingin dimasukkan ke dalam paket ini.</p>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {availableCourses.map((course) => (
                                <label key={course.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedCourses.includes(course.id) ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={() => handleSelectCourse(course.id)} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                                        <span className={`font-medium ${selectedCourses.includes(course.id) ? 'text-indigo-900' : 'text-gray-700'}`}>{course.title}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-500">Rp {course.price.toLocaleString('id-ID')}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN: Pricing & Save */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-6">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4">Ringkasan Harga</h3>
                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-gray-500"><span>Total Materi</span><span>{selectedCourses.length} Kursus</span></div>
                            <div className="flex justify-between text-gray-500"><span>Harga Asli</span><span className="line-through">Rp {originalTotal.toLocaleString('id-ID')}</span></div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">Harga Paket (Diskon)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-500 font-bold">Rp</span>
                                <input name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-600 focus:ring-0 outline-none font-bold text-lg text-indigo-700" placeholder="0" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <button type="submit" disabled={isLoading} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70">
                                {isLoading ? "Menyimpan..." : "Terbitkan Roadmap"}
                            </button>
                            <button type="button" onClick={() => setFormData(p => ({ ...p, status: "Active" }))} className={`w-full py-2 mt-4 text-xs font-bold rounded-lg transition ${formData.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                Status: {formData.status} (Klik untuk Aktifkan)
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}