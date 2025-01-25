"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Mail } from "lucide-react";
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
import ContactContent from "@/components/content/ContactContent";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: "en" | "pl";
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  language,
  toggleLanguage,
}) => {
  return (
    <header className={`w-full py-4 shadow-lg z-10 fixed top-0 left-0 transition-colors ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">FISH MASTER</h1>
        <div className="flex items-center space-x-4">
        
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

export default Header;