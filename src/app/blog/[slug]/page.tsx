"use client";
import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import enPageSections from "@/language/en/pagesections.json";
import plPageSections from "@/language/pl/pagesections.json";
import Image from "next/image";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pageSections = {
  en: enPageSections,
  pl: plPageSections,
};

interface Ingredient {
  name: string;
  quantity: string;
}

interface Content {
  slug: string;
  content: string;
  noPrevText: string;
  noNextText: string;
  backToHomeText: string;
  prevText: string;
  nextText: string;
  goToText: string;
  ingredients?: Ingredient[];
  yield?: string;
  code?: string;
  verifyTitle: string;
  verifyDescription: string;
  verifyButtonText: string;
  cardNotFoundTitle: string;
  backToHomeLinkText: string;
}

interface Card {
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  prev: string | null;
  next: string | null;
}

function ClientContent({ currentContent, currentCard }: { currentContent: Content, currentCard: Card }) {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (otp === currentContent.code) {
      setIsVerified(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-300 bg-gray-100 dark:bg-gray-800`}>
      <div className="container mx-auto p-6 text-center">
      <div className="text-center">
      <Link href="/">
          <Button className="inline-block text-white bg-blue-800 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-full px-6 py-2 font-medium transition">
            {currentContent.backToHomeText}
          </Button>
        </Link>
      </div>
     
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {currentCard.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg italic mb-6">
            {currentCard.description}
          </p>
        </div>
        <Image
          src={currentCard.imageUrl}
          alt={currentCard.title}
          width={1200}
          height={600}
          className="w-full h-64 md:h-80 object-cover"
          priority
        />
        <div className="p-6">
          <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
            <p>{currentContent.content}</p>
            {!isVerified && (
              <div className="flex items-center justify-center mt-8">
                <Card className="w-[380px] mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{currentContent.verifyTitle}</CardTitle>
                    <CardDescription className="text-center">
                      {currentContent.verifyDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-4">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full mt-4" onClick={handleVerify}>
                      {currentContent.verifyButtonText}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            {currentContent.ingredients && (
              <div className={`mt-6 ${isVerified ? "" : "blur-sm"}`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h2>
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Ingredient</th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContent.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{ingredient.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{ingredient.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {currentContent.yield && (
                  <p className="mt-4 text-gray-700 dark:text-gray-300"><strong>Yield:</strong> {currentContent.yield}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {currentContent.prevText}
          </h2>
          {currentCard.prev ? (
            <Link
              href={`/blog/${currentCard.prev}`}
              className="text-blue-500 hover:underline"
            >
              {currentContent.goToText} {currentCard.prev}
            </Link>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {currentContent.noPrevText}
            </p>
          )}
        </div>
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {currentContent.nextText}
          </h2>
          {currentCard.next ? (
            <Link
              href={`/blog/${currentCard.next}`}
              className="text-blue-500 hover:underline"
            >
              {currentContent.goToText} {currentCard.next}
            </Link>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {currentContent.noNextText}
            </p>
          )}
        </div>
      </div>

    
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params?.slug;
  const lang = searchParams.get("lang") || "en";

  const languageCode = lang as "en" | "pl"; // Проверка типа
  const contents = pageSections[languageCode].contents;
  const cards = pageSections[languageCode].cards;
  const currentContent = contents.find((c: Content) => c.slug === slug);
  const currentCard = cards.find((c: Card) => c.slug === slug);

  if (!currentContent || !currentCard) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          {currentContent?.backToHomeLinkText}
        </Link>
        <h1 className="text-2xl font-bold text-red-500">{currentContent?.cardNotFoundTitle}</h1>
      </div>
    );
  }

  return <ClientContent currentContent={currentContent} currentCard={currentCard} />;
}