# Sanity Directory

## File Map

```
sanity/
├── sanity.config.ts
├── schemas/
│   ├── index.ts           export all schema types
│   ├── companyInfo.ts     singleton document
│   ├── contactForm.ts     form builder config
│   └── objects/
│       ├── seo.ts         metaTitle + metaDescription
│       ├── imageWithAlt.ts image with required alt
│       └── sectionHeader.ts
└── lib/
    ├── client.ts          nullable — always check if(client)
    ├── live.ts           defineLive + sanityFetch
    ├── queries.ts         all GROQ queries (defineQuery)
    └── image.ts           urlFor() helper
```

## Client is Nullable

**Only `sanity/lib/` files check `if (client)`.** Pages/components use `lib/data/` accessors.

```typescript
// sanity/lib/client.ts
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null
export const isSanityConfigured = Boolean(projectId)
```

## GROQ Queries — Use defineQuery

```typescript
// sanity/lib/queries.ts
import { defineQuery } from "next-sanity"

export const COMPANY_INFO_QUERY = defineQuery(`
  *[_type == "companyInfo"][0] {
    name,
    phone,
    "logoUrl": logo.asset->url,
    seo
  }
`)
```

## Array Projections — Always Include `_key`

Required for Visual Editing:

```groq
pageBuilder[] {
  _key,     // REQUIRED
  _type,
  heading,
  body
}
```

## Schema Field Naming

**Name fields after content, not presentation.**

```
WRONG:  bigHeroText, redButton, threeColumnRow
RIGHT:  heroStatement, primaryCtaLabel, columnCount
```

## Validation Rules

Always add validation:

```typescript
defineField({
  name: "metaTitle",
  type: "string",
  validation: (rule) => rule.max(70).warning("Keep under 70 chars"),
})
```

## SEO Rule: stega: false

All Sanity fetches for metadata must disable stega:

```typescript
sanityFetch({ query: PAGE_QUERY, stega: false })
```

This prevents stega characters from leaking into `<title>` and `<meta>` tags.

## After Changing Schemas

1. `pnpm typegen` — regenerate types
2. Add GROQ query in `sanity/lib/queries.ts`
3. Create `data/[type].ts` seed data
4. Create `lib/data/[type].ts` accessor
