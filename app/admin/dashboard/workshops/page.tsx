"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Workshop } from "@/lib/db";

export default function AdminWorkshopsPage() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchWorkshops = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/workshops');
            const json = await res.json();
            if (json.success) setWorkshops(json.data);
        } catch (err) {
            console.error("Failed to fetch workshops:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchWorkshops(); }, []);

    const filteredWorkshops = filter === "All"
        ? workshops
        : workshops.filter(w => w.status === filter);

    const handleDelete = async (id: string) => {
        if (confirm("Hapus workshop ini? Data penjualan terkait mungkin akan error.")) {
            try {
                const res = await fetch(`/api/workshops/${id}`, { method: 'DELETE' });
                const json = await res.json();
                if (json.success) {
                    setWorkshops(workshops.filter(w => w.id !== id));
                    showToast("Workshop berhasil dihapus!", 'success');
                }
            } catch {
                showToast("Gagal menghapus workshop.", 'error');
            }
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Workshop</h1>
                    <p className="text-gray-500 text-sm">Buat dan atur jadwal live event atau webinar.</p>
                </div>
                <Link
                    href="/admin/dashboard/workshops/create"
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>+</span> Buat Event Baru
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-1">
                {['All', 'Upcoming', 'Live', 'Finished'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all relative top-[1px] border-b-2 ${filter === status
                            ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Event Info</th>
                                <th className="px-6 py-4 font-semibold">Jadwal</th>
                                <th className="px-6 py-4 font-semibold">Penjualan</th>
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
                                            <p className="text-gray-400 text-sm font-medium">Memuat data workshop...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredWorkshops.map((ws) => (
                                <tr key={ws.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center">
                                            <img src={ws.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                            <div className="max-w-[200px]">
                                                <p className="font-bold text-gray-900 line-clamp-1">{ws.title}</p>
                                                <p className="text-xs text-gray-500">Oleh: {ws.instructor}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="font-medium text-gray-900">{ws.date}</p>
                                        <p className="text-xs text-gray-500">{ws.time}</p>
                                    </td>
                                    <td className="px-6 py-4 w-48">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="font-bold text-gray-700">{ws.sold}/{ws.slots} Terjual</span>
                                            <span className="text-indigo-600 font-bold">Rp {ws.price.toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full ${ws.sold === ws.slots ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${ws.slots > 0 ? (ws.sold / ws.slots) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        {ws.sold === ws.slots && <p className="text-[10px] text-red-500 mt-1 font-bold">SOLD OUT</p>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border ${ws.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            ws.status === 'Live' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {ws.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleDelete(ws.id)}
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

                    {!isLoading && filteredWorkshops.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-4xl mb-3">📹</p>
                            <p className="font-medium">Belum ada workshop{filter !== 'All' ? ` dengan status "${filter}"` : ''}.</p>
                            <p className="text-sm text-gray-400 mt-1">Klik "Buat Event Baru" untuk menambahkan.</p>
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