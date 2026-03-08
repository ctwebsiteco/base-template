import { client } from "@/sanity/lib/client";

export async function JsonLd() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let company: any = null;

  try {
    company = await client.fetch(
      `*[_type == "companyInfo"][0] { name, description, phone, email, address, aggregateRating, reviewCount, priceRange, businessHours }`
    );
  } catch {
    // Sanity not configured — use minimal fallback
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fancybagels.com";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: company?.name || "Fancy Bagels",
    description:
      company?.description ||
      "Fancy Bagels in Southington, CT - Crafting fresh, authentic NY-style bagels, hearty breakfast sandwiches, and specialty coffee since 1988.",
    url: BASE_URL,
    telephone: company?.phone || "(860) 621-0055",
    servesCuisine: "Bagels, Breakfast, Deli",
    image: `${BASE_URL}/images/fancy-bagels-hero.jpg`,
    menu: `${BASE_URL}/menu`,
  };

  if (company?.email) {
    schema.email = company.email;
  }

  if (company?.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: company.address.street || "405 Queen St",
      addressLocality: company.address.city || "Southington",
      addressRegion: company.address.state || "CT",
      postalCode: company.address.postalCode || "06489",
      addressCountry: company.address.country || "US",
    };
    if (company.address.latitude && company.address.longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        latitude: company.address.latitude,
        longitude: company.address.longitude,
      };
    }
  } else {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: "405 Queen St (Route 10)",
      addressLocality: "Southington",
      addressRegion: "CT",
      postalCode: "06489",
      addressCountry: "US",
    };
  }

  schema.priceRange = company?.priceRange || "$";

  schema.openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "06:30",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "07:00",
      closes: "13:30",
    },
  ];

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
