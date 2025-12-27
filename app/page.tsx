"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false); // State untuk Pricing Toggle

  // Dummy Data Kursus (Digabungkan)
  const featuredCourses = [
    {
      id: "1",
      title: "Fullstack Laravel 10",
      instructor: "Budi Santoso",
      price: "Rp 250.000",
      rating: 4.8,
      students: 1205,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      category: "Web Development",
      duration: "20 Jam"
    },
    {
      id: "2",
      title: "Mastering React.js",
      instructor: "Sarah Putri",
      price: "Rp 150.000",
      rating: 4.9,
      students: 850,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      category: "Frontend",
      duration: "15 Jam"
    },
    {
      id: "3",
      title: "UI/UX Design Masterclass",
      instructor: "Rizky Dev",
      price: "Rp 200.000",
      rating: 4.7,
      students: 2300,
      image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80",
      category: "Design",
      duration: "12 Jam"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* --- NAVBAR (Glassmorphism) --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                ⚡
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                Edu<span className="text-indigo-600">Flash</span>
              </span>
            </div>

            {/* Desktop Menu */}
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Beranda', href: '/' },
                { name: 'Katalog', href: '/courses' },
                { name: 'Workshop', href: '/workshop' },       // Menu Baru
                { name: 'Jalur Belajar', href: '/roadmap' },   // Menu Baru
              ].map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition relative group">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-200"></div>

              <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition">Masuk</Link>
              <Link href="/register" className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-lg shadow-gray-200 hover:shadow-indigo-200 transform hover:-translate-y-0.5">
                Daftar Gratis
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 shadow-xl">
            <Link href="#courses" className="block text-gray-600 font-medium">Katalog Kelas</Link>
            <Link href="#pricing" className="block text-gray-600 font-medium">Harga</Link>
            <Link href="/login" className="block text-indigo-600 font-bold">Masuk Akun</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (Split Layout) --- */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl opacity-50 -z-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-50 -z-10 animate-float delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block border border-indigo-100 shadow-sm">
                🎓 Learning Management System 2.0
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Bangun Karir <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Tanpa Batas.</span>
              </h1>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Akses ratusan materi pemrograman, desain, dan bisnis dari mentor praktisi terbaik. Belajar coding dari nol hingga profesional.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/30 transform hover:-translate-y-1">
                  Mulai Belajar Sekarang
                </Link>
                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                  <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition">▶</span>
                  Tonton Demo
                </button>
              </div>

              {/* Mini Stats */}
              <div className="mt-12 flex justify-center lg:justify-start items-center gap-8 text-gray-400">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />)}
                </div>
                <p className="text-sm"><span className="font-bold text-gray-900">50K+</span> Siswa Bergabung</p>
              </div>
            </div>

            {/* Right: Code Editor Visual */}
            <div className="relative animate-fade-in-up delay-200 hidden lg:block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden transform rotate-2 hover:rotate-0 transition duration-500">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-800/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-black/30 rounded-md text-xs text-gray-400 font-mono flex-grow text-center">lms-kita.js</div>
                </div>
                <div className="p-8 font-mono text-sm text-gray-300 leading-loose">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">student</span> = <span className="text-yellow-300">{`{`}</span></p>
                  <p className="pl-4">name: <span className="text-green-400">"Kamu"</span>,</p>
                  <p className="pl-4">skill: <span className="text-green-400">"Meningkat Drastis 🚀"</span>,</p>
                  <p className="pl-4">status: <span className="text-green-400">"Siap Kerja"</span>,</p>
                  <p className="text-yellow-300">{`}`}</p>
                  <p className="mt-4"><span className="text-gray-500">// Mulai perjalananmu</span></p>
                  <p><span className="text-purple-400">await</span> <span className="text-blue-400">EduFlash</span>.<span className="text-yellow-300">startLearning</span>(student);</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- POPULAR COURSES SECTION (Gradient Cards) --- */}
      <section id="courses" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Kelas Unggulan 🔥</h2>
              <p className="text-gray-500 max-w-lg">Materi disusun dengan kurikulum standar industri global.</p>
            </div>
            <Link href="#" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 group">
              Lihat Semua Kelas <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 group flex flex-col hover:-translate-y-2">
                {/* Gradient Thumbnail Area */}
                <div className={`h-56 w-full bg-gradient-to-br ${getGradient(index)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
                  {/* Decorative Shapes */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition duration-700"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl border border-white/50 shadow-lg">▶</div>
                  </div>

                  {/* Badge Category */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-indigo-900 shadow-sm">
                    {course.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col relative">
                  {/* Duration Badge floating */}
                  <div className="absolute -top-5 right-6 bg-white p-1 rounded-xl shadow-lg border border-gray-100">
                    <div className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg">
                      {course.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Oleh {course.instructor}</p>

                  <div className="flex items-center gap-1 mb-6">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                    <span className="text-sm text-gray-400">({course.students} siswa)</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                    <span className="text-lg font-black text-gray-900">{course.price}</span>
                    {/* Mengarah ke Halaman Detail Kursus yang sudah dibuat */}
                    <Link href={`/courses/${course.id}`} className="text-indigo-600 font-bold text-sm hover:underline">
                      Lihat Detail &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (Interactive Toggle) --- */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Investasi Masa Depan</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Pilih Paket Belajarmu</h1>
            <p className="text-xl text-gray-500">Akses ribuan materi koding premium dengan harga terjangkau.</p>

            {/* TOGGLE SWITCH */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>Bulanan</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-16 h-8 rounded-full bg-gray-200 p-1 transition-colors duration-300 focus:outline-none hover:bg-gray-300"
              >
                <div className={`w-6 h-6 bg-indigo-600 rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
                Tahunan <span className="text-indigo-600 text-[10px] bg-indigo-50 px-2 py-0.5 rounded-full ml-1 border border-indigo-100 uppercase tracking-wide">Hemat 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Card 1: Free */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">Pemula</h3>
              <p className="text-gray-500 text-sm mt-2">Mulai langkah pertamamu.</p>
              <div className="my-8">
                <span className="text-5xl font-extrabold text-gray-900 tracking-tight">Rp 0</span>
              </div>
              <Link href="/register" className="block w-full py-4 px-6 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-indigo-600 hover:text-indigo-600 bg-transparent transition-all">
                Daftar Gratis
              </Link>
              <ul className="mt-8 space-y-4 text-sm text-gray-600">
                <PricingItem text="Akses Kelas Gratis" available />
                <PricingItem text="Forum Diskusi Umum" available />
                <PricingItem text="Sertifikat Resmi" available={false} />
                <PricingItem text="Source Code Project" available={false} />
              </ul>
            </div>

            {/* Card 2: Pro (Highlight) */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl relative transform md:-translate-y-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg uppercase">
                Paling Laris
              </div>
              <h3 className="text-xl font-bold text-white">Pro Member</h3>
              <p className="text-gray-400 text-sm mt-2">Untuk karir profesional.</p>
              <div className="my-8 text-white">
                <span className="text-5xl font-extrabold tracking-tight">{isYearly ? "80rb" : "100rb"}</span>
                <span className="text-gray-400 text-lg font-medium">/bln</span>
              </div>
              <Link href="/register" className="block w-full py-4 px-6 text-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1">
                Mulai Berlangganan
              </Link>
              <p className="text-center text-xs text-gray-500 mt-4">7 hari garansi uang kembali</p>
              <ul className="mt-8 space-y-4 text-sm text-gray-300">
                <PricingItem text="Akses Semua Kelas Premium" available dark />
                <PricingItem text="Sertifikat Kelulusan" available dark />
                <PricingItem text="Source Code Project" available dark />
                <PricingItem text="Konsultasi Mentor" available dark />
              </ul>
            </div>

            {/* Card 3: Team */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900">Tim</h3>
              <p className="text-gray-500 text-sm mt-2">Pelatihan skala besar.</p>
              <div className="my-8">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">Hubungi</span>
              </div>
              <button className="block w-full py-4 px-6 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-gray-900 hover:text-gray-900 bg-transparent transition-all">
                Kontak Sales
              </button>
              <ul className="mt-8 space-y-4 text-sm text-gray-600">
                <PricingItem text="Semua Fitur Pro" available />
                <PricingItem text="Dashboard Admin" available />
                <PricingItem text="Laporan Progress Tim" available />
                <PricingItem text="Faktur Pajak" available />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Kenapa EduFlash?</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-6">Belajar Lebih Efektif dengan Metode Teruji</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Kami tidak hanya memberikan video, tapi juga studi kasus nyata, kuis interaktif, dan sertifikat yang diakui industri.
              </p>

              <div className="space-y-6">
                <FeatureItem icon="🚀" title="Akses Seumur Hidup" desc="Bayar sekali, akses materi selamanya termasuk update." />
                <FeatureItem icon="🤝" title="Forum Diskusi" desc="Tanya jawab langsung dengan mentor dan sesama siswa." />
                <FeatureItem icon="🏆" title="Sertifikat Kompetensi" desc="Bukti keahlian untuk portofolio karirmu." />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 -z-10 transition duration-500 group-hover:rotate-6"></div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Learning" className="rounded-3xl shadow-2xl w-full object-cover h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER --- */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">EduFlash.</h2>
            <p className="text-gray-400 text-sm mt-1">© 2024 EduFlash Platform. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition font-medium">{social}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- HELPER COMPONENTS & FUNCTIONS ---

function getGradient(index: number) {
  const gradients = [
    "from-violet-500 to-fuchsia-600",
    "from-blue-500 to-cyan-400",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-rose-500",
    "from-indigo-500 to-blue-500",
  ];
  return gradients[index % gradients.length];
}

function PricingItem({ text, available, dark }: { text: string, available: boolean, dark?: boolean }) {
  return (
    <li className={`flex items-center gap-3 ${!available ? 'opacity-50' : ''}`}>
      <span className={`rounded-full p-1 text-xs ${available ? (dark ? 'text-indigo-400 bg-indigo-500/20' : 'text-green-500 bg-green-50') : 'text-gray-300 bg-gray-100'}`}>
        {available ? '✓' : '✕'}
      </span>
      {text}
    </li>
  )
}

function FeatureItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 text-indigo-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  )
}