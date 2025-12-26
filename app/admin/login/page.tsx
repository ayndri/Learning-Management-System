"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulasi Cek Database
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Hardcode Credential Admin
        if (email === "admin@eduflash.com" && password === "admin123") {
            localStorage.setItem("admin_session", "active"); // Simpan sesi admin
            router.push("/admin/dashboard"); // Arahkan ke dashboard KHUSUS admin
        } else {
            setError("Akses ditolak! Email atau password salah.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 animate-fade-in-up">

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-indigo-500/50">
                        🛡️
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                    <p className="text-gray-400 text-sm mt-2">Masuk untuk mengelola sistem LMS.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Administrator</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            placeholder="admin@eduflash.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            placeholder="admin123"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition shadow-lg shadow-indigo-900/50 disabled:opacity-50"
                    >
                        {isLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-gray-500 hover:text-white text-sm transition">
                        &larr; Kembali ke Website Utama
                    </Link>
                </div>

                <div className="mt-6 p-3 bg-gray-900 rounded border border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Email: <span className="text-indigo-400">admin@eduflash.com</span></p>
                    <p className="text-xs text-gray-500">Pass: <span className="text-indigo-400">admin123</span></p>
                </div>
            </div>
        </div>
    );
}