import fs from 'fs/promises';
import path from 'path';
import { CourseSection } from "@/components/Sections/CourseSection/CourseSection";
import { EducationHero } from "@/components/Sections/EducationHero/EducationHero";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { GetSection } from "@/components/Sections/GetSection/GetSection";
import { ProgramSection } from "@/components/Sections/ProgramSection/ProgramSection";
import { TariffSection } from "@/components/Sections/TariffSection/TariffSection";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Навчання",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export async function generateStaticParams() {
  return [
    { locale: 'ua' },
    { locale: 'en' },
  ];
}

export default async function Education({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: translation['breadcrumbs_home'], href: `/${locale}` },
    { label: translation['breadcrumbs_education'], active: true },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="light" />
      <EducationHero />
      <CourseSection />
      <GetSection />
      <ProgramSection />
      <TariffSection />
      <FaqSection translation={translation} locale={locale} nannys={true} />
    </main>
  );
}
