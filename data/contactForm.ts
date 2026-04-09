import type { ContactForm } from "@/sanity/types";

export const contactForm: ContactForm = {
  _type: "contactForm",
  _id: "default-contact-form",
  formName: "Main Contact Form",
  submitButtonText: "Send Message",
  successMessage: "Thank you! We'll be in touch soon.",
  fromEmail: "noreply@yourdomain.com",
  toEmails: ["info@yourdomain.com"],
  fields: [
    {
      _key: "1",
      fieldMode: "standard",
      standardType: "name",
      label: "Name",
      placeholder: "Your name",
      required: true,
    },
    {
      _key: "2",
      fieldMode: "standard",
      standardType: "email",
      label: "Email",
      placeholder: "you@example.com",
      required: true,
    },
    {
      _key: "3",
      fieldMode: "standard",
      standardType: "phone",
      label: "Phone",
      placeholder: "(555) 555-5555",
      required: false,
    },
    {
      _key: "4",
      fieldMode: "standard",
      standardType: "message",
      label: "Message",
      placeholder: "Tell us about your project...",
      required: true,
    },
  ],
  adminEmailTemplate: {
    subject: "New Contact Form Submission",
    body: "<p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Phone:</strong> {{phone}}</p><p><strong>Message:</strong> {{message}}</p>",
  },
  autoReplyTemplate: {
    enabled: true,
    subject: "We received your message!",
    body: "<p>Hi {{name}},</p><p>Thanks for reaching out! We'll get back to you within 24 hours.</p>",
  },
};
