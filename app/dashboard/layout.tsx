"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Setup Font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname(); // Untuk mendeteksi URL aktif
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fungsi Logout
    const handleLogout = () => {
        // 1. Hapus data sesi (simulasi)
        localStorage.removeItem("user_session");
        // 2. Arahkan ke halaman login
        router.push("/login");
    };

    return (
        <div className={`min-h-screen bg-gray-50 flex ${poppins.className}`}>

            {/* --- SIDEBAR (Desktop) --- */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-30 shadow-sm">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">⚡</div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">EduFlash</span>
                    </Link>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    <NavItem href="/dashboard" icon={HomeIcon} active={pathname === "/dashboard"}>
                        Dashboard
                    </NavItem>
                    <NavItem href="/dashboard/courses" icon={BookIcon} active={pathname.includes("/dashboard/courses")}>
                        Kelas Saya
                    </NavItem>
                    <NavItem href="/dashboard/certificates" icon={TrophyIcon} active={pathname === "/dashboard/certificates"}>
                        Sertifikat
                    </NavItem>
                    <NavItem href="/dashboard/discuss" icon={ChatIcon} active={pathname === "/dashboard/discuss"}>
                        Diskusi
                    </NavItem>
                    <NavItem href="/dashboard/leaderboard" icon={ChartIcon} active={pathname === "/dashboard/leaderboard"}>
                        Leaderboard
                    </NavItem>

                    <div className="pt-6 mt-6 border-t border-gray-100">
                        <NavItem href="/dashboard/settings" icon={SettingsIcon} active={pathname === "/dashboard/settings"}>
                            Pengaturan
                        </NavItem>
                        {/* Tombol Logout Khusus */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:pl-6"
                        >
                            <LogoutIcon className="w-5 h-5" />
                            Keluar
                        </button>
                    </div>
                </nav>

                {/* User Profile Mini */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden p-0.5">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-700 truncate">Rizky Developer</p>
                            <p className="text-xs text-gray-500 truncate">Pro Member</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MOBILE LAYOUT --- */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">

                {/* Mobile Header (Hanya muncul di HP) */}
                <header className="h-16 bg-white border-b border-gray-200 flex md:hidden items-center justify-between px-4 sticky top-0 z-20 backdrop-blur-md bg-white/80">
                    <span className="font-bold text-lg flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">⚡</div>
                        EduFlash
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        {isMobileMenuOpen ? "✕" : "☰"}
                    </button>
                </header>

                {/* Mobile Menu Dropdown (Simple) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-200 p-4 absolute top-16 left-0 w-full z-10 shadow-xl animate-fade-in-up">
                        <nav className="space-y-2">
                            <Link href="/dashboard" className="block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">Dashboard</Link>
                            <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Kelas Saya</Link>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">Keluar</button>
                        </nav>
                    </div>
                )}

                {/* --- MAIN PAGE CONTENT --- */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

// --- Helper Components ---

function NavItem({ href, icon: Icon, children, active }: any) {
    return (
        <Link
            href={href}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
        >
            <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
            {children}
        </Link>
    );
}

// --- Icons ---
const HomeIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-9v10a1 1 0 00-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BookIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const TrophyIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChatIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
const SettingsIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const ChartIcon = (props: any) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;