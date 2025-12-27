"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulasi kirim pesan
        setIsSent(true);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* NAVBAR (Reused) */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-gray-900">
                        ⚡ Edu<span className="text-indigo-600">Flash</span>.
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-indigo-600">Masuk</Link>
                        <Link href="/register" className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-md">Daftar</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Hubungi Tim Support 💬</h1>
                    <p className="text-gray-500 text-lg">Punya pertanyaan tentang kursus, pembayaran, atau kemitraan? Kami siap membantu Anda Senin - Jumat (09.00 - 17.00).</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* LEFT: Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                            <h3 className="text-xl font-bold text-indigo-900 mb-6">Informasi Kontak</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">📧</div>
                                    <div>
                                        <p className="text-xs font-bold text-indigo-400 uppercase">Email</p>
                                        <a href="mailto:support@eduflash.id" className="text-gray-900 font-medium hover:text-indigo-600">support@eduflash.id</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">📱</div>
                                    <div>
                                        <p className="text-xs font-bold text-indigo-400 uppercase">WhatsApp</p>
                                        <a href="https://wa.me/62812345678" className="text-gray-900 font-medium hover:text-indigo-600">+62 812-3456-7890</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">🏢</div>
                                    <div>
                                        <p className="text-xs font-bold text-indigo-400 uppercase">Kantor</p>
                                        <p className="text-gray-900 font-medium">Jl. Teknologi No. 12, Jakarta Selatan<br />Indonesia 12190</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Mini */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Sering Ditanyakan</h3>
                            <div className="space-y-3">
                                <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer">
                                    <summary className="font-medium text-gray-700 list-none flex justify-between items-center">
                                        Cara refund dana?
                                        <span className="transition group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-500 mt-2">Refund dapat diajukan maksimal 7 hari setelah pembelian jika materi belum ditonton lebih dari 20%.</p>
                                </details>
                                <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer">
                                    <summary className="font-medium text-gray-700 list-none flex justify-between items-center">
                                        Apakah dapat sertifikat?
                                        <span className="transition group-open:rotate-180">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-500 mt-2">Ya, setiap kursus berbayar yang diselesaikan 100% akan mendapatkan sertifikat digital otomatis.</p>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
                        {isSent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">✅</div>
                                <h3 className="text-2xl font-bold text-gray-900">Pesan Terkirim!</h3>
                                <p className="text-gray-500 mt-2">Tim kami akan membalas pesan Anda dalam waktu maksimal 1x24 jam.</p>
                                <button onClick={() => setIsSent(false)} className="mt-8 text-indigo-600 font-bold underline">Kirim pesan lagi</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900">Kirim Pesan</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Budi" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="email@anda.com" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subjek</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option>Kendala Pembayaran</option>
                                        <option>Pertanyaan Materi</option>
                                        <option>Kerjasama / Partnership</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pesan</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Tulis detail masalah Anda..." required></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition shadow-lg">Kirim Pesan</button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}