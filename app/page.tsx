import { HeroSection } from "@/components/home/hero-section";
import { FeatureCards } from "@/components/home/feature-cards";
import { CoffeeSection } from "@/components/home/coffee-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <CoffeeSection />
    </>
  );
}
