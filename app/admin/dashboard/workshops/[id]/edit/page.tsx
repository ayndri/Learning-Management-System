"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditWorkshopPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // State Form
    const [formData, setFormData] = useState({
        title: "",
        instructor: "",
        role: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        link: "",
        price: 0,
        slots: 0,
        status: "Upcoming"
    });

    // Simulasi Ambil Data (Fetch)
    useEffect(() => {
        setTimeout(() => {
            // Data dummy seolah-olah dari database
            setFormData({
                title: "Bedah Kode: Membangun SaaS dengan Next.js 14",
                instructor: "Budi Santoso",
                role: "Senior Frontend Engineer",
                description: "Belajar best practice arsitektur SaaS yang scalable.",
                date: "2026-01-12",
                startTime: "09:00",
                endTime: "12:00",
                link: "https://zoom.us/j/1234567890",
                price: 99000,
                slots: 50,
                status: "Upcoming"
            });
            setIsFetching(false);
        }, 1000);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulasi Update
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        alert("Workshop berhasil diperbarui!");
        router.push("/admin/dashboard/workshops");
    };

    if (isFetching) return <div className="p-8 text-gray-500">Memuat data workshop...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">

            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/workshops" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Workshop</h1>
                    <p className="text-sm text-gray-500">ID: <span className="font-mono text-indigo-600">#{id}</span></p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Status Event */}
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-4">
                        <span className="text-sm font-bold text-yellow-800">Status Saat Ini:</span>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="bg-white border border-yellow-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                        >
                            <option value="Upcoming">Upcoming (Akan Datang)</option>
                            <option value="Live">Live Now (Sedang Berlangsung)</option>
                            <option value="Finished">Finished (Selesai)</option>
                        </select>
                    </div>

                    {/* 1. Detail Event */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Detail Event</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Workshop</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Instruktur</label>
                                    <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Instruktur</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 2. Jadwal & Akses */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Waktu & Akses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai</label>
                                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai</label>
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link Meeting (Zoom/GMeet)</label>
                            <input type="url" name="link" value={formData.link} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50/30 text-indigo-800" />
                        </div>
                    </div>

                    {/* 3. Tiket */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Tiket & Kuota</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Harga Tiket (Rp)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kuota Peserta</label>
                                <input type="number" name="slots" value={formData.slots} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                        <Link href="/admin/dashboard/workshops" className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition">
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
                        >
                            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}