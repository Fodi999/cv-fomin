"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import AboutMeContent from "@/components/content/AboutMeContent";
import WebflowContent from "@/components/content/WebflowContent";
import ContactMeContent from "@/components/content/ContactMeContent";
import AdvancedServicesContent from "@/components/content/AdvancedServicesContent";
import enSectionsData from "@/language/en/pagesections.json";
import plSectionsData from "@/language/pl/pagesections.json";
import Header from "@/components/Header";

interface SectionProps {
  title: string;
  imageUrl: string;
  buttonText?: string;
  ContentComponent: React.ComponentType<{ language: "en" | "pl"; onClose?: () => void }>; // Компонент контента для Drawer
  language: "en" | "pl";
}

const SectionWithImage: React.FC<SectionProps> = ({
  title,
  imageUrl,
  buttonText = "Open Drawer",
  ContentComponent,
  language,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <section className="relative h-60 md:h-72 lg:h-96 rounded-lg overflow-hidden shadow-md group">
      {/* Фото на заднем плане */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        style={{ objectFit: "cover" }}
        className="rounded-lg group-hover:scale-110 transition-transform duration-300"
      />

      {/* Текст и кнопка внизу */}
      <div className="absolute inset-x-0 bottom-0 bg-black/40 p-4 flex items-center justify-between text-white">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{title}</h2>

        {/* Кнопка, открывающая Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-200">
              {buttonText}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="overflow-y-auto mt-16 sm:mt-20 lg:mt-24 rounded-lg shadow-lg h-[90%]">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="p-4">
              <ContentComponent language={language} onClose={handleClose} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
};

const contentComponents: { [key: string]: React.ComponentType<{ language: "en" | "pl"; onClose?: () => void }> } = {
  AboutMeContent,
  WebflowContent,
  ContactMeContent,
  AdvancedServicesContent,
};

export default function Home() {
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

  const sectionsData = language === "en" ? enSectionsData : plSectionsData;

  return (
    <div className={`p-6 transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        language={language}
        toggleLanguage={() => setLanguage(language === "en" ? "pl" : "en")}
      />
      {/* Сетка секций */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {sectionsData.sections.map((section) => {
          const ContentComponent = contentComponents[section.contentComponent as keyof typeof contentComponents];
          return (
            <div key={section.id} id={section.id} className="break-inside-avoid">
              <SectionWithImage
                title={section.title}
                imageUrl={section.imageUrl}
                buttonText={section.buttonText}
                ContentComponent={ContentComponent}
                language={language}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}