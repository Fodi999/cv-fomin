"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { language, setLanguage } = useLanguage(); // Подключаем язык из контекста

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white p-6 transition-colors duration-300">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fish Master</h1>
        <ul className="flex gap-6 items-center">
   
          <li>
            <Switch /> {/* Переключатель темы */}
          </li>
          <li>
            <Button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {language === "en" ? "PL" : "EN"}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}



