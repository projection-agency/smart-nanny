import fs from 'fs/promises';
import path from 'path';
import OfferClient from '@/components/OfferClient';

export const metadata = {
  title: "Оферта",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export async function generateStaticParams() {
  return [
    { locale: 'ua' },
    { locale: 'en' },
  ];
}

export default async function Offer({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  return <OfferClient translation={translation} locale={locale} />;
}
