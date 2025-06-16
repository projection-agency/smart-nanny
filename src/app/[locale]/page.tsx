import { BlogSection } from "@/components/Sections/BlogSection/BlogSection";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { GallerySection } from "@/components/Sections/GallerySection/GallerySection";
import { HomeHero } from "@/components/Sections/HomeHero/HomeHero";
import { ReviewSection } from "@/components/Sections/ReviewSection/ReviewSection";
import { RoadSection } from "@/components/Sections/RoadSection/RoadSection";
import { ServicesSection } from "@/components/Sections/ServicesSection/ServicesSection";
import { VacationSection } from "@/components/Sections/VacationSection/VacationSection";
import { WhySection } from "@/components/Sections/WhySection/WhySection";
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Smart Nanny",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
  icons:{
    icon:"/icons/favicon.svg"
  }
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'ua' && locale !== 'en') {
    notFound();
  }
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  let translation = {};
  try {
    translation = JSON.parse(await fs.readFile(translationPath, 'utf-8'));
  } catch {
    // fallback, якщо файл не знайдено
    translation = {};
  }
  return (
    <main>
      <HomeHero translation={translation} locale={locale} />
      <WhySection translation={translation} locale={locale} />
      <ServicesSection translation={translation} locale={locale} />
      <RoadSection translation={translation} locale={locale} />
      <GallerySection translation={translation} locale={locale} />
      <VacationSection translation={translation} locale={locale} />
      <BlogSection translation={translation} locale={locale} />
      <ReviewSection translation={translation} locale={locale} />
      <FaqSection translation={translation} locale={locale} />
    </main>
  );
}
