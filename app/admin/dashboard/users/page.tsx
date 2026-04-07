"use client";

import { useState, useEffect } from "react";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar: string | null;
    createdAt: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
}

const emptyForm: FormData = { name: "", email: "", password: "", role: "student", status: "Active" };

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterRole, setFilterRole] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [form, setForm] = useState<FormData>(emptyForm);
    const [isSaving, setIsSaving] = useState(false);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/users');
            const json = await res.json();
            if (json.success) setUsers(json.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    // Filter logic
    const filteredUsers = users.filter((user) => {
        const matchRole = filterRole === "All" || user.role === filterRole;
        const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchRole && matchSearch;
    });

    // === CRUD HANDLERS ===

    // CREATE
    const openCreateModal = () => {
        setEditingUser(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    // EDIT
    const openEditModal = (user: UserData) => {
        setEditingUser(user);
        setForm({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            status: user.status,
        });
        setShowModal(true);
    };

    // SAVE (Create or Update)
    const handleSave = async () => {
        if (!form.name.trim() || !form.email.trim()) {
            showToast("Nama dan email wajib diisi!", 'error');
            return;
        }
        if (!editingUser && !form.password.trim()) {
            showToast("Password wajib diisi untuk user baru!", 'error');
            return;
        }

        setIsSaving(true);
        try {
            if (editingUser) {
                // UPDATE
                const body: any = {
                    name: form.name,
                    email: form.email,
                    role: form.role,
                    status: form.status,
                };
                if (form.password.trim()) body.password = form.password;

                const res = await fetch(`/api/users/${editingUser.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                const json = await res.json();
                if (json.success) {
                    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...json.data } : u));
                    showToast("User berhasil diperbarui!", 'success');
                    setShowModal(false);
                } else {
                    showToast(json.message || "Gagal memperbarui user.", 'error');
                }
            } else {
                // CREATE
                const res = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const json = await res.json();
                if (json.success) {
                    setUsers([...users, json.data]);
                    showToast("User baru berhasil ditambahkan!", 'success');
                    setShowModal(false);
                } else {
                    showToast(json.message || "Gagal menambah user.", 'error');
                }
            }
        } catch {
            showToast("Terjadi kesalahan jaringan.", 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // TOGGLE STATUS
    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "Active" ? "Banned" : "Active";
        if (confirm(`Ubah status user ini menjadi ${newStatus}?`)) {
            try {
                const res = await fetch(`/api/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                });
                const json = await res.json();
                if (json.success) {
                    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
                    showToast(`Status berhasil diubah ke ${newStatus}`, 'success');
                }
            } catch {
                showToast("Gagal mengubah status.", 'error');
            }
        }
    };

    // DELETE
    const deleteUser = async (id: string) => {
        if (confirm("Yakin ingin menghapus user ini secara permanen?")) {
            try {
                const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
                const json = await res.json();
                if (json.success) {
                    setUsers(users.filter(u => u.id !== id));
                    showToast("User berhasil dihapus!", 'success');
                }
            } catch {
                showToast("Gagal menghapus user.", 'error');
            }
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch { return dateStr; }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
                    <p className="text-gray-500 text-sm">Kelola akses siswa, mentor, dan administrator.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>+</span> Tambah User
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    {['All', 'student', 'instructor', 'admin'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRole === role
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {role === 'instructor' ? 'Mentor' : role === 'student' ? 'Siswa' : role === 'admin' ? 'Admin' : 'All'}
                        </button>
                    ))}
                </div>

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

            {/* Table */}
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                                            <p className="text-gray-400 text-sm font-medium">Memuat data pengguna...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Tidak ada user ditemukan.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold border ${user.role === 'admin' ? 'bg-gray-900 text-white border-gray-900' :
                                            user.role === 'instructor' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {user.role === 'instructor' ? 'Mentor' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' :
                                                user.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></span>
                                            <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-green-700' :
                                                user.status === 'Pending' ? 'text-yellow-700' : 'text-red-700'
                                                }`}>
                                                {user.status === 'Pending' ? 'Menunggu' : user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1.5">
                                            {/* Edit */}
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="p-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
                                                title="Edit User"
                                            >
                                                ✏️
                                            </button>
                                            {/* Toggle Status */}
                                            <button
                                                onClick={() => toggleStatus(user.id, user.status)}
                                                className={`p-2 rounded-lg border transition ${user.status === 'Banned'
                                                    ? 'text-green-600 border-green-200 hover:bg-green-50'
                                                    : 'text-orange-600 border-orange-200 hover:bg-orange-50'
                                                    }`}
                                                title={user.status === 'Banned' ? "Aktifkan" : "Blokir"}
                                            >
                                                {user.status === 'Banned' ? '✅' : '🚫'}
                                            </button>
                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
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

                {/* Footer */}
                {!isLoading && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <p className="text-xs text-gray-500">Menampilkan {filteredUsers.length} dari {users.length} user</p>
                    </div>
                )}
            </div>

            {/* ========== MODAL CREATE/EDIT ========== */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isSaving && setShowModal(false)}></div>

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl mx-4 animate-fade-in-up">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {editingUser ? "Perbarui informasi user yang sudah ada." : "Isi form berikut untuk mendaftarkan user baru."}
                                </p>
                            </div>
                            <button
                                onClick={() => !isSaving && setShowModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="contoh@email.com"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Password {!editingUser && <span className="text-red-500">*</span>}
                                    {editingUser && <span className="text-gray-400 font-normal text-xs ml-1">(kosongkan jika tidak ingin mengubah)</span>}
                                </label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder={editingUser ? "••••••••" : "Min. 6 karakter"}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Role & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
                                    <select
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                    >
                                        <option value="student">Siswa</option>
                                        <option value="instructor">Mentor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Banned">Banned</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                            <button
                                onClick={() => !isSaving && setShowModal(false)}
                                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                                disabled={isSaving}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                        Menyimpan...
                                    </>
                                ) : (
                                    editingUser ? "Perbarui User" : "Tambah User"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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