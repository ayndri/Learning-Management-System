"use client";

// Komponen Card Statistik Kecil
function StatCard({ title, value, trend, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-black text-gray-900">{value}</h3>
                <p className={`text-xs font-bold mt-2 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {trend} <span className="text-gray-400 font-normal">dari bulan lalu</span>
                </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
                {icon}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-fade-in-up">

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Ringkasan performa platform EduFlash hari ini.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Pendapatan"
                    value="Rp 150.4jt"
                    trend="+12%"
                    icon="💰"
                    color="bg-green-100 text-green-600"
                />
                <StatCard
                    title="Siswa Aktif"
                    value="12,340"
                    trend="+5%"
                    icon="🎓"
                    color="bg-indigo-100 text-indigo-600"
                />
                <StatCard
                    title="Kursus Terjual"
                    value="845"
                    trend="+18%"
                    icon="📚"
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard
                    title="Mentor Baru"
                    value="24"
                    trend="+2"
                    icon="👨‍🏫"
                    color="bg-orange-100 text-orange-600"
                />
            </div>

            {/* RECENT TRANSACTIONS (Preview) */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg">Transaksi Terbaru</h3>
                    <button className="text-indigo-600 text-sm font-bold hover:underline">Lihat Semua</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-500 border-b border-gray-100">
                            <tr>
                                <th className="pb-3 font-semibold">User</th>
                                <th className="pb-3 font-semibold">Kursus</th>
                                <th className="pb-3 font-semibold">Harga</th>
                                <th className="pb-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="group hover:bg-gray-50 transition">
                                    <td className="py-3 font-medium text-gray-900">Budi Santoso</td>
                                    <td className="py-3 text-gray-500">Fullstack Laravel 10</td>
                                    <td className="py-3 text-gray-900 font-bold">Rp 250.000</td>
                                    <td className="py-3">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Success</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}