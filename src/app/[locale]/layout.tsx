// import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Moderustic } from "next/font/google";
import { ModalProvider } from "@/components/ModalContext";
import StoreProvider from "@/providers/StoreProviders";
import React from "react";
import { initI18n } from "@/i18n/server";
import fs from 'fs/promises';
import path from 'path';
import ClientLayout from "./client-layout";


const moderustic = Moderustic({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});



export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // const lang = localeToLang[locale] || 'en';
  await initI18n(locale);

  // Завантаження перекладу з файлу
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  let translation = {};
  try {
    translation = JSON.parse(await fs.readFile(translationPath, 'utf-8'));
  } catch {
    // fallback, якщо файл не знайдено
    translation = {};
  }

  return (
    <html lang="en" className={moderustic.className}>
      <body>
        <StoreProvider>
          <ModalProvider translation={translation} locale={locale}>
            <Header translation={translation} locale={locale} />
            <ClientLayout translation={translation} locale={locale}>
              {children}
            </ClientLayout>
            <Footer translation={translation} locale={locale} />
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
