import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M&F Digital · Комиссии",
  description: "Управление комиссионными вознаграждениями агентства M&F Digital",
  themeColor: "#000000",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className + " bg-[#0a0a0a]"}>
        <div className="min-h-screen bg-diagonal-gradient">{children}</div>
      </body>
    </html>
  );
}

