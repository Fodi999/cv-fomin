"use client";

import { Bebas_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useState, useEffect } from "react";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode] = useState(false);
  const [language] = useState<"en" | "pl">("en");

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <html lang={language} className={isDarkMode ? "dark" : ""}>
      <body className={`${bebasNeue.variable} ${geistMono.variable} antialiased transition-colors`}>
        <div className={`min-h-screen p-4 sm:p-8 font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          {/* Контент */}
          <main className="pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
