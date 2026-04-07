"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Roadmap } from "@/lib/db";

export default function AdminRoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchRoadmaps = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/roadmaps');
            const json = await res.json();
            if (json.success) setRoadmaps(json.data);
        } catch (err) {
            console.error("Failed to fetch roadmaps:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchRoadmaps(); }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Hapus roadmap ini? Kursus di dalamnya TIDAK akan terhapus.")) {
            try {
                const res = await fetch(`/api/roadmaps/${id}`, { method: 'DELETE' });
                const json = await res.json();
                if (json.success) {
                    setRoadmaps(roadmaps.filter(r => r.id !== id));
                    showToast("Roadmap berhasil dihapus!", 'success');
                }
            } catch {
                showToast("Gagal menghapus roadmap.", 'error');
            }
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Roadmap</h1>
                    <p className="text-gray-500 text-sm">Buat paket bundling kursus untuk jalur belajar terstruktur.</p>
                </div>
                <Link
                    href="/admin/dashboard/roadmaps/create"
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>+</span> Buat Roadmap Baru
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Nama Roadmap</th>
                                <th className="px-6 py-4 font-semibold">Isi Paket</th>
                                <th className="px-6 py-4 font-semibold">Harga Bundle</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                                            <p className="text-gray-400 text-sm font-medium">Memuat data roadmap...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : roadmaps.map((map) => (
                                <tr key={map.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img src={map.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{map.title}</p>
                                                <p className="text-xs text-gray-500">{map.students} Siswa terdaftar</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold border border-indigo-100">
                                            {map.coursesCount} Kursus
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">Rp {map.price.toLocaleString('id-ID')}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border ${map.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                            'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {map.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleDelete(map.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Hapus"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!isLoading && roadmaps.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-4xl mb-3">🗺️</p>
                            <p className="font-medium">Belum ada roadmap tersedia.</p>
                            <p className="text-sm text-gray-400 mt-1">Klik "Buat Roadmap Baru" untuk menambahkan.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* TOAST */}
            {toast && (
                <div className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-xl font-medium text-sm z-50 flex items-center gap-3 animate-fade-in-up ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    <span>{toast.type === 'success' ? '✅' : '❌'}</span>
                    {toast.message}
                </div>
            )}
        </div>
    );
}