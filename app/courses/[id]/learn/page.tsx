"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import type { Course, Lesson } from "@/lib/db";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type QuizState = {
    answers: Record<number, number>; // questionId -> optionId
    submitted: boolean;
    score: number; // 0-100
};

type ActiveView = { type: "lesson"; lesson: Lesson } | { type: "project" };

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function progressKey(courseId: string) { return `course_progress_${courseId}`; }

function loadProgress(courseId: string): { completed: (string | number)[]; projectDone: boolean } {
    try {
        const raw = localStorage.getItem(progressKey(courseId));
        return raw ? JSON.parse(raw) : { completed: [], projectDone: false };
    } catch { return { completed: [], projectDone: false }; }
}

function saveProgress(courseId: string, completed: Set<string | number>, projectDone: boolean) {
    localStorage.setItem(progressKey(courseId), JSON.stringify({ completed: [...completed], projectDone }));
}

/* ─────────────────────────────────────────
   Quiz Component
───────────────────────────────────────── */
function QuizPanel({ lesson, onPass }: { lesson: Lesson; onPass: () => void }) {
    const questions = lesson.questions ?? [];
    const [quiz, setQuiz] = useState<QuizState>({ answers: {}, submitted: false, score: 0 });
    const [current, setCurrent] = useState(0);

    const selectAnswer = (qId: number, optId: number) => {
        if (quiz.submitted) return;
        setQuiz(q => ({ ...q, answers: { ...q.answers, [qId]: optId } }));
    };

    const submitQuiz = () => {
        if (questions.length === 0) return;
        const correct = questions.filter(q => {
            const chosen = quiz.answers[q.id];
            return q.options.find(o => o.id === chosen)?.isCorrect;
        }).length;
        const score = Math.round((correct / questions.length) * 100);
        setQuiz(q => ({ ...q, submitted: true, score }));
        if (score >= 70) setTimeout(onPass, 1200);
    };

    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-10 text-center">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-3xl mb-4">📝</div>
                <h2 className="text-xl font-black mb-2">{lesson.title}</h2>
                <p className="text-gray-400 text-sm mb-6">Belum ada soal kuis untuk materi ini.</p>
                <button onClick={onPass} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition">
                    Tandai Selesai →
                </button>
            </div>
        );
    }

    const q = questions[current];
    const answered = Object.keys(quiz.answers).length;
    const allAnswered = answered === questions.length;

    if (quiz.submitted) {
        const passed = quiz.score >= 70;
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-10 text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5 ${passed ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
                    {passed ? '🎉' : '😕'}
                </div>
                <h2 className="text-2xl font-black mb-1">{passed ? 'Lulus!' : 'Belum Lulus'}</h2>
                <p className="text-5xl font-black mt-2 mb-1 text-white">{quiz.score}<span className="text-2xl text-gray-400">/100</span></p>
                <p className="text-gray-400 text-sm mb-6">{Object.keys(quiz.answers).length} dari {questions.length} soal dijawab</p>
                {!passed && (
                    <button
                        onClick={() => setQuiz({ answers: {}, submitted: false, score: 0 })}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition"
                    >
                        Coba Lagi
                    </button>
                )}
                {passed && <p className="text-green-400 text-sm font-bold">Melanjutkan ke materi berikutnya...</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white p-6 md:p-10 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Kuis · {lesson.title}</p>
                    <p className="text-sm text-gray-400">Soal {current + 1} dari {questions.length}</p>
                </div>
                <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)}
                            className={`w-7 h-7 rounded-lg text-xs font-black transition ${i === current ? 'bg-indigo-600 text-white' : quiz.answers[questions[i].id] != null ? 'bg-green-600/30 text-green-400 border border-green-600/40' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}`}
                        >{i + 1}</button>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-800 rounded-full mb-8">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div>
            </div>

            {/* Question */}
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">{q.text}</h3>
                <div className="space-y-3">
                    {q.options.map(opt => {
                        const selected = quiz.answers[q.id] === opt.id;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => selectAnswer(q.id, opt.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selected ? 'border-indigo-500 bg-indigo-500/20 text-white' : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800'}`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-indigo-400 bg-indigo-500' : 'border-gray-600'}`}>
                                    {selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <span className="text-sm font-medium">{opt.text}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-800">
                <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
                    className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white disabled:opacity-30 transition">
                    ← Prev
                </button>
                {current < questions.length - 1 ? (
                    <button onClick={() => setCurrent(c => c + 1)} disabled={quiz.answers[q.id] == null}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition">
                        Lanjut →
                    </button>
                ) : (
                    <button onClick={submitQuiz} disabled={!allAnswered}
                        className="px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition">
                        Submit Kuis ✓
                    </button>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Final Project Component
───────────────────────────────────────── */
function ProjectPanel({ course, user, onSubmit }: { course: Course; user: any; onSubmit: () => void }) {
    const [link, setLink] = useState("");
    const [desc, setDesc] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submission, setSubmission] = useState<any>(null);

    // Load existing submission on mount
    useEffect(() => {
        if (!user) return;
        fetch(`/api/submissions?userId=${user.id}&courseId=${course.id}`)
            .then(r => r.json())
            .then(j => {
                if (j.success && j.data.length > 0) {
                    const s = j.data[0];
                    setSubmission(s);
                    if (s.status === 'approved') onSubmit();
                }
            });
    }, [user, course.id, onSubmit]);

    const handleSubmit = async () => {
        if (!link.trim() || !desc.trim() || !user) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, courseId: course.id, link, description: desc }),
            });
            const json = await res.json();
            if (json.success) setSubmission(json.data);
        } finally {
            setSubmitting(false);
        }
    };

    // Tampilan setelah submit — sesuai status
    if (submission) {
        const statusMap = {
            pending: {
                icon: '⏳', iconBg: 'bg-yellow-500/20 border-yellow-500',
                title: 'Project Sedang Direview',
                desc: 'Instruktur sedang memeriksa project kamu. Kamu akan bisa klaim sertifikat setelah disetujui.',
                badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
                label: 'Menunggu Review',
            },
            approved: {
                icon: '🎉', iconBg: 'bg-green-500/20 border-green-500',
                title: 'Project Disetujui!',
                desc: 'Selamat! Project kamu telah disetujui. Kamu sekarang bisa klaim sertifikat.',
                badge: 'bg-green-500/20 border-green-500/40 text-green-400',
                label: 'Disetujui',
            },
            rejected: {
                icon: '❌', iconBg: 'bg-red-500/20 border-red-500',
                title: 'Project Perlu Diperbaiki',
                desc: submission.reviewNote || 'Project kamu belum memenuhi kriteria. Silakan perbaiki dan kirim ulang.',
                badge: 'bg-red-500/20 border-red-500/40 text-red-400',
                label: 'Perlu Revisi',
            },
        };
        const s = statusMap[submission.status as keyof typeof statusMap];

        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-10 text-center">
                <div className={`w-20 h-20 ${s.iconBg} border-2 rounded-full flex items-center justify-center text-4xl mb-5`}>{s.icon}</div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${s.badge}`}>{s.label}</span>
                <h2 className="text-2xl font-black mb-2">{s.title}</h2>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-6">{s.desc}</p>
                {submission.status === 'rejected' && (
                    <button onClick={() => setSubmission(null)}
                        className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition text-sm">
                        Kirim Ulang Project
                    </button>
                )}
                <div className="mt-6 bg-gray-800/60 rounded-xl p-4 text-left w-full max-w-md">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Detail Submission</p>
                    <a href={submission.link} target="_blank" rel="noreferrer"
                        className="text-indigo-400 text-sm hover:underline block truncate mb-1">{submission.link}</a>
                    <p className="text-gray-400 text-xs line-clamp-2">{submission.description}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white p-6 md:p-10 overflow-y-auto">
            <div className="max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/40 rounded-xl flex items-center justify-center text-xl">🏗️</div>
                    <div>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Final Project</p>
                        <h2 className="text-lg font-black text-white">Proyek Akhir Kursus</h2>
                    </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 mb-6">
                    <p className="text-sm font-black text-gray-300 mb-3">📋 Instruksi Project:</p>
                    <ol className="space-y-2.5 text-sm text-gray-400 list-none">
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-400 font-black flex-shrink-0 w-5 text-right">1.</span>
                            <span>Buat sebuah aplikasi lengkap menggunakan materi dari kursus <span className="text-white font-bold">"{course.title}"</span></span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-400 font-black flex-shrink-0 w-5 text-right">2.</span>
                            <span>Upload project ke GitHub dan pastikan repository publik</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-400 font-black flex-shrink-0 w-5 text-right">3.</span>
                            <span>Tuliskan penjelasan singkat tentang fitur yang kamu buat</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-purple-400 font-black flex-shrink-0 w-5 text-right">4.</span>
                            <span>Sertakan link GitHub repository atau link demo di bawah</span>
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-gray-300">
                            🔗 Link Repository / Demo
                        </label>
                        <input
                            type="url"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            placeholder="https://github.com/username/project-name"
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-gray-300">
                            📝 Deskripsi Project
                        </label>
                        <textarea
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Jelaskan fitur utama yang kamu buat, teknologi yang digunakan, dan hal menarik dari project kamu..."
                            rows={5}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!link.trim() || !desc.trim() || submitting}
                        className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-black rounded-xl transition text-sm flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Mengirim...</>
                        ) : 'Kumpulkan Project 🚀'}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Certificate Modal
