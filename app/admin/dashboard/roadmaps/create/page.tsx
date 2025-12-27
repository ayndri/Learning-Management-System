"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dummy List Kursus yang Tersedia (Untuk dipilih)
const availableCourses = [
    { id: 1, title: "HTML & CSS Dasar", price: 0 },
    { id: 2, title: "JavaScript Modern (ES6+)", price: 150000 },
    { id: 3, title: "React.js untuk Pemula", price: 200000 },
    { id: 4, title: "Next.js & Server Side Rendering", price: 250000 },
    { id: 5, title: "Node.js & Express API", price: 200000 },
    { id: 6, title: "PostgreSQL Database Design", price: 150000 },
];

export default function CreateRoadmapPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    // Toggle Checkbox
    const handleSelectCourse = (id: number) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(selectedCourses.filter(cId => cId !== id));
        } else {
            setSelectedCourses([...selectedCourses, id]);
        }
    };

    // Hitung total harga asli
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
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push("/admin/dashboard/roadmaps");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">

            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/roadmaps" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">←</Link>
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
                                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Frontend Master" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
                                <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jelaskan apa yang akan siswa capai..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option>Beginner to Hero</option>
                                        <option>Advanced Mastery</option>
                                        <option>Career Switch</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi Estimasi</label>
                                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: 3 - 4 Bulan" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selector Kursus */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Pilih Materi (Bundling)</h3>
                        <p className="text-sm text-gray-500 mb-4">Centang kursus yang ingin dimasukkan ke dalam paket ini.</p>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {availableCourses.map((course) => (
                                <label
                                    key={course.id}
                                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedCourses.includes(course.id)
                                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedCourses.includes(course.id)}
                                            onChange={() => handleSelectCourse(course.id)}
                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className={`font-medium ${selectedCourses.includes(course.id) ? 'text-indigo-900' : 'text-gray-700'}`}>
                                            {course.title}
                                        </span>
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
                            <div className="flex justify-between text-gray-500">
                                <span>Total Materi</span>
                                <span>{selectedCourses.length} Kursus</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Harga Asli</span>
                                <span className="line-through">Rp {originalTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">Harga Paket (Diskon)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-500 font-bold">Rp</span>
                                <input
                                    type="number"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-600 focus:ring-0 outline-none font-bold text-lg text-indigo-700"
                                    placeholder="0"
                                />
                            </div>
                            <p className="text-xs text-green-600 mt-2 font-medium">
                                *Disarankan lebih murah dari total harga asli.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
                            >
                                {isLoading ? "Menyimpan..." : "Terbitkan Roadmap"}
                            </button>
                            <button type="button" className="w-full py-3 mt-3 text-gray-500 font-bold text-sm hover:bg-gray-50 rounded-xl transition">
                                Simpan sebagai Draft
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}