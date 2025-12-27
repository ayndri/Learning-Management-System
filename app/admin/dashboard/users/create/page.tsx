"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // State Form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student", // Default role
        status: "Active",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi API Call
        console.log("Creating User:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        alert(`User ${formData.name} berhasil dibuat sebagai ${formData.role}!`);

        // Redirect kembali ke list user
        router.push("/admin/dashboard/users");
    };

    return (
        <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">

            {/* Header Navigation */}
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/users" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">
                    ←
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tambah Pengguna Baru</h1>
                    <p className="text-sm text-gray-500">Buat akun siswa, mentor, atau admin secara manual.</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Bagian 1: Identitas Utama */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                            1. Informasi Akun
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="Contoh: Budi Santoso"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="email@domain.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password Awal</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="Minimal 8 karakter"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon (Opsional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="0812..."
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bagian 2: Hak Akses */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                            2. Peran & Status
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role (Peran)</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                                >
                                    <option value="Student">Siswa (Student)</option>
                                    <option value="Instructor">Mentor (Instructor)</option>
                                    <option value="Admin">Administrator</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-2">
                                    *Mentor memiliki akses untuk membuat kursus. Admin memiliki akses penuh.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status Akun</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                                >
                                    <option value="Active">Aktif (Active)</option>
                                    <option value="Pending">Pending (Menunggu Verifikasi)</option>
                                    <option value="Banned">Banned (Diblokir)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
                        <Link
                            href="/admin/dashboard/users"
                            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan Pengguna"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}