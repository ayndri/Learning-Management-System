"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // --- STATE FILE & IMAGE ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Untuk file baru
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State Form
    const [formData, setFormData] = useState({
        title: "",
        category: "Web Development",
        level: "Beginner", // Field baru: Level
        description: "",
        price: 0,
        duration: "",
        status: "Draft",
        videoUrl: "",
        thumbnailUrl: "" // Menyimpan URL gambar lama dari database
    });

    // --- 1. FETCH DATA (SIMULASI) ---
    useEffect(() => {
        setTimeout(() => {
            // Data Dummy (Ceritanya dari database)
            const dummyData = {
                title: "HTML Dasar untuk Pemula",
                category: "Web Development",
                level: "Beginner", // Data level dummy
                description: "Belajar dasar-dasar HTML 5 lengkap dari nol sampai bisa membuat website sederhana.",
                price: 0,
                duration: "2h 30m",
                status: "Published",
                videoUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
                // Gambar dummy dari internet (Unsplash)
                thumbnailUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80"
            };

            setFormData(dummyData);
            setIsLoading(false);
        }, 1000);
    }, [courseId]);

    // --- 2. HANDLE FILE CHANGE ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("Mohon pilih file gambar.");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Buat preview lokal
        }
    };

    // Cleanup memory preview
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // --- 3. HANDLE BUTTON ACTIONS ---
    const triggerFileInput = () => fileInputRef.current?.click();

    const handleRemoveNewFile = () => {
        // Batalkan file baru, kembali ke gambar lama (jika ada)
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Logika: Jika ada selectedFile, upload file baru. Jika tidak, pakai formData.thumbnailUrl lama.
        console.log("Saving...", formData);
        if (selectedFile) console.log("Uploading new image:", selectedFile.name);

        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        alert("Perubahan berhasil disimpan!");
        router.push("/admin/dashboard/courses");
    };

    // --- LOGIKA TAMPILAN GAMBAR ---
    // Prioritas: Preview File Baru -> Gambar Lama dari DB -> Kosong
    const currentImageToDisplay = previewUrl || formData.thumbnailUrl;

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                <p className="text-gray-500">Mengambil data kursus...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition">
                    &larr; Batal Edit
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Kursus</h1>
                    <p className="text-xs text-gray-400 mt-1">ID: {courseId}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-8 space-y-6">

                    {/* 1. Judul (Full Width) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Kursus</label>
                        <input
                            name="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    {/* 2. Kategori & Level (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Apps">Mobile Apps</option>
                                <option value="Data Science">Data Science</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Cyber Security">Cyber Security</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tingkat Kesulitan</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer"
                            >
                                <option value="Beginner">Pemula (Beginner)</option>
                                <option value="Intermediate">Menengah (Intermediate)</option>
                                <option value="Advanced">Mahir (Advanced)</option>
                                <option value="All Level">Semua Tingkat</option>
                            </select>
                        </div>
                    </div>

                    {/* 3. Deskripsi */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
                        <textarea
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition resize-y"
                        ></textarea>
                    </div>

                    {/* 4. Harga, Durasi, Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi</label>
                            <input
                                name="duration"
                                type="text"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white cursor-pointer"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* 5. Area Upload Thumbnail */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Kursus</label>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {currentImageToDisplay ? (
                            // TAMPILAN JIKA ADA GAMBAR (Entah baru atau lama)
                            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                <Image
                                    src={currentImageToDisplay}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                    unoptimized={true}
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                    <p className="text-white text-sm font-medium">
                                        {previewUrl ? "Gambar Baru Dipilih" : "Gambar Saat Ini"}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={triggerFileInput}
                                            className="px-4 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-lg text-sm font-medium transition"
                                        >
                                            Ganti Gambar
                                        </button>

                                        {/* Tombol Reset hanya muncul jika user sudah memilih file baru */}
                                        {previewUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveNewFile}
                                                className="px-4 py-2 bg-yellow-500/90 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition"
                                            >
                                                Batal Ganti
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // JIKA TIDAK ADA GAMBAR SAMA SEKALI
                            <div
                                onClick={triggerFileInput}
                                className="p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center hover:bg-gray-100 transition cursor-pointer group"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                                <h3 className="text-sm font-medium text-gray-900">Upload Thumbnail</h3>
                                <p className="text-xs text-gray-500 mb-4">Belum ada gambar.</p>
                                <button type="button" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 pointer-events-none">
                                    Pilih File
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 6. URL Video Intro */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link Video Intro</label>
                        <input
                            name="videoUrl"
                            type="url"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
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
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Menyimpan...
                            </>
                        ) : "Update Perubahan"}
                    </button>
                </div>

            </form>
        </div>
    );
}