"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizPage() {
    const router = useRouter();

    // State Logika Kuis
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Dummy Data Soal
    const questions = [
        {
            question: "Apa kepanjangan dari HTML?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyperlink Text Mode Language",
                "Home Tool Markup Language"
            ],
            correct: 0,
        },
        {
            question: "Tag mana yang digunakan untuk membuat link?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1,
        },
        {
            question: "Properti CSS untuk mengubah warna teks adalah...",
            options: ["text-color", "fg-color", "color", "font-color"],
            correct: 2,
        },
        {
            question: "Manakah yang BUKAN framework JavaScript?",
            options: ["React", "Vue", "Laravel", "Angular"],
            correct: 2,
        },
        {
            question: "Perintah git untuk mengunggah kode ke repository adalah...",
            options: ["git pull", "git upload", "git push", "git commit"],
            correct: 2,
        },
    ];

    const handleAnswerOptionClick = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) return;

        // Cek jawaban benar/salah
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null); // Reset pilihan
        } else {
            setShowScore(true);
        }
    };

    // Hitung persentase nilai
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = percentage >= 70;

    return (
        <div className="min-h-[80vh] flex items-center justify-center animate-fade-in-up">
            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">

                {/* --- HASIL SKOR (Jika Kuis Selesai) --- */}
                {showScore ? (
                    <div className="p-12 text-center space-y-6">
                        <div className="text-6xl mb-4 animate-bounce-short">
                            {isPassed ? "🎉" : "😢"}
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {isPassed ? "Selamat! Kamu Lulus." : "Yah, Belum Lulus."}
                            </h2>
                            <p className="text-gray-500">
                                Kamu menjawab benar {score} dari {questions.length} soal.
                            </p>
                        </div>

                        {/* Score Circle */}
                        <div className="flex justify-center my-8">
                            <div className={`w-40 h-40 rounded-full flex items-center justify-center border-8 text-5xl font-bold ${isPassed ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}`}>
                                {percentage}<span className="text-xl">%</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition"
                            >
                                Coba Lagi
                            </button>
                            <Link
                                href="/dashboard/courses"
                                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-indigo-600 transition shadow-lg"
                            >
                                Kembali ke Kelas
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* --- TAMPILAN SOAL --- */
                    <div className="p-8 md:p-10">
                        {/* Header: Progress & Judul */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Ujian Akhir HTML & CSS</h2>
                                <p className="text-sm text-gray-400">Soal {currentQuestion + 1} dari {questions.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                                {currentQuestion + 1}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        {/* Pertanyaan */}
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                            {questions[currentQuestion].question}
                        </h3>

                        {/* Pilihan Jawaban */}
                        <div className="space-y-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(index)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${selectedAnswer === index
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                                        : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-600"
                                        }`}
                                >
                                    <span>{option}</span>
                                    {selectedAnswer === index && (
                                        <span className="text-indigo-600">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tombol Next */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === null}
                                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {currentQuestion === questions.length - 1 ? "Selesai & Lihat Nilai" : "Soal Selanjutnya →"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}