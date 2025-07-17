import fs from 'fs/promises';
import path from 'path';
import { PolicyPage } from '@/components/PolicyPage/PolicyPage';

export const metadata = {
  title: "Політика",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export async function generateStaticParams() {
  return [
    { locale: 'ua' },
    { locale: 'en' },
  ];
}

export default async function Policy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  return <PolicyPage translation={translation} locale={locale} />;
}
