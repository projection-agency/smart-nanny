import { CourseSection } from "@/components/Sections/CourseSection/CourseSection";
import { EducationHero } from "@/components/Sections/EducationHero/EducationHero";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { GetSection } from "@/components/Sections/GetSection/GetSection";
import { ProgramSection } from "@/components/Sections/ProgramSection/ProgramSection";
import { TariffSection } from "@/components/Sections/TariffSection/TariffSection";

export default function Education() {
  return (
    <main>
      <EducationHero />
      <CourseSection />
      <GetSection />
      <ProgramSection />
      <TariffSection />
      <FaqSection nannys={true} />
    </main>
  );
}
