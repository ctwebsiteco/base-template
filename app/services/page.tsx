import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Learn about the services we offer to residential and commercial customers in the local area.",
  path: "/services",
});

const SERVICES_QUERY = `*[_type == "service"][0...10] | order(orderRank asc) {
  title,
  description,
  "icon": icon.asset->url
}`;

interface Service {
  title: string;
  description: string;
  icon?: string;
}

export default async function ServicesPage() {
  let services: Service[] = [];

  if (client) {
    try {
      services = await client.fetch(SERVICES_QUERY) || [];
    } catch {
      // Sanity fetch failed — use fallback
    }
  }

  // Static fallback when Sanity is not configured
  if (!services.length) {
    services = [
      {
        title: "Service Overview",
        description: "We offer a comprehensive range of services tailored to meet your needs. Contact us today to discuss your project.",
      },
    ];
  }

  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Professional services for residential and commercial customers in the local area.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {services.map((service, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Ready to get started?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contact us
          </a>{" "}
          for a free estimate.
        </p>
      </div>
    </div>
  );
}