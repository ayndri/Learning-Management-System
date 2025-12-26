"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (email === "siswa@gmail.com" && password === "123456") {
            localStorage.setItem("user_session", "active");
            router.push("/dashboard");
        } else {
            setError("Email atau password salah! Coba: siswa@gmail.com / 123456");
            setIsLoading(false);
        }
    };

    const handleSocialLogin = () => {
        alert("Ini hanya demo statis.");
    };

    return (
        <div className="min-h-screen w-full flex bg-gray-50">
            {/* Bagian Kiri (Artistik) - Tetap sama */}
            <div className="hidden lg:flex w-1/2 bg-indigo-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-900 opacity-90 z-10"></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="relative z-20 text-white p-12 max-w-lg text-center">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">Welcome Back!</h2>
                    <p className="text-indigo-100 text-lg font-light">Lanjutkan perjalanan belajarmu menuju profesional.</p>
                </div>
            </div>

            {/* Bagian Kanan (Form Login) - DIPERBAIKI */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Login Akun</h1>
                        <p className="text-gray-500 mt-2 text-sm">Masuk untuk mengakses kelas Anda.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-3 animate-pulse">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="siswa@gmail.com"
                                    // PERBAIKAN: Placeholder lebih gelap, border lebih halus, focus ring lebih rapi
                                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-gray-700">Password</label>
                                    <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">Lupa password?</a>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {isLoading ? "Memuat..." : "Masuk Sekarang"}
                        </button>
                    </form>

                    {/* SOSMED & INFO DEMO (Sama seperti sebelumnya tapi styling sedikit dirapikan) */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-medium">Atau lanjutkan dengan</span>
                        </div>
                    </div>

                    {/* ... (Tombol Sosmed Code sama, hanya pastikan classnya konsisten) ... */}

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline">
                            Daftar Gratis
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}