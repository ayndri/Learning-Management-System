"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // --- STATE UNTUK FILE & PREVIEW ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLER SAAT FILE DIPILIH ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("Mohon pilih file gambar (JPG/PNG/WEBP).");
                return;
            }
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    // --- CLEANUP MEMORY ---
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // --- HANDLER BUTTONS ---
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile && !previewUrl) {
            alert("Mohon upload thumbnail kursus.");
            return;
        }

        setIsLoading(true);
        // Simulasi Upload
        console.log("File siap upload:", selectedFile);
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        alert("Kursus berhasil dibuat!");
        router.push("/admin/dashboard/courses");
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition">
                    &larr; Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Buat Kursus Baru</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-8 space-y-6">

                    {/* 1. Judul (Full Width) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus *</label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: Belajar Next.js dari Nol sampai Mahir"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    {/* 2. Kategori & Level (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer">
                                <option value="" disabled selected>Pilih Kategori</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Apps">Mobile Apps</option>
                                <option value="Data Science">Data Science</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Cyber Security">Cyber Security</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tingkat Kesulitan *</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer">
                                <option value="Beginner">Pemula (Beginner)</option>
                                <option value="Intermediate">Menengah (Intermediate)</option>
                                <option value="Advanced">Mahir (Advanced)</option>
                                <option value="All Level">Semua Tingkat</option>
                            </select>
                        </div>
                    </div>

                    {/* 3. Deskripsi */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat *</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Jelaskan apa yang akan dipelajari siswa, prasyarat, dan hasil akhir dari kursus ini..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition resize-y"
                        ></textarea>
                    </div>

                    {/* 4. Harga, Durasi, Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp) *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                                <input type="number" required placeholder="0" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Isi 0 untuk kursus Gratis.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi (Jam) *</label>
                            <input type="text" required placeholder="Contoh: 4h 30m" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer">
                                <option value="Draft">Draft (Disembunyikan)</option>
                                <option value="Published">Published (Tampil)</option>
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* 5. Upload Thumbnail */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Kursus *</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {previewUrl ? (
                            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                <Image
                                    src={previewUrl}
                                    alt="Thumbnail Preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="px-4 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-lg text-sm font-medium transition"
                                    >
                                        Ganti Gambar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="px-4 py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={triggerFileInput}
                                className="p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center hover:bg-gray-100 transition cursor-pointer group"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                <h3 className="text-sm font-medium text-gray-900">Upload Thumbnail Kursus</h3>
                                <p className="text-xs text-gray-500 mb-4">Format: JPG/PNG/WEBP, Max 2MB.</p>
                                <button type="button" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition pointer-events-none">
                                    Pilih File
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 6. URL Video Intro */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link Video Intro (YouTube/Vimeo) *</label>
                        <input type="url" required placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
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
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </>
                        ) : "Simpan Kursus"}
                    </button>
                </div>

            </form>
        </div>
    );
}