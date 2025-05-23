import { EducationSection } from "@/components/Sections/EducationSection/EducationSection";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { NannySelectionHero } from "@/components/Sections/NannySelectionHero/NannySelectionHero";
import { RoadSection } from "@/components/Sections/RoadSection/RoadSection";
import { VacationFormSection } from "@/components/Sections/VacationFormSection/VacationFormSection";
import { VacationSection } from "@/components/Sections/VacationSection/VacationSection";
import { WhySection } from "@/components/Sections/WhySection/WhySection";

export const metadata = {
  title: "Стати нянею",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export default function NannySelection() {
  return (
    <main>
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
