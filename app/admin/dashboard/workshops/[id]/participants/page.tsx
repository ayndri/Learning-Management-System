"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// --- DUMMY DATA PESERTA ---
const participants = [
    { id: "T-001", name: "Rizky Developer", email: "rizky@example.com", date: "26 Des 2025", status: "Paid" },
    { id: "T-002", name: "Siti Aminah", email: "siti@test.com", date: "26 Des 2025", status: "Paid" },
    { id: "T-003", name: "Budi Santoso", email: "budi@guru.com", date: "25 Des 2025", status: "Paid" },
    { id: "T-004", name: "Joko Anwar", email: "joko@film.com", date: "25 Des 2025", status: "Pending" },
];

export default function WorkshopParticipantsPage() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="space-y-6 animate-fade-in-up">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/workshops" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">←</Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Peserta Workshop</h1>
                        <p className="text-sm text-gray-500">Daftar siswa yang terdaftar di workshop ID: <span className="font-mono text-indigo-600">#{id}</span></p>
                    </div>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                    📥 Export CSV
                </button>
            </div>

            {/* Stats Mini */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold">Total Peserta</p>
                    <p className="text-2xl font-black text-gray-900">{participants.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold">Lunas (Paid)</p>
                    <p className="text-2xl font-black text-green-600">{participants.filter(p => p.status === 'Paid').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold">Pending</p>
                    <p className="text-2xl font-black text-yellow-600">{participants.filter(p => p.status === 'Pending').length}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID Tiket</th>
                                <th className="px-6 py-4 font-semibold">Nama Peserta</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Tanggal Daftar</th>
                                <th className="px-6 py-4 font-semibold">Status Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {participants.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-mono text-gray-500">{p.id}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{p.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{p.email}</td>
                                    <td className="px-6 py-4 text-gray-500">{p.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border ${p.status === 'Paid'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {p.status}
                                        </span>
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