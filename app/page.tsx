"use client"; // Wajib ditambahkan karena ada interaksi tombol (State)

import Link from "next/link";
import { useState } from "react";
import { courses } from "../data/courses";

export default function Home() {
  // State untuk Toggle Harga (Bulanan/Tahunan)
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
              ⚡
            </div>
            <span className="font-bold text-2xl text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">
              Edu<span className="text-indigo-600">Flash</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-500">
            {['Beranda', 'Katalog', 'Bootcamp', 'Mentoring'].map((item) => (
              <Link key={item} href="#" className="hover:text-indigo-600 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-indigo-600 hidden md:block"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="hidden md:block px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Mulai Gratis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">

        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-50 animate-float"></div>
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl opacity-50 animate-float delay-300"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="animate-fade-in-up">
              <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wide border border-indigo-100 mb-8 shadow-sm">
                🎓 LEARNING MANAGEMENT SYSTEM 2.0
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
                Belajar Coding <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Tanpa Batas.
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                Platform edukasi interaktif dengan materi terupdate.
                Tingkatkan skill digitalmu dari nol hingga menjadi profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#courses"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Jelajahi Kelas
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-bold rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition">▶</span>
                  Tonton Demo
                </button>
              </div>
            </div>

            <div className="mt-20 mx-auto max-w-4xl relative animate-fade-in-up delay-200">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-900 rounded-xl p-2 shadow-2xl border border-gray-800">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-gray-800 rounded-md text-xs text-gray-400 font-mono flex-grow text-center">lms-kita.vercel.app</div>
                </div>
                <div className="p-8 font-mono text-sm text-gray-300 text-left overflow-hidden">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">masaDepan</span> = <span className="text-yellow-400">await</span> <span className="text-green-400">belajarCoding</span>();</p>
                  <p className="mt-2"><span className="text-purple-400">if</span> (skill &gt; 9000) {'{'}</p>
                  <p className="pl-4"><span className="text-blue-400">career</span>.<span className="text-yellow-400">rocket</span>();</p>
                  <p>{'}'}</p>
                  <div className="mt-8 grid grid-cols-3 gap-4 opacity-50">
                    <div className="h-20 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-20 bg-gray-800 rounded animate-pulse delay-100"></div>
                    <div className="h-20 bg-gray-800 rounded animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COURSES SECTION --- */}
        <section id="courses" className="py-32 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Kelas Unggulan 🔥</h2>
                <p className="text-gray-500 max-w-md">Materi disusun kurikulum industri global agar kamu siap kerja.</p>
              </div>
              <Link href="#" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 group">
                Lihat Semua Kelas
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-2"
                >
                  <div className={`h-56 w-full bg-gradient-to-br ${getGradient(index)} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition duration-700"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl border border-white/50">
                        ▶
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col relative">
                    <div className="absolute -top-5 right-8 bg-white p-1 rounded-xl shadow-lg">
                      <div className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg">
                        {course.duration}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-dashed border-gray-100 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 bg-gradient-to-br ${getAvatar(i)}`}></div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] text-gray-500 font-bold">+240</div>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-indigo-600 font-bold text-sm hover:underline"
                      >
                        Akses Materi &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PRICING SECTION (BARU) --- */}
        <section id="pricing" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Pricing Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
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

              {/* TOGGLE SWITCH */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>Bulanan</span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-16 h-8 rounded-full bg-gray-200 p-1 transition-colors duration-300 focus:outline-none hover:bg-gray-300"
                >
                  <div className={`w-6 h-6 bg-indigo-600 rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
                </button>
                <span className={`text-sm font-semibold transition-colors ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
                  Tahunan <span className="text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded-full ml-1 border border-indigo-100">-20%</span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

              {/* Card 1: Free */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-100 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900">Pemula</h3>
                <p className="text-gray-500 text-sm mt-2">Mulai langkah pertamamu.</p>
                <div className="my-8">
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">Rp 0</span>
                </div>
                <Link href="/register" className="block w-full py-4 px-6 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-indigo-600 hover:text-indigo-600 bg-transparent transition-all">
                  Daftar Gratis
                </Link>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✓</span> Akses Kelas Gratis</li>
                  <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✓</span> Forum Diskusi Umum</li>
                  <li className="flex items-center gap-3 text-gray-400 opacity-50"><span className="text-gray-300 bg-gray-100 rounded-full p-1 text-xs">✕</span> Sertifikat Resmi</li>
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
                  <span className="text-5xl font-extrabold tracking-tight">
                    {isYearly ? "80rb" : "100rb"}
                  </span>
                  <span className="text-gray-400 text-lg font-medium">/bln</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full py-4 px-6 text-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1"
                >
                  Mulai Berlangganan
                </Link>
                <p className="text-center text-xs text-gray-500 mt-4">7 hari garansi uang kembali</p>
                <ul className="mt-8 space-y-4 text-sm text-gray-300">
                  <li className="flex items-center gap-3"><span className="text-indigo-400 bg-indigo-500/20 rounded-full p-1 text-xs">✓</span> <strong>Semua Fitur Gratis</strong></li>
                  <li className="flex items-center gap-3"><span className="text-indigo-400 bg-indigo-500/20 rounded-full p-1 text-xs">✓</span> Sertifikat Kelulusan</li>
                  <li className="flex items-center gap-3"><span className="text-indigo-400 bg-indigo-500/20 rounded-full p-1 text-xs">✓</span> Source Code Project</li>
                  <li className="flex items-center gap-3"><span className="text-indigo-400 bg-indigo-500/20 rounded-full p-1 text-xs">✓</span> Konsultasi Mentor</li>
                </ul>
              </div>

              {/* Card 3: Team */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-100 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900">Sekolah & Tim</h3>
                <p className="text-gray-500 text-sm mt-2">Pelatihan skala besar.</p>
                <div className="my-8">
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">Hubungi</span>
                </div>
                <button className="block w-full py-4 px-6 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-gray-900 hover:text-gray-900 bg-transparent transition-all">
                  Kontak Sales
                </button>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✓</span> <strong>Semua Fitur Pro</strong></li>
                  <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✓</span> Dashboard Admin</li>
                  <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 rounded-full p-1 text-xs">✓</span> Laporan Progress</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t border-gray-100 py-12 text-center">
        <p className="text-gray-400 font-medium">Dibuat dengan ❤️ oleh LMS Keren</p>
      </footer>
    </div>
  );
}

// --- Helper Functions ---
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

function getAvatar(index: number) {
  const colors = ["from-red-100 to-red-200", "from-blue-100 to-blue-200", "from-green-100 to-green-200"];
  return colors[index % colors.length];
}