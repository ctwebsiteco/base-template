import { client } from "@/sanity/lib/client";
import { COMPANY_INFO_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  let company = null;

  if (client) {
    try {
      company = await client.fetch(COMPANY_INFO_QUERY);
    } catch {
      // Sanity fetch failed — use fallback content
    }
  }

  const name = company?.name ?? process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Business Name";
  const tagline =
    company?.tagline ?? "Your trusted local service provider.";
  const description =
    company?.description ??
    "We provide high-quality services to residential and commercial customers. Contact us today for a free estimate.";
  const phone = company?.phone ?? process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "(555) 555-5555";
  const email = company?.email ?? process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@example.com";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{tagline}</p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {description}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-4 text-muted-foreground">
          Phone:{" "}
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="text-primary hover:underline"
          >
            {phone}
          </a>
        </p>
        <p className="mt-2 text-muted-foreground">
          Email:{" "}
          <a href={`mailto:${email}`} className="text-primary hover:underline">
            {email}
          </a>
        </p>
      </section>
    </div>
  );
}
