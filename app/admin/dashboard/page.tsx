"use client";

import { useEffect, useState } from "react";

interface Stats {
    totalRevenue: number;
    totalStudents: number;
    totalCourses: number;
    publishedCourses: number;
    totalEnrollments: number;
    totalInstructors: number;
    totalWorkshops: number;
    upcomingWorkshops: number;
    totalRoadmaps: number;
    totalUsers: number;
}

function StatCard({ title, value, icon, color, isLoading }: { title: string, value: string, icon: string, color: string, isLoading: boolean }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
            <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                {isLoading ? (
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                    <h3 className="text-2xl font-black text-gray-900">{value}</h3>
                )}
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
                {icon}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await fetch('/api/stats');
                const json = await res.json();
                if (json.success) setStats(json.data);
            } catch (err) {
                console.error("Failed to load stats:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadStats();
    }, []);

    const formatCurrency = (amount: number) => {
        if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
        if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)}jt`;
        if (amount >= 1_000) return `Rp ${(amount / 1_000).toFixed(0)}rb`;
        return `Rp ${amount}`;
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Ringkasan performa platform EduFlash — data realtime dari database.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Pendapatan"
                    value={stats ? formatCurrency(stats.totalRevenue) : ""}
                    icon="💰"
                    color="bg-green-100 text-green-600"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Total Siswa"
                    value={stats ? stats.totalStudents.toLocaleString('id-ID') : ""}
                    icon="🎓"
                    color="bg-indigo-100 text-indigo-600"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Kursus Terpublikasi"
                    value={stats ? `${stats.publishedCourses} / ${stats.totalCourses}` : ""}
                    icon="📚"
                    color="bg-blue-100 text-blue-600"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Total Pengguna"
                    value={stats ? stats.totalUsers.toLocaleString('id-ID') : ""}
                    icon="👥"
                    color="bg-orange-100 text-orange-600"
                    isLoading={isLoading}
                />
            </div>

            {/* SECONDARY STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">📹</div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Workshop</p>
                            {isLoading ? (
                                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-xl font-black text-gray-900">{stats?.totalWorkshops || 0}</p>
                            )}
                        </div>
                    </div>
                    {!isLoading && (
                        <p className="text-xs text-gray-400">{stats?.upcomingWorkshops || 0} event mendatang</p>
                    )}
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-xl">🗺️</div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Roadmap</p>
                            {isLoading ? (
                                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-xl font-black text-gray-900">{stats?.totalRoadmaps || 0}</p>
                            )}
                        </div>
                    </div>
                    {!isLoading && (
                        <p className="text-xs text-gray-400">Jalur belajar tersedia</p>
                    )}
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">📊</div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Enrollment</p>
                            {isLoading ? (
                                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-xl font-black text-gray-900">{stats?.totalEnrollments?.toLocaleString('id-ID') || 0}</p>
                            )}
                        </div>
                    </div>
                    {!isLoading && (
                        <p className="text-xs text-gray-400">Dari semua kursus</p>
                    )}
                </div>
            </div>

            {/* INFO BOX */}
            {!isLoading && stats && stats.totalCourses === 0 && stats.totalWorkshops === 0 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                    <p className="text-4xl mb-3">🚀</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Siap Digunakan!</h3>
                    <p className="text-sm text-gray-500">Mulai tambahkan kursus, workshop, dan roadmap melalui menu di sidebar kiri.</p>
                </div>
            )}

        </div>
    );
}