# SEO Setup

Every page needs proper metadata, structured data, and crawlability. This guide covers all four layers.

## 1. Page Metadata

Use `createPageMetadata()` helper in `lib/metadata.ts`:

```typescript
// app/services/page.tsx
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Our Services",
  description: "Professional services for residential and commercial customers.",
  path: "/services",
  // image is optional — defaults to site og:image
})

export default async function ServicesPage() { ... }
```

For pages fetching from Sanity, use `stega: false` to prevent stega characters leaking into metadata:

```typescript
import { sanityFetch } from "@/sanity/lib/live"

export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
    stega: false, // Critical for SEO
  })
  return { title: data?.seo?.metaTitle || data?.title }
}
```

## 2. JSON-LD Structured Data

The `JsonLd` component in `components/json-ld.tsx` renders a `LocalBusiness` schema.

Update it per-client by fetching from `companyInfo` Sanity document:

```typescript
// components/json-ld.tsx
const companyName = company?.name || process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name"
```

For non-LocalBusiness sites (e.g., e-commerce, blogs), update the `@type` accordingly.

## 3. robots.txt

`app/robots.ts` allows all major AI bots:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

Update `BASE_URL` with actual site URL:
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
```

## 4. sitemap.xml

`app/sitemap.ts` lists all public routes. Update it per-client to include all pages:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Add all site pages here
  ]
}
```

## 5. llms.txt

`app/llms.txt/route.ts` generates AI-readable documentation of the site. Update the hardcoded fallback content per client:

```typescript
const companyName = companyInfo?.name || process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name"
const tagline = companyInfo?.tagline || "Your trusted local service provider."
// ... etc
```

This should reflect the actual business — services, location, contact info.

## Metadata Best Practices

- **Title**: Include business name, keep under 60 chars
- **Description**: Include keywords, keep under 160 chars
- **Canonical URL**: Always set to prevent duplicate content
- **OpenGraph**: Include `title`, `description`, `image` (1200x630)
- **`text-balance`**: Use on all headings for better readability

## JSON-LD Testing

Use Google's [Rich Results Test](https://search.google.com/test/rich-results) or [Schema.org validator](https://validator.schema.org/) to verify structured data.

## Checklist

- [ ] All pages have `metadata` export
- [ ] Sanity-driven pages use `stega: false` in fetch
- [ ] `NEXT_PUBLIC_SITE_URL` is set correctly
- [ ] robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] sitemap.xml includes all public routes
- [ ] llms.txt reflects actual site content
- [ ] JSON-LD uses correct `@type` for the business
- [ ] All images have alt text (enforced by `imageWithAlt` schema)