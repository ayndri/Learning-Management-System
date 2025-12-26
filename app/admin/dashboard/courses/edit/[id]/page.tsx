"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id; // Ambil ID dari URL

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // State Form (Awalnya kosong)
    const [formData, setFormData] = useState({
        title: "",
        category: "Web Development",
        description: "",
        price: 0,
        duration: "",
        status: "Draft",
        videoUrl: ""
    });

    // Simulasi "Fetch Data" dari Database berdasarkan ID
    useEffect(() => {
        // Pura-pura ambil data ke server...
        setTimeout(() => {
            // Ini data dummy simulasi. Di real app, gunakan: fetch(`/api/courses/${courseId}`)
            const dummyData = {
                title: "HTML Dasar untuk Pemula",
                category: "Web Development",
                description: "Belajar dasar-dasar HTML 5 lengkap.",
                price: 0,
                duration: "2h 30m",
                status: "Published",
                videoUrl: "https://youtube.com/..."
            };

            setFormData(dummyData);
            setIsLoading(false);
        }, 1000);
    }, [courseId]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulasi Update ke Database
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        alert("Perubahan berhasil disimpan!");
        router.push("/admin/dashboard/courses");
    };

    if (isLoading) {
        return <div className="p-8 text-center">Mengambil data kursus...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition">
                    &larr; Batal Edit
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Kursus</h1>
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">ID: {courseId}</span>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-8 space-y-6">
                    {/* Judul & Kategori */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus</label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                            >
                                <option>Web Development</option>
                                <option>Mobile Apps</option>
                                <option>Data Science</option>
                                <option>UI/UX Design</option>
                            </select>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        ></textarea>
                    </div>

                    {/* Harga & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi</label>
                            <input
                                name="duration"
                                type="text"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* URL Video */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link Video Intro</label>
                        <input
                            name="videoUrl"
                            type="url"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end gap-3">
                    <Link href="/admin/dashboard/courses" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-white transition">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                        {isSaving ? "Menyimpan..." : "Update Perubahan"}
                    </button>
                </div>

            </form>
        </div>
    );
}