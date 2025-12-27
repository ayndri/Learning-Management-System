"use client";

import Link from "next/link";
import { useState } from "react";

// --- DUMMY DATA WORKSHOP ---
const initialWorkshops = [
    {
        id: 1,
        title: "Bedah Kode: Membangun SaaS dengan Next.js 14",
        instructor: "Budi Santoso",
        date: "12 Jan 2026",
        time: "09:00 - 12:00 WIB",
        price: 99000,
        sold: 45,
        slots: 50,
        status: "Upcoming", // Upcoming, Live, Finished
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80"
    },
    {
        id: 2,
        title: "Workshop UI/UX: Redesign Aplikasi Gojek",
        instructor: "Sarah Putri",
        date: "13 Jan 2026",
        time: "13:00 - 16:00 WIB",
        price: 150000,
        sold: 10,
        slots: 30,
        status: "Upcoming",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&q=80"
    },
    {
        id: 3,
        title: "Dasar Laravel 10 untuk Pemula",
        instructor: "Budi Santoso",
        date: "10 Des 2025",
        time: "19:00 - 21:00 WIB",
        price: 50000,
        sold: 100,
        slots: 100,
        status: "Finished",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&q=80"
    }
];

export default function AdminWorkshopsPage() {
    const [workshops, setWorkshops] = useState(initialWorkshops);
    const [filter, setFilter] = useState("All");

    // Logic Filter Status
    const filteredWorkshops = filter === "All"
        ? workshops
        : workshops.filter(w => w.status === filter);

    const handleDelete = (id: number) => {
        if (confirm("Hapus workshop ini? Data penjualan terkait mungkin akan error.")) {
            setWorkshops(workshops.filter(w => w.id !== id));
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
                            {filteredWorkshops.map((ws) => (
                                <tr key={ws.id} className="hover:bg-gray-50 transition group">

                                    {/* Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 items-center">
                                            <img src={ws.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                            <div className="max-w-[200px]">
                                                <p className="font-bold text-gray-900 line-clamp-1">{ws.title}</p>
                                                <p className="text-xs text-gray-500">Oleh: {ws.instructor}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Jadwal */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="font-medium text-gray-900">{ws.date}</p>
                                        <p className="text-xs text-gray-500">{ws.time}</p>
                                    </td>

                                    {/* Penjualan (Progress Bar) */}
                                    <td className="px-6 py-4 w-48">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="font-bold text-gray-700">{ws.sold}/{ws.slots} Terjual</span>
                                            <span className="text-indigo-600 font-bold">Rp {ws.price.toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full ${ws.sold === ws.slots ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${(ws.sold / ws.slots) * 100}%` }}
                                            ></div>
                                        </div>
                                        {ws.sold === ws.slots && <p className="text-[10px] text-red-500 mt-1 font-bold">SOLD OUT</p>}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border ${ws.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            ws.status === 'Live' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {ws.status}
                                        </span>
                                    </td>

                                    {/* Aksi */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* LINK KE PESERTA */}
                                            <Link
                                                href={`/admin/dashboard/workshops/${ws.id}/participants`}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Lihat Peserta"
                                            >
                                                👥
                                            </Link>

                                            {/* LINK KE EDIT */}
                                            <Link
                                                href={`/admin/dashboard/workshops/${ws.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                ✏️
                                            </Link>

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

                    {filteredWorkshops.length === 0 && (
                        <div className="text-center py-12 text-gray-500">Belum ada workshop dengan status ini.</div>
                    )}
                </div>
            </div>
        </div>
    );
}