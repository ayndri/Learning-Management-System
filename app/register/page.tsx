"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react"; // Tambah Suspense

function RegisterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role");

    // Cek apakah mendaftar sebagai Mentor
    const isMentor = role === "instructor";

    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi Register
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);

        // Logika Redirect (Simulasi)
        if (isMentor) {
            alert("Pendaftaran Mentor Berhasil! Silakan lengkapi profil Anda.");
            // Arahkan ke Onboarding Mentor (Nanti kita buat)
            router.push("/mentor/onboarding");
        } else {
            // Arahkan ke Dashboard Siswa
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900">

            {/* --- LEFT SIDE: FORM --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="max-w-md w-full">

                    <div className="mb-10">
                        <Link href="/" className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-1 mb-8">
                            ⚡ Edu<span className="text-indigo-600">Flash</span>.
                        </Link>

                        {/* HEADLINE DINAMIS */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                            {isMentor ? "Gabung Jadi Mentor 🚀" : "Buat Akun Baru 🎓"}
                        </h1>
                        <p className="text-gray-500 text-lg">
                            {isMentor
                                ? "Mulai karir mengajar Anda dan raih penghasilan tambahan."
                                : "Mulai perjalanan belajarmu hari ini, gratis!"}
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Hidden Input untuk Role */}
                        <input type="hidden" name="role" value={isMentor ? "instructor" : "student"} />

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="nama@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-gray-400 mt-2">Minimal 8 karakter.</p>
                        </div>

                        {/* Checkbox Syarat (Penting untuk Mentor) */}
                        {isMentor && (
                            <div className="flex items-start gap-3">
                                <input type="checkbox" required id="terms" className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    Saya setuju dengan <a href="#" className="text-indigo-600 underline">Syarat & Ketentuan Pengajar</a> di EduFlash.
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 disabled:opacity-70 flex justify-center items-center transform active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Mendaftarkan...
                                </span>
                            ) : (
                                isMentor ? "Daftar Jadi Mentor" : "Daftar Akun"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Sudah punya akun? <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">Masuk di sini</Link>
                    </p>

                </div>
            </div>

            {/* --- RIGHT SIDE: IMAGE & QUOTE (DINAMIS) --- */}
            <div className={`hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden ${isMentor ? 'bg-gray-900' : 'bg-indigo-900'}`}>
                <div className="absolute inset-0 opacity-40">
                    {/* Ganti Gambar berdasarkan Role */}
                    <img
                        src={isMentor
                            ? "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=80" // Gambar Pengajar 
                            : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80" // Gambar Siswa
                        }
                        alt="Register Banner"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${isMentor ? 'from-gray-900 via-gray-900/80 to-black/50' : 'from-indigo-900 via-indigo-900/80 to-purple-900/50'}`}></div>

                <div className="relative z-10 p-16 text-white max-w-lg">
                    {isMentor ? (
                        <>
                            <h2 className="text-5xl font-extrabold mb-6 leading-tight">Menginspirasi Generasi Masa Depan</h2>
                            <p className="text-gray-300 text-xl leading-relaxed">
                                "Bergabunglah dengan komunitas pengajar kami dan ubah keahlian Anda menjadi dampak nyata (dan penghasilan)."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                                    <p className="font-bold text-2xl">70%</p>
                                    <p className="text-xs text-gray-400">Komisi Penjualan</p>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                                    <p className="font-bold text-2xl">Global</p>
                                    <p className="text-xs text-gray-400">Jangkauan Siswa</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-5xl font-extrabold mb-6 leading-tight">Investasi Terbaik Adalah Leher ke Atas</h2>
                            <p className="text-indigo-200 text-xl leading-relaxed">
                                "Ribuan materi berkualitas siap membantumu upgrade skill dan karir di era digital."
                            </p>
                            <div className="mt-8 flex justify-start -space-x-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-14 h-14 rounded-full border-4 border-indigo-900 bg-gray-200" />
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-indigo-300 font-medium">Bergabung dengan 50.000+ siswa lainnya</p>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

// Wajib wrap component yang pakai useSearchParams dengan Suspense di Next.js App Router
export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="p-10">Loading...</div>}>
            <RegisterContent />
        </Suspense>
    )
}