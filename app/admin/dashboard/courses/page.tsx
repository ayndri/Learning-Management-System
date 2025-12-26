"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([
        { id: 1, title: "HTML Dasar untuk Pemula", instructor: "Rizky Dev", price: 0, status: "Published", students: 1205 },
        { id: 2, title: "Mastering React.js & Next.js", instructor: "Sarah Putri", price: 150000, status: "Draft", students: 0 },
        { id: 3, title: "Fullstack Laravel 10", instructor: "Budi Santoso", price: 250000, status: "Published", students: 850 },
        { id: 4, title: "UI/UX Design Masterclass", instructor: "Rizky Dev", price: 200000, status: "Archived", students: 430 },
    ]);

    // LOGIKA DELETE
    const handleDelete = (id: number) => {
        // 1. Konfirmasi user
        if (confirm("⚠️ Yakin ingin menghapus kursus ini secara permanen? Data siswa yang terdaftar mungkin akan hilang.")) {
            // 2. Filter array untuk membuang ID yang dipilih
            const updatedCourses = courses.filter((c) => c.id !== id);
            // 3. Update state
            setCourses(updatedCourses);
            // Optional: Kirim request delete ke API backend di sini
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Kursus 📚</h1>
                    <p className="text-gray-500 text-sm">Atur materi pembelajaran yang tersedia di platform.</p>
                </div>
                <Link
                    href="/admin/dashboard/courses/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-indigo-500/30"
                >
                    <span>+</span> Tambah Kursus
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Judul Kursus</th>
                                <th className="px-6 py-4">Harga</th>
                                <th className="px-6 py-4">Siswa</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-indigo-100 flex items-center justify-center text-xl">
                                                💻
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 line-clamp-1">{course.title}</p>
                                                <p className="text-xs text-gray-400">Oleh: {course.instructor}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {course.price === 0 ? <span className="text-green-600">Gratis</span> : `Rp ${course.price.toLocaleString('id-ID')}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.students} <span className="text-xs text-gray-400">Enrolled</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${course.status === 'Published' ? 'bg-green-50 text-green-600 border-green-100' :
                                            course.status === 'Draft' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                'bg-gray-100 text-gray-500 border-gray-200'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">

                                        {/* TOMBOL EDIT (Sekarang pakai Link) */}
                                        <Link
                                            href={`/admin/dashboard/courses/edit/${course.id}`}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium text-xs border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded transition"
                                        >
                                            Edit
                                        </Link>

                                        {/* TOMBOL DELETE (Panggil fungsi handleDelete) */}
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="text-red-500 hover:text-red-700 font-medium text-xs border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded transition"
                                        >
                                            Hapus
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {courses.length === 0 && (
                    <div className="p-10 text-center text-gray-400">
                        <p className="text-4xl mb-2">🗑️</p>
                        <p>Tidak ada kursus tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
}