import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
            {/* Ilustrasi CSS Sederhana (Ghost) */}
            <div className="relative mb-8 animate-float">
                <div className="text-9xl">👻</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/10 rounded-full blur-md"></div>
            </div>

            <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Halaman Hilang!</h2>
            <p className="text-gray-500 max-w-md mb-8">
                Waduh, sepertinya halaman yang kamu cari sudah pindah dimensi atau memang tidak pernah ada.
            </p>

            <Link
                href="/"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 hover:shadow-lg transition transform hover:-translate-y-1"
            >
                Balik ke Rumah (Home)
            </Link>
        </div>
    );
}