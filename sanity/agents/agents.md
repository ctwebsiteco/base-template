# Sanity Agents

Task-specific guides for the `sanity/` directory. Read [AGENTS.md](../AGENTS.md) first.

## File Map

```
sanity/
├── sanity.config.ts       → agents/sanity-config.md
├── schemas/               → agents/schemas.md
│   ├── index.ts
│   ├── companyInfo.ts
│   ├── contactForm.ts
│   └── objects/
│       ├── seo.ts
│       ├── imageWithAlt.ts
│       └── sectionHeader.ts
└── lib/
    ├── client.ts          → Always nullable — always check if(client)
    ├── live.ts
    ├── queries.ts         → agents/queries.md
    └── image.ts
```

## Core Rule: Client is Nullable

```typescript
import { client, isSanityConfigured } from "./lib/client"

async function getData() {
  if (!client) return null  // Sanity not configured
  try {
    return await client.fetch(MY_QUERY)
  } catch {
    return null  // fetch failed — use fallback
  }
}
```

Never assume `client` exists. Wrap every fetch in try/catch.

## Core Rule: GROQ Queries Use defineQuery

```typescript
import { defineQuery } from "next-sanity"

export const MY_QUERY = defineQuery(`
  *[_type == "myType"][0] {
    field1,
    field2,
    // Always include _key in array projections
    arrayField[] { _key, title, body }
  }
`)
```

## Core Rule: Schema Field Names Reflect Content

Name fields after their content, not their presentation:

- :red_button: `bigHeroText`, `redCallToAction`
- :green_button: `heroStatement`, `primaryCtaLabel`

## Common Tasks

### Adding a New Content Type

1. Create `sanity/schemas/[type].ts` using `defineType` + `defineField`
2. Export in `sanity/schemas/index.ts`
3. Add query in `sanity/lib/queries.ts`
4. Run `pnpm typegen`

### Visual Editing Setup

Include `_key` in every array projection — Visual Editing depends on it:

```groq
arrayField[] { _key, _type, title, body }
```

## Schema Template

```typescript
// sanity/schemas/[type].ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "myType",
  title: "My Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
  ],
})
```