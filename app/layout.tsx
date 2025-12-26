import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Ambil ketebalan yang dibutuhkan
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "EduFlash",
  description: "Platform belajar masa depan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}