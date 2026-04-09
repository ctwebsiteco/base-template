"use server";

import { Resend } from "resend";
import { client } from "@/sanity/lib/client";
import { CONTACT_FORM_QUERY } from "@/sanity/lib/queries";
import { buildContactSchema, type FormField } from "@/lib/contact-schema";
import { contactForm as localContactForm } from "@/data/contactForm";

const resend = new Resend(process.env.RESEND_API_KEY);

function replacePlaceholders(
  template: string,
  data: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "");
}

export type ContactFormState = {
  success: boolean;
  error?: string;
};

type FormConfig = {
  fields?: FormField[];
  fromEmail: string;
  toEmails: string[];
  adminEmailTemplate: { subject: string; body: string };
  autoReplyTemplate: { enabled?: boolean; subject: string; body: string };
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  let formConfig: FormConfig | null = null;

  if (client) {
    try {
      const fetched = await client.fetch<FormConfig>(CONTACT_FORM_QUERY);
      if (fetched?.fields?.length) {
        formConfig = fetched;
      }
    } catch {
      // Sanity fetch failed — fall back to local seed
    }
  }

  // Fall back to local seed — always has required shape
  if (!formConfig) {
    formConfig = localContactForm as FormConfig;
  }

  const schema = buildContactSchema(formConfig.fields || []);
  const rawData = Object.fromEntries(formData);
  const parsed = schema.safeParse(rawData);

  if (!parsed.success) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issues = (parsed as any).error.issues;
    return { success: false, error: issues?.[0]?.message || "Validation failed" };
  }

  const placeholderData: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const [k, v] of Object.entries(parsed.data as any)) {
    placeholderData[k] = String(v ?? "");
  }

  try {
    await resend.emails.send({
      from: formConfig.fromEmail,
      to: formConfig.toEmails,
      subject: replacePlaceholders(formConfig.adminEmailTemplate.subject, placeholderData),
      html: replacePlaceholders(formConfig.adminEmailTemplate.body, placeholderData),
    });

    const email = parsed.data.email as string | undefined;
    if (formConfig.autoReplyTemplate?.enabled && email) {
      await resend.emails.send({
        from: formConfig.fromEmail,
        to: email,
        subject: replacePlaceholders(formConfig.autoReplyTemplate.subject, placeholderData),
        html: replacePlaceholders(formConfig.autoReplyTemplate.body || "", placeholderData),
      });
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
