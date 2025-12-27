"use client";

import Link from "next/link";
import { useState } from "react";

export default function TeachPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Data Keuntungan
    const benefits = [
        {
            icon: "💰",
            title: "Penghasilan Tambahan",
            desc: "Dapatkan royalti hingga 70% dari setiap penjualan kursus Anda. Potensi pendapatan pasif tanpa batas."
        },
        {
            icon: "🌎",
            title: "Jangkauan Global",
            desc: "Bagikan ilmu Anda kepada ribuan siswa dari seluruh Indonesia tanpa batasan geografis."
        },
        {
            icon: "🤝",
            title: "Komunitas Eksklusif",
            desc: "Bergabung dengan jaringan instruktur profesional untuk berbagi tips dan peluang karir."
        },
        {
            icon: "🛠️",
            title: "Tools Canggih",
            desc: "Gunakan dashboard instruktur kami untuk mengelola materi, siswa, dan pembayaran dengan mudah."
        }
    ];

    // Data FAQ
    const faqs = [
        { q: "Apakah saya harus profesional untuk mengajar?", a: "Tidak harus sertifikasi formal, yang penting Anda memiliki keahlian nyata dan kemampuan menyampaikan materi dengan baik." },
        { q: "Berapa biaya untuk menjadi instruktur?", a: "Gratis! Kami tidak memungut biaya pendaftaran. Kami hanya menerapkan bagi hasil saat kursus Anda terjual." },
        { q: "Siapa yang memproduksi videonya?", a: "Anda memiliki kebebasan penuh untuk memproduksi konten Anda sendiri. Kami menyediakan panduan standar kualitasnya." },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* --- NAVBAR (Reused) --- */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">⚡</div>
                            <span className="font-extrabold text-2xl tracking-tight text-gray-900">Edu<span className="text-indigo-600">Flash</span>.</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/courses" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Katalog</Link>
                            <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition">Masuk</Link>
                            <Link href="/register?role=instructor" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                Daftar Pengajar
                            </Link>
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg></button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 shadow-xl">
                        <Link href="/courses" className="block text-gray-600 font-medium">Katalog</Link>
                        <Link href="/login" className="block text-gray-600 font-medium">Masuk</Link>
                        <Link href="/register?role=instructor" className="block text-indigo-600 font-bold">Daftar Pengajar</Link>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs mb-4 block animate-fade-in-up">Gabung sebagai Partner</span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 animate-fade-in-up delay-100">
                        Bagikan Ilmumu, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Raih Penghasilan.</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Jadilah mentor di EduFlash dan bantu jutaan siswa mencapai potensi terbaik mereka sambil membangun personal branding Anda.
                    </p>
                    <div className="flex justify-center gap-4 animate-fade-in-up delay-300">
                        <Link href="/register?role=instructor" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-xl hover:-translate-y-1">
                            Mulai Mengajar
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-gray-200 pt-12 animate-fade-in-up delay-500">
                        <div>
                            <p className="text-3xl font-black text-indigo-600">Rp 50jt+</p>
                            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Potensi Penghasilan/bln</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-indigo-600">50K+</p>
                            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Siswa Aktif</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-indigo-600">120+</p>
                            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Mentor Bergabung</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-indigo-600">24/7</p>
                            <p className="text-xs text-gray-500 uppercase font-bold mt-1">Support Tim</p>
                        </div>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">Kenapa Mengajar di Sini?</h2>
                        <p className="text-gray-500 mt-4">Kami menyediakan ekosistem terbaik untuk mendukung karir mengajar Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((item, idx) => (
                            <div key={idx} className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl hover:border-indigo-100 transition duration-300 group">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS (STEPS) --- */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Mulai Perjalanan Anda dalam 3 Langkah Mudah</h2>
                            <p className="text-gray-400 text-lg mb-8">Tidak perlu pengalaman teknis yang rumit. Kami bantu Anda setup dari awal.</p>
                            <Link href="/register?role=instructor" className="inline-block px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition">
                                Daftar Sekarang
                            </Link>
                        </div>

                        <div className="space-y-8">
                            {[
                                { step: "01", title: "Daftar & Verifikasi", desc: "Buat akun instruktur dan lengkapi profil profesional Anda." },
                                { step: "02", title: "Buat Kurikulum", desc: "Rancang materi kursus menggunakan Course Builder kami yang mudah." },
                                { step: "03", title: "Publikasi & Cuan", desc: "Terbitkan kursus Anda dan mulai dapatkan penghasilan dari setiap siswa." }
                            ].map((s, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="text-5xl font-black text-gray-700 opacity-50">{s.step}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                                        <p className="text-gray-400">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Pertanyaan Umum</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">Q: {faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER (Reused) --- */}
            <footer className="bg-white border-t border-gray-200 py-12 text-center">
                <p className="text-gray-500 font-medium">© 2024 EduFlash Platform. All rights reserved.</p>
            </footer>

        </div>
    );
}