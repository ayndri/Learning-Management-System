"use client";

import { useState, useEffect } from "react";

interface Course {
    id: string; title: string; instructor: string; price: number;
    students: number; rating: number; category: string; level: string;
}

interface Workshop {
    id: string; title: string; price: number; sold: number; slots: number;
    instructor: string; status: string;
}

interface RevenueRow {
    id: string;
    type: 'course' | 'workshop';
    title: string;
    instructor: string;
    unitPrice: number;
    sold: number;
    revenue: number;
}

export default function AdminReportsPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState<'all' | 'courses' | 'workshops'>('all');

    useEffect(() => {
        async function load() {
            try {
                const [cRes, wRes] = await Promise.all([
                    fetch('/api/courses'),
                    fetch('/api/workshops'),
                ]);
                const cJson = await cRes.json();
                const wJson = await wRes.json();
                if (cJson.success) setCourses(cJson.data);
                if (wJson.success) setWorkshops(wJson.data);
            } catch (err) {
                console.error("Failed to load report data:", err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    // Build revenue rows
    const courseRows: RevenueRow[] = courses.map(c => ({
        id: c.id, type: 'course', title: c.title, instructor: c.instructor,
        unitPrice: c.price, sold: c.students, revenue: c.price * c.students,
    }));

    const workshopRows: RevenueRow[] = workshops.map(w => ({
        id: w.id, type: 'workshop', title: w.title, instructor: w.instructor,
        unitPrice: w.price, sold: w.sold, revenue: w.price * w.sold,
    }));

    const allRows = [...courseRows, ...workshopRows].sort((a, b) => b.revenue - a.revenue);
    const displayRows = tab === 'courses' ? courseRows.sort((a, b) => b.revenue - a.revenue)
        : tab === 'workshops' ? workshopRows.sort((a, b) => b.revenue - a.revenue)
            : allRows;

    // Stats
    const totalCourseRevenue = courseRows.reduce((s, r) => s + r.revenue, 0);
    const totalWorkshopRevenue = workshopRows.reduce((s, r) => s + r.revenue, 0);
    const totalRevenue = totalCourseRevenue + totalWorkshopRevenue;
    const totalEnrollments = courseRows.reduce((s, r) => s + r.sold, 0);
    const totalTicketsSold = workshopRows.reduce((s, r) => s + r.sold, 0);
    const avgCoursePrice = courses.length > 0 ? courses.reduce((s, c) => s + c.price, 0) / courses.length : 0;

    // Top earner
    const topEarner = allRows.length > 0 ? allRows[0] : null;

    // Category breakdown
    const categoryRevenue: Record<string, number> = {};
    courses.forEach(c => {
        categoryRevenue[c.category] = (categoryRevenue[c.category] || 0) + (c.price * c.students);
    });
    const categoryEntries = Object.entries(categoryRevenue).sort(([, a], [, b]) => b - a);
    const maxCatRevenue = categoryEntries.length > 0 ? categoryEntries[0][1] : 1;

    const formatCurrency = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Laporan Keuangan</h1>
                <p className="text-gray-500 text-sm">Ringkasan pendapatan platform dari kursus dan workshop — data realtime.</p>
            </div>

            {/* === STATS CARDS === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Pendapatan"
                    value={isLoading ? null : formatCurrency(totalRevenue)}
                    icon="💰"
                    color="bg-green-100 text-green-600"
                    sub={isLoading ? null : `Dari ${courses.length} kursus & ${workshops.length} workshop`}
                />
                <StatCard
                    title="Pendapatan Kursus"
                    value={isLoading ? null : formatCurrency(totalCourseRevenue)}
                    icon="📚"
                    color="bg-blue-100 text-blue-600"
                    sub={isLoading ? null : `${totalEnrollments.toLocaleString('id-ID')} enrollment`}
                />
                <StatCard
                    title="Pendapatan Workshop"
                    value={isLoading ? null : formatCurrency(totalWorkshopRevenue)}
                    icon="📹"
                    color="bg-purple-100 text-purple-600"
                    sub={isLoading ? null : `${totalTicketsSold.toLocaleString('id-ID')} tiket terjual`}
                />
                <StatCard
                    title="Rata-rata Harga Kursus"
                    value={isLoading ? null : formatCurrency(Math.round(avgCoursePrice))}
                    icon="📊"
                    color="bg-amber-100 text-amber-600"
                    sub={isLoading ? null : `${courses.filter(c => c.price === 0).length} kursus gratis`}
                />
            </div>

            {/* === TOP EARNER & CATEGORY === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Earner */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">🏆 Produk Paling Menguntungkan</h3>
                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/3 mt-2"></div>
                        </div>
                    ) : topEarner ? (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${topEarner.type === 'course' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                    {topEarner.type === 'course' ? 'Kursus' : 'Workshop'}
                                </span>
                            </div>
                            <h4 className="text-xl font-black text-gray-900">{topEarner.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">Oleh: {topEarner.instructor}</p>
                            <div className="mt-4 flex items-end gap-3">
                                <span className="text-3xl font-black text-green-600">{formatCurrency(topEarner.revenue)}</span>
                                <span className="text-sm text-gray-400 pb-1">dari {topEarner.sold.toLocaleString('id-ID')} penjualan</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">Belum ada data pendapatan.</p>
                    )}
                </div>

                {/* Category Breakdown */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">📂 Pendapatan per Kategori</h3>
                    {isLoading ? (
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                                </div>
                            ))}
                        </div>
                    ) : categoryEntries.length > 0 ? (
                        <div className="space-y-4">
                            {categoryEntries.map(([cat, rev]) => (
                                <div key={cat}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{cat}</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(rev)}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                                            style={{ width: `${(rev / maxCatRevenue) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">Belum ada data kategori.</p>
                    )}
                </div>
            </div>

            {/* === DETAIL TABLE === */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6">
                    {[
                        { key: 'all' as const, label: 'Semua Produk' },
                        { key: 'courses' as const, label: 'Kursus Saja' },
                        { key: 'workshops' as const, label: 'Workshop Saja' },
                    ].map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`py-4 px-4 text-sm font-medium border-b-2 transition ${tab === t.key
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#</th>
                                <th className="px-6 py-4 font-semibold">Produk</th>
                                <th className="px-6 py-4 font-semibold">Tipe</th>
                                <th className="px-6 py-4 font-semibold">Harga Satuan</th>
                                <th className="px-6 py-4 font-semibold">Terjual</th>
                                <th className="px-6 py-4 font-semibold text-right">Pendapatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                                            <p className="text-gray-400 text-sm font-medium">Memuat laporan...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : displayRows.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <p className="text-4xl mb-2">📊</p>
                                        <p className="text-gray-500 font-medium">Belum ada data transaksi.</p>
                                    </td>
                                </tr>
                            ) : displayRows.map((row, idx) => (
                                <tr key={`${row.type}-${row.id}`} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-400 font-medium">{idx + 1}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900 line-clamp-1">{row.title}</p>
                                        <p className="text-xs text-gray-500">{row.instructor}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${row.type === 'course'
                                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                                            : 'bg-purple-50 text-purple-700 border-purple-200'
                                            }`}>
                                            {row.type === 'course' ? '📚 Kursus' : '📹 Workshop'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.unitPrice === 0
                                            ? <span className="text-green-600 font-bold">Gratis</span>
                                            : <span className="font-medium">{formatCurrency(row.unitPrice)}</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {row.sold.toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`font-black text-lg ${row.revenue > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                                            {row.revenue > 0 ? formatCurrency(row.revenue) : '-'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Totals */}
                {!isLoading && displayRows.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{displayRows.length} produk ditampilkan</p>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Total Pendapatan</p>
                            <p className="text-xl font-black text-green-600">
                                {formatCurrency(displayRows.reduce((s, r) => s + r.revenue, 0))}
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

// Stat Card Component
function StatCard({ title, value, icon, color, sub }: {
    title: string; value: string | null; icon: string; color: string; sub: string | null;
}) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
            </div>
            {value === null ? (
                <div className="h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <h3 className="text-xl font-black text-gray-900">{value}</h3>
            )}
            {sub !== null && !value ? null : sub && (
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
            )}
        </div>
    );
}
