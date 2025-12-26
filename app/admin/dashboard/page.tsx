"use client";

import { useState } from "react";

export default function AdminDashboardHome() {
    const [users, setUsers] = useState([
        { id: 1, name: "Rizky Developer", email: "rizky@dev.com", role: "Student", status: "Active" },
        { id: 2, name: "Spammer Bot", email: "bot@spam.com", role: "Student", status: "Banned" },
        { id: 3, name: "Siti Aminah", email: "siti@gmail.com", role: "Student", status: "Active" },
        { id: 4, name: "Budi Santoso", email: "budi@gmail.com", role: "Instructor", status: "Active" },
    ]);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total User" value="1,240" color="bg-blue-500" />
                <StatCard label="Pendapatan" value="Rp 150Jt" color="bg-green-500" />
                <StatCard label="Kursus Aktif" value="45" color="bg-purple-500" />
                <StatCard label="Server Load" value="12%" color="bg-orange-500" />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 font-bold text-gray-800">
                    Aktivitas User Terbaru
                </div>
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.name}<br /><span className="text-xs text-gray-400 font-normal">{u.email}</span></td>
                                <td className="px-6 py-4">{u.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-indigo-600 hover:underline text-xs font-bold">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center text-xl`}>
                📈
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    )
}