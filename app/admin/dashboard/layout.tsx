"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [adminName, setAdminName] = useState("Administrator");

    useEffect(() => {
        try {
            const session = localStorage.getItem("user_session");
            if (session) {
                const user = JSON.parse(session);
                setAdminName(user.name || "Administrator");
            }
        } catch {}
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin_session");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">

            {/* --- ADMIN SIDEBAR (DARK THEME) --- */}
            <aside className="w-64 bg-gray-900 text-white flex-col hidden md:flex fixed h-full z-20">
                <div className="h-20 flex items-center px-6 border-b border-gray-800">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span className="text-indigo-500">🛡️</span> AdminPanel
                    </div>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    <AdminNavItem href="/admin/dashboard" active={pathname === "/admin/dashboard"} icon="📊">Overview</AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/users" active={pathname.includes("/users")} icon="👥">Manajemen User</AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/courses" active={pathname.includes("/courses")} icon="📚">Kelola Kursus</AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/reports" active={pathname.includes("/reports")} icon="📑">Laporan Keuangan</AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/settings" active={pathname.includes("/settings")} icon="⚙️">Pengaturan Sistem</AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/workshops" active={pathname.includes("/workshops")} icon="📹">Kelola Workshop</AdminNavItem>
                    <AdminNavItem
                        href="/admin/dashboard/roadmaps"
                        active={pathname.includes("/roadmaps")}
                        icon="🗺️"
                    >
                        Kelola Roadmap
                    </AdminNavItem>
                    <AdminNavItem href="/admin/dashboard/submissions" active={pathname.includes("/submissions")} icon="📥">
                        Review Project
                    </AdminNavItem>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:bg-gray-800 rounded-lg transition">
                        🚪 Keluar
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
                {/* Topbar Admin */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-gray-700">Selamat Datang, {adminName} 👋</h2>
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        {adminName.charAt(0).toUpperCase()}
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Helper Component untuk Menu Admin
function AdminNavItem({ href, active, icon, children }: any) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
        >
            <span>{icon}</span>
            {children}
        </Link>
    )
}