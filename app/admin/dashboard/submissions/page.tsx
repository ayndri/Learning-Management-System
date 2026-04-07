"use client";

import { useEffect, useState } from "react";

interface Submission {
    id: string;
    userId: string;
    courseId: string;
    link: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    submittedAt: string;
    reviewedAt?: string;
    reviewNote?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface Course {
    id: string;
    title: string;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [users, setUsers] = useState<Record<string, User>>({});
    const [courses, setCourses] = useState<Record<string, Course>>({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterStatus>("pending");
    const [selected, setSelected] = useState<Submission | null>(null);
    const [reviewNote, setReviewNote] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const [subRes, userRes, courseRes] = await Promise.all([
                    fetch("/api/submissions"),
                    fetch("/api/users"),
                    fetch("/api/courses"),
                ]);
                const [subJson, userJson, courseJson] = await Promise.all([
                    subRes.json(),
                    userRes.json(),
                    courseRes.json(),
                ]);

                if (subJson.success) setSubmissions(subJson.data);

                if (userJson.success) {
                    const map: Record<string, User> = {};
                    userJson.data.forEach((u: User) => (map[u.id] = u));
                    setUsers(map);
                }

                if (courseJson.success) {
                    const map: Record<string, Course> = {};
                    courseJson.data.forEach((c: Course) => (map[c.id] = c));
                    setCourses(map);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filtered = filter === "all" ? submissions : submissions.filter(s => s.status === filter);

    const counts = {
        all: submissions.length,
        pending: submissions.filter(s => s.status === "pending").length,
        approved: submissions.filter(s => s.status === "approved").length,
        rejected: submissions.filter(s => s.status === "rejected").length,
    };

    const handleReview = async (status: "approved" | "rejected") => {
        if (!selected) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/submissions/${selected.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, reviewNote }),
            });
            const json = await res.json();
            if (json.success) {
                setSubmissions(prev =>
                    prev.map(s => (s.id === selected.id ? json.data : s))
                );
                setSelected(null);
                setReviewNote("");
            }
        } finally {
            setProcessing(false);
        }
    };

    const statusBadge = (status: string) => {
        const map = {
            pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
            approved: "bg-green-100 text-green-700 border-green-200",
            rejected: "bg-red-100 text-red-700 border-red-200",
        };
        const labels = { pending: "Menunggu", approved: "Disetujui", rejected: "Ditolak" };
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${map[status as keyof typeof map]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900">Review Project Siswa</h1>
                <p className="text-gray-500 text-sm mt-1">Setujui atau tolak project akhir kursus yang dikumpulkan siswa.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`p-4 rounded-2xl border-2 text-left transition ${filter === s ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                    >
                        <p className={`text-2xl font-black ${filter === s ? "text-indigo-600" : "text-gray-900"}`}>{counts[s]}</p>
                        <p className="text-xs font-bold text-gray-500 mt-0.5 capitalize">
                            {s === "all" ? "Semua" : s === "pending" ? "Menunggu" : s === "approved" ? "Disetujui" : "Ditolak"}
                        </p>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-4xl mb-3">📭</div>
                        <p className="text-gray-500 font-bold">Tidak ada submission {filter !== "all" ? `dengan status "${filter}"` : ""}.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Siswa</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Kursus</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Link Project</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Tanggal</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map(sub => (
                                <tr key={sub.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{users[sub.userId]?.name ?? sub.userId}</p>
                                        <p className="text-gray-400 text-xs">{users[sub.userId]?.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-700 max-w-xs truncate">{courses[sub.courseId]?.title ?? sub.courseId}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={sub.link} target="_blank" rel="noreferrer"
                                            className="text-indigo-600 hover:underline font-medium max-w-[180px] block truncate text-xs">
                                            {sub.link}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                                        {new Date(sub.submittedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4">{statusBadge(sub.status)}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => { setSelected(sub); setReviewNote(sub.reviewNote ?? ""); }}
                                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Review Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-black text-gray-900">Review Project</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">{users[selected.userId]?.name ?? selected.userId}</p>
                                </div>
                                {statusBadge(selected.status)}
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Kursus</p>
                                <p className="text-sm font-bold text-gray-800">{courses[selected.courseId]?.title ?? selected.courseId}</p>
                            </div>

                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Link Project</p>
                                <a href={selected.link} target="_blank" rel="noreferrer"
                                    className="text-indigo-600 hover:underline text-sm font-medium break-all">
                                    {selected.link}
                                </a>
                            </div>

                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Deskripsi</p>
                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-3">{selected.description}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">
                                    Catatan Review (opsional)
                                </label>
                                <textarea
                                    value={reviewNote}
                                    onChange={e => setReviewNote(e.target.value)}
                                    placeholder="Berikan feedback untuk siswa..."
                                    rows={3}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                onClick={() => handleReview("approved")}
                                disabled={processing}
                                className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black rounded-xl transition text-sm flex items-center justify-center gap-2"
                            >
                                {processing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "✓"} Setujui
                            </button>
                            <button
                                onClick={() => handleReview("rejected")}
                                disabled={processing}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl transition text-sm flex items-center justify-center gap-2"
                            >
                                {processing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "✕"} Tolak
                            </button>
                            <button
                                onClick={() => { setSelected(null); setReviewNote(""); }}
                                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition text-sm"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
