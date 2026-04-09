---
name: seo
description: Page SEO, JSON-LD structured data, sitemap, robots.txt, and llms.txt
---

# SEO Setup

## Page Metadata

Use `createPageMetadata()` from `lib/metadata.ts` for all pages. It handles title, description, OG tags, Twitter cards, and canonical URLs automatically.

```typescript
// app/[slug]/page.tsx
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Page Title",
  description: "Unique description for this page",
  path: "/slug",
})

export default async function Page() { ... }
```

## Sanity SEO Fetch Rule

**Always use `stega: false`** on Sanity fetches used for metadata. This prevents stega characters from leaking into `<title>` and `<meta>` tags.

```typescript
sanityFetch({ query: PAGE_QUERY, stega: false })
```

## JSON-LD LocalBusiness Schema

`components/json-ld.tsx` renders a `LocalBusiness` schema. Update it per-client with real data:

```typescript
// Update per-client:
const schema = {
  "@type": "LocalBusiness",
  name: company.name,
  telephone: company.phone,
  address: { ... },
  priceRange: company.priceRange,
  aggregateRating: { ... },
}
```

Test at: https://search.google.com/test/rich-results

## Heading Rule

**Always use `text-balance` on all `<h1>`–`<h6>` headings:**

```tsx
<h1 className="text-balance">Your Heading</h1>
```

## robots.txt

`app/robots.ts` allows all AI bots (Google, Claude, ChatGPT, Perplexity). Update for client-specific paths.

## sitemap.xml

`app/sitemap.ts` generates sitemap from all public routes. Add new routes here when created.

## llms.txt

`app/llms.txt/route.ts` generates AI-readable site documentation. Update the template content when adding new sections or services.

## Canonical URLs

Handled automatically by `createPageMetadata()` using `NEXT_PUBLIC_SITE_URL`.

## No-Index for Draft/Dev

For Sanity Studio preview pages, set `noIndex: true` in metadata config.
