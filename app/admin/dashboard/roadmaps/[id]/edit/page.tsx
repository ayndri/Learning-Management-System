"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Dummy List Kursus yang Tersedia (Sama seperti di Create)
const availableCourses = [
    { id: 1, title: "HTML & CSS Dasar", price: 0 },
    { id: 2, title: "JavaScript Modern (ES6+)", price: 150000 },
    { id: 3, title: "React.js untuk Pemula", price: 200000 },
    { id: 4, title: "Next.js & Server Side Rendering", price: 250000 },
    { id: 5, title: "Node.js & Express API", price: 200000 },
    { id: 6, title: "PostgreSQL Database Design", price: 150000 },
];

export default function EditRoadmapPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // State Data Roadmap
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "Beginner to Hero",
        duration: "",
        price: 0,
        status: "Active"
    });

    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    // Simulasi Fetch Data Roadmap (Pre-fill)
    useEffect(() => {
        setTimeout(() => {
            // Anggap ini data dari database berdasarkan ID
            setFormData({
                title: "Fullstack Laravel Mastery",
                description: "Kuasai ekosistem PHP modern dari dasar hingga deploy aplikasi skala besar.",
                level: "Advanced Mastery",
                duration: "4 Bulan",
                price: 750000,
                status: "Active"
            });
            // Ceritanya roadmap ini berisi kursus ID 2, 5, dan 6
            setSelectedCourses([2, 5, 6]);

            setIsFetching(false);
        }, 1000);
    }, [id]);

    // Handle Input Text
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle Checkbox Kursus
    const handleSelectCourse = (courseId: number) => {
        if (selectedCourses.includes(courseId)) {
            setSelectedCourses(selectedCourses.filter(cId => cId !== courseId));
        } else {
            setSelectedCourses([...selectedCourses, courseId]);
        }
    };

    // Hitung total harga asli (Satuan)
    const originalTotal = selectedCourses.reduce((acc, cId) => {
        const course = availableCourses.find(c => c.id === cId);
        return acc + (course ? course.price : 0);
    }, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCourses.length < 2) {
            alert("Pilih minimal 2 kursus untuk roadmap!");
            return;
        }
        setIsLoading(true);
        // Simulasi Update API
        console.log("Updating Roadmap:", { ...formData, courses: selectedCourses });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        alert("Roadmap berhasil diperbarui!");
        router.push("/admin/dashboard/roadmaps");
    };

    if (isFetching) return <div className="p-8 text-gray-500">Memuat data roadmap...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/roadmaps" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Roadmap</h1>
                    <p className="text-sm text-gray-500">ID: <span className="font-mono text-indigo-600">#{id}</span></p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* KOLOM KIRI: Detail & Kursus */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Status Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center gap-4">
                        <span className="font-bold text-gray-700">Status Publikasi:</span>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="Active">Active (Tayang)</option>
                            <option value="Draft">Draft (Disembunyikan)</option>
                            <option value="Archived">Archived (Diarsipkan)</option>
                        </select>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Informasi Paket</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Roadmap</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
                                <textarea
                                    rows={3}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                                    >
                                        <option>Beginner to Hero</option>
                                        <option>Advanced Mastery</option>
                                        <option>Career Switch</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi Estimasi</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selector Kursus */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Isi Bundle (Materi)</h3>
                        <p className="text-sm text-gray-500 mb-4">Centang kursus untuk menambah/menghapus dari paket.</p>

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
                                <span>Harga Asli (Total)</span>
                                <span className="line-through decoration-red-500">Rp {originalTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">Harga Bundle (Baru)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-500 font-bold">Rp</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-600 focus:ring-0 outline-none font-bold text-lg text-indigo-700"
                                />
                            </div>
                            {originalTotal > 0 && formData.price < originalTotal && (
                                <p className="text-xs text-green-600 mt-2 font-bold bg-green-50 px-2 py-1 rounded inline-block">
                                    Hemat {Math.round(((originalTotal - formData.price) / originalTotal) * 100)}%
                                </p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 gap-3 flex flex-col">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
                            >
                                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                            <Link
                                href="/admin/dashboard/roadmaps"
                                className="w-full py-3 text-center text-gray-500 font-bold text-sm hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-200"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}