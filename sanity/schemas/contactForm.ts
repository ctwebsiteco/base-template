import { defineType, defineField, defineArrayMember } from "sanity"

const formFieldTypes = [
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
  { title: "Message", value: "message" },
  { title: "Company", value: "company" },
  { title: "Service", value: "service" },
  { title: "Budget", value: "budget" },
]

const fieldTypeLabels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
  company: "Company",
  service: "Service",
  budget: "Budget",
}

export default defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    defineField({
      name: "formName",
      title: "Form Name",
      type: "string",
      description: "Internal identifier (e.g., 'Main Contact Form')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submitButtonText",
      title: "Submit Button Text",
      type: "string",
      initialValue: "Send Message",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you! We'll be in touch soon.",
    }),
    defineField({
      name: "fields",
      title: "Form Fields",
      type: "array",
      description: "Fields to include in this form. Order matters.",
      of: [
        defineArrayMember({
          type: "object",
          name: "formField",
          fields: [
            defineField({
              name: "fieldType",
              title: "Field Type",
              type: "string",
              options: {
                list: formFieldTypes,
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder",
              type: "string",
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "showIf",
              title: "Show This Field When",
              type: "object",
              fields: [
                defineField({
                  name: "otherField",
                  title: "Other Field Type",
                  type: "string",
                  options: {
                    list: formFieldTypes.filter((t) => t.value !== "message").map((t) => ({
                      title: t.title,
                      value: t.value,
                    })),
                  },
                }),
                defineField({
                  name: "hasValue",
                  title: "Has Any Value",
                  type: "boolean",
                  initialValue: true,
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "fieldType" },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? fieldTypeLabels[subtitle] || subtitle : "" }
            },
          },
        }),
      ],
    }),
    defineField({
      name: "fromEmail",
      title: "From Email",
      type: "string",
      description: "Sender address (e.g., noreply@yourdomain.com)",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "toEmails",
      title: "Recipient Emails",
      type: "array",
      of: [{ type: "string" }],
      description: "Emails that receive form submissions",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "adminEmailTemplate",
      title: "Admin Notification Email",
      type: "object",
      fields: [
        defineField({
          name: "subject",
          title: "Subject Line",
          type: "string",
          description: "Placeholders: {{name}}, {{email}}, {{phone}}, {{message}}, etc.",
          initialValue: "New Contact Form Submission",
        }),
        defineField({
          name: "body",
          title: "Body (HTML)",
          type: "text",
          rows: 10,
          description: "Use {{fieldName}} placeholders. Example: {{name}} - {{message}}",
        }),
      ],
    }),
    defineField({
      name: "autoReplyTemplate",
      title: "Auto-Reply Email to Submitter",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Send Auto-Reply",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "subject",
          title: "Subject Line",
          type: "string",
          description: "Available placeholders: {{name}}",
          initialValue: "We received your message!",
        }),
        defineField({
          name: "body",
          title: "Body (HTML)",
          type: "text",
          rows: 10,
          description: "Confirmation email sent to person who filled the form",
          hidden: ({ parent }) => !parent?.enabled,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "formName", subtitle: "submitButtonText" },
  },
})