"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Tipe Data Dummy (Sama seperti struktur di Admin)
const dummyQuestions = [
    {
        id: 1,
        text: "Apa command untuk membuat project Next.js baru?",
        options: [
            { id: 1, text: "npx create-react-app my-app", isCorrect: false },
            { id: 2, text: "npx create-next-app@latest", isCorrect: true },
            { id: 3, text: "npm install next react", isCorrect: false },
            { id: 4, text: "git clone nextjs", isCorrect: false },
        ],
    },
    {
        id: 2,
        text: "Manakah file utama untuk routing di App Router?",
        options: [
            { id: 1, text: "index.js", isCorrect: false },
            { id: 2, text: "router.ts", isCorrect: false },
            { id: 3, text: "page.tsx", isCorrect: true },
            { id: 4, text: "app.js", isCorrect: false },
        ],
    },
    {
        id: 3,
        text: "Folder apa yang digunakan untuk menyimpan gambar statis?",
        options: [
            { id: 1, text: "/assets", isCorrect: false },
            { id: 2, text: "/images", isCorrect: false },
            { id: 3, text: "/static", isCorrect: false },
            { id: 4, text: "/public", isCorrect: true },
        ],
    }
];

export default function QuizPage() {
    const router = useRouter();

    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = dummyQuestions[currentQuestionIndex];
    const totalQuestions = dummyQuestions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // Handler Pilih Jawaban
    const handleOptionSelect = (optionId: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion.id]: optionId
        });
    };

    // Handler Next / Finish
    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateScore();
        }
    };

    // Hitung Skor
    const calculateScore = () => {
        let correctCount = 0;
        dummyQuestions.forEach((q) => {
            const userAnsId = selectedAnswers[q.id];
            const correctOpt = q.options.find((opt) => opt.isCorrect);
            if (userAnsId === correctOpt?.id) {
                correctCount++;
            }
        });

        const finalScore = (correctCount / totalQuestions) * 100;
        setScore(Math.round(finalScore));
        setIsFinished(true);
    };

    // --- TAMPILAN HASIL (RESULT SCREEN) ---
    if (isFinished) {
        const isPassed = score >= 70;
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden text-center p-8 animate-fade-in-up">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-6 ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
                        {isPassed ? '🏆' : '📚'}
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {isPassed ? "Selamat! Lulus" : "Belum Lulus"}
                    </h2>
                    <p className="text-gray-500 mb-8">
                        {isPassed
                            ? "Kamu telah menguasai materi ini dengan baik."
                            : "Jangan menyerah, coba pelajari materi lagi."}
                    </p>

                    <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Skor Kamu</p>
                            <p className={`text-4xl font-black ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{score}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">KKM</p>
                            <p className="text-4xl font-black text-gray-300">70</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.back()} // Kembali ke Course Player
                            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                        >
                            Kembali ke Materi
                        </button>
                        {!isPassed && (
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition"
                            >
                                Coba Lagi
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- TAMPILAN SOAL (QUIZ RUNNER) ---
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">

            {/* Top Bar */}
            <div className="w-full max-w-2xl flex justify-between items-center mb-6">
                <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 text-sm font-medium">
                    ✕ Keluar
                </button>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Soal {currentQuestionIndex + 1} / {totalQuestions}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Card Soal */}
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 animate-fade-in-up">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                        return (
                            <div
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                className={`p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 group ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50 shadow-md'
                                    : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 group-hover:border-indigo-300'
                                    }`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                </div>
                                <span className={`text-base md:text-lg font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                                    {option.text}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Navigation */}
                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswers[currentQuestion.id]}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all transform active:scale-95"
                    >
                        {currentQuestionIndex === totalQuestions - 1 ? "Selesaikan Kuis" : "Selanjutnya →"}
                    </button>
                </div>
            </div>

        </div>
    );
}