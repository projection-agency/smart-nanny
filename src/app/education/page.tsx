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

export default function Education() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Головна", href: "/" },
    { label: "Навчання", active: true },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="light" />
      <EducationHero />
      <CourseSection />
      <GetSection />
      <ProgramSection />
      <TariffSection />
      <FaqSection nannys={true} />
    </main>
  );
}
