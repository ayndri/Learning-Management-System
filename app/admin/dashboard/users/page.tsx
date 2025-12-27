"use client";

import Link from "next/link";
import { useState } from "react";

// --- DUMMY DATA USERS ---
const initialUsers = [
    {
        id: 1,
        name: "Rizky Developer",
        email: "rizky@example.com",
        role: "Student",
        status: "Active",
        joinedDate: "12 Des 2025",
        avatar: "R"
    },
    {
        id: 2,
        name: "Budi Santoso",
        email: "budi@eduflash.id",
        role: "Instructor",
        status: "Active",
        joinedDate: "10 Nov 2025",
        avatar: "B"
    },
    {
        id: 3,
        name: "Siti Aminah",
        email: "siti@example.com",
        role: "Student",
        status: "Banned", // User yang diblokir
        joinedDate: "05 Jan 2026",
        avatar: "S"
    },
    {
        id: 4,
        name: "Super Admin",
        email: "admin@eduflash.id",
        role: "Admin",
        status: "Active",
        joinedDate: "01 Sep 2025",
        avatar: "A"
    },
    {
        id: 5,
        name: "Sarah Putri",
        email: "sarah@design.com",
        role: "Instructor",
        status: "Pending", // Mentor baru daftar (butuh verifikasi)
        joinedDate: "27 Des 2025",
        avatar: "S"
    },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [filterRole, setFilterRole] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Logic Filter
    const filteredUsers = users.filter((user) => {
        const matchRole = filterRole === "All" || user.role === filterRole;
        const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchRole && matchSearch;
    });

    // Handler Aksi (Simulasi)
    const toggleStatus = (id: number, currentStatus: string) => {
        const newStatus = currentStatus === "Active" ? "Banned" : "Active";
        if (confirm(`Ubah status user ini menjadi ${newStatus}?`)) {
            setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
        }
    };

    const deleteUser = (id: number) => {
        if (confirm("Yakin ingin menghapus user ini secara permanen?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
                    <p className="text-gray-500 text-sm">Kelola akses siswa, mentor, dan administrator.</p>
                </div>
                <Link
                    href="/admin/dashboard/users/create"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>+</span> Tambah User Manual
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">

                {/* Filter Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    {['All', 'Student', 'Instructor', 'Admin'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRole === role
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {role === 'Instructor' ? 'Mentor' : role === 'Student' ? 'Siswa' : role}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            {/* Table Users */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User Info</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Bergabung</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Tidak ada user ditemukan.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition group">

                                    {/* User Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role Badge */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-md text-xs font-bold border ${user.role === 'Admin' ? 'bg-gray-900 text-white border-gray-900' :
                                            user.role === 'Instructor' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {user.role === 'Instructor' ? 'Mentor' : user.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' :
                                                user.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></span>
                                            <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-green-700' :
                                                user.status === 'Pending' ? 'text-yellow-700' : 'text-red-700'
                                                }`}>
                                                {user.status === 'Pending' ? 'Menunggu Verifikasi' : user.status}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 text-gray-500">
                                        {user.joinedDate}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                            {/* Tombol Ban/Unban */}
                                            <Link
                                                href={`/admin/dashboard/users/${user.id}/edit`}
                                                className="p-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                                                title="Edit User"
                                            >
                                                ✏️
                                            </Link>
                                            <button
                                                onClick={() => toggleStatus(user.id, user.status)}
                                                className={`p-2 rounded-lg border transition ${user.status === 'Banned'
                                                    ? 'text-green-600 border-green-200 hover:bg-green-50'
                                                    : 'text-orange-600 border-orange-200 hover:bg-orange-50'
                                                    }`}
                                                title={user.status === 'Banned' ? "Aktifkan Kembali" : "Blokir User"}
                                            >
                                                {user.status === 'Banned' ? '✅' : '🚫'}
                                            </button>

                                            {/* Tombol Hapus */}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                                                title="Hapus Permanen"
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

                {/* Pagination Simple */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <p className="text-xs text-gray-500">Menampilkan {filteredUsers.length} dari 120 user</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-xs text-gray-600" disabled>Sebelumnya</button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-xs text-gray-600">Selanjutnya</button>
                    </div>
                </div>
            </div>

        </div>
    );
}