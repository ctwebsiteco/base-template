import { client, isSanityConfigured } from "@/sanity/lib/client";
import { CONTACT_FORM_QUERY } from "@/sanity/lib/queries";
import { contactForm as localContactForm } from "@/data/contactForm";
import type { ContactForm } from "@/sanity/types";
import { merge } from "ts-deepmerge";

export async function getContactForm(): Promise<ContactForm> {
  if (isSanityConfigured && client) {
    try {
      const sanityData =
        await client.fetch<Partial<ContactForm>>(CONTACT_FORM_QUERY);
      if (sanityData) {
        return merge(localContactForm, sanityData) as ContactForm;
      }
    } catch {
      // Sanity fetch failed — fall back to local seed
    }
  }
  return localContactForm;
}
