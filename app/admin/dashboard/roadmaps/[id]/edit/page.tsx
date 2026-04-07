"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Course, Roadmap } from "@/lib/db";

export default function EditRoadmapPage() {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "Beginner to Hero",
        prerequisites: "",
        price: 0,
        image: "",
        status: "Draft"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Courses
                const coursesRes = await fetch("/api/courses");
                const coursesJson = await coursesRes.json();
                if (coursesJson.success) setAvailableCourses(coursesJson.data);

                // Fetch Roadmap
                const roadmapRes = await fetch("/api/roadmaps");
                const roadmapJson = await roadmapRes.json();
                if (roadmapJson.success) {
                    const roadmap = roadmapJson.data.find((r: Roadmap) => r.id === id);
                    if (roadmap) {
                        setFormData({
                            title: roadmap.title,
                            description: roadmap.description,
                            level: roadmap.level,
                            prerequisites: (roadmap.prerequisites || []).join(", "),
                            price: roadmap.price,
                            image: roadmap.image,
                            status: roadmap.status
                        });
                        setSelectedCourses(roadmap.courseIds || []);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

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
        setIsSaving(true);

        try {
            const payload = {
                ...formData,
                coursesCount: selectedCourses.length,
                courseIds: selectedCourses,
                prerequisites: formData.prerequisites.split(",").map(p => p.trim()).filter(p => p),
            };

            const res = await fetch(`/api/roadmaps/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/dashboard/roadmaps");
                router.refresh();
            } else {
                alert("Gagal memperbarui roadmap.");
            }
        } catch (error) {
            console.error("Error updating roadmap:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-500 font-medium">Memuat data roadmap...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/roadmaps" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">←</Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Paket Roadmap</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Informasi Paket</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Roadmap</label>
                                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
                                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
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

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Pilih Materi (Update Bundling)</h3>
                        <p className="text-sm text-gray-500 mb-4">*Kosongkan jika tidak ingin mengubah jumlah kursus dalam paket.</p>
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

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-6">
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4">Pricing & Status</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-2">Harga Paket (Diskon)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-500 font-bold">Rp</span>
                                <input name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-indigo-100 focus:border-indigo-600 focus:ring-0 outline-none font-bold text-lg text-indigo-700" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <button type="submit" disabled={isSaving} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70">
                                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                            <div className="mt-4 flex items-center justify-between px-2">
                                <span className="text-sm font-medium text-gray-600">Status Aktif</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, status: p.status === "Active" ? "Draft" : "Active" }))}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.status === "Active" ? "bg-green-500" : "bg-gray-200"}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status === "Active" ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}