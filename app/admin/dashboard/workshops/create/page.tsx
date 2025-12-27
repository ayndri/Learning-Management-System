"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorkshopPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulasi Save
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push("/admin/dashboard/workshops");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">

            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/workshops" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">←</Link>
                <h1 className="text-2xl font-bold text-gray-900">Buat Workshop Baru</h1>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 1. Detail Event */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Detail Event</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Workshop</label>
                                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Bedah Kode Next.js" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Instruktur</label>
                                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama Pemateri" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Instruktur</label>
                                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Senior Engineer" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jelaskan apa yang akan dipelajari..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 2. Jadwal & Akses */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Waktu & Akses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                                <input type="date" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai</label>
                                <input type="time" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai</label>
                                <input type="time" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link Meeting (Zoom/GMeet)</label>
                            <input type="url" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50/50 text-indigo-800" placeholder="https://zoom.us/j/..." />
                            <p className="text-xs text-gray-500 mt-1">Link ini hanya akan muncul di dashboard siswa yang sudah membeli.</p>
                        </div>
                    </div>

                    {/* 3. Tiket */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Tiket & Kuota</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Harga Tiket (Rp)</label>
                                <input type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kuota Peserta</label>
                                <input type="number" required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: 50" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
                        >
                            {isLoading ? "Menyimpan..." : "Terbitkan Workshop"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}