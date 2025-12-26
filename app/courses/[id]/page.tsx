import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../../data/courses";

// Perbaikan untuk Next.js 15: params harus didefinisikan sebagai Promise
type Props = {
    params: Promise<{ id: string }>;
};

// Fungsi ini tetap sama untuk generate static pages
export async function generateStaticParams() {
    return courses.map((course) => ({
        id: course.id,
    }));
}

export default async function CourseDetail({ params }: Props) {
    // PENTING: Di Next.js 15, kita wajib 'await' params sebelum dipakai
    const { id } = await params;

    // Cari data kursus berdasarkan ID
    const course = courses.find((c) => c.id === id);

    if (!course) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
            <div className="w-full max-w-4xl">
                {/* Tombol Kembali */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-6 transition-colors group"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                    Kembali ke Daftar Kursus
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Video Player Section */}
                    <div className="aspect-video w-full bg-black relative">
                        <iframe
                            width="100%"
                            height="100%"
                            src={course.videoUrl}
                            title={course.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wide">
                                Video Lesson
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                ⏱ {course.duration}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {course.title}
                        </h1>

                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p className="leading-relaxed">
                                {course.description}
                            </p>
                            <p>
                                Selamat belajar! Silakan tonton video di atas sampai habis untuk memahami materi ini secara mendalam.
                                Jangan lupa mencatat poin-poin penting.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 pt-8 border-t border-gray-100 flex gap-4">
                            <button className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                Tandai Selesai
                            </button>
                            <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                                Download Materi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}