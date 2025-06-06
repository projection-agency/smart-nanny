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

export default function NannySelection() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Головна", href: "/" },
    { label: "Стати нянею", active: true },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="light" />
      <NannySelectionHero />
      <RoadSection />
      <WhySection />
      <VacationSection />
      <EducationSection />
      <VacationFormSection />
      <FaqSection />
    </main>
  );
}
