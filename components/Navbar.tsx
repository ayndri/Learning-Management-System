"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/courses" },
    { name: "Workshop", href: "/workshop" },
    { name: "Jalur Belajar", href: "/roadmap" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        if (session) setUser(JSON.parse(session));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_session");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                            ⚡
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                            Edu<span className="text-indigo-600">Flash</span>.
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold transition relative group ${pathname === item.href ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-gray-200"></div>

                        {user ? (
                            <div className="flex items-center gap-3 group relative">
                                <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition leading-none">{user.name}</p>
                                        <p className="text-[10px] text-gray-400 capitalize">{user.role}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs text-gray-400 hover:text-red-500 transition font-bold ml-1"
                                    title="Keluar"
                                >
                                    ↩
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition">
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-lg shadow-gray-200 hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                                >
                                    Daftar Gratis
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-600 focus:outline-none"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 shadow-xl">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block text-sm font-semibold py-1 ${pathname === item.href ? "text-indigo-600" : "text-gray-600"}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 pt-3">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-[10px] text-gray-400 capitalize">{user.role}</p>
                                    </div>
                                </Link>
                                <button onClick={handleLogout} className="text-xs text-red-400 font-bold">Keluar</button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link href="/login" className="flex-1 text-center py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700">Masuk</Link>
                                <Link href="/register" className="flex-1 text-center py-2 bg-gray-900 text-white rounded-lg text-sm font-bold">Daftar</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
