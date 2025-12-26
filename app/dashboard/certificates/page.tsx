"use client";

export default function CertificatesPage() {
    // Dummy data sertifikat
    const certificates = [
        {
            id: "cert-001",
            course: "Belajar HTML Dasar",
            date: "12 Januari 2025",
            instructor: "Budi Santoso",
            grade: "A",
        },
        {
            id: "cert-002",
            course: "Pengenalan UI/UX Design",
            date: "20 Desember 2024",
            instructor: "Siti Aminah",
            grade: "A+",
        },
    ];

    const handleDownload = (title: string) => {
        alert(`Mendownload sertifikat: ${title}... (Simulasi PDF)`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sertifikat Saya 🏆</h1>
                <p className="text-gray-500 text-sm">Bukti kelulusan resmi dari setiap materi yang telah Anda selesaikan.</p>
            </div>

            {/* --- CERTIFICATES GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {certificates.map((cert) => (
                    <div key={cert.id} className="relative group perspective-1000">
                        {/* Card Container */}
                        <div className="bg-white border-2 border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">

                            {/* Decorative Border (Frame Sertifikat) */}
                            <div className="absolute inset-2 border border-dashed border-gray-300 rounded-lg pointer-events-none"></div>

                            {/* Ribbon/Badge Pojok */}
                            <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-6 rotate-45 shadow-sm z-10">
                                LULUS
                            </div>

                            {/* Logo Watermark Background */}
                            <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 pointer-events-none grayscale">
                                🎖️
                            </div>

                            {/* Content */}
                            <div className="text-center space-y-4 relative z-0">
                                <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center text-3xl mx-auto border-4 border-yellow-100 mb-2">
                                    🎓
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 font-serif uppercase tracking-widest mb-1">Sertifikat Kompetensi</p>
                                    <h3 className="text-2xl font-bold text-gray-900 font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                        {cert.course}
                                    </h3>
                                </div>

                                <div className="text-sm text-gray-500 py-4 border-t border-b border-gray-100 my-4">
                                    <p>Diberikan kepada <span className="font-bold text-gray-800">Rizky Developer</span></p>
                                    <p className="mt-1">Pada tanggal {cert.date}</p>
                                </div>

                                <div className="flex justify-between items-center text-xs text-gray-400 px-4">
                                    <div className="text-left">
                                        <p>Instruktur</p>
                                        <p className="font-bold text-gray-600 font-signature text-lg">{cert.instructor}</p>
                                    </div>
                                    <div className="text-right">
                                        <p>ID Sertifikat</p>
                                        <p className="font-mono">{cert.id}</p>
                                    </div>
                                </div>

                                {/* Button Action */}
                                <button
                                    onClick={() => handleDownload(cert.course)}
                                    className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-indigo-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:-translate-y-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- LOCKED STATE (Contoh Sertifikat Belum Dapat) --- */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-xl flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition">
                    <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-2xl mb-4">
                        🔒
                    </div>
                    <h3 className="text-lg font-bold text-gray-600">JavaScript Lanjutan</h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-xs">
                        Selesaikan kursus ini dengan nilai minimal 80 untuk membuka sertifikat.
                    </p>
                    <div className="mt-4 w-full max-w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-gray-400"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Progress: 50%</p>
                </div>
            </div>
        </div>
    );
}