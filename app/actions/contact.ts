"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { client } from "@/sanity/lib/client";
import { EMAIL_TEMPLATES_QUERY } from "@/sanity/lib/queries";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  error?: string;
};

function replacePlaceholders(
  template: string,
  data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }
): string {
  return template
    .replace(/\{\{name\}\}/g, data.name)
    .replace(/\{\{email\}\}/g, data.email)
    .replace(/\{\{phone\}\}/g, data.phone ?? "")
    .replace(/\{\{message\}\}/g, data.message);
}

const FALLBACK_BUSINESS_SUBJECT = "New Contact Form Submission from {{name}}";
const FALLBACK_BUSINESS_BODY = `<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Message:</strong></p><p>{{message}}</p>`;

const FALLBACK_CONFIRMATION_SUBJECT = "Thank you for reaching out";
const FALLBACK_CONFIRMATION_BODY = `<p>Hi {{name}},</p>
<p>Thanks for contacting us. We received your message and will get back to you within 24 hours.</p>
<p>Best regards</p>`;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const { name, email, message, phone } = parsed.data;

  try {
    let businessSubject = FALLBACK_BUSINESS_SUBJECT;
    let businessBody = FALLBACK_BUSINESS_BODY;
    let confirmationSubject = FALLBACK_CONFIRMATION_SUBJECT;
    let confirmationBody = FALLBACK_CONFIRMATION_BODY;

    let fromEmail = process.env.CONTACT_FROM_EMAIL!;
    let toEmails = process.env.CONTACT_TO_EMAILS!.split(",").map((e) => e.trim());

    try {
      const token = process.env.SANITY_API_READ_TOKEN;
      const templates = await client
        .withConfig({ token, useCdn: false })
        .fetch(EMAIL_TEMPLATES_QUERY);
      if (templates?.fromEmail) {
        fromEmail = templates.fromEmail;
      }
      if (templates?.toEmails?.length) {
        toEmails = templates.toEmails;
      }
      if (templates?.businessNotification) {
        businessSubject = templates.businessNotification.subject;
        businessBody = templates.businessNotification.body;
      }
      if (templates?.submitterConfirmation) {
        confirmationSubject = templates.submitterConfirmation.subject;
        confirmationBody = templates.submitterConfirmation.body;
      }
    } catch {
      // Sanity fetch failed — use fallback templates and env var emails
    }

    const placeholderData = { name, email, phone, message };

    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: replacePlaceholders(businessSubject, placeholderData),
        html: replacePlaceholders(businessBody, placeholderData),
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: replacePlaceholders(confirmationSubject, placeholderData),
        html: replacePlaceholders(confirmationBody, placeholderData),
      }),
    ]);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
