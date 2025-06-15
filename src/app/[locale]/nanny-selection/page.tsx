import fs from 'fs/promises';
import path from 'path';
import { EducationSection } from "@/components/Sections/EducationSection/EducationSection";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { NannySelectionHero } from "@/components/Sections/NannySelectionHero/NannySelectionHero";
import { RoadSection } from "@/components/Sections/RoadSection/RoadSection";
import { VacationFormSection } from "@/components/Sections/VacationFormSection/VacationFormSection";
import { VacationSection } from "@/components/Sections/VacationSection/VacationSection";
import { WhySection } from "@/components/Sections/WhySection/WhySection";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Стати нянею",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export default async function NannySelection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translationPath = path.resolve(process.cwd(), `public/locales/${locale}/common.json`);
  const translationRaw = await fs.readFile(translationPath, 'utf-8');
  const translation = JSON.parse(translationRaw);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: translation['breadcrumbs_home'], href: `/${locale}` },
    { label: translation['breadcrumbs_nanny'], active: true },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="light" />
      <NannySelectionHero translation={translation} locale={locale} />
      <RoadSection translation={translation} locale={locale} />
      <WhySection translation={translation} locale={locale} />
      <VacationSection translation={translation} locale={locale} />
      <EducationSection translation={translation} locale={locale} />
      <VacationFormSection translation={translation} locale={locale} />
      <FaqSection translation={translation} locale={locale} />
    </main>
  );
}
