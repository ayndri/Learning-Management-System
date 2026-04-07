"use client";

import { useState, useEffect } from "react";
import type { Course } from "@/lib/db";

interface CourseForm {
    title: string;
    instructor: string;
    price: number;
    rating: number;
    students: number;
    image: string;
    category: string;
    level: string;
    duration: string;
    status: string;
}

const emptyForm: CourseForm = {
    title: "", instructor: "", price: 0, rating: 0, students: 0,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    category: "Web Development", level: "Beginner", duration: "", status: "Published"
};

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCat, setFilterCat] = useState("All");
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [form, setForm] = useState<CourseForm>(emptyForm);
    const [isSaving, setIsSaving] = useState(false);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/courses');
            const json = await res.json();
            if (json.success) setCourses(json.data);
        } catch (err) {
            console.error("Failed to fetch courses:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    // Filter & Search
    const categories = ['All', ...new Set(courses.map(c => c.category))];
    const filteredCourses = courses.filter(c => {
        const matchCat = filterCat === "All" || c.category === filterCat;
        const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    // === CRUD ===

    const openCreateModal = () => {
        setEditingCourse(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setForm({
            title: course.title,
            instructor: course.instructor,
            price: course.price,
            rating: course.rating,
            students: course.students,
            image: course.image,
            category: course.category,
            level: course.level,
            duration: course.duration,
            status: course.status,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.instructor.trim()) {
            showToast("Judul dan instruktur wajib diisi!", 'error');
            return;
        }

        setIsSaving(true);
        try {
            if (editingCourse) {
                const res = await fetch(`/api/courses/${editingCourse.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const json = await res.json();
                if (json.success) {
                    setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...json.data } : c));
                    showToast("Kursus berhasil diperbarui!", 'success');
                    setShowModal(false);
                } else {
                    showToast(json.message || "Gagal memperbarui.", 'error');
                }
            } else {
                const res = await fetch('/api/courses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const json = await res.json();
                if (json.success) {
                    setCourses([...courses, json.data]);
                    showToast("Kursus baru berhasil ditambahkan!", 'success');
                    setShowModal(false);
                } else {
                    showToast(json.message || "Gagal menambah kursus.", 'error');
                }
            }
        } catch {
            showToast("Terjadi kesalahan jaringan.", 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus kursus ini secara permanen?")) {
            try {
                const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
                const json = await res.json();
                if (json.success) {
                    setCourses(courses.filter(c => c.id !== id));
                    showToast("Kursus berhasil dihapus!", 'success');
                }
            } catch {
                showToast("Gagal menghapus kursus.", 'error');
            }
        }
    };

    const toggleStatus = async (course: Course) => {
        const newStatus = course.status === 'Published' ? 'Draft' : 'Published';
        try {
            const res = await fetch(`/api/courses/${course.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const json = await res.json();
            if (json.success) {
                setCourses(courses.map(c => c.id === course.id ? { ...c, status: newStatus } : c));
                showToast(`Status diubah ke ${newStatus}`, 'success');
            }
        } catch {
            showToast("Gagal mengubah status.", 'error');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Kursus</h1>
                    <p className="text-gray-500 text-sm">Atur materi pembelajaran yang tersedia di platform.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                    <span>+</span> Tambah Kursus
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCat(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${filterCat === cat
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Cari judul atau instruktur..."
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
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Kursus</th>
                                <th className="px-6 py-4 font-semibold">Kategori</th>
                                <th className="px-6 py-4 font-semibold">Harga</th>
                                <th className="px-6 py-4 font-semibold">Siswa</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                                            <p className="text-gray-400 text-sm font-medium">Memuat data kursus...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCourses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <p className="text-4xl mb-2">📚</p>
                                        <p className="text-gray-500 font-medium">Tidak ada kursus ditemukan.</p>
                                    </td>
                                </tr>
                            ) : filteredCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={course.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 line-clamp-1">{course.title}</p>
                                                <p className="text-xs text-gray-500">{course.instructor} • {course.level} • {course.duration}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold border border-indigo-100">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {course.price === 0
                                            ? <span className="text-green-600 font-bold">Gratis</span>
                                            : <span>Rp {course.price.toLocaleString('id-ID')}</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-gray-900">{course.students.toLocaleString('id-ID')}</span>
                                            <span className="text-xs text-gray-400">siswa</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className="text-yellow-400 text-xs">★</span>
                                            <span className="text-xs font-medium text-gray-600">{course.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(course)}
                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition hover:shadow-sm ${course.status === 'Published'
                                                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                                                }`}
                                            title="Klik untuk toggle status"
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {course.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <button
                                                onClick={() => openEditModal(course)}
                                                className="p-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
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

                {!isLoading && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <p className="text-xs text-gray-500">Menampilkan {filteredCourses.length} dari {courses.length} kursus</p>
                        <p className="text-xs text-gray-400">Total Revenue: Rp {courses.reduce((s, c) => s + (c.price * c.students), 0).toLocaleString('id-ID')}</p>
                    </div>
                )}
            </div>

            {/* ========== MODAL CREATE/EDIT ========== */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isSaving && setShowModal(false)}></div>

                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto animate-fade-in-up">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingCourse ? "Edit Kursus" : "Tambah Kursus Baru"}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {editingCourse ? "Perbarui informasi kursus." : "Isi detail kursus yang akan dipublikasikan."}
                                </p>
                            </div>
                            <button onClick={() => !isSaving && setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">✕</button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Kursus <span className="text-red-500">*</span></label>
                                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Fullstack Laravel 10" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>

                            {/* Instructor & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Instruktur <span className="text-red-500">*</span></label>
                                    <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Nama instruktur" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="Web Development">Web Development</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Design">Design</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Business">Business</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price & Duration & Level */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="0 = Gratis" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Durasi</label>
                                    <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Contoh: 20 Jam" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level</label>
                                    <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            {/* Rating & Students & Status */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rating</label>
                                    <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah Siswa</label>
                                    <input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Gambar</label>
                                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                {form.image && (
                                    <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl sticky bottom-0">
                            <button onClick={() => !isSaving && setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition" disabled={isSaving}>Batal</button>
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
                                ) : editingCourse ? "Perbarui Kursus" : "Tambah Kursus"}
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