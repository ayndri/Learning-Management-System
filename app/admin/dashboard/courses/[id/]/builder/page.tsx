"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Lesson, Section } from "@/lib/db";

export default function CourseBuilderPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- STATE DATA ---
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // --- STATE UI ---
    const [editingSectionId, setEditingSectionId] = useState<number | string | null>(null);
    const [editSectionTitle, setEditSectionTitle] = useState("");
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [activeSectionId, setActiveSectionId] = useState<number | string | null>(null);

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

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`);
                const json = await res.json();
                if (json.success && json.data.sections) {
                    setSections(json.data.sections);
                }
            } catch (error) {
                console.error("Failed to fetch course:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    // ==========================================
    // LOGIKA PERSISTENCE
    // ==========================================
    const handleSaveGlobal = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sections })
            });
            if (res.ok) {
                alert("Kurikulum berhasil disimpan!");
            } else {
                alert("Gagal menyimpan kurikulum.");
            }
        } catch (error) {
            console.error("Error saving curriculum:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // ==========================================
    // LOGIKA SECTION
    // ==========================================
    const handleAddSection = () => {
        if (!newSectionTitle.trim()) return;
        setSections([...sections, { id: Date.now(), title: newSectionTitle, lessons: [] }]);
        setNewSectionTitle("");
        setIsAddingSection(false);
    };

    const handleDeleteSection = (id: number | string) => {
        if (confirm("Hapus bab ini?")) setSections(sections.filter((s) => s.id !== id));
    };

    const startEditSection = (section: Section) => {
        setEditingSectionId(section.id);
        setEditSectionTitle(section.title);
    };

    const saveEditSection = (id: number | string) => {
        setSections(sections.map(s => s.id === id ? { ...s, title: editSectionTitle } : s));
        setEditingSectionId(null);
    };

    // ==========================================
    // LOGIKA LESSON & KUIS
    // ==========================================
    const openAddLessonModal = (sectionId: number | string) => {
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

    const openEditLessonModal = (sectionId: number | string, lesson: Lesson) => {
        setModalMode("edit");
        setActiveSectionId(sectionId);
        setLessonForm({
            ...lesson,
            resources: lesson.resources || [],
            questions: lesson.questions || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteLesson = (sectionId: number | string, lessonId: number | string) => {
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
        const newQuestion = {
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
            let fileType: any = "PDF";
            if (file.name.endsWith(".zip") || file.name.endsWith(".rar")) fileType = "ZIP";
            else if (file.name.match(/\.(jpg|jpeg|png|webp)$/i)) fileType = "IMG";

            const newResource = {
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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <p className="text-gray-500 font-medium">Memuat kurikulum...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto animate-fade-in-up pb-20">
            {/* HEADER PAGE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900 transition underline decoration-dotted underline-offset-4 font-medium">
                        &larr; Kembali
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Kurikulum Kursus</h1>
                        <p className="text-sm text-gray-400 font-medium tracking-wide">ID: {courseId}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={handleSaveGlobal}
                        disabled={isSaving}
                        className="px-8 py-3 text-base font-black bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition disabled:opacity-70 group"
                    >
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan 📦"}
                    </button>
                </div>
            </div>

            {/* --- LIST SECTION --- */}
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <div key={section.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gray-50/50 px-8 py-6 flex items-center justify-between border-b border-gray-100 group">
                            <div className="flex items-center gap-6">
                                <span className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-500 shadow-sm">
                                    {index + 1}
                                </span>
                                {editingSectionId === section.id ? (
                                    <div className="flex gap-2 w-full max-w-md">
                                        <input autoFocus className="px-4 py-2 text-base border-2 border-indigo-500 rounded-xl w-full outline-none" value={editSectionTitle} onChange={(e) => setEditSectionTitle(e.target.value)} />
                                        <button onClick={() => saveEditSection(section.id)} className="text-sm font-bold bg-indigo-600 text-white px-5 rounded-xl">Simpan</button>
                                    </div>
                                ) : (
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{section.title}</h3>
                                )}
                            </div>
                            {editingSectionId !== section.id && (
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEditSection(section)} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteSection(section.id)} className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline">Hapus</button>
                                </div>
                            )}
                        </div>

                        <div className="p-4 space-y-4 bg-white">
                            {section.lessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center justify-between bg-gray-50/50 p-5 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${lesson.type === 'video' ? 'bg-blue-50 text-blue-500' : lesson.type === 'quiz' ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-500'}`}>
                                            {lesson.type === 'video' ? '📺' : lesson.type === 'quiz' ? '📝' : '📄'}
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-gray-900 tracking-tight">{lesson.title}</p>
                                            <div className="flex items-center gap-4 mt-1.5">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-gray-100">{lesson.type}</span>
                                                <span className="text-xs text-gray-400 font-medium italic">~ {lesson.duration}</span>

                                                {lesson.type === 'quiz' && (
                                                    <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-black">
                                                        <span>❓</span> {lesson.questions?.length || 0} Soal
                                                    </span>
                                                )}

                                                {lesson.resources && lesson.resources.length > 0 && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold">
                                                        <span>📎</span> {lesson.resources.length} File
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEditLessonModal(section.id, lesson)} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 transition shadow-sm">✏️</button>
                                        <button onClick={() => handleDeleteLesson(section.id, lesson.id)} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 transition shadow-sm">🗑️</button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => openAddLessonModal(section.id)} className="w-full py-4 text-xs font-black text-indigo-500 border-2 border-dashed border-indigo-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition uppercase tracking-[2px]">
                                + Tambah Materi Baru
                            </button>
                        </div>
                    </div>
                ))}

                {isAddingSection ? (
                    <div className="bg-white p-8 border-2 border-indigo-100 rounded-3xl shadow-xl animate-fade-in-up">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Judul Bab Baru</label>
                        <div className="flex gap-4">
                            <input autoFocus type="text" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} placeholder="Contoh: Database & Backend" className="flex-1 px-6 py-4 border-2 border-gray-100 focus:border-indigo-500 rounded-2xl outline-none text-base font-bold transition" />
                            <button onClick={handleAddSection} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100">Simpan</button>
                            <button onClick={() => setIsAddingSection(false)} className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black">Batal</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setIsAddingSection(true)} className="w-full py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold hover:border-indigo-300 hover:text-indigo-500 hover:bg-white transition shadow-sm hover:shadow-lg uppercase tracking-[3px] text-sm">
                        + Tambah Bab / Section Baru
                    </button>
                )}
            </div>

            {/* ========================================== */}
            {/* MODAL FORM */}
            {/* ========================================== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[40px] w-full max-w-5xl shadow-2xl overflow-hidden animate-scale-up relative z-10 max-h-[90vh] flex flex-col border border-gray-100">

                        {/* Header Fixed */}
                        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 flex-shrink-0">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{modalMode === 'add' ? '✨ Tambah Materi' : '✏️ Edit Materi'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 transition shadow-sm">✕</button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-10 overflow-y-auto custom-scrollbar space-y-10">

                            {/* 1. INFORMASI DASAR */}
                            <div className="space-y-8">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">Informasi Dasar</h4>
                                <div className="grid grid-cols-1 gap-8">
                                    <div>
                                        <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Judul Materi</label>
                                        <input required type="text" className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-bold transition" placeholder="Judul..." value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Tipe Konten</label>
                                            <select className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-bold cursor-pointer" value={lessonForm.type} onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value as any })}>
                                                <option value="video">🎥 Video Embed</option>
                                                <option value="text">📄 Artikel / Teks</option>
                                                <option value="quiz">📝 Kuis (Pilihan Ganda)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Durasi Estimasi</label>
                                            <input required type="text" className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-bold" placeholder="E.g. 10 Menit" value={lessonForm.duration} onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-50" />

                            {/* KONDISI 1: VIDEO / TEXT */}
                            {lessonForm.type !== 'quiz' && (
                                <>
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">Konten Detail</h4>
                                        {lessonForm.type === 'video' && (
                                            <div>
                                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">YouTube / Video URL (Embed)</label>
                                                <input type="url" className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-bold" placeholder="https://www.youtube.com/embed/..." value={lessonForm.contentUrl || ""} onChange={(e) => setLessonForm({ ...lessonForm, contentUrl: e.target.value })} />
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Ikhtisar Materi</label>
                                            <textarea rows={5} className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-medium transition resize-none" placeholder="Jelaskan apa yang akan dipelajari..." value={lessonForm.description || ""} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} />
                                        </div>
                                    </div>

                                    <hr className="border-gray-50" />

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">File Penunjang</h4>
                                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black text-indigo-600 uppercase tracking-[2px] bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100">+ Tambah File</button>
                                        </div>
                                        <div className="bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 p-6 min-h-[120px] flex flex-wrap gap-4 items-center">
                                            {(!lessonForm.resources || lessonForm.resources.length === 0) && (
                                                <div className="w-full text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic opacity-50">Belum ada file terlampir.</div>
                                            )}
                                            {lessonForm.resources?.map((file) => (
                                                <div key={file.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm group">
                                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-[10px] font-black">{file.type}</div>
                                                    <div>
                                                        <p className="text-xs font-black text-gray-900 line-clamp-1">{file.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">{file.size}</p>
                                                    </div>
                                                    <button type="button" onClick={() => handleRemoveResource(file.id)} className="w-6 h-6 flex items-center justify-center bg-red-50 text-red-400 rounded-full text-xs hover:bg-red-500 hover:text-white transition">✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* KONDISI 2: KUIS */}
                            {lessonForm.type === 'quiz' && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">Sistem Kuis</h4>
                                        <button type="button" onClick={handleAddQuestion} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 uppercase">+ Tambah Pertanyaan</button>
                                    </div>

                                    {(!lessonForm.questions || lessonForm.questions.length === 0) ? (
                                        <div className="text-center py-16 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[40px] text-gray-400 font-bold uppercase tracking-widest text-xs opacity-50 italic">
                                            Kuis belum memiliki soal.
                                        </div>
                                    ) : (
                                        <div className="space-y-12">
                                            {lessonForm.questions.map((q, index) => (
                                                <div key={q.id} className="bg-white p-8 rounded-[32px] border-2 border-gray-50 shadow-sm relative group hover:border-indigo-100 transition-colors">
                                                    <div className="absolute top-6 right-6">
                                                        <button type="button" onClick={() => handleRemoveQuestion(q.id)} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm">🗑️</button>
                                                    </div>
                                                    <div className="mb-8">
                                                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[2px] mb-3">Pertanyaan #{index + 1}</label>
                                                        <textarea className="w-full px-6 py-4 border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none font-bold transition resize-none" placeholder="Tulis soal di sini..." rows={2} value={q.text} onChange={(e) => updateQuestionText(q.id, e.target.value)} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2 px-1">Opsi Jawaban (Pilih satu sebagai Kunci)</label>
                                                        {q.options.map((opt, i) => (
                                                            <div key={opt.id} className="flex items-center gap-4">
                                                                <div onClick={() => setCorrectOption(q.id, opt.id)} className={`w-8 h-8 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all ${opt.isCorrect ? 'border-indigo-100 bg-indigo-600 shadow-lg' : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-indigo-300'}`}>
                                                                    {opt.isCorrect && <span className="text-white text-xs">✓</span>}
                                                                </div>
                                                                <span className="text-xs font-black text-gray-300 w-4">{String.fromCharCode(65 + i)}</span>
                                                                <input type="text" className={`flex-1 px-5 py-3 border-2 rounded-2xl outline-none text-sm font-bold transition ${opt.isCorrect ? 'border-indigo-100 bg-indigo-50/30' : 'border-gray-50 bg-gray-50 focus:bg-white focus:border-indigo-500'}`} placeholder={`Pilihan ${String.fromCharCode(65 + i)}`} value={opt.text} onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 4. SETTINGS */}
                            <hr className="border-gray-50" />
                            <div onClick={() => setLessonForm({ ...lessonForm, isFree: !lessonForm.isFree })} className={`flex items-center justify-between p-8 rounded-[32px] border-4 cursor-pointer transition-all group ${lessonForm.isFree ? 'border-indigo-100 bg-indigo-50/30' : 'border-gray-50 hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-xl transition-transform group-hover:scale-110 ${lessonForm.isFree ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-gray-400'}`}>{lessonForm.isFree ? '🔓' : '🔒'}</div>
                                    <div>
                                        <p className={`font-black text-xl tracking-tight ${lessonForm.isFree ? 'text-indigo-900' : 'text-gray-900'}`}>Materi Gratis (Preview)</p>
                                        <p className="text-sm font-medium text-gray-400 mt-1">Siswa dapat melihat materi ini sebelum melakukan pembelian.</p>
                                    </div>
                                </div>
                                <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${lessonForm.isFree ? 'border-indigo-100 bg-indigo-600' : 'border-gray-100 bg-white'}`}>
                                    {lessonForm.isFree && <span className="text-white font-bold text-xs">✓</span>}
                                </div>
                            </div>

                        </div>

                        {/* Footer Fixed */}
                        <div className="p-10 border-t border-gray-50 bg-white flex gap-6 flex-shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 py-5 border-2 border-gray-100 text-gray-400 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition">Batal</button>
                            <button onClick={handleSaveLesson} type="button" className="w-2/3 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-[3px] text-xs shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all">Simpan Konfigurasi ✨</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
