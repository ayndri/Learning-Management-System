import Link from "next/link";
import { courses } from "../../data/courses"; // Menggunakan data dummy yang sudah ada

export default function DashboardPage() {
    // Simulasi data user
    const userStats = [
        { label: "Kursus Selesai", value: "3", icon: "🎓", color: "bg-green-100 text-green-600" },
        { label: "Jam Belajar", value: "12h", icon: "⏰", color: "bg-blue-100 text-blue-600" },
        { label: "Sertifikat", value: "1", icon: "🏆", color: "bg-yellow-100 text-yellow-600" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Halo, Rizky! 👋</h1>
                    <p className="text-gray-500 text-sm">Mari lanjutkan progres belajarmu hari ini.</p>
                </div>
                <Link
                    href="/dashboard/courses"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition shadow-lg shadow-gray-200 inline-block"
                >
                    + Cari Kelas Baru
                </Link>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CONTINUE LEARNING (HERO CARD) --- */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm mb-4 inline-block">
                            Sedang Dipelajari
                        </span>
                        <h2 className="text-2xl font-bold mb-2">Mastering CSS Flexbox</h2>
                        <p className="text-indigo-100 mb-6 text-sm max-w-lg">
                            Bab 3: Mengatur layout responsif dengan Flex-grow dan Flex-shrink.
                        </p>

                        {/* Progress Bar Custom */}
                        <div className="w-full max-w-sm mb-2">
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span>Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2">
                                <div className="bg-white h-2 rounded-full w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/courses/css-flexbox" // Hardcode link ke salah satu materi
                        className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg whitespace-nowrap"
                    >
                        Lanjutkan &rarr;
                    </Link>
                </div>
            </div>

            {/* --- MY COURSES LIST --- */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Kelas Saya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.slice(0, 2).map((course) => ( // Ambil 2 kursus saja sbg contoh
                        <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:border-indigo-100 transition group">
                            {/* Thumbnail Kecil */}
                            <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl group-hover:bg-indigo-50 transition">
                                💻
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition mb-1 line-clamp-1">
                                    {course.title}
                                </h4>
                                <p className="text-xs text-gray-500 mb-3">{course.duration} • 12 Modul</p>

                                {/* Progress Bar Mini */}
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                                    {/* Random width untuk simulasi */}
                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                                </div>

                                <Link href={`/courses/${course.id}`} className="text-xs font-bold text-indigo-600 hover:underline">
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}