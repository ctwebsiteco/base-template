import { defineType, defineField } from "sanity";

const templateFields = (prefix: string) => [
  defineField({
    name: "subject",
    title: `${prefix} Subject`,
    type: "string",
    description: "Placeholders: {{name}}, {{email}}, {{phone}}, {{message}}",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "body",
    title: `${prefix} Body (HTML)`,
    type: "text",
    rows: 10,
    description: "Placeholders: {{name}}, {{email}}, {{phone}}, {{message}}",
    validation: (rule) => rule.required(),
  }),
];

export default defineType({
  name: "emailTemplates",
  title: "Email Templates",
  type: "document",
  fields: [
    defineField({
      name: "fromEmail",
      title: "From Email",
      type: "string",
      description: "Sender address for all outgoing emails (e.g. noreply@yourdomain.com)",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "toEmails",
      title: "Notification Recipients",
      type: "array",
      of: [{ type: "string" }],
      description: "Email addresses that receive contact form submissions",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "businessNotification",
      title: "Business Notification Email",
      type: "object",
      fields: templateFields("Business Notification"),
    }),
    defineField({
      name: "submitterConfirmation",
      title: "Submitter Confirmation Email",
      type: "object",
      fields: templateFields("Submitter Confirmation"),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Email Templates" };
    },
  },
});
