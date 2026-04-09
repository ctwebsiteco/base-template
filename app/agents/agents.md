# App Router Agents

Task-specific guides for the `app/` directory. Read [AGENTS.md](../AGENTS.md) first for project-wide context.

## File Map

```
app/
├── layout.tsx         → agents/layout.md
├── page.tsx           → agents/pages.md
├── not-found.tsx
├── robots.ts
├── sitemap.ts
├── globals.css
├── llms.txt/route.ts
├── actions/           → agents/actions.md
│   └── contact.ts
└── api/              → agents/api-routes.md
    └── draft-mode/
```

## Quick Decisions

| Question | Answer |
|----------|--------|
| Fetch data in RSC or useEffect? | RSC only — no useEffect for data fetching |
| Metadata in layout or per-page? | Per-page `export const metadata` |
| Server Actions in same file as page? | No — colocate in `app/actions/` |
| Draft mode token in URL or env? | Env var `DRAFT_MODE_SECRET` |

## Common Tasks

### Adding a New Page

1. Create `app/[slug]/page.tsx`
2. Fetch data from Sanity in RSC
3. Export `metadata` using `createPageMetadata()` from `lib/metadata.ts`
4. Use `stega: false` on all Sanity fetches in metadata

```typescript
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Page Title",
  description: "...",
  path: "/slug",
})

export default async function Page() {
  const data = await getData()
  return <main>...</main>
}
```

### Adding a Server Action

1. Create `app/actions/[name].ts`
2. Always validate with Zod first
3. Return `{ success: boolean; error?: string }`

```typescript
"use server"
import { z } from "zod"
import { client } from "@/sanity/lib/client"
import { MY_QUERY } from "@/sanity/lib/queries"

export async function myAction(prev: State, data: FormData) {
  const schema = z.object({ field: z.string().min(1) })
  const parsed = schema.safeParse(Object.fromEntries(data))
  if (!parsed.success) return { success: false, error: "Invalid input" }

  // ... do work
  return { success: true }
}
```

### Adding a Draft Mode API Route

Use the `NEXT_PUBLIC_PORTAL_URL` pattern for Sanity Live:
```
app/api/draft-mode/enable/route.ts
app/api/draft-mode/disable/route.ts
```

## Pattern: Page Data Fetching

```typescript
// app/[slug]/page.tsx
import { client } from "@/sanity/lib/client"
import { MY_QUERY } from "@/sanity/lib/queries"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let data = null

  if (client) {
    try {
      data = await client.fetch(MY_QUERY, { slug })
    } catch {
      // use fallback
    }
  }

  return <main>{data ? <Content data={data} /> : <Fallback />}</main>
}
```

## Pattern: Metadata with Sanity SEO

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getData(slug)

  return createPageMetadata({
    title: data?.seo?.metaTitle || data?.title,
    description: data?.seo?.metaDescription,
    path: `/${slug}`,
    ogImage: data?.seo?.ogImage?.asset?.url,
    noIndex: data?.seo?.noIndex,
  })
}
```