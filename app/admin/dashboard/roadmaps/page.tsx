"use client";

import Link from "next/link";
import { useState } from "react";

// --- DUMMY DATA ROADMAP ---
const initialRoadmaps = [
    {
        id: 1,
        title: "Fullstack Laravel Mastery",
        price: 750000,
        coursesCount: 5,
        students: 120,
        status: "Active", // Active, Draft
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&q=80"
    },
    {
        id: 2,
        title: "Modern Frontend dengan React & Next.js",
        price: 850000,
        coursesCount: 6,
        students: 85,
        status: "Active",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&q=80"
    },
    {
        id: 3,
        title: "Mobile App Developer (Flutter)",
        price: 600000,
        coursesCount: 4,
        students: 45,
        status: "Draft",
        image: "https://images.unsplash.com/photo-1556742102-fab0303bb7fd?w=100&q=80"
    }
];

export default function AdminRoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState(initialRoadmaps);

    const handleDelete = (id: number) => {
        if (confirm("Hapus roadmap ini? Kursus di dalamnya TIDAK akan terhapus.")) {
            setRoadmaps(roadmaps.filter(r => r.id !== id));
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
                            {roadmaps.map((map) => (
                                <tr key={map.id} className="hover:bg-gray-50 transition group">

                                    {/* Info */}
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

                                    {/* Isi Paket */}
                                    <td className="px-6 py-4">
                                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold border border-indigo-100">
                                            {map.coursesCount} Kursus
                                        </span>
                                    </td>

                                    {/* Harga */}
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">Rp {map.price.toLocaleString('id-ID')}</p>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border ${map.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                            'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {map.status}
                                        </span>
                                    </td>

                                    {/* Aksi */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/dashboard/roadmaps/${map.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                ✏️
                                            </Link>
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
                </div>
            </div>
        </div>
    );
}