import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center max-w-lg">
                {/* Ilustrasi CSS Murni (Simple Blob) */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                    <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-2xl text-9xl">
                        🤔
                    </div>
                    <div className="absolute top-0 right-0 bg-white p-4 rounded-2xl shadow-lg animate-bounce">
                        <span className="text-4xl font-black text-indigo-600">404</span>
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Ups! Halaman Hilang.</h1>
                <p className="text-gray-500 text-lg mb-8">
                    Sepertinya Anda tersesat di antah berantah. Halaman yang Anda cari mungkin sudah dihapus atau link-nya salah.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition shadow-lg hover:shadow-indigo-200"
                    >
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="/courses"
                        className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                    >
                        Cari Materi
                    </Link>
                </div>
            </div>
        </div>
    );
}