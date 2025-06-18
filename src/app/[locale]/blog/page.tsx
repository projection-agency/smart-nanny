import fs from 'fs/promises';
import path from 'path';
import { BlogPage } from '@/components/BlogPage/BlogPage';
export const metadata = {
  title: "Блог",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  return (
    <main>
      <BlogPage translation={translation} locale={locale} />
    </main>
  );
}
