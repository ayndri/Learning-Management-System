"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const [selectedPayment, setSelectedPayment] = useState("bca");
    const [isProcessing, setIsProcessing] = useState(false);

    // Dummy Item yang akan dibeli
    const cartItem = {
        title: "Fullstack Laravel 10: Membangun E-Commerce Lengkap",
        instructor: "Budi Santoso",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        price: 250000,
        discount: 50000, // Diskon
        tax: 2200 // PPN 11% (misal dari harga setelah diskon)
    };

    const total = cartItem.price - cartItem.discount + cartItem.tax;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulasi proses pembayaran
        setTimeout(() => {
            alert("Pembayaran Berhasil! Mengarahkan ke kelas...");
            setIsProcessing(false);
            // Di real app, redirect ke /dashboard atau /courses/[id]/learn
            window.location.href = "/dashboard";
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/courses/1" className="text-gray-500 hover:text-gray-900 transition font-bold">
                        &larr; Kembali
                    </Link>
                    <h1 className="text-2xl font-extrabold text-gray-900">Selesaikan Pembayaran</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Account Info */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">Informasi Akun</h3>
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                    R
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Rizky Developer</p>
                                    <p className="text-xs text-gray-500">rizky@example.com</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">Pilih Metode Pembayaran</h3>

                            <div className="space-y-3">
                                {/* Virtual Accounts */}
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">Virtual Account</p>

                                {['bca', 'mandiri', 'bni'].map((bank) => (
                                    <label
                                        key={bank}
                                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === bank ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                checked={selectedPayment === bank}
                                                onChange={() => setSelectedPayment(bank)}
                                            />
                                            <span className="uppercase font-bold text-gray-700">{bank} Virtual Account</span>
                                        </div>
                                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">LOGO</div>
                                    </label>
                                ))}

                                {/* E-Wallets */}
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">E-Wallet</p>

                                {['gopay', 'ovo', 'dana'].map((wallet) => (
                                    <label
                                        key={wallet}
                                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === wallet ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                checked={selectedPayment === wallet}
                                                onChange={() => setSelectedPayment(wallet)}
                                            />
                                            <span className="capitalize font-bold text-gray-700">{wallet}</span>
                                        </div>
                                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">LOGO</div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-6 text-lg">Ringkasan Pesanan</h3>

                            {/* Item */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                                <img src={cartItem.thumbnail} alt="Course" className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{cartItem.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{cartItem.instructor}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 text-sm">Rp {cartItem.price.toLocaleString('id-ID')}</p>
                                </div>
                            </div>

                            {/* Calculation */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Harga Asli</span>
                                    <span>Rp {cartItem.price.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600 font-medium">
                                    <span>Diskon</span>
                                    <span>- Rp {cartItem.discount.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>PPN (11%)</span>
                                    <span>Rp {cartItem.tax.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total Bayar</span>
                                    <span className="text-2xl font-black text-indigo-600">Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* Button Pay */}
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Bayar Sekarang"
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                🔒 Pembayaran aman & terenkripsi SSL
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}