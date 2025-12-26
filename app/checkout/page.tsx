"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
    const router = useRouter();

    // State
    const [paymentMethod, setPaymentMethod] = useState("qris"); // qris | card | transfer
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePay = async () => {
        setIsLoading(true);
        // Simulasi proses payment gateway
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 animate-fade-in-up">
            {/* --- MODAL SUKSES (Overlay) --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-short">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                            🎉
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Terima kasih telah berlangganan Pro Member. Akun Anda kini aktif.
                        </p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                        >
                            Masuk ke Dashboard
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 mb-4 inline-block">&larr; Batalkan</Link>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- KOLOM KIRI: METODE PEMBAYARAN --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Informasi User */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">1</span>
                                Informasi Penagihan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Nama Lengkap</label>
                                    <input type="text" defaultValue="Rizky Developer" className="w-full p-3 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-indigo-100 outline-none text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                    <input type="email" defaultValue="siswa@gmail.com" className="w-full p-3 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-indigo-100 outline-none text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Metode Pembayaran */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">2</span>
                                Metode Pembayaran
                            </h3>

                            <div className="space-y-3">
                                {/* Option: QRIS */}
                                <div
                                    onClick={() => setPaymentMethod("qris")}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-600">QRIS</div>
                                        <span className="font-medium text-gray-900">Scan QRIS (GoPay, OVO, Dana)</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qris' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                        {paymentMethod === 'qris' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                                    </div>
                                </div>

                                {/* Option: Virtual Account */}
                                <div
                                    onClick={() => setPaymentMethod("transfer")}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xs text-white">BCA</div>
                                        <span className="font-medium text-gray-900">Virtual Account Bank</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                        {paymentMethod === 'transfer' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                                    </div>
                                </div>

                                {/* Option: Credit Card */}
                                <div
                                    onClick={() => setPaymentMethod("card")}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center font-bold text-xs text-white">VISA</div>
                                        <span className="font-medium text-gray-900">Kartu Kredit / Debit</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- KOLOM KANAN: RINGKASAN --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-8">
                            <h3 className="font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>

                            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-2xl text-white">
                                    ⚡
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Pro Member</h4>
                                    <p className="text-xs text-gray-500">Akses Bulanan</p>
                                    <p className="text-sm font-semibold text-indigo-600 mt-1">Rp 100.000</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>Rp 100.000</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Pajak (PPN 11%)</span>
                                    <span>Rp 11.000</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Diskon (Promo Baru)</span>
                                    <span>-Rp 11.000</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>Rp 100.000</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={isLoading}
                                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-indigo-600 transition shadow-lg shadow-indigo-200 disabled:bg-gray-400 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Bayar Sekarang"
                                )}
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Transaksi aman & terenkripsi SSL 256-bit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}