---
name: schema-design
description: Create, modify, and extend Sanity schemas with proper patterns
---

# Schema Design

Model **what things are**, not **what they look like**. Schema names should make sense even if the site is redesigned.

## Rules

**DO:**
- Use `defineType`, `defineField`, `defineArrayMember` from Sanity
- Name fields after content, not presentation (`heroStatement` not `bigHeroText`)
- Include `_key` in every array projection (required for Visual Editing)
- Add validation rules (`required()`, `.email()`, `.max(N)`)
- Use projections — only fetch fields you need, not `*`

**DON'T:**
- Name fields after layout/style (`redButton`, `threeColumnRow`)
- Skip validation rules
- Use `*` projection — wasteful and exposes unintended fields
- Hardcode form fields — use the form builder pattern

## Schema Template

```typescript
// sanity/schemas/[type].ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "[typeName]",        // kebab-case, unique
  title: "[Display Name]",   // human-readable
  type: "document",         // or "object"
  fields: [
    defineField({
      name: "fieldName",  // camelCase, unique within schema
      title: "Field Name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title" }
  }
})
```

## File Structure

```
sanity/
├── schemas/
│   ├── index.ts           ← export all schema types
│   ├── [type].ts          ← one file per content type
│   └── objects/
│       ├── seo.ts         ← metaTitle + metaDescription
│       ├── imageWithAlt.ts ← image with required alt
│       └── sectionHeader.ts
└── lib/
    ├── client.ts          ← nullable client
    ├── queries.ts         ← all GROQ queries (defineQuery)
    └── image.ts           ← urlFor() helper
```

## GROQ Query Rules

**Always use `defineQuery`** from `next-sanity`:

```typescript
// sanity/lib/queries.ts
import { defineQuery } from "next-sanity"

export const MY_QUERY = defineQuery(`
  *[_type == "myType"][0] {
    field1,
    field2,
    "logoUrl": logo.asset->url,
  }
`)
```

**Always include `_key` in array projections** — Visual Editing depends on it:

```groq
pageBuilder[] {
  _key,      // REQUIRED
  _type,
  heading,
  body
}
```

**Order before slice:**
```groq
*[_type == "post"] | order(publishedAt desc)[0...10]
```

**Use projections — only fetch what you need:**
```groq
*[_type == "companyInfo"][0] { name, phone, email }  // Good
*[_type == "companyInfo"][0]                          // Bad — fetches everything
```

## Essential Object Schemas

### seo.ts
```typescript
// sanity/schemas/objects/seo.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "string",
      validation: (rule) => rule.max(70).warning("Keep under 70 chars") }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3,
      validation: (rule) => rule.max(160).warning("Keep under 160 chars") }),
  ],
})
```

### imageWithAlt.ts
```typescript
// sanity/schemas/objects/imageWithAlt.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true },
      validation: (rule) => rule.required() }),
    defineField({ name: "alt", title: "Alt Text", type: "string",
      validation: (rule) => rule.required().error("Alt text is required for accessibility") }),
  ],
})
```

## After Adding a New Schema

1. Create `sanity/schemas/[type].ts`
2. Export in `sanity/schemas/index.ts`
3. Run `pnpm typegen` to generate TypeScript types
4. Add GROQ query in `sanity/lib/queries.ts`
5. Create `data/[type].ts` with local seed data (mirrors document shape)
6. Create `lib/data/[type].ts` with `get<Type>()` accessor

## Adding to the Local Seed Data Layer

For each new content type, create both seed and accessor:

```typescript
// data/[type].ts
import type { MyType } from "@/sanity/types"
export const myType: MyType = { _type: "myType", _id: "default", ... } as const

// lib/data/[type].ts
import { client, isSanityConfigured } from "@/sanity/lib/client"
import { MY_QUERY } from "@/sanity/lib/queries"
import { myType as localMyType } from "@/data/myType"
import type { MyType } from "@/sanity/types"

export async function getMyType(): Promise<MyType> {
  if (isSanityConfigured && client) {
    try {
      const data = await client.fetch<Partial<MyType>>(MY_QUERY)
      if (data) return { ...localMyType, ...data }
    } catch { /* use local */ }
  }
  return localMyType
}
```

## Client is Nullable

**Only `sanity/lib/` files check `if (client)`.** Pages/components use `lib/data/` accessors.

```typescript
// sanity/lib/client.ts — only place that checks client
export const client = projectId ? createClient({ ... }) : null
export const isSanityConfigured = Boolean(projectId)
```
