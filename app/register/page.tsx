"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();

    // State Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // 1. Validasi Password Match
        if (password !== confirmPassword) {
            setError("Password dan Konfirmasi Password tidak sama!");
            setIsLoading(false);
            return;
        }

        // 2. Validasi Panjang Password
        if (password.length < 6) {
            setError("Password minimal 6 karakter.");
            setIsLoading(false);
            return;
        }

        // --- SIMULASI REGISTER ---
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Sukses
        setIsLoading(false);
        setSuccess(true);

        // Redirect ke Login setelah 2 detik
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* --- BAGIAN KIRI (Artistik - Nuansa Cyan/Teal) --- */}
            <div className="hidden lg:flex w-1/2 bg-teal-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-800 opacity-90 z-10"></div>
                {/* Dekorasi Blob */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

                <div className="relative z-20 text-white p-12 max-w-lg">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">Bergabung <br /> Sekarang! 🚀</h2>
                    <p className="text-teal-100 text-lg mb-8">
                        Dapatkan akses ke ribuan materi koding premium secara gratis. Investasi terbaik untuk masa depanmu dimulai di sini.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                            <span className="text-2xl">⚡</span>
                            <p className="font-medium">Update Materi Tiap Minggu</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                            <span className="text-2xl">🏆</span>
                            <p className="font-medium">Sertifikat Kompetensi Resmi</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN (Form Register) --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md">

                    {/* Header Mobile Only (Biar user tau ini halaman apa di HP) */}
                    <div className="lg:hidden mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
                        <p className="text-gray-500">Mulai belajar gratis hari ini.</p>
                    </div>

                    <div className="hidden lg:block mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Daftar Akun</h1>
                        <p className="text-gray-500 mt-2">Isi data diri Anda untuk membuat akun baru.</p>
                    </div>

                    {/* Notifikasi Error */}
                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 flex items-center gap-2 animate-pulse">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    {/* Notifikasi Sukses */}
                    {success ? (
                        <div className="text-center py-12 space-y-4 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                                🎉
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
                            <p className="text-gray-500">Akun Anda telah dibuat. Mengalihkan ke halaman login...</p>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-green-500 animate-[width_2s_ease-out_forwards]" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleRegister}>
                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Contoh: Rizky Developer"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                                />
                            </div>

                            {/* Password Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 6 karakter"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ulangi Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-2 pt-2">
                                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500" />
                                <label htmlFor="terms" className="text-sm text-gray-500">
                                    Saya menyetujui <a href="#" className="text-teal-600 hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-teal-600 hover:underline">Kebijakan Privasi</a>.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors shadow-lg shadow-teal-200 disabled:bg-teal-400"
                            >
                                {isLoading ? "Memproses..." : "Buat Akun Sekarang"}
                            </button>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Sudah punya akun?{' '}
                                <Link href="/login" className="font-bold text-teal-600 hover:text-teal-500 hover:underline">
                                    Masuk di sini
                                </Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}