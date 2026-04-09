import { getCompanyInfo } from "@/lib/data/company";

export async function JsonLd() {
  const company = await getCompanyInfo();

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name || "Business Name",
    description:
      company.description ||
      "Local business providing quality services to the community.",
    url: BASE_URL,
    telephone: company.phone || "(555) 555-5555",
  };

  if (company.email) {
    schema.email = company.email;
  }

  if (company.address) {
    schema.address = {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: company.address.country || "US",
    };
    if (company.address.latitude && company.address.longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        latitude: company.address.latitude,
        longitude: company.address.longitude,
      };
    }
  }

  if (company.priceRange) {
    schema.priceRange = company.priceRange;
  }

  if (company.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(company.aggregateRating),
      reviewCount: String(company.reviewCount || 1),
      bestRating: "5",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
