import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "dontkillmybrain",
  description: "Who's doing the thinking?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-[family-name:var(--font-inter)]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
