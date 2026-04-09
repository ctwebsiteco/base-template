# Schema Design

Model **what things are**, not **what they look like**. Schema names should make sense even if you completely redesigned the site.

## Rules

### DO
- Use `defineType`, `defineField`, `defineArrayMember` from Sanity
- Name fields after their content, not their presentation (❌ `bigHeroText`, ✅ `heroStatement`)
- Include `_key` in every array projection (required for Visual Editing)
- Add validation rules (`required()`, `.email()`, `.max(N)`)
- Use icons from `@sanity/icons` for document types
- Use projections — only fetch fields you need, not `*`

### DON'T
- Name fields after layout or style (`redButton`, `threeColumnRow`)
- Skip validation rules
- Use `*` projection — wasteful and exposes unintended fields
- Hardcode form fields — use the form builder pattern

## File Structure

```
sanity/
├── schemas/
│   ├── index.ts              # Export all schema types
│   ├── companyInfo.ts         # Singleton document
│   ├── contactForm.ts         # Form builder config
│   ├── [contentType].ts       # Each content type = one file
│   └── objects/
│       ├── seo.ts             # metaTitle + metaDescription
│       ├── imageWithAlt.ts    # Image with required alt
│       └── sectionHeader.ts   # Reusable section header
├── lib/
│   ├── client.ts             # Sanity client (nullable)
│   ├── live.ts               # defineLive setup
│   └── queries.ts            # All GROQ queries (defineQuery)
```

## Schema Template

```typescript
// sanity/schemas/[type].ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "[typeName]",           // kebab-case, unique
  title: "[Display Name]",      // human-readable
  type: "document",             // or "object", "string", etc.
  fields: [
    defineField({
      name: "fieldName",       // camelCase, unique within schema
      title: "Field Name",
      type: "string",          // or reference, array, object, etc.
      validation: (rule) => rule.required().max(100),
    }),
    // More fields...
  ],
  preview: {
    select: { title: "name", subtitle: "title" }
  }
})
```

## GROQ Query Rules

```typescript
// sanity/lib/queries.ts
import { defineQuery } from "next-sanity"

// ✅ Always use defineQuery
export const COMPANY_INFO_QUERY = defineQuery(`
  *[_type == "companyInfo"][0] {
    name,
    phone,
    email,
    address,
    "logoUrl": logo.asset->url,
    seo
  }
`)

// ✅ Include _key in array projections (Visual Editing)
export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    title,
    pageBuilder[] {
      _key,        // Required for Visual Editing
      _type,
      ...
    }
  }
`)

// ✅ Order BEFORE slice
*[_type == "post"] | order(publishedAt desc)[0...10]

// ✅ Use coalesce for defaults
"title": coalesce(seo.metaTitle, title, "Untitled")

// ✅ Use projections — only fetch what you need
*[_type == "companyInfo"][0] { name, phone, email }  // Good
*[_type == "companyInfo"][0]                          // Bad — fetches everything
```

## Common Schema Types

### Document
A top-level content type (page, article, company info).

```typescript
export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [...]
})
```

### Object
Reusable block that can be embedded in documents.

```typescript
export default defineType({
  name: "imageWithAlt",
  title: "Image with Alt",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", type: "string", validation: (rule) => rule.required() }),
  ]
})
```

### Array of References
For tags, categories, etc.

```typescript
defineField({
  name: "categories",
  type: "array",
  of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })]
})
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
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.max(70).warning("Keep under 70 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Keep under 160 characters"),
    }),
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
    defineField({
      name: "asset",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (rule) => rule.required().error("Alt text is required for accessibility"),
    }),
  ],
})
```

### sectionHeader.ts
```typescript
// sanity/schemas/objects/sectionHeader.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
})
```

## Adding a New Schema

1. Create `sanity/schemas/[type].ts`
2. Add to `sanity/schemas/index.ts`:
   ```typescript
   import myType from "./myType"
   export const schemaTypes = [myType, ...]
   ```
3. Run `pnpm typegen` to generate TypeScript types
4. Add GROQ query in `sanity/lib/queries.ts`

## Sanity Client is Nullable

```typescript
import { client, isSanityConfigured } from "@/sanity/lib/client"

export async function getData() {
  if (!client) return null

  try {
    return await client.fetch(MY_QUERY)
  } catch {
    return null // Sanity fetch failed — use fallback
  }
}
```