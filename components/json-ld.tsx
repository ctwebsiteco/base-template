import { client } from "@/sanity/lib/client";

export async function JsonLd() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let company: any = null;

  if (client) {
    try {
      company = await client.fetch(
        `*[_type == "companyInfo"][0] { name, description, phone, email, address, aggregateRating, reviewCount, priceRange, businessHours }`
      );
    } catch {
      // Sanity fetch failed — use minimal fallback
    }
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const companyName = company?.name || process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name";
  const companyDescription =
    company?.description ||
    "Local business providing quality services to the community.";
  const companyPhone = company?.phone || process.env.NEXT_PUBLIC_COMPANY_PHONE || "(555) 555-5555";
  const companyEmail = company?.email || process.env.NEXT_PUBLIC_COMPANY_EMAIL || undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyName,
    description: companyDescription,
    url: BASE_URL,
    telephone: companyPhone,
  };

  if (companyEmail) {
    schema.email = companyEmail;
  }

  if (company?.address) {
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

  if (company?.priceRange) {
    schema.priceRange = company.priceRange;
  }

  if (company?.aggregateRating) {
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