───────────────────────────────────────── */
function CertificateModal({ course, user, onClose }: { course: Course; user: any; onClose: () => void }) {
    const [cert, setCert] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function claim() {
            try {
                const res = await fetch('/api/certificates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, courseId: course.id }),
                });
                const json = await res.json();
                if (json.success) setCert(json.data);
            } finally {
                setLoading(false);
            }
        }
        claim();
    }, [course.id, user.id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
                {/* Certificate visual */}
                <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)' , backgroundSize: '20px 20px' }}></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">⚡</div>
                            <span className="font-extrabold text-2xl tracking-tight">Edu<span className="text-indigo-300">Flash</span>.</span>
                        </div>
                        <p className="text-indigo-300 text-xs font-black uppercase tracking-[4px] mb-6">Certificate of Completion</p>
                        <p className="text-indigo-200 text-sm mb-2">Diberikan kepada</p>
                        <h2 className="text-3xl font-black mb-4">{user.name}</h2>
                        <p className="text-indigo-200 text-sm mb-2">telah berhasil menyelesaikan kursus</p>
                        <h3 className="text-xl font-bold text-white mb-6 px-4">{course.title}</h3>
                        <div className="flex items-center justify-center gap-6 text-xs text-indigo-300">
                            <div>
                                <p className="font-black text-white">{course.instructor}</p>
                                <p>Instruktur</p>
                            </div>
                            <div className="w-px h-8 bg-indigo-700"></div>
                            <div>
                                <p className="font-black text-white">{cert ? new Date(cert.issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</p>
                                <p>Tanggal</p>
                            </div>
                            <div className="w-px h-8 bg-indigo-700"></div>
                            <div>
                                <p className="font-black text-white">{cert?.grade ?? 'A'}</p>
                                <p>Grade</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex items-center justify-between gap-4">
                    {loading ? (
                        <p className="text-sm text-gray-400 font-medium">Memproses sertifikat...</p>
                    ) : (
                        <p className="text-sm text-green-600 font-bold flex items-center gap-2">
                            <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                            Sertifikat berhasil diterbitkan!
                        </p>
                    )}
                    <div className="flex gap-3">
                        <Link href="/dashboard/certificates" className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-100 transition">
                            Lihat Sertifikat
                        </Link>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function CoursePlayerPage() {
    const { id } = useParams<{ id: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeView, setActiveView] = useState<ActiveView | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discuss">("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<Set<string | number>>(new Set());
    const [projectDone, setProjectDone] = useState(false);
    const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
    const [showCert, setShowCert] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Load course + persisted progress
    useEffect(() => {
        const session = localStorage.getItem("user_session");
        if (session) setUser(JSON.parse(session));

        async function load() {
            try {
                const res = await fetch(`/api/courses/${id}`);
                const json = await res.json();
                if (json.success) {
                    setCourse(json.data);
                    const saved = loadProgress(id);
                    setCompletedLessons(new Set(saved.completed));
                    setProjectDone(saved.projectDone);
                    if (json.data.sections?.length > 0)
                        setActiveView({ type: "lesson", lesson: json.data.sections[0].lessons[0] });
                }
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        }
        load();
    }, [id]);

    const markLessonDone = useCallback((lessonId: string | number) => {
        setCompletedLessons(prev => {
            const next = new Set([...prev, lessonId]);
            if (course) saveProgress(id, next, projectDone);
            return next;
        });
    }, [course, id, projectDone]);

    const markProjectDone = useCallback(() => {
        setProjectDone(true);
        if (course) saveProgress(id, completedLessons, true);
    }, [course, id, completedLessons]);

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center bg-gray-950 font-sans">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium text-sm">Memuat kursus...</p>
            </div>
        </div>
    );

    if (!course || !activeView) return (
        <div className="flex h-screen items-center justify-center bg-gray-950 font-sans flex-col gap-4">
            <p className="text-gray-400 font-bold">Kursus tidak tersedia.</p>
            <Link href="/dashboard/courses" className="text-indigo-400 font-bold hover:underline text-sm">← Kembali</Link>
        </div>
    );

    const allLessons = course.sections?.flatMap(s => s.lessons) ?? [];
    const totalItems = allLessons.length + 1; // +1 final project
    const doneItems = completedLessons.size + (projectDone ? 1 : 0);
    const progress = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
    const allDone = progress === 100;

    const goNext = () => {
        if (activeView.type !== "lesson") return;
        const idx = allLessons.findIndex(l => l.id === activeView.lesson.id);
        if (idx < allLessons.length - 1) {
            setActiveView({ type: "lesson", lesson: allLessons[idx + 1] });
            setActiveTab("overview");
        } else {
            setActiveView({ type: "project" });
        }
    };

    const goPrev = () => {
        if (activeView.type === "project") {
            setActiveView({ type: "lesson", lesson: allLessons[allLessons.length - 1] });
            return;
        }
        const idx = allLessons.findIndex(l => l.id === activeView.lesson.id);
        if (idx > 0) { setActiveView({ type: "lesson", lesson: allLessons[idx - 1] }); setActiveTab("overview"); }
    };

    const currentLesson = activeView.type === "lesson" ? activeView.lesson : null;
    const isFirst = activeView.type === "lesson" && allLessons.findIndex(l => l.id === activeView.lesson.id) === 0;
    const isLast = activeView.type === "project";

    return (
        <div className="flex flex-col h-screen bg-gray-950 font-sans overflow-hidden">

            {/* TOP BAR */}
            <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0 z-50">
                <div className="flex items-center gap-3 min-w-0">
                    <button onClick={() => setSidebarOpen(v => !v)} className="text-gray-500 hover:text-white transition p-1.5 rounded-lg hover:bg-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <Link href="/" className="flex items-center gap-1.5 group flex-shrink-0">
                        <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">⚡</div>
                        <span className="font-extrabold text-sm tracking-tight text-white hidden sm:block">Edu<span className="text-indigo-400">Flash</span>.</span>
                    </Link>
                    <div className="h-5 w-px bg-gray-800 hidden sm:block"></div>
                    <p className="text-sm font-medium text-gray-400 truncate max-w-xs hidden sm:block">{course.title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3">
                        <div className="w-36 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{progress}%</span>
                    </div>
                    {allDone && (
                        <button onClick={() => setShowCert(true)} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black rounded-lg hover:bg-yellow-500/20 transition">
                            🎓 Klaim Sertifikat
                        </button>
                    )}
                    <Link href="/dashboard/courses" className="text-xs font-bold text-gray-500 hover:text-white transition bg-gray-800 px-3 py-1.5 rounded-lg">
                        ← Dashboard
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR */}
                <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden transition-all duration-300`}>
                    <div className="flex-1 overflow-y-auto">
                        {/* Mini progress */}
                        <div className="px-4 py-3 border-b border-gray-800">
                            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                                <span className="font-bold">Progress</span>
                                <span>{doneItems}/{totalItems} selesai</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        {/* Sections */}
                        {course.sections?.map((section, sIdx) => (
                            <div key={section.id} className="border-b border-gray-800/50">
                                <button
                                    onClick={() => setOpenSections(prev => {
                                        const next = new Set(prev);
                                        next.has(sIdx) ? next.delete(sIdx) : next.add(sIdx);
                                        return next;
                                    })}
                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/40 transition"
                                >
                                    <div>
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-0.5">Bab {sIdx + 1}</p>
                                        <p className="text-sm font-bold text-gray-300">{section.title}</p>
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform ${openSections.has(sIdx) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {openSections.has(sIdx) && section.lessons.map(lesson => {
                                    const isActive = currentLesson?.id === lesson.id;
                                    const isDone = completedLessons.has(lesson.id);
                                    return (
                                        <button key={lesson.id}
                                            onClick={() => { setActiveView({ type: "lesson", lesson }); setActiveTab("overview"); }}
                                            className={`w-full text-left px-4 py-3 flex items-start gap-3 transition border-l-2 ${isActive ? 'bg-indigo-600/15 border-indigo-500' : 'border-transparent hover:bg-gray-800/40'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                                {isDone ? '✓' : lesson.type === 'video' ? '▶' : lesson.type === 'quiz' ? '?' : '📄'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm leading-tight truncate font-medium ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}>{lesson.title}</p>
                                                <p className="text-[10px] text-gray-600 mt-0.5 capitalize">{lesson.type} · {lesson.duration}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}

                        {/* Final Project */}
                        <div className="border-b border-gray-800/50">
                            <button
                                onClick={() => setActiveView({ type: "project" })}
                                className={`w-full text-left px-4 py-4 flex items-center gap-3 transition border-l-2 ${activeView.type === 'project' ? 'bg-purple-600/15 border-purple-500' : 'border-transparent hover:bg-gray-800/40'}`}
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black ${projectDone ? 'bg-green-500 text-white' : activeView.type === 'project' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                    {projectDone ? '✓' : '🏗'}
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${activeView.type === 'project' ? 'text-white' : 'text-gray-400'}`}>Final Project</p>
                                    <p className="text-[10px] text-gray-600">Proyek akhir kursus</p>
                                </div>
                                {!projectDone && <span className="ml-auto text-[10px] font-black text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">Required</span>}
                            </button>
                        </div>

                        {/* Sertifikat */}
                        {allDone && (
                            <div className="p-4">
                                <button onClick={() => setShowCert(true)} className="w-full py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 font-black text-sm rounded-xl hover:from-yellow-500/30 hover:to-orange-500/30 transition flex items-center justify-center gap-2">
                                    🎓 Klaim Sertifikat
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* MAIN */}
                <main className="flex-1 flex flex-col overflow-hidden bg-gray-950">

                    {/* VIDEO / QUIZ / PROJECT */}
                    <div className="w-full bg-black flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '58vh' }}>
                        {activeView.type === "project" ? (
                            <ProjectPanel course={course} user={user} onSubmit={markProjectDone} />
                        ) : activeView.lesson.type === "quiz" ? (
                            <QuizPanel lesson={activeView.lesson} onPass={() => markLessonDone(activeView.lesson.id)} />
                        ) : activeView.lesson.contentUrl ? (
                            <iframe key={activeView.lesson.id} src={activeView.lesson.contentUrl} title={activeView.lesson.title}
                                className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                                <p className="text-sm">Konten tidak tersedia</p>
                            </div>
                        )}
                    </div>

                    {/* DETAIL PANEL */}
                    <div className="flex-1 overflow-y-auto bg-white text-gray-900">
                        <div className="max-w-4xl mx-auto px-6 py-5">

                            {/* Title row */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
                                        {activeView.type === "project" ? "Final Project" : course.sections?.find(s => s.lessons.some(l => l.id === activeView.lesson.id))?.title}
                                    </p>
                                    <h1 className="text-lg font-black text-gray-900">
                                        {activeView.type === "project" ? "Proyek Akhir Kursus" : activeView.lesson.title}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button onClick={goPrev} disabled={isFirst}
                                        className="px-3 py-2 text-xs font-bold text-gray-400 hover:text-gray-900 disabled:opacity-30 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                        ← Prev
                                    </button>
                                    {activeView.type === "lesson" && activeView.lesson.type === "video" && (
                                        <button onClick={() => markLessonDone(activeView.lesson.id)}
                                            className={`px-4 py-2 text-xs font-bold rounded-lg transition border ${completedLessons.has(activeView.lesson.id) ? 'bg-green-50 border-green-200 text-green-700' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'}`}>
                                            {completedLessons.has(activeView.lesson.id) ? '✓ Selesai' : 'Tandai Selesai'}
                                        </button>
                                    )}
                                    <button onClick={goNext} disabled={isLast}
                                        className="px-3 py-2 text-xs font-bold text-gray-400 hover:text-gray-900 disabled:opacity-30 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                        Next →
                                    </button>
                                </div>
                            </div>

                            {/* Tabs — only for lessons */}
                            {activeView.type === "lesson" && (
                                <>
                                    <div className="flex gap-6 border-b border-gray-100 mb-5">
                                        {(["overview", "resources", "discuss"] as const).map(tab => (
                                            <button key={tab} onClick={() => setActiveTab(tab)}
                                                className={`pb-3 text-sm font-bold transition border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-gray-400 border-transparent hover:text-gray-700'}`}>
                                                {tab === 'overview' ? 'Ikhtisar' : tab === 'resources' ? `File Pendukung${activeView.lesson.resources?.length ? ` (${activeView.lesson.resources.length})` : ''}` : 'Diskusi'}
                                            </button>
                                        ))}
                                    </div>

                                    {activeTab === 'overview' && (
                                        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                                            {activeView.lesson.description && <p>{activeView.lesson.description}</p>}
                                            <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">{course.instructor.charAt(0)}</div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Instruktur</p>
                                                    <p className="text-sm font-bold text-gray-900">{course.instructor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'resources' && (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {!activeView.lesson.resources?.length ? (
                                                <div className="col-span-2 py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                                    <p className="text-gray-400 text-sm">Tidak ada file pendukung.</p>
                                                </div>
                                            ) : activeView.lesson.resources.map(file => (
                                                <div key={file.id} className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between hover:shadow-md hover:border-indigo-200 transition group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">{file.type}</div>
                                                        <div>
                                                            <p className="font-bold text-gray-800 text-sm group-hover:text-indigo-600">{file.name}</p>
                                                            <p className="text-xs text-gray-400">{file.size}</p>
                                                        </div>
                                                    </div>
                                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'discuss' && (
                                        <div className="space-y-5">
                                            <div className="flex gap-3">
                                                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                                                    {user?.name?.charAt(0) ?? 'S'}
                                                </div>
                                                <div className="flex-1">
                                                    <textarea placeholder="Tulis pertanyaan atau diskusi..." rows={3}
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 resize-none placeholder-gray-300" />
                                                    <div className="flex justify-end mt-2">
                                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition">Kirim</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {[
                                                { user: "Andi Saputra", role: "Siswa", text: "Apakah materi ini cocok untuk pemula?", time: "2 jam lalu" },
                                                { user: course.instructor, role: "Instruktur", text: "Sangat cocok, karena dimulai dari dasar.", time: "1 jam lalu" },
                                            ].map((c, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0 ${c.role === 'Instruktur' ? 'bg-indigo-600' : 'bg-gray-200 text-gray-600'}`}>{c.user.charAt(0)}</div>
                                                    <div className="flex-1 bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-100">
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <span className="font-bold text-gray-900 text-sm">{c.user}</span>
                                                            {c.role === 'Instruktur' && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-black">Instruktur</span>}
                                                            <span className="text-xs text-gray-400">· {c.time}</span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">{c.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Certificate Modal */}
            {showCert && user && (
                <CertificateModal course={course} user={user} onClose={() => setShowCert(false)} />
            )}
        </div>
    );
}
