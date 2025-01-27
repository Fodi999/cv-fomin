"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import CardComponent from "@/components/Card";
import enPageSections from "@/language/en/cards.json";
import plPageSections from "@/language/pl/cards.json";

const pageSections = {
  en: enPageSections,
  pl: plPageSections,
};

export default function HomePage() {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const sections = pageSections[language as "en" | "pl"].cards;

  const categories = {
    sushi: sections.filter(section => section.category === "sushi"),
    rolls: sections.filter(section => section.category === "rolls"),
    sets: sections.filter(section => section.category === "sets"),
    salads: sections.filter(section => section.category === "salads"),
    snacks: sections.filter(section => section.category === "snacks"),
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-slate-200 text-gray-900'}`}>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 gap-8">
            {items.map((section, index) => (
              <CardComponent key={section.id} section={section} language={language} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}