---
name: form-builder
description: Build and extend dynamic contact forms using the Sanity form builder pattern
---

# Form Builder

All contact forms use a **dynamic form builder** — fields, validation, and email config come from Sanity (or local seed), never hardcoded.

## How It Works

1. `data/contactForm.ts` — local seed data (works without Sanity)
2. `lib/data/forms.ts` → `getContactForm()` — returns merged Sanity + seed
3. `lib/contact-schema.ts` → `buildContactSchema()` — builds Zod schema from config
4. Server action validates with Zod, sends emails via Resend

## Standard Field Types

Available in the `contactForm` schema under "standard mode":

```
name, email, phone, message, company, service, budget, textarea, select, checkbox
```

Each maps to a predefined Zod schema with built-in validation.

## Custom Field Types

For fields not in the standard list, use **custom mode**:

```
fieldMode: "custom"
customType: "project_timeline"   # used as form data key
validation:
  minLength: 1
  maxLength: 500
  pattern: "^\\d{3}-\\d{3}-\\d{4}$"
```

Custom fields use `{{project_timeline}}` in email templates.

## Conditional Visibility (`showIf`)

Show a field only when another field has (or doesn't have) a value:

```json
{ "showIf": { "otherField": "service", "hasValue": true } }
```

## Building a Form (Server Component + Client Action)

```typescript
// app/actions/contact.ts
"use server"
import { buildContactSchema } from "@/lib/contact-schema"
import { getContactForm } from "@/lib/data/forms"
import { resend } from "@/lib/resend"

function replacePlaceholders(template: string, data: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => data[k] || "")
}

export async function submitContactForm(prev, formData: FormData) {
  const formConfig = await getContactForm()
  const schema = buildContactSchema(formConfig.fields || [])
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

  const placeholders: Record<string, string> = {}
  for (const [k, v] of Object.entries(parsed.data)) {
    placeholders[k] = String(v ?? "")
  }

  await resend.emails.send({
    from: formConfig.fromEmail,
    to: formConfig.toEmails,
    subject: replacePlaceholders(formConfig.adminEmailTemplate.subject, placeholders),
    html: replacePlaceholders(formConfig.adminEmailTemplate.body, placeholders),
  })

  const email = parsed.data.email
  if (formConfig.autoReplyTemplate?.enabled && email) {
    await resend.emails.send({
      from: formConfig.fromEmail,
      to: email,
      subject: replacePlaceholders(formConfig.autoReplyTemplate.subject, placeholders),
      html: replacePlaceholders(formConfig.autoReplyTemplate.body, placeholders),
    })
  }

  return { success: true }
}
```

## Dynamic Form Component (Client)

```typescript
"use client"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { buildContactSchema } from "@/lib/contact-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm({ fields, submitButtonText = "Send Message" }: {
  fields: FormField[]
  submitButtonText?: string
}) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false },
  )
  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(buildContactSchema(fields)),
    mode: "onBlur",
  })

  if (state.success) {
    return <div className="rounded-lg border bg-card p-10 text-center">
      <h2 className="text-2xl font-bold">Thank You!</h2>
    </div>
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}
      {fields.map((field) => {
        const fieldKey = field.fieldMode === "custom" ? field.customType : field.standardType
        if (!fieldKey) return null
        return (
          <div key={fieldKey}>
            <Label htmlFor={fieldKey}>{field.label}</Label>
            {field.standardType === "textarea" || field.standardType === "message" ? (
              <Textarea id={fieldKey} rows={5} {...register(fieldKey)} />
            ) : field.standardType === "checkbox" ? (
              <input type="checkbox" id={fieldKey} className="mt-1" {...register(fieldKey)} />
            ) : field.standardType === "select" ? (
              <select id={fieldKey} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register(fieldKey)}>
                <option value="">Select...</option>
                {(field.options?.list || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <Input id={fieldKey} type={field.standardType === "email" ? "email" : field.standardType === "phone" ? "tel" : "text"} {...register(fieldKey)} />
            )}
            {errors[fieldKey] && <p className="mt-1 text-xs text-destructive">{String(errors[fieldKey]?.message)}</p>}
          </div>
        )
      })}
      <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Sending..." : submitButtonText}</Button>
    </form>
  )
}
```

## data-testid Convention

Always add `data-testid` to form elements for tests:

```tsx
<Input id="contact-name" data-testid="contact-name" {...register("name")} />
<span data-testid="error-name" className="text-destructive">Name is required</span>
<Button type="submit" data-testid="contact-submit">Send</Button>
```

## After Adding a Custom Field Type

1. Add to the contactForm schema in Sanity Studio (custom mode)
2. No code changes needed — form builder reads from config
3. Email templates automatically support `{{customTypeName}}`
