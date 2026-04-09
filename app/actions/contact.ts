"use server";

import { Resend } from "resend";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import { CONTACT_FORM_QUERY } from "@/sanity/lib/queries";

const resend = new Resend(process.env.RESEND_API_KEY);

function replacePlaceholders(
  template: string,
  data: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "");
}

const fieldTypeToZod: Record<string, z.ZodTypeAny> = {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
};

export type ContactFormState = {
  success: boolean;
  error?: string;
};

interface FormField {
  fieldType: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface FormConfig {
  fields?: FormField[];
  fromEmail: string;
  toEmails: string[];
  adminEmailTemplate: { subject: string; body: string };
  autoReplyTemplate: { enabled?: boolean; subject: string; body: string };
}

function getFallbackConfig(): FormConfig {
  return {
    fields: [
      { fieldType: "name", label: "Name", required: true },
      { fieldType: "email", label: "Email", required: true },
      { fieldType: "phone", label: "Phone", required: false },
      { fieldType: "message", label: "Message", required: true },
    ],
    fromEmail: process.env.CONTACT_FROM_EMAIL || "noreply@example.com",
    toEmails: (process.env.CONTACT_TO_EMAILS || "info@example.com").split(","),
    adminEmailTemplate: {
      subject: process.env.CONTACT_SUBJECT || "New Contact Form Submission",
      body:
        process.env.CONTACT_BODY ||
        "<p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Message:</strong> {{message}}</p>",
    },
    autoReplyTemplate: {
      enabled: true,
      subject: "We received your message!",
      body: "<p>Hi {{name}},</p><p>Thanks for reaching out! We'll get back to you within 24 hours.</p>",
    },
  };
}

function buildSchema(fields: FormField[]): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    const schema = fieldTypeToZod[field.fieldType];
    if (schema) {
      shape[field.fieldType] = field.required ? schema : schema.optional();
    }
  }
  return z.object(shape);
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  let formConfig: FormConfig | null = null;

  if (client) {
    try {
      formConfig = await client.fetch(CONTACT_FORM_QUERY);
    } catch {
      // Sanity fetch failed — use env var fallback
    }
  }

  if (!formConfig?.fields?.length) {
    formConfig = getFallbackConfig();
  }

  const schema = buildSchema(formConfig.fields!);
  const rawData = Object.fromEntries(formData);
  const parsed = schema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, message, ...rest } = parsed.data;
  const placeholderData: Record<string, string> = { name, email, message, ...rest };

  try {
    await resend.emails.send({
      from: formConfig.fromEmail,
      to: formConfig.toEmails,
      subject: replacePlaceholders(formConfig.adminEmailTemplate.subject, placeholderData),
      html: replacePlaceholders(formConfig.adminEmailTemplate.body, placeholderData),
    });

    if (formConfig.autoReplyTemplate?.enabled) {
      await resend.emails.send({
        from: formConfig.fromEmail,
        to: email,
        subject: replacePlaceholders(formConfig.autoReplyTemplate.subject, placeholderData),
        html: replacePlaceholders(formConfig.autoReplyTemplate.body, placeholderData),
      });
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}