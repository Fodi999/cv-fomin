"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import enPageSections from "@/language/en/pagesections.json";
import plPageSections from "@/language/pl/pagesections.json";
import { ShoppingCart, Heart } from "lucide-react";

const pageSections = {
  en: enPageSections,
  pl: plPageSections,
};

export default function HomePage() {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const sections = pageSections[language as "en" | "pl"].cards;

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            className="relative rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
          >
            {/* Image Section */}
            <div className="relative">
              <Image
                src={section.imageUrl}
                alt={section.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
                priority={index === 0} // Добавляем свойство priority только для первого изображения
              />
              <HeartButton />
            </div>

            {/* Content Section */}
            <CardHeader className="p-6">
              {/* Title */}
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {section.title}
              </h1>

              {/* Capacities */}
              <div className="flex gap-2 mt-2">
                {section.capacities.map((capacity, index) => (
                  <Link key={index} href={`/blog/${section.slug}?lang=${language}`}>
                    <button
                      className={`px-3 py-1 rounded-full border text-sm ${
                        capacity.active
                          ? "bg-orange-500 text-white border-orange-500"
                          : "border-gray-950 border-x text-gray-100 dark:border-gray-600 dark:text-gray-300  bg-blue-800 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                      }`}
                    >
                      {capacity.value}
                    </button>
                  </Link>
                ))}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                {section.description}
              </p>

              {/* Price and Button */}
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {section.price}
                </span>
                <button
                  onClick={() => addToCart(section)}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  <ShoppingCart size={18} />
                  <span>{section.buttonText}</span>
                </button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HeartButton() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={toggleLike}
      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
    >
      <Heart className={isLiked ? "text-red-600" : "text-gray-600"} size={20} />
    </button>
  );
}