"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans py-20 px-4 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-4">
                    Investasi Masa Depan
                </h2>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Pilih Paket Belajarmu
                </h1>
                <p className="text-xl text-gray-500">
                    Akses ribuan materi koding premium dengan harga terjangkau.
                    Batalkan kapan saja.
                </p>

                {/* TOGGLE TAHUNAN/BULANAN */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`text-sm font-semibold ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Bulanan</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative w-16 h-8 rounded-full bg-indigo-600 p-1 transition-colors duration-300 focus:outline-none"
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
                    </button>
                    <span className={`text-sm font-semibold ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                        Tahunan <span className="text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded-full ml-1">-20%</span>
                    </span>
                </div>
            </div>

            {/* --- PRICING CARDS --- */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* CARD 1: BASIC */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Pemula</h3>
                    <p className="text-gray-500 text-sm mt-2">Untuk yang baru coba-coba.</p>
                    <div className="my-6">
                        <span className="text-4xl font-extrabold text-gray-900">Rp 0</span>
                    </div>
                    <Link href="/register" className="block w-full py-3 px-6 text-center rounded-xl border-2 border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-50 transition">
                        Daftar Gratis
                    </Link>
                    <ul className="mt-8 space-y-4 text-sm text-gray-600">
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Akses Kelas Gratis</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Forum Diskusi Umum</li>
                        <li className="flex items-center gap-3 text-gray-400"><span className="text-gray-300">✕</span> Sertifikat Resmi</li>
                        <li className="flex items-center gap-3 text-gray-400"><span className="text-gray-300">✕</span> Download Video</li>
                    </ul>
                </div>

                {/* CARD 2: PRO (POPULAR) */}
                <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4 border border-gray-800">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
                        PALING LARIS
                    </div>
                    <h3 className="text-lg font-semibold text-white">Pro Member</h3>
                    <p className="text-gray-400 text-sm mt-2">Untuk yang serius ingin berkarir.</p>
                    <div className="my-6 text-white">
                        <span className="text-5xl font-extrabold">
                            {isYearly ? "Rp 80rb" : "Rp 100rb"}
                        </span>
                        <span className="text-gray-400 text-sm font-normal">/bulan</span>
                    </div>
                    <button className="block w-full py-4 px-6 text-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition">
                        Mulai Berlangganan
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">Garansi uang kembali 7 hari</p>
                    <ul className="mt-8 space-y-4 text-sm text-gray-300">
                        <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> <strong>Semua Fitur Gratis</strong></li>
                        <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Sertifikat Kelulusan</li>
                        <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Source Code Project</li>
                        <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Konsultasi Mentor</li>
                    </ul>
                </div>

                {/* CARD 3: TEAM */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Tim & Sekolah</h3>
                    <p className="text-gray-500 text-sm mt-2">Untuk pelatihan massal.</p>
                    <div className="my-6">
                        <span className="text-4xl font-extrabold text-gray-900">Hubungi</span>
                    </div>
                    <button className="block w-full py-3 px-6 text-center rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition">
                        Kontak Sales
                    </button>
                    <ul className="mt-8 space-y-4 text-sm text-gray-600">
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> <strong>Semua Fitur Pro</strong></li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Dashboard Admin</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Laporan Progress Siswa</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Pembayaran Faktur</li>
                    </ul>
                </div>

            </div>

            <div className="text-center mt-16">
                <Link href="/" className="text-gray-500 hover:text-indigo-600 font-medium transition">
                    &larr; Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}