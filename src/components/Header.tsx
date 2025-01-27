"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage(); // Подключаем язык из контекста
  const { cartCount } = useCart();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white p-6 transition-colors duration-300">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fish Master</h1>
        <ul className="flex gap-6 items-center">
          <li>
            <Switch checked={isDarkMode} onChange={toggleTheme} /> {/* Переключатель темы */}
          </li>
          <li>
            <Button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full border-black bg-blue-500 text-white hover:bg-blue-600"
            >
              {language === "en" ? "PL" : "EN"}
            </Button>
          </li>
          <li>
            <Link href="/cart/1">
              <Button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                <ShoppingCart size={18} />
                <span>({cartCount})</span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
