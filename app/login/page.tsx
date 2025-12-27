"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    // State Input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulasi Request Server
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Validasi Sederhana (Hardcode)
        if (email === "siswa@gmail.com" && password === "123456") {
            // Sukses Login
            localStorage.setItem("user_session", "active"); // Simpan session dummy
            router.push("/dashboard");
        } else {
            // Gagal Login
            setError("Email atau password salah! Coba: siswa@gmail.com / 123456");
            setIsLoading(false);
        }
    };

    const handleSocialLogin = () => {
        alert("Fitur login sosial belum tersedia di demo ini.");
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans text-gray-900">

            {/* --- BAGIAN KIRI (Artistik / Banner) --- */}
            <div className="hidden lg:flex w-1/2 bg-indigo-900 relative items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                        alt="Login Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/80 to-indigo-900/30"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 text-white p-12 max-w-lg">
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                        "Platform ini mengubah karir saya dari nol menjadi Senior Developer dalam 6 bulan."
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xl border-2 border-white/20">A</div>
                        <div>
                            <p className="font-bold text-lg">Andi Pratama</p>
                            <p className="text-sm text-indigo-200">Software Engineer di GoTech</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN (Form Login) --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
                <div className="w-full max-w-md">

                    {/* Header Form */}
                    <div className="mb-8">
                        <Link href="/" className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-1 mb-8 hover:opacity-80 transition">
                            ⚡ Edu<span className="text-indigo-600">Flash</span>.
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Selamat Datang Kembali! 👋</h1>
                        <p className="text-gray-500">Masukkan akun Anda untuk melanjutkan belajar.</p>
                    </div>

                    {/* Alert Error */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2 mb-6 animate-pulse">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="nama@email.com"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-gray-700">Password</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline">Lupa Password?</Link>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 transform active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Memproses...
                                </>
                            ) : "Masuk Sekarang"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Atau masuk dengan</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleSocialLogin}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={handleSocialLogin}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Info Demo */}
                    {/* <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                        <p className="text-xs text-indigo-800 font-medium uppercase tracking-wide mb-1">Akun Demo (Langsung Masuk)</p>
                        <p className="text-sm text-gray-600">Email: <span className="font-mono font-bold text-gray-900">siswa@gmail.com</span></p>
                        <p className="text-sm text-gray-600">Password: <span className="font-mono font-bold text-gray-900">123456</span></p>
                    </div> */}

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Belum punya akun? <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">Daftar Gratis</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}