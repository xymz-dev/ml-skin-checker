import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ML Skin Checker - Cek Koleksi Skin Mobile Legends",
  description: "Cek koleksi skin ML kamu dengan desain premium, buat poster flexing yang bisa di-share ke sosmed. Support auto & manual select, 12 template premium.",
  openGraph: {
    title: "ML Skin Checker",
    description: "Cek & Flexing Skin ML dengan Poster Premium",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} gradient-mesh min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
