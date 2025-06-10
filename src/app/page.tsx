import { BlogSection } from "@/components/Sections/BlogSection/BlogSection";
import { FaqSection } from "@/components/Sections/FaqSection/FaqSection";
import { GallerySection } from "@/components/Sections/GallerySection/GallerySection";
import { HomeHero } from "@/components/Sections/HomeHero/HomeHero";
import { ReviewSection } from "@/components/Sections/ReviewSection/ReviewSection";
import { RoadSection } from "@/components/Sections/RoadSection/RoadSection";
import { ServicesSection } from "@/components/Sections/ServicesSection/ServicesSection";
import { VacationSection } from "@/components/Sections/VacationSection/VacationSection";
import { WhySection } from "@/components/Sections/WhySection/WhySection";
export const metadata = {
  title: "Smart Nanny",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
  icons:{
    icon:"/icons/favicon.svg"
  }
};

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
      <ReviewSection />
      <FaqSection />
    </main>
  );
}
