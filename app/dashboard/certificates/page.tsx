"use client";

import { useState, useEffect } from "react";
import type { Certificate } from "@/lib/db";

interface UserSession {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [user, setUser] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user session
        let userId = '';
        try {
            const session = localStorage.getItem("user_session");
            if (session) {
                const parsed = JSON.parse(session);
                setUser(parsed);
                userId = parsed.id;
            }
        } catch {}

        // Fetch certificates for this user
        async function loadCertificates() {
            try {
                const url = userId ? `/api/certificates?userId=${userId}` : '/api/certificates';
                const res = await fetch(url);
                const json = await res.json();
                if (json.success) setCertificates(json.data);
            } catch (err) {
                console.error("Failed to load certificates:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadCertificates();
    }, []);

    const handleDownload = (title: string) => {
        alert(`Mendownload sertifikat: ${title}... (Simulasi PDF)`);
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return dateStr; }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sertifikat Saya 🏆</h1>
                <p className="text-gray-500 text-sm">Bukti kelulusan resmi dari setiap materi yang telah Anda selesaikan.</p>
            </div>

            {/* --- LOADING STATE --- */}
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white border-2 border-gray-100 p-8 rounded-xl animate-pulse">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : certificates.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="relative group">
                            <div className="bg-white border-2 border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">

                                {/* Decorative Frame */}
                                <div className="absolute inset-2 border border-dashed border-gray-300 rounded-lg pointer-events-none"></div>

                                {/* Ribbon */}
                                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-6 rotate-45 shadow-sm z-10">
                                    LULUS
                                </div>

                                {/* Watermark */}
                                <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 pointer-events-none grayscale">
                                    🎖️
                                </div>

                                {/* Content */}
                                <div className="text-center space-y-4 relative z-0">
                                    <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center text-3xl mx-auto border-4 border-yellow-100 mb-2">
                                        🎓
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400 font-serif uppercase tracking-widest mb-1">Sertifikat Kompetensi</p>
                                        <h3 className="text-2xl font-bold text-gray-900 font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                            {cert.courseTitle}
                                        </h3>
                                    </div>

                                    <div className="text-sm text-gray-500 py-4 border-t border-b border-gray-100 my-4">
                                        <p>Diberikan kepada <span className="font-bold text-gray-800">{user?.name || 'Siswa'}</span></p>
                                        <p className="mt-1">Pada tanggal {formatDate(cert.issuedAt)}</p>
                                        <p className="mt-1">Nilai: <span className="font-bold text-indigo-600 text-lg">{cert.grade}</span></p>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-gray-400 px-4">
                                        <div className="text-left">
                                            <p>Instruktur</p>
                                            <p className="font-bold text-gray-600 text-lg">{cert.instructor}</p>
                                        </div>
                                        <div className="text-right">
                                            <p>ID Sertifikat</p>
                                            <p className="font-mono">{cert.id}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(cert.courseTitle)}
                                        className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-indigo-600 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-lg font-bold text-gray-700">Belum Ada Sertifikat</h3>
                    <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                        Selesaikan kursus dengan nilai minimal untuk mendapatkan sertifikat. Mulai belajar sekarang!
                    </p>
                </div>
            )}
        </div>
    );
}