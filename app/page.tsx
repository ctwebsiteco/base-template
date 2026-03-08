import { HeroSection } from "@/components/home/hero-section";
import { FeatureCards } from "@/components/home/feature-cards";
import { CoffeeSection } from "@/components/home/coffee-section";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY });

  return (
    <>
      <HeroSection data={homepage} />
      <FeatureCards data={homepage} />
      <CoffeeSection data={homepage} />
    </>
  );
}
