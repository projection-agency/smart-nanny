import fs from 'fs/promises';
import path from 'path';
import { VacationPage } from '@/components/VacationPage/VacationPage';

export async function generateStaticParams() {
  return [
    { locale: 'ua' },
    { locale: 'en' },
  ];
}

export default async function Vacations({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  return <VacationPage translation={translation} locale={locale} />;
}
