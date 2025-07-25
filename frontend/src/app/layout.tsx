import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import AppLayout from "@/components/layout/AppLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aplikasi Pelaporan Magang Siswa",
  description: "Sistem pelaporan magang siswa untuk guru pembimbing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}