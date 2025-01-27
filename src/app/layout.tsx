import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fish Master',
  description: 'Fish Master Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider value={{ language }}>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}





