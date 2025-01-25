"use client";

import React from "react";
import enContent from "@/language/en/contentContact.json"; // Импортируем английский JSON
import plContent from "@/language/pl/contentContact.json"; // Импортируем польский JSON

const contentMap: Record<"en" | "pl", typeof enContent> = {
  en: enContent,
  pl: plContent,
};

const ContactContent: React.FC<{ language: "en" | "pl" }> = ({ language }) => {
  const { contact } = contentMap[language]; // Теперь TypeScript понимает, что language может быть только "en" или "pl"

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        {contact.title}
      </h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold block text-gray-900">Name:</span>{" "}
          {contact.name}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold block text-gray-900">Email:</span>{" "}
          <a
            href={`mailto:${contact.email.replace("Email: ", "")}`}
            className="text-blue-600 hover:underline"
          >
            {contact.email.replace("Email: ", "")}
          </a>
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold block text-gray-900">Phone:</span>{" "}
          {contact.phone}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold block text-gray-900">Address:</span>{" "}
          {contact.address}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold block text-gray-900">Instagram:</span>{" "}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {contact.instagram.replace("Instagram: ", "")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactContent;