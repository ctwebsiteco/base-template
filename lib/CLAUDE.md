# Lib Directory

## File Map

```
lib/
├── data/
│   ├── company.ts      getCompanyInfo() — ONLY way to get company data
│   └── forms.ts        getContactForm() — ONLY way to get form config
├── metadata.ts         createPageMetadata() for page SEO
├── contact-schema.ts   buildContactSchema() for dynamic forms
├── utils.ts            cn() utility (never rewrite or duplicate)
└── resend.ts          Resend singleton
```

## Critical: Data Accessors

**The `lib/data/` accessors are the only way to fetch company or form data in pages/components.**

```typescript
// CORRECT
import { getCompanyInfo } from "@/lib/data/company"
const company = await getCompanyInfo()

// WRONG — never inline client.fetch in pages
import { client } from "@/sanity/lib/client"
if (client) { ... }
```

Accessors handle the merge: Sanity data overrides local seed when configured. Pages never need `if (client)`.

## cn() Rule

**Never rewrite `cn()` or duplicate class-merging logic.**

```typescript
import { cn } from "@/lib/utils"

// CORRECT
<span className={cn("base", isActive && "active")}

// WRONG
<span className={"base " + (isActive ? "active" : "")}
```

## Resend Pattern

```typescript
// lib/resend.ts
import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)
export { resend }

// Usage
import { resend } from "@/lib/resend"
await resend.emails.send({ from: config.fromEmail, to: [...], ... })
```

## buildContactSchema()

Builds a Zod schema dynamically from form field config:

```typescript
import { buildContactSchema } from "@/lib/contact-schema"
const schema = buildContactSchema(formConfig.fields || [])
const parsed = schema.safeParse(Object.fromEntries(formData))
```

## createPageMetadata()

```typescript
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Page Title",
  description: "...",
  path: "/slug",
})
```

Handles OG tags, Twitter cards, and canonical URLs automatically.
