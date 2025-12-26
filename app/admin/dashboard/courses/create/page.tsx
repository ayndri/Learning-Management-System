"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulasi Save ke Database
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        alert("Kursus berhasil dibuat!");
        router.push("/admin/dashboard/courses");
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition">
                    &larr; Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Buat Kursus Baru</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-8 space-y-6">
                    {/* Judul & Kategori */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus</label>
                            <input type="text" required placeholder="Contoh: Belajar Next.js dari Nol" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white">
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
                        <textarea rows={4} placeholder="Jelaskan apa yang akan dipelajari siswa..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"></textarea>
                    </div>

                    {/* Harga & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">Rp</span>
                                <input type="number" placeholder="0" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Isi 0 untuk kursus Gratis.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi (Jam)</label>
                            <input type="text" placeholder="Contoh: 4h 30m" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white">
                                <option value="Draft">Draft (Disembunyikan)</option>
                                <option value="Published">Published (Tampil)</option>
                            </select>
                        </div>
                    </div>

                    {/* Upload Thumbnail & Video Preview */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
                        <div className="text-4xl mb-2">🖼️</div>
                        <h3 className="text-sm font-medium text-gray-900">Upload Thumbnail Kursus</h3>
                        <p className="text-xs text-gray-500 mb-4">Format: JPG/PNG, Max 2MB.</p>
                        <button type="button" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                            Pilih File
                        </button>
                    </div>

                    {/* URL Video Intro */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link Video Intro (YouTube/Vimeo)</label>
                        <input type="url" placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end gap-3">
                    <Link href="/admin/dashboard/courses" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-white transition">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Kursus"}
                    </button>
                </div>

            </form>
        </div>
    );
}