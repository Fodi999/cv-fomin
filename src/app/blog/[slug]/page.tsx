"use client";
import { useParams, useSearchParams } from "next/navigation";
import enPageSections from "@/language/en/pagesections.json";
import plPageSections from "@/language/pl/pagesections.json";
import Image from "next/image";
import Link from "next/link";

const pageSections = {
  en: enPageSections,
  pl: plPageSections,
};

interface Card {
  title: string;
  imageUrl: string;
  description: string;
  content: string;
  prev: string | null;
  next: string | null;
  noPrevText: string;
  noNextText: string;
  backToHomeText: string;
  prevText: string;
  nextText: string;
  goToText: string;
}

function ClientContent({ currentCard }: { currentCard: Card }) {
  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-300 bg-gray-100 dark:bg-gray-800`}
    >
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
            <p>{currentCard.content}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {currentCard.prevText}
          </h2>
          {currentCard.prev ? (
            <Link
              href={`/blog/${currentCard.prev}`}
              className="text-blue-500 hover:underline"
            >
              {currentCard.goToText} {currentCard.prev}
            </Link>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {currentCard.noPrevText}
            </p>
          )}
        </div>
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {currentCard.nextText}
          </h2>
          {currentCard.next ? (
            <Link
              href={`/blog/${currentCard.next}`}
              className="text-blue-500 hover:underline"
            >
              {currentCard.goToText} {currentCard.next}
            </Link>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {currentCard.noNextText}
            </p>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-block text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg px-6 py-2 font-medium transition"
        >
          {currentCard.backToHomeText}
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  console.log(searchParams);

  const slug = params?.slug;
  const lang = searchParams.get("lang") || "en";

  const languageCode = lang as "en" | "pl"; // Проверка типа
  const cards = pageSections[languageCode].card;
  const currentCard = cards.find((c) => c.slug === slug);

  if (!currentCard) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Card not found</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return <ClientContent currentCard={currentCard} />;
}

