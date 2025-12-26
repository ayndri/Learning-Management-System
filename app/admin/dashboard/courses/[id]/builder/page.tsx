"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

// --- TIPE DATA ---
type Resource = {
    id: number;
    name: string;
    size: string;
    type: "PDF" | "ZIP" | "IMG";
};

// Tipe Data untuk Kuis
type QuizOption = {
    id: number;
    text: string;
    isCorrect: boolean;
};

type QuizQuestion = {
    id: number;
    text: string;
    options: QuizOption[];
};

type Lesson = {
    id: number;
    title: string;
    type: "video" | "quiz" | "text";
    duration: string;
    isFree: boolean;
    contentUrl?: string;     // Khusus Video
    description?: string;    // Khusus Text/Video
    resources?: Resource[];  // Khusus Text/Video
    questions?: QuizQuestion[]; // KHUSUS KUIS
};

type Section = {
    id: number;
    title: string;
    lessons: Lesson[];
};

export default function CourseBuilderPage() {
    const params = useParams();
    const courseId = params.id;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- STATE DATA ---
    const [sections, setSections] = useState<Section[]>([
        {
            id: 1,
            title: "Pengenalan & Persiapan",
            lessons: [
                {
                    id: 101,
                    title: "Apa itu Next.js?",
                    type: "video",
                    duration: "10:00",
                    isFree: true,
                    contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    description: "Pengenalan dasar framework.",
                    resources: [],
                    questions: []
                },
            ],
        },
    ]);

    // --- STATE UI ---
    const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
    const [editSectionTitle, setEditSectionTitle] = useState("");
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

    // --- STATE FORM ---
    const [lessonForm, setLessonForm] = useState<Lesson>({
        id: 0,
        title: "",
        type: "video",
        duration: "",
        isFree: false,
        contentUrl: "",
        description: "",
        resources: [],
        questions: []
    });

    // ==========================================
    // LOGIKA SECTION
    // ==========================================
    const handleAddSection = () => {
        if (!newSectionTitle.trim()) return;
        setSections([...sections, { id: Date.now(), title: newSectionTitle, lessons: [] }]);
        setNewSectionTitle("");
        setIsAddingSection(false);
    };

    const handleDeleteSection = (id: number) => {
        if (confirm("Hapus bab ini?")) setSections(sections.filter((s) => s.id !== id));
    };

    const startEditSection = (section: Section) => {
        setEditingSectionId(section.id);
        setEditSectionTitle(section.title);
    };

    const saveEditSection = (id: number) => {
        setSections(sections.map(s => s.id === id ? { ...s, title: editSectionTitle } : s));
        setEditingSectionId(null);
    };

    // ==========================================
    // LOGIKA LESSON & KUIS
    // ==========================================
    const openAddLessonModal = (sectionId: number) => {
        setModalMode("add");
        setActiveSectionId(sectionId);
        setLessonForm({
            id: 0,
            title: "",
            type: "video",
            duration: "",
            isFree: false,
            contentUrl: "",
            description: "",
            resources: [],
            questions: []
        });
        setIsModalOpen(true);
    };

    const openEditLessonModal = (sectionId: number, lesson: Lesson) => {
        setModalMode("edit");
        setActiveSectionId(sectionId);
        setLessonForm({
            ...lesson,
            resources: lesson.resources || [],
            questions: lesson.questions || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteLesson = (sectionId: number, lessonId: number) => {
        if (confirm("Hapus materi ini?")) {
            setSections(sections.map(sec => {
                if (sec.id === sectionId) {
                    return { ...sec, lessons: sec.lessons.filter(l => l.id !== lessonId) };
                }
                return sec;
            }));
        }
    };

    // --- LOGIKA HELPER UNTUK KUIS ---
    const handleAddQuestion = () => {
        const newQuestion: QuizQuestion = {
            id: Date.now(),
            text: "",
            options: [
                { id: 1, text: "", isCorrect: false },
                { id: 2, text: "", isCorrect: false },
                { id: 3, text: "", isCorrect: false },
                { id: 4, text: "", isCorrect: false },
            ]
        };
        setLessonForm({ ...lessonForm, questions: [...(lessonForm.questions || []), newQuestion] });
    };

    const handleRemoveQuestion = (qId: number) => {
        setLessonForm({ ...lessonForm, questions: lessonForm.questions?.filter(q => q.id !== qId) });
    };

    const updateQuestionText = (qId: number, text: string) => {
        setLessonForm({
            ...lessonForm,
            questions: lessonForm.questions?.map(q => q.id === qId ? { ...q, text } : q)
        });
    };

    const updateOptionText = (qId: number, optId: number, text: string) => {
        setLessonForm({
            ...lessonForm,
            questions: lessonForm.questions?.map(q => {
                if (q.id === qId) {
                    return {
                        ...q,
                        options: q.options.map(opt => opt.id === optId ? { ...opt, text } : opt)
                    };
                }
                return q;
            })
        });
    };

    const setCorrectOption = (qId: number, optId: number) => {
        setLessonForm({
            ...lessonForm,
            questions: lessonForm.questions?.map(q => {
                if (q.id === qId) {
                    return {
                        ...q,
                        options: q.options.map(opt => ({ ...opt, isCorrect: opt.id === optId }))
                    };
                }
                return q;
            })
        });
    };

    // ==========================================
    // SIMPAN & FILE
    // ==========================================
    const handleSaveLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSectionId) return;

        if (modalMode === "add") {
            const newLesson = { ...lessonForm, id: Date.now() };
            setSections(sections.map(sec => sec.id === activeSectionId ? { ...sec, lessons: [...sec.lessons, newLesson] } : sec));
        } else {
            setSections(sections.map(sec => sec.id === activeSectionId ? {
                ...sec, lessons: sec.lessons.map(l => l.id === lessonForm.id ? lessonForm : l)
            } : sec));
        }
        setIsModalOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            let fileType: "PDF" | "ZIP" | "IMG" = "PDF";
            if (file.name.endsWith(".zip") || file.name.endsWith(".rar")) fileType = "ZIP";
            else if (file.name.match(/\.(jpg|jpeg|png|webp)$/i)) fileType = "IMG";

            const newResource: Resource = {
                id: Date.now(),
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
                type: fileType
            };
            setLessonForm(prev => ({ ...prev, resources: [...(prev.resources || []), newResource] }));
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveResource = (resourceId: number) => {
        setLessonForm({ ...lessonForm, resources: lessonForm.resources?.filter(r => r.id !== resourceId) });
    };


    return (
        <div className="max-w-5xl mx-auto animate-fade-in-up pb-20">
            {/* HEADER PAGE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition">
                        &larr; Kembali
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Kurikulum Kursus</h1>
                        <p className="text-sm text-gray-500">Edit Materi ID: {courseId}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-2.5 text-base font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            {/* --- LIST SECTION --- */}
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <div key={section.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-5 flex items-center justify-between border-b border-gray-200 group">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-sm font-bold text-gray-600 cursor-move">:::</span>
                                {editingSectionId === section.id ? (
                                    <div className="flex gap-2 w-full max-w-md">
                                        <input autoFocus className="px-3 py-2 text-base border border-indigo-500 rounded-lg w-full outline-none" value={editSectionTitle} onChange={(e) => setEditSectionTitle(e.target.value)} />
                                        <button onClick={() => saveEditSection(section.id)} className="text-sm bg-indigo-600 text-white px-4 rounded-lg">OK</button>
                                    </div>
                                ) : (
                                    <h3 className="text-lg font-bold text-gray-800">Bab {index + 1}: {section.title}</h3>
                                )}
                            </div>
                            {editingSectionId !== section.id && (
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEditSection(section)} className="text-sm text-indigo-600 hover:underline">Ubah Nama</button>
                                    <button onClick={() => handleDeleteSection(section.id)} className="text-sm text-red-500 hover:underline">Hapus Bab</button>
                                </div>
                            )}
                        </div>

                        <div className="p-3 space-y-3 bg-gray-50/50">
                            {section.lessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${lesson.type === 'video' ? 'bg-blue-50 text-blue-500' : lesson.type === 'quiz' ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-500'}`}>
                                            {lesson.type === 'video' ? '📺' : lesson.type === 'quiz' ? '📝' : '📄'}
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-gray-800">{lesson.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs font-medium text-gray-500 uppercase border border-gray-200 px-2 py-0.5 rounded bg-gray-50">{lesson.type}</span>
                                                <span className="text-xs text-gray-400">• {lesson.duration}</span>

                                                {/* Badge Quiz */}
                                                {lesson.type === 'quiz' && (
                                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                                                        ❓ {lesson.questions?.length || 0} Soal
                                                    </span>
                                                )}

                                                {/* Badge Files */}
                                                {lesson.resources && lesson.resources.length > 0 && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex items-center gap-1">
                                                        📎 {lesson.resources.length} File
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEditLessonModal(section.id, lesson)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">✏️</button>
                                        <button onClick={() => handleDeleteLesson(section.id, lesson.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => openAddLessonModal(section.id)} className="w-full py-3 text-sm font-bold text-indigo-600 border-2 border-dashed border-indigo-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition">
                                + Tambah Materi Baru
                            </button>
                        </div>
                    </div>
                ))}

                {isAddingSection ? (
                    <div className="bg-white p-6 border border-indigo-200 rounded-2xl shadow-sm animate-fade-in-up">
                        <label className="block text-base font-bold text-gray-800 mb-3">Judul Bab Baru</label>
                        <div className="flex gap-3">
                            <input autoFocus type="text" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} placeholder="Contoh: Database & Backend" className="flex-1 px-5 py-3 border border-gray-300 rounded-xl outline-none text-base" />
                            <button onClick={handleAddSection} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Simpan</button>
                            <button onClick={() => setIsAddingSection(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Batal</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setIsAddingSection(true)} className="w-full py-5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                        + Tambah Bab / Section Baru
                    </button>
                )}
            </div>

            {/* ========================================== */}
            {/* MODAL FORM */}
            {/* ========================================== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden animate-scale-up relative z-10 max-h-[90vh] flex flex-col">

                        {/* Header Fixed */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{modalMode === 'add' ? 'Tambah Materi' : 'Edit Materi'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition">✕</button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">

                            {/* 1. INFORMASI DASAR (SELALU MUNCUL) */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Informasi Dasar</h4>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-base font-bold text-gray-800 mb-2">Judul Materi</label>
                                        <input required type="text" className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" placeholder="Judul..." value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-bold text-gray-800 mb-2">Tipe</label>
                                            <select className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none bg-white cursor-pointer" value={lessonForm.type} onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value as any })}>
                                                <option value="video">🎥 Video</option>
                                                <option value="text">📄 Artikel / Teks</option>
                                                <option value="quiz">📝 Kuis (Pilihan Ganda)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-base font-bold text-gray-800 mb-2">Durasi</label>
                                            <input required type="text" className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none" placeholder="10 min" value={lessonForm.duration} onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* ======================================================== */}
                            {/* KONDISI 1: JIKA TIPE VIDEO / TEXT (TAMPILKAN FILE & URL) */}
                            {/* ======================================================== */}
                            {lessonForm.type !== 'quiz' && (
                                <>
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Konten Materi</h4>
                                        {lessonForm.type === 'video' && (
                                            <div>
                                                <label className="block text-base font-bold text-gray-800 mb-2">Link Video (Embed URL)</label>
                                                <input type="url" className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition" placeholder="https://www.youtube.com/embed/..." value={lessonForm.contentUrl || ""} onChange={(e) => setLessonForm({ ...lessonForm, contentUrl: e.target.value })} />
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-base font-bold text-gray-800 mb-2">Deskripsi (Ikhtisar)</label>
                                            <textarea rows={4} className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition resize-none" placeholder="Jelaskan isi materi ini..." value={lessonForm.description || ""} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} />
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">File Pendukung</h4>
                                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.zip,.jpg,.png,.jpeg,.rar" />
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-indigo-600 hover:underline">+ Upload File</button>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-4 min-h-[100px] flex flex-col gap-2">
                                            {(!lessonForm.resources || lessonForm.resources.length === 0) && (
                                                <div className="text-center text-gray-400 text-sm py-4">Belum ada file pendukung.</div>
                                            )}
                                            {lessonForm.resources?.map((file) => (
                                                <div key={file.id} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded flex items-center justify-center text-xs font-bold">{file.type}</div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{file.name}</p>
                                                            <p className="text-xs text-gray-500">{file.size}</p>
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={() => handleRemoveResource(file.id)} className="text-gray-400 hover:text-red-500 p-1">✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ======================================================== */}
                            {/* KONDISI 2: JIKA TIPE KUIS (TAMPILKAN QUIZ BUILDER)       */}
                            {/* ======================================================== */}
                            {lessonForm.type === 'quiz' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Daftar Pertanyaan</h4>
                                        <button type="button" onClick={handleAddQuestion} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition">+ Tambah Pertanyaan</button>
                                    </div>

                                    {(!lessonForm.questions || lessonForm.questions.length === 0) ? (
                                        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-gray-500">
                                            Belum ada pertanyaan. Klik tombol di atas untuk menambah.
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {lessonForm.questions.map((q, index) => (
                                                <div key={q.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative group">
                                                    <div className="absolute top-4 right-4">
                                                        <button type="button" onClick={() => handleRemoveQuestion(q.id)} className="text-gray-400 hover:text-red-500 p-2">🗑️</button>
                                                    </div>

                                                    {/* Input Soal */}
                                                    <div className="mb-4">
                                                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Pertanyaan #{index + 1}</label>
                                                        <textarea
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 outline-none transition resize-none bg-white"
                                                            placeholder="Tulis soal di sini..."
                                                            rows={2}
                                                            value={q.text}
                                                            onChange={(e) => updateQuestionText(q.id, e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Pilihan Jawaban */}
                                                    <div className="space-y-3 pl-2">
                                                        <label className="block text-xs font-bold text-gray-500 mb-1">Pilihan Jawaban (Klik bulat untuk set kunci jawaban)</label>
                                                        {q.options.map((opt, i) => (
                                                            <div key={opt.id} className="flex items-center gap-3">
                                                                {/* Radio Button Custom untuk Correct Answer */}
                                                                <div
                                                                    onClick={() => setCorrectOption(q.id, opt.id)}
                                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer flex-shrink-0 transition ${opt.isCorrect ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                                                >
                                                                    {opt.isCorrect && <span className="text-white text-xs font-bold">✓</span>}
                                                                </div>

                                                                <span className="text-sm font-bold text-gray-400 w-4">{String.fromCharCode(65 + i)}.</span>

                                                                <input
                                                                    type="text"
                                                                    className={`flex-1 px-4 py-2 border rounded-lg outline-none text-sm transition ${opt.isCorrect ? 'border-green-500 bg-green-50 ring-1 ring-green-200' : 'border-gray-300 bg-white focus:border-indigo-500'}`}
                                                                    placeholder={`Pilihan ${String.fromCharCode(65 + i)}`}
                                                                    value={opt.text}
                                                                    onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 4. SETTINGS (PREVIEW GRATIS) */}
                            <hr className="border-gray-100" />
                            <div onClick={() => setLessonForm({ ...lessonForm, isFree: !lessonForm.isFree })} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${lessonForm.isFree ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${lessonForm.isFree ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{lessonForm.isFree ? '🔓' : '🔒'}</div>
                                    <div>
                                        <p className={`font-bold text-lg ${lessonForm.isFree ? 'text-indigo-900' : 'text-gray-800'}`}>Preview Gratis</p>
                                        <p className="text-sm text-gray-500 mt-0.5">Materi ini bisa diakses tanpa membeli.</p>
                                    </div>
                                </div>
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${lessonForm.isFree ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
                                    {lessonForm.isFree && <span className="text-white font-bold text-xs">✓</span>}
                                </div>
                            </div>

                        </div>

                        {/* Footer Fixed */}
                        <div className="p-6 border-t border-gray-100 bg-white flex gap-4 flex-shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50">Batal</button>
                            <button onClick={handleSaveLesson} type="button" className="w-2/3 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Simpan Materi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}