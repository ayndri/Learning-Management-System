"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorkshopPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        instructor: "",
        instructorRole: "",
        description: "",
        date: "",
        time: "",
        endTime: "",
        meetingLink: "",
        price: 0,
        slots: 50,
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        status: "Upcoming"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" || name === "slots" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formattedTime = `${formData.time} - ${formData.endTime} WIB`;
            const payload = {
                ...formData,
                time: formattedTime,
                instructor: `${formData.instructor} (${formData.instructorRole})`
            };

            const res = await fetch("/api/workshops", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/dashboard/workshops");
                router.refresh();
            } else {
                alert("Gagal membuat workshop. Silakan coba lagi.");
            }
        } catch (error) {
            console.error("Error creating workshop:", error);
            alert("Terjadi kesalahan koneksi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/workshops" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">←</Link>
                <h1 className="text-2xl font-bold text-gray-900">Buat Workshop Baru</h1>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Detail Event */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Detail Event</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Workshop</label>
                                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Bedah Kode Next.js" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Instruktur</label>
                                    <input name="instructor" type="text" required value={formData.instructor} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama Pemateri" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Instruktur</label>
                                    <input name="instructorRole" type="text" value={formData.instructorRole} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Senior Engineer" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option value="Web Development">Web Development</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input name="image" type="url" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jelaskan apa yang akan dipelajari..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 2. Jadwal & Akses */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Waktu & Akses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                                <input name="date" type="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Mulai</label>
                                <input name="time" type="time" required value={formData.time} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Selesai</label>
                                <input name="endTime" type="time" required value={formData.endTime} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link Meeting (Zoom/GMeet)</label>
                            <input name="meetingLink" type="url" value={formData.meetingLink} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50/50 text-indigo-800" placeholder="https://zoom.us/j/..." />
                            <p className="text-xs text-gray-500 mt-1">Link ini hanya akan muncul di dashboard siswa yang sudah membeli.</p>
                        </div>
                    </div>

                    {/* 3. Tiket */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Tiket & Kuota</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Harga Tiket (Rp)</label>
                                <input name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kuota Peserta</label>
                                <input name="slots" type="number" required value={formData.slots} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: 50" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2"
                        >
                            {isLoading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                            {isLoading ? "Menyimpan..." : "Terbitkan Workshop"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}