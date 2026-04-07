"use client";

import { useEffect, useState } from "react";

interface SocialLinks {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

interface Settings {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    address: string;
    socialLinks: SocialLinks;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Pengaturan berhasil diperbarui!" });
            } else {
                setMessage({ type: "error", text: "Gagal memperbarui pengaturan." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Terjadi kesalahan koneksi." });
        } finally {
            setSaving(false);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleChange = (field: keyof Settings, value: any) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleSocialChange = (field: keyof SocialLinks, value: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            socialLinks: { ...settings.socialLinks, [field]: value },
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
                    <p className="text-gray-500">Kelola identitas dan konfigurasi global platform Anda.</p>
                </div>
                {message && (
                    <div className={`px-4 py-2 rounded-lg text-sm font-medium animate-fade-in ${
                        message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                        {message.type === "success" ? "✅" : "❌"} {message.text}
                    </div>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Brand & Identity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">Identitas Situs</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Nama Situs</label>
                                <input
                                    type="text"
                                    value={settings?.siteName || ""}
                                    onChange={(e) => handleChange("siteName", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Deskripsi Situs</label>
                                <input
                                    type="text"
                                    value={settings?.siteDescription || ""}
                                    onChange={(e) => handleChange("siteDescription", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">Kontak & Alamat</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email Support</label>
                                <input
                                    type="email"
                                    value={settings?.contactEmail || ""}
                                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input
                                    type="text"
                                    value={settings?.contactPhone || ""}
                                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Alamat Kantor</label>
                            <textarea
                                value={settings?.address || ""}
                                onChange={(e) => handleChange("address", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">Media Sosial</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(["facebook", "instagram", "twitter", "linkedin"] as const).map((platform) => (
                            <div key={platform} className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 capitalize">{platform}</label>
                                <input
                                    type="url"
                                    value={settings?.socialLinks[platform] || ""}
                                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                                    placeholder={`https://${platform}.com/...`}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Controls */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-800">Kontrol Sistem</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <h4 className="font-medium text-gray-900">Mode Pemeliharaan</h4>
                                <p className="text-xs text-gray-500">Nonaktifkan akses publik sementara.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleChange("maintenanceMode", !settings?.maintenanceMode)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                    settings?.maintenanceMode ? "bg-red-500" : "bg-gray-200"
                                }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings?.maintenanceMode ? "translate-x-6" : "translate-x-1"
                                }`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <h4 className="font-medium text-gray-900">Registrasi Siswa</h4>
                                <p className="text-xs text-gray-500">Izinkan pengguna baru mendaftar.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleChange("registrationEnabled", !settings?.registrationEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                    settings?.registrationEnabled ? "bg-indigo-600" : "bg-gray-200"
                                }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings?.registrationEnabled ? "translate-x-6" : "translate-x-1"
                                }`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transform hover:-translate-y-0.5 active:translate-y-0 transition flex items-center gap-2 ${
                            saving ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                    >
                        {saving ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Menyimpan...
                            </>
                        ) : (
                            "Simpan Perubahan"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
