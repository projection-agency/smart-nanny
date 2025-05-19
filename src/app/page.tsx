import { BlogSection } from "@/components/Sections/BlogSection/BlogSection";
import { GallerySection } from "@/components/Sections/GallerySection/GallerySection";
import { HomeHero } from "@/components/Sections/HomeHero/HomeHero";
import { RoadSection } from "@/components/Sections/RoadSection/RoadSection";
import { ServicesSection } from "@/components/Sections/ServicesSection/ServicesSection";
import { VacationSection } from "@/components/Sections/VacationSection/VacationSection";
import { WhySection } from "@/components/Sections/WhySection/WhySection";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <WhySection />
      <ServicesSection />
      <RoadSection />
      <GallerySection />
      <VacationSection />
      <BlogSection />
    </main>
  );
}
