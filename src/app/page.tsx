"use client";

import React, { useState } from "react";
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
import ContactContent from "@/components/content/ContactContent";
import { Sun, Moon, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SectionProps {
  title: string;
  imageUrl: string;
  buttonText?: string;
  ContentComponent: React.ComponentType<{ language: "en" | "pl" }>; // Компонент контента для Drawer
  language: "en" | "pl";
}

const SectionWithImage: React.FC<SectionProps> = ({
  title,
  imageUrl,
  buttonText = "Open Drawer",
  ContentComponent,
  language,
}) => {
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-200">
              {buttonText}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="p-4">
              <ContentComponent language={language} />
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

const contentComponents: { [key: string]: React.ComponentType<{ language: "en" | "pl" }> } = {
  AboutMeContent,
  WebflowContent,
  ContactMeContent,
  AdvancedServicesContent,
};

const Header: React.FC<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: "en" | "pl";
  toggleLanguage: () => void;
}> = ({ isDarkMode, toggleDarkMode, language, toggleLanguage }) => {
  return (
    <header className={`w-full py-4 shadow-lg z-10 fixed top-0 left-0 transition-colors ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">My Website</h1>
        <div className="flex items-center space-x-4">
          <Label htmlFor="theme-switch">Dark Mode</Label>
          <Switch
            id="theme-switch"
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
          />
          <div className="ml-2">
            {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
          </div>
          {/* Переключатель языка */}
          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-lg ${language === "en" ? "bg-blue-500 text-white" : "bg-green-500 text-white"} hover:opacity-90`}
          >
            {language.toUpperCase()}
          </button>
          {/* Кнопка "Контакты" */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600">
                <Mail size={20} />
                <span>{language === "en" ? "Contact" : "Kontakt"}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{language === "en" ? "Contact Me" : "Skontaktuj się ze mną"}</DrawerTitle>
                <DrawerDescription />
              </DrawerHeader>
              <div className="p-4">
                <ContactContent language={language} />
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
      </div>
    </header>
  );
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "pl">("en");

  const sectionsData = language === "en" ? enSectionsData : plSectionsData;

  return (
    <div className="p-6 transition-colors">
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
