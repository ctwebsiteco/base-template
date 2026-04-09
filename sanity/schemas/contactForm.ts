import { defineType, defineField, defineArrayMember } from "sanity"

const standardFieldTypes = [
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
  { title: "Message", value: "message" },
  { title: "Company", value: "company" },
  { title: "Service", value: "service" },
  { title: "Budget", value: "budget" },
  { title: "Textarea", value: "textarea" },
  { title: "Select", value: "select" },
  { title: "Checkbox", value: "checkbox" },
]

const standardTypeLabels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
  company: "Company",
  service: "Service",
  budget: "Budget",
  textarea: "Textarea",
  select: "Select",
  checkbox: "Checkbox",
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
              name: "fieldMode",
              title: "Field Mode",
              type: "string",
              options: {
                list: [
                  { title: "Standard Field", value: "standard" },
                  { title: "Custom Field", value: "custom" },
                ],
                layout: "radio",
              },
              initialValue: "standard",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "standardType",
              title: "Standard Type",
              type: "string",
              options: { list: standardFieldTypes, layout: "dropdown" },
              hidden: ({ parent }) => parent?.fieldMode !== "standard",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { fieldMode?: string } | null | undefined;
                  if (parent?.fieldMode === "standard" && !value)
                    return "Standard type is required for standard fields"
                  return true
                }),
            }),
            defineField({
              name: "customType",
              title: "Custom Type Name",
              type: "string",
              description:
                "Unique identifier for this custom field (e.g., 'project_timeline'). Used as the field key in form data.",
              hidden: ({ parent }) => parent?.fieldMode !== "custom",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { fieldMode?: string; customType?: string } | null | undefined;
                  if (parent?.fieldMode === "custom" && !value)
                    return "Custom type name is required for custom fields"
                  if (
                    parent?.fieldMode === "custom" &&
                    typeof value === "string"
                  ) {
                    const doc = context.document as { fields?: Array<{ fieldMode?: string; customType?: string }> } | null | undefined;
                    const allFields = doc?.fields || [];
                    const duplicates = allFields.filter(
                      (f) =>
                        f.fieldMode === "custom" &&
                        f.customType === value
                    )
                    if (duplicates.length > 1)
                      return "Duplicate custom type name — each custom field must have a unique type name"
                  }
                  return true
                }),
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
              name: "options",
              title: "Options (for Select/Dropdown)",
              type: "object",
              fields: [
                defineField({
                  name: "list",
                  title: "Options List",
                  type: "array",
                  of: [{ type: "string" }],
                  description:
                    "Dropdown options. Leave empty for a text input.",
                }),
              ],
              hidden: ({ parent }) =>
                !["select"].includes(parent?.standardType || "") &&
                parent?.fieldMode !== "custom",
            }),
            defineField({
              name: "validation",
              title: "Validation Rules (Custom Fields)",
              type: "object",
              fields: [
                defineField({
                  name: "minLength",
                  title: "Min Length",
                  type: "number",
                }),
                defineField({
                  name: "maxLength",
                  title: "Max Length",
                  type: "number",
                }),
                defineField({
                  name: "pattern",
                  title: "Regex Pattern",
                  type: "string",
                  description: "e.g., '^\\d{3}-\\d{3}-\\d{4}$' for a phone number",
                }),
              ],
              hidden: ({ parent }) => parent?.fieldMode !== "custom",
            }),
            defineField({
              name: "showIf",
              title: "Show This Field When",
              type: "object",
              fields: [
                defineField({
                  name: "otherField",
                  title: "Other Field",
                  type: "string",
                  description:
                    "Field type or custom type name to check. E.g., 'service' to show this field only when a service is selected.",
                }),
                defineField({
                  name: "hasValue",
                  title: "Has Any Value",
                  type: "boolean",
                  initialValue: true,
                  description:
                    "Show when the other field has any value. Disable to show when the other field is empty.",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "standardType", custom: "customType", mode: "fieldMode" },
            prepare({ title, subtitle, custom, mode }) {
              const sub = mode === "custom" ? `custom: ${custom}` : standardTypeLabels[subtitle || ""] || subtitle || ""
              return { title, subtitle: sub }
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
          description: "Placeholders: {{name}}, {{email}}, {{phone}}, {{message}}, or any custom field like {{project_timeline}}",
          initialValue: "New Contact Form Submission",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body (HTML)",
          type: "text",
          rows: 10,
          description:
            "Use {{fieldName}} placeholders. Include all fields you want to capture. Example: {{name}} - {{email}}\n\n{{message}}",
          validation: (rule) => rule.required(),
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
          hidden: ({ parent }) => !parent?.enabled,
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
