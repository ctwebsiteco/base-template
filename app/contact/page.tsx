import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with us. Fill out the form below and we will get back to you within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-4 text-muted-foreground">
        Fill out the form below and we will get back to you within 24 hours.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
