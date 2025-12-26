"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Simulasi Simpan Data
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMsg("");

        // Pura-pura loading ke server (1.5 detik)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setSuccessMsg("Perubahan berhasil disimpan!");

        // Hilangkan pesan sukses setelah 3 detik
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Pengaturan Akun ⚙️</h1>
                <p className="text-gray-500 text-sm">Kelola profil dan preferensi akun Anda di sini.</p>
            </div>

            {/* --- NOTIFIKASI SUKSES (Toast) --- */}
            {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-bounce-short">
                    ✅ {successMsg}
                </div>
            )}

            {/* --- FORM CONTAINER --- */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* 1. UPLOAD FOTO PROFIL */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-gray-100">
                        <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-indigo-50 flex items-center justify-center text-4xl overflow-hidden relative group cursor-pointer">
                            {/* Gambar Profil Dummy */}
                            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600"></div>

                            {/* Overlay Edit */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs font-medium">
                                Ubah Foto
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900">Foto Profil</h3>
                            <p className="text-sm text-gray-500 mb-3">Gunakan file JPG, GIF atau PNG. Maksimal 1MB.</p>
                            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                                Upload Foto Baru
                            </button>
                        </div>
                    </div>

                    {/* 2. DATA DIRI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                            <input
                                type="text"
                                defaultValue="Rizky Developer"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                defaultValue="siswa@gmail.com"
                                disabled
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400">Email tidak dapat diubah.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Pekerjaan</label>
                            <input
                                type="text"
                                defaultValue="Frontend Engineer"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Bio Singkat</label>
                            <input
                                type="text"
                                defaultValue="Belajar coding itu menyenangkan!"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                            />
                        </div>
                    </div>

                    {/* 3. GANTI PASSWORD */}
                    <div className="pt-8 border-t border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Ganti Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Password Baru</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BUTTON SAVE */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition shadow-lg disabled:bg-gray-400 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan Perubahan"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}