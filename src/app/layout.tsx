"use client";

import { Bebas_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "pl">("en");

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
      <body className={`${bebasNeue.variable} ${geistMono.variable} antialiased transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="min-h-screen w-full h-full font-sans">
          <Header 
            isDarkMode={isDarkMode} 
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
            language={language} 
            toggleLanguage={() => setLanguage(language === "en" ? "pl" : "en")} 
          />
          {/* Контент */}
          <main >{children}</main>
        </div>
      </body>
    </html>
  );
}