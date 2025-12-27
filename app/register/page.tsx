"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi Register
        setTimeout(() => {
            setIsLoading(false);
            // Setelah daftar, biasanya auto-login dan ke Dashboard
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900">

            {/* --- LEFT SIDE: FORM --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">

                    <div className="mb-8">
                        <Link href="/" className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-1 mb-8">
                            ⚡ Edu<span className="text-indigo-600">Flash</span>.
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Buat Akun Baru 🚀</h1>
                        <p className="text-gray-500">Mulai perjalanan belajarmu hari ini, gratis!</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 disabled:opacity-70 flex justify-center items-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : "Daftar Akun"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Sudah punya akun? <Link href="/login" className="font-bold text-indigo-600 hover:underline">Masuk di sini</Link>
                    </p>

                </div>
            </div>

            {/* --- RIGHT SIDE: IMAGE & QUOTE --- */}
            <div className="hidden lg:flex w-1/2 bg-indigo-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80" alt="Register Banner" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-900/80 to-purple-900/50"></div>

                <div className="relative z-10 p-12 text-white max-w-lg text-center">
                    <h2 className="text-4xl font-extrabold mb-6">Bergabung dengan 50,000+ Siswa Lainnya</h2>
                    <p className="text-indigo-200 text-lg leading-relaxed">
                        Akses materi berkualitas, mentor berpengalaman, dan komunitas yang suportif untuk menunjang karirmu.
                    </p>
                    <div className="mt-8 flex justify-center -space-x-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-indigo-900 bg-gray-200" />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}