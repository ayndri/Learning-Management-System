"use client";

import { useState, useEffect } from "react";

interface LeaderboardEntry {
    id: string;
    userId: string | null;
    name: string;
    xp: number;
}

interface UserSession {
    id: string;
    name: string;
}

export default function LeaderboardPage() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [user, setUser] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user session
        try {
            const session = localStorage.getItem("user_session");
            if (session) setUser(JSON.parse(session));
        } catch {}

        async function loadLeaderboard() {
            try {
                const res = await fetch('/api/leaderboard');
                const json = await res.json();
                if (json.success) setEntries(json.data);
            } catch (err) {
                console.error("Failed to load leaderboard:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadLeaderboard();
    }, []);

    const podiumColors = ['bg-indigo-600', 'bg-pink-500', 'bg-green-500', 'bg-orange-500', 'bg-teal-500', 'bg-amber-500', 'bg-cyan-500'];

    // Top 3 for podium (order: 2, 1, 3 for visual)
    const topThree = entries.slice(0, 3);
    const podiumOrder = topThree.length >= 3
        ? [topThree[1], topThree[0], topThree[2]] // 2nd, 1st, 3rd
        : topThree;

    const others = entries.slice(3);

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">Papan Peringkat 🏆</h1>
                <p className="text-gray-500 text-sm">Bersainglah dengan siswa lain dan jadilah yang terbaik!</p>
            </div>

            {/* --- LOADING STATE --- */}
            {isLoading ? (
                <div className="space-y-6">
                    <div className="flex justify-center items-end gap-8 py-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex flex-col items-center animate-pulse">
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-200 mb-4"></div>
                                <div className={`w-24 md:w-32 rounded-t-2xl bg-gray-200 ${i === 2 ? 'h-48' : i === 1 ? 'h-32' : 'h-24'}`}></div>
                                <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : entries.length > 0 ? (
                <>
                    {/* --- TOP 3 PODIUM --- */}
                    {topThree.length >= 3 && (
                        <div className="flex justify-center items-end gap-4 md:gap-8 py-8 min-h-[300px]">
                            {podiumOrder.map((entry, idx) => {
                                const rank = entries.indexOf(entry) + 1;
                                const isCurrentUser = user && entry.userId === user.id;
                                return (
                                    <div key={entry.id} className={`flex flex-col items-center ${rank === 1 ? 'order-2 z-10' : rank === 2 ? 'order-1' : 'order-3'}`}>
                                        {/* Avatar & Crown */}
                                        <div className="relative mb-4">
                                            {rank === 1 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">👑</div>}
                                            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 ${isCurrentUser ? 'border-yellow-400' : 'border-white'} shadow-lg flex items-center justify-center text-white font-bold text-xl md:text-3xl ${podiumColors[entries.indexOf(entry) % podiumColors.length]}`}>
                                                {entry.name.charAt(0)}
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                                #{rank}
                                            </div>
                                        </div>

                                        {/* Podium Bar */}
                                        <div className={`w-24 md:w-32 rounded-t-2xl flex flex-col items-center justify-end pb-4 text-white shadow-xl ${rank === 1 ? 'h-48 bg-gradient-to-b from-yellow-400 to-yellow-600' :
                                            rank === 2 ? 'h-32 bg-gradient-to-b from-gray-300 to-gray-500' :
                                                'h-24 bg-gradient-to-b from-orange-300 to-orange-500'
                                            }`}>
                                            <p className="font-bold text-lg md:text-xl drop-shadow-md">{(entry.xp / 1000).toFixed(1)}k</p>
                                            <p className="text-xs opacity-80">XP</p>
                                        </div>

                                        {/* Name */}
                                        <p className={`mt-2 font-bold text-sm md:text-base text-center w-24 md:w-32 truncate ${isCurrentUser ? 'text-indigo-600' : 'text-gray-700'}`}>
                                            {isCurrentUser ? `${entry.name} (Anda)` : entry.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* --- LIST PERINGKAT LAINNYA --- */}
                    {others.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            {others.map((entry, idx) => {
                                const rank = entries.indexOf(entry) + 1;
                                const isCurrentUser = user && entry.userId === user.id;
                                return (
                                    <div key={entry.id} className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition ${isCurrentUser ? 'bg-indigo-50' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-gray-400 w-6 text-center">{rank}</span>

                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${podiumColors[(rank - 1) % podiumColors.length]}`}>
                                                    {entry.name.charAt(0)}
                                                </div>
                                                <p className={`font-semibold ${isCurrentUser ? 'text-indigo-600' : 'text-gray-800'}`}>
                                                    {isCurrentUser ? `${entry.name} (Anda)` : entry.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">
                                            {entry.xp.toLocaleString('id-ID')} XP
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-lg font-bold text-gray-700">Papan Peringkat Kosong</h3>
                    <p className="text-gray-500 text-sm mt-2">Mulai belajar untuk mendapatkan XP dan masuk leaderboard!</p>
                </div>
            )}
        </div>
    );
}