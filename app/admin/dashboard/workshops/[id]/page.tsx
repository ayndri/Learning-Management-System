"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditWorkshopPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
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
        image: "",
        status: "Upcoming"
    });

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const res = await fetch("/api/workshops");
                const json = await res.json();
                if (json.success) {
                    const workshop = json.data.find((w: any) => w.id === id);
                    if (workshop) {
                        // Split instructor and role if possible
                        const instructorMatch = workshop.instructor.match(/(.*) \((.*)\)/);
                        const instructor = instructorMatch ? instructorMatch[1] : workshop.instructor;
                        const instructorRole = instructorMatch ? instructorMatch[2] : "";

                        // Split time and endTime
                        const timeMatch = workshop.time.match(/(.*) - (.*) WIB/);
                        const time = timeMatch ? timeMatch[1] : "";
                        const endTime = timeMatch ? timeMatch[2] : "";

                        setFormData({
                            ...workshop,
                            instructor,
                            instructorRole,
                            time,
                            endTime,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching workshop:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchWorkshop();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" || name === "slots" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const formattedTime = `${formData.time} - ${formData.endTime} WIB`;
            const payload = {
                ...formData,
                time: formattedTime,
                instructor: `${formData.instructor} (${formData.instructorRole})`
            };

            const res = await fetch(`/api/workshops/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/dashboard/workshops");
                router.refresh();
            } else {
                alert("Gagal memperbarui workshop.");
            }
        } catch (error) {
            console.error("Error updating workshop:", error);
            alert("Terjadi kesalahan koneksi.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-500 font-medium">Memuat data workshop...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/workshops" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">←</Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Workshop</h1>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Detail Event */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 border-b border-gray-100 pb-2">Detail Event</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Workshop</label>
                                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Instruktur</label>
                                    <input name="instructor" type="text" required value={formData.instructor} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Instruktur</label>
                                    <input name="instructorRole" type="text" value={formData.instructorRole} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Live">Live</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                <input name="image" type="url" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
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
                                <input name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kuota Peserta</label>
                                <input name="slots" type="number" required value={formData.slots} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2"
                        >
                            {isSaving && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
