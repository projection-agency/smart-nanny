import type { Metadata } from 'next'
import fs from 'fs/promises';
import path from 'path';
import { HomeHero } from '@/components/Sections/HomeHero/HomeHero';
import { WhySection } from '@/components/Sections/WhySection/WhySection';
import { ServicesSection } from '@/components/Sections/ServicesSection/ServicesSection';
import { RoadSection } from '@/components/Sections/RoadSection/RoadSection';
import { GallerySection } from '@/components/Sections/GallerySection/GallerySection';
import { VacationSection } from '@/components/Sections/VacationSection/VacationSection';
import { BlogSection } from '@/components/Sections/BlogSection/BlogSection';
import { ReviewSection } from '@/components/Sections/ReviewSection/ReviewSection';
import { FaqSection } from '@/components/Sections/FaqSection/FaqSection';

export async function generateStaticParams() {
  return [
    { locale: 'ua' },
    { locale: 'en' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  const title = translation['home_meta_title'] || 'Smart Nanny - Надійні няні для вашої дитини';
  const description = translation['home_meta_description'] || 'Ми підбираємо надійних нянь, яким можна довірити вашу дитину.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://smart-nanny.com/${locale}`,
      siteName: 'Smart Nanny',
      images: [
        {
          url: 'https://smart-nanny.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ua' ? 'uk_UA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://smart-nanny.com/og-image.jpg'],
    },
    alternates: {
      canonical: `https://smart-nanny.com/${locale}`,
      languages: {
        'uk-UA': 'https://smart-nanny.com/ua',
        'en-US': 'https://smart-nanny.com/en',
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  
  let translation = {};
  try {
    const translationRaw = await fs.readFile(translationPath, 'utf-8');
    translation = JSON.parse(translationRaw);
  } catch {
    // fallback, якщо файл не знайдено
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
