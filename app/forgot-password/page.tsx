"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi kirim email ke server
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans text-gray-900">

            {/* --- BAGIAN KIRI (Artistik - Nuansa Oranye) --- */}
            <div className="hidden lg:flex w-1/2 bg-orange-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-90 z-10"></div>
                {/* Dekorasi Blob */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-1000"></div>

                <div className="relative z-20 text-white p-12 max-w-lg text-center">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">Lupa Password? 🤔</h2>
                    <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                        Jangan khawatir, hal ini wajar terjadi. Kami akan membantu Anda mengembalikan akses akun Anda dalam hitungan menit.
                    </p>
                </div>
            </div>

            {/* --- BAGIAN KANAN (Form) --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md animate-fade-in-up">

                    {/* TAMPILAN JIKA SUKSES SUBMIT */}
                    {isSubmitted ? (
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto animate-bounce-short shadow-md">
                                📩
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">Cek Email Anda</h2>
                                <p className="text-gray-500 mt-3 leading-relaxed">
                                    Kami telah mengirimkan instruksi reset password ke <span className="font-bold text-gray-800">{email}</span>.
                                </p>
                                <p className="text-sm text-gray-400 mt-4">
                                    Belum menerima email? Cek folder Spam atau <button onClick={() => setIsSubmitted(false)} className="text-orange-600 font-bold hover:underline">kirim ulang</button>.
                                </p>
                            </div>

                            <Link
                                href="/login"
                                className="block w-full py-4 px-6 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-300 transform active:scale-[0.98]"
                            >
                                Kembali ke Login
                            </Link>
                        </div>
                    ) : (
                        /* TAMPILAN FORM */
                        <>
                            <div className="mb-10">
                                <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-orange-600 flex items-center gap-2 mb-8 transition group">
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Login
                                </Link>
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Reset Password</h1>
                                <p className="text-gray-500">Masukkan email yang terdaftar, kami akan mengirimkan link reset.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Terdaftar</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nama@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl text-white font-bold bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mengirim...
                                        </>
                                    ) : (
                                        "Kirim Link Reset"
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}