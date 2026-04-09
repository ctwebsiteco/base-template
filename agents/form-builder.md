# Form Builder Pattern

All contact forms use a **dynamic form builder** pattern — form fields, validation, and email templates are configured in Sanity, not hardcoded in the frontend.

## How It Works

1. **Sanity** stores the form configuration (`contactForm` document)
2. **Frontend** reads the config and renders the appropriate fields
3. **Zod schema** is built dynamically from the config
4. **Server Action** validates with Zod, sends emails via Resend

## Sanity Form Builder Schema

The `contactForm` schema lives at `sanity/schemas/contactForm.ts`. Key fields:

- `formName` — internal identifier (e.g., "Main Contact Form")
- `submitButtonText` — button label
- `successMessage` — shown after successful submission
- `fields[]` — array of field configurations
- `fromEmail` / `toEmails` — email routing
- `adminEmailTemplate { subject, body }` — admin notification
- `autoReplyTemplate { enabled, subject, body }` — submitter confirmation

### Field Types Available

```
name, email, phone, message, company, service, budget
```

Each field in the `fields[]` array has:
- `fieldType` — which field type
- `label` — display label
- `placeholder` — placeholder text
- `required` — boolean
- `showIf` — conditional visibility (`otherField` + `hasValue`)

### Placeholders in Email Templates

Use `{{fieldName}}` syntax:
```
Subject: New inquiry from {{name}}
Body: {{name}} ({{email}}) wrote: {{message}}
```

## Frontend Implementation

### 1. Build the Zod Schema Dynamically

```typescript
// lib/contact-schema.ts
import { z } from "zod"

const fieldTypeToZod: Record<string, z.ZodTypeAny> = {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
}

export function buildContactSchema(fields: ContactFormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    const schema = fieldTypeToZod[field.fieldType]
    if (schema) {
      shape[field.fieldType] = field.required ? schema : schema.optional()
    }
  }
  return z.object(shape)
}
```

### 2. Server Action

```typescript
// app/actions/contact.ts
'use server'

import { Resend } from "resend"
import { z } from "zod"
import { client } from "@/sanity/lib/client"
import { buildContactSchema } from "@/lib/contact-schema"
import { CONTACT_FORM_QUERY } from "@/sanity/lib/queries"

const resend = new Resend(process.env.RESEND_API_KEY)

function replacePlaceholders(template: string, data: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || "")
}

export async function submitContactForm(
  prev: { success: boolean; error?: string },
  formData: FormData
) {
  // Fetch form config from Sanity
  let formConfig = null
  if (client) {
    try {
      formConfig = await client.fetch(CONTACT_FORM_QUERY)
    } catch {
      return { success: false, error: "Configuration error. Please try again." }
    }
  }

  if (!formConfig) {
    return { success: false, error: "Form not configured. Contact the site owner." }
  }

  // Build schema and validate
  const schema = buildContactSchema(formConfig.fields)
  const rawData = Object.fromEntries(formData)
  const parsed = schema.safeParse(rawData)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  const { name, email, message, ...rest } = parsed.data

  try {
    const placeholderData = { name, email, message, ...rest }

    // Send admin notification
    await resend.emails.send({
      from: formConfig.fromEmail,
      to: formConfig.toEmails,
      subject: replacePlaceholders(formConfig.adminEmailTemplate.subject, placeholderData),
      html: replacePlaceholders(formConfig.adminEmailTemplate.body, placeholderData),
    })

    // Send auto-reply to submitter
    if (formConfig.autoReplyTemplate?.enabled) {
      await resend.emails.send({
        from: formConfig.fromEmail,
        to: email,
        subject: replacePlaceholders(formConfig.autoReplyTemplate.subject, placeholderData),
        html: replacePlaceholders(formConfig.autoReplyTemplate.body, placeholderData),
      })
    }

    return { success: true }
  } catch {
    return { success: false, error: "Failed to send message. Please try again." }
  }
}
```

### 3. Dynamic Form Component

```typescript
// components/contact-form.tsx
'use client'

import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "lucide-react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// fieldConfig comes from a Server Component that fetches from Sanity
export function ContactForm({ fieldConfig }: { fieldConfig: ContactFormField[] }) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false }
  )

  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(buildContactSchema(fieldConfig)),
    mode: "onBlur",
  })

  if (state.success) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <p className="mt-3 text-muted-foreground">
          We received your message and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {fieldConfig.map((field) => (
        <div key={field.fieldType}>
          <Label htmlFor={field.fieldType}>{field.label}</Label>
          {field.fieldType === "message" ? (
            <Textarea id={field.fieldType} rows={5} placeholder={field.placeholder} {...register(field.fieldType)} />
          ) : (
            <Input
              id={field.fieldType}
              type={field.fieldType === "email" ? "email" : field.fieldType === "phone" ? "tel" : "text"}
              placeholder={field.placeholder}
              {...register(field.fieldType)}
            />
          )}
          {errors[field.fieldType] && (
            <p className="mt-1 text-xs text-destructive">{errors[field.fieldType].message}</p>
          )}
        </div>
      ))}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
```

## Query

```typescript
// sanity/lib/queries.ts
import { defineQuery } from "next-sanity"

export const CONTACT_FORM_QUERY = defineQuery(`
  *[_type == "contactForm"][0] {
    formName,
    submitButtonText,
    successMessage,
    fromEmail,
    toEmails,
    adminEmailTemplate { subject, body },
    autoReplyTemplate { enabled, subject, body },
    fields[] {
      _key,
      fieldType,
      label,
      placeholder,
      required,
      showIf {
        otherField,
        hasValue
      }
    }
  }
`)
```

## Key Rules

- **Never hardcode form fields** — always read from Sanity `contactForm` config
- **Always build Zod schema dynamically** from field config
- **Always send admin notification + auto-reply**
- **Use `{{fieldName}}` placeholders** in email templates
- **Return `{ success, error }` from Server Action**
- **Handle null client** — formConfig fetch may fail, show error state