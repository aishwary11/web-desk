import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Web Desk',
  description: 'Created By Aishwary Shah',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="favicon.svg"
          sizes="any"
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-200">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
