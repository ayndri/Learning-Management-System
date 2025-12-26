"use client";

export default function LeaderboardPage() {
    // Dummy Data Leaderboard
    const topThree = [
        { rank: 2, name: "Sarah Putri", xp: 12500, avatar: "bg-pink-500" },
        { rank: 1, name: "Rizky Dev", xp: 15000, avatar: "bg-indigo-600" }, // User kita ceritanya juara 1
        { rank: 3, name: "Budi Santoso", xp: 11200, avatar: "bg-green-500" },
    ];

    const others = [
        { rank: 4, name: "Andi Saputra", xp: 9800, change: "up" },
        { rank: 5, name: "Siti Aminah", xp: 9500, change: "down" },
        { rank: 6, name: "Dewi Lestari", xp: 9200, change: "same" },
        { rank: 7, name: "John Doe", xp: 8900, change: "up" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* --- HEADER --- */}
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">Papan Peringkat 🏆</h1>
                <p className="text-gray-500 text-sm">Bersainglah dengan siswa lain dan jadilah yang terbaik!</p>
            </div>

            {/* --- TOP 3 PODIUM (Visual Keren) --- */}
            <div className="flex justify-center items-end gap-4 md:gap-8 py-8 min-h-[300px]">
                {topThree.map((user) => (
                    <div key={user.rank} className={`flex flex-col items-center ${user.rank === 1 ? 'order-2 z-10' : user.rank === 2 ? 'order-1' : 'order-3'}`}>

                        {/* Avatar & Crown */}
                        <div className="relative mb-4">
                            {user.rank === 1 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">👑</div>}
                            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xl md:text-3xl ${user.avatar}`}>
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                #{user.rank}
                            </div>
                        </div>

                        {/* Podium Bar */}
                        <div className={`w-24 md:w-32 rounded-t-2xl flex flex-col items-center justify-end pb-4 text-white shadow-xl ${user.rank === 1 ? 'h-48 bg-gradient-to-b from-yellow-400 to-yellow-600' :
                            user.rank === 2 ? 'h-32 bg-gradient-to-b from-gray-300 to-gray-500' :
                                'h-24 bg-gradient-to-b from-orange-300 to-orange-500'
                            }`}>
                            <p className="font-bold text-lg md:text-xl drop-shadow-md">{user.xp / 1000}k</p>
                            <p className="text-xs opacity-80">XP</p>
                        </div>

                        {/* Name */}
                        <p className="mt-2 font-bold text-gray-700 text-sm md:text-base text-center w-24 md:w-32 truncate">
                            {user.name}
                        </p>
                    </div>
                ))}
            </div>

            {/* --- LIST PERINGKAT LAINNYA --- */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {others.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-400 w-6 text-center">{user.rank}</span>

                            {/* Indikator Naik/Turun */}
                            <div className="text-xs">
                                {user.change === 'up' && <span className="text-green-500">▲</span>}
                                {user.change === 'down' && <span className="text-red-500">▼</span>}
                                {user.change === 'same' && <span className="text-gray-300">-</span>}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                                    {user.name.charAt(0)}
                                </div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                            </div>
                        </div>

                        <div className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">
                            {user.xp} XP
                        </div>
                    </div>
                ))}

                <div className="p-4 text-center">
                    <button className="text-sm text-gray-500 hover:text-indigo-600 font-medium">Muat lebih banyak...</button>
                </div>
            </div>
        </div>
    );
}