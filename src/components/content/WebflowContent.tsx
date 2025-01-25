"use client";

import React from "react";
import enSectionsContent from "@/language/en/aboutMeContent.json";
import plSectionsContent from "@/language/pl/aboutMeContent.json";

interface Section {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  buttonText?: string;
}

const contentMap: Record<"en" | "pl", { sections: Section[] }> = {
  en: enSectionsContent,
  pl: plSectionsContent,
};

const WebflowContent: React.FC<{ language: "en" | "pl" }> = ({ language }) => {
  const webflowContent: Section | undefined = contentMap[language].sections.find(
    (section: Section) => section.id === "webflow"
  );

  if (!webflowContent) return null;

  return (
    <div id={webflowContent.id} className="flex flex-col items-center p-4 text-center sm:p-6 md:flex-row md:text-left md:gap-8 lg:gap-12">
      {/* Текстовый блок */}
      <div className="flex flex-col justify-center gap-4 mt-4 md:mt-0 md:w-1/2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
          {webflowContent.title}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          {webflowContent.description}
        </p>
        {webflowContent.buttonText && (
          <button className="px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            {webflowContent.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default WebflowContent;