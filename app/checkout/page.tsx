"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const paymentMethods = {
    banks: [
        { id: "bca", name: "BCA Virtual Account", color: "bg-blue-600" },
        { id: "mandiri", name: "Mandiri Virtual Account", color: "bg-yellow-500" },
        { id: "bni", name: "BNI Virtual Account", color: "bg-orange-500" },
    ],
    wallets: [
        { id: "gopay", name: "GoPay", color: "bg-green-500" },
        { id: "ovo", name: "OVO", color: "bg-purple-600" },
        { id: "dana", name: "DANA", color: "bg-blue-500" },
    ],
};

const typeLabel: Record<string, string> = {
    course: "Kursus",
    workshop: "Workshop",
    roadmap: "Roadmap",
};

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type") ?? "";
    const id = searchParams.get("id") ?? "";

    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
    const [item, setItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState("bca");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        if (!session) {
            router.replace(`/login?redirect=/checkout?type=${type}&id=${id}`);
            return;
        }
        setUser(JSON.parse(session));

        const fetchItem = async () => {
            if (!type || !id) { setIsLoading(false); return; }
            try {
                const endpointMap: Record<string, string> = {
                    course: `/api/courses/${id}`,
                    workshop: `/api/workshops/${id}`,
                    roadmap: `/api/roadmaps/${id}`,
                };
                const res = await fetch(endpointMap[type] ?? "");
                const json = await res.json();
                if (json.success) setItem(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItem();
    }, [type, id, router]);

    const handlePayment = async () => {
        if (!user || !item) return;
        setIsProcessing(true);
        // Simulasi delay pembayaran
        await new Promise(res => setTimeout(res, 2000));
        try {
            if (type === 'course') {
                await fetch('/api/enrollments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, courseId: id }),
                });
            } else if (type === 'workshop') {
                await fetch('/api/workshop-enrollments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, workshopId: id }),
                });
            } else if (type === 'roadmap') {
                await fetch('/api/roadmap-enrollments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, roadmapId: id }),
                });
            }
            alert(`Pembayaran Berhasil! Selamat datang di "${item.title}". Konfirmasi telah dikirim ke ${user.email}`);
            window.location.href = type === 'course' ? `/courses/${id}/learn` : type === 'workshop' ? '/dashboard/workshops' : type === 'roadmap' ? '/dashboard/roadmaps' : '/dashboard';
        } catch {
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                    <p className="text-gray-400 font-semibold text-sm">Mempersiapkan tagihan...</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <p className="text-gray-500 font-bold">Produk tidak ditemukan.</p>
                <Link href="/courses" className="text-indigo-600 font-bold hover:underline">← Kembali ke Katalog</Link>
            </div>
        );
    }

    const price = item.price || 0;
    const discount = type === "roadmap" ? 0 : Math.floor(price * 0.2);
    const tax = Math.floor((price - discount) * 0.11);
    const total = price - discount + tax;

    const selectedMethod =
        [...paymentMethods.banks, ...paymentMethods.wallets].find(m => m.id === selectedPayment);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* TOP BAR */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-md group-hover:rotate-12 transition-transform duration-300">
                            ⚡
                        </div>
                        <span className="font-extrabold text-lg tracking-tight text-gray-900">
                            Edu<span className="text-indigo-600">Flash</span>.
                        </span>
                    </Link>

                    {/* Steps */}
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold">
                        <span className="flex items-center gap-1.5 text-indigo-600">
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                            Detail
                        </span>
                        <span className="w-8 h-px bg-gray-200"></span>
                        <span className="flex items-center gap-1.5 text-indigo-600">
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                            Pembayaran
                        </span>
                        <span className="w-8 h-px bg-gray-200"></span>
                        <span className="flex items-center gap-1.5 text-gray-300">
                            <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[10px]">3</span>
                            Konfirmasi
                        </span>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="text-sm font-bold text-gray-400 hover:text-gray-700 transition flex items-center gap-1"
                    >
                        ← Kembali
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT — 3 cols */}
                    <div className="lg:col-span-3 space-y-5">

                        {/* Account */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="font-black text-sm text-gray-900 uppercase tracking-widest">Akun Pembeli</h3>
                                <span className="text-[10px] font-black text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full uppercase tracking-wider">Verified ✔</span>
                            </div>
                            <div className="p-6 flex items-center gap-5">
                                <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 flex-shrink-0">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-base">{user?.name}</p>
                                    <p className="text-sm text-gray-400 font-medium">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="font-black text-sm text-gray-900 uppercase tracking-widest">Metode Pembayaran</h3>
                            </div>
                            <div className="p-6 space-y-5">

                                {/* Virtual Account */}
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-3">Virtual Account</p>
                                    <div className="space-y-2.5">
                                        {paymentMethods.banks.map(bank => (
                                            <label
                                                key={bank.id}
                                                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === bank.id ? 'border-indigo-500 bg-indigo-50/40' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${selectedPayment === bank.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                                                        {selectedPayment === bank.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                    <input type="radio" name="payment" className="hidden" checked={selectedPayment === bank.id} onChange={() => setSelectedPayment(bank.id)} />
                                                    <span className="font-bold text-gray-800 text-sm">{bank.name}</span>
                                                </div>
                                                <div className={`w-10 h-7 ${bank.color} rounded-lg flex items-center justify-center`}>
                                                    <span className="text-white text-[9px] font-black uppercase">{bank.id}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* E-Wallet */}
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-3">Dompet Digital</p>
                                    <div className="space-y-2.5">
                                        {paymentMethods.wallets.map(wallet => (
                                            <label
                                                key={wallet.id}
                                                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === wallet.id ? 'border-indigo-500 bg-indigo-50/40' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${selectedPayment === wallet.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                                                        {selectedPayment === wallet.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                    <input type="radio" name="payment" className="hidden" checked={selectedPayment === wallet.id} onChange={() => setSelectedPayment(wallet.id)} />
                                                    <span className="font-bold text-gray-800 text-sm">{wallet.name}</span>
                                                </div>
                                                <div className={`w-10 h-7 ${wallet.color} rounded-lg flex items-center justify-center`}>
                                                    <span className="text-white text-[9px] font-black uppercase">{wallet.id}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security note */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-100 rounded-xl">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <p className="text-xs font-semibold text-green-700">Transaksi ini dilindungi enkripsi SSL 256-bit. Data pembayaran kamu aman bersama kami.</p>
                        </div>
                    </div>

                    {/* RIGHT — 2 cols */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100 sticky top-24 overflow-hidden">

                            {/* Item preview */}
                            <div className="relative h-36 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">
                                        {typeLabel[type] ?? type}
                                    </span>
                                    <h4 className="font-black text-white text-sm leading-tight line-clamp-2">{item.title}</h4>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">Ringkasan Tagihan</p>

                                {/* Breakdown */}
                                <div className="space-y-3 text-sm mb-5">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Harga asli</span>
                                        <span className="font-bold text-gray-800">Rp {price.toLocaleString('id-ID')}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600 font-bold">
                                            <span>Diskon 20%</span>
                                            <span>− Rp {discount.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>PPN 11%</span>
                                        <span className="font-bold text-gray-800">Rp {tax.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-dashed border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-end">
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Bayar</p>
                                        <p className="text-3xl font-black text-indigo-600 leading-none">
                                            Rp {total.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    {selectedMethod && (
                                        <p className="text-right text-xs text-gray-400 font-medium mt-1">via {selectedMethod.name}</p>
                                    )}
                                </div>

                                {/* Pay button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-base hover:bg-gray-900 transition-all shadow-xl shadow-indigo-200 hover:shadow-gray-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isProcessing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Bayar Sekarang
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[2px] mt-4">
                                    🔒 SSL Secured · Refund 30 Hari
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 animate-spin rounded-full"></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
