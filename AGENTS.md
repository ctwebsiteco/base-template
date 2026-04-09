# CT Website Co — Base Template

A blank canvas for building custom client sites. No pre-built pages, headers, or content — just the standard integrations and backend patterns.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with CSS design tokens
- **CMS**: Sanity.io (via `next-sanity`) — client is nullable, always check `if (client)`
- **Email**: Resend (transactional emails)
- **Forms**: Server Actions + Zod validation + form builder pattern
- **UI**: shadcn/ui + Radix UI
- **Analytics**: RUM (web-vitals) + GA4 (pure JS injection)
- **Hosting**: Vercel

## Project Structure

```
app/
├── layout.tsx              # Root layout — metadata, fonts, RUM, GA4, SanityLive
├── page.tsx                # Blank homepage (custom per client)
├── globals.css             # Design tokens (oklch colors), Tailwind v4 config
├── not-found.tsx           # 404 page
├── robots.ts               # SEO robots.txt
├── sitemap.ts              # XML sitemap
├── llms.txt/route.ts       # AI-readable documentation
├── actions/
│   └── contact.ts         # Contact form Server Action (form builder pattern)
├── api/
│   ├── draft-enable/      # Sanity draft mode
│   ├── draft-disable/
│   └── draft-mode/enable|disable/
├── contact/
│   └── page.tsx            # Contact page — renders form from Sanity config
components/
├── ui/                    # shadcn/ui components (button, input, label, textarea, select, sheet, navigation-menu)
├── contact-form.tsx        # Dynamic contact form (reads field config from Sanity)
├── rum-client.tsx         # RUM analytics (web-vitals → CRM beacon)
├── json-ld.tsx            # Schema.org LocalBusiness structured data
├── disable-draft-mode.tsx # Draft mode exit button
sanity/
├── lib/
│   ├── client.ts           # Sanity client (nullable — check if(client) before fetch)
│   ├── live.ts             # defineLive + SanityLive
│   ├── queries.ts          # GROQ queries (use defineQuery from next-sanity)
│   └── image.ts            # Sanity image URL builder
├── schemas/
│   ├── index.ts            # Schema type exports
│   ├── companyInfo.ts       # Business details (singleton)
│   ├── contactForm.ts      # Form builder config (fields, email templates, validation)
│   └── objects/
│       ├── seo.ts          # metaTitle + metaDescription
│       ├── imageWithAlt.ts # Image with required alt text
│       └── sectionHeader.ts # heading + subtitle + description
lib/
├── metadata.ts             # createPageMetadata() helper for SEO
├── utils.ts                # cn() utility (clsx + tailwind-merge)
├── contact-schema.ts      # Zod schema builder for dynamic contact forms
├── resend.ts               # Resend client singleton
sanity.config.ts            # Sanity Studio config (structure, plugins, theme)
next.config.ts              # Next.js config (image domains, redirects)
.env.local.example          # All environment variables documented
```

## Core Patterns

### 1. Sanity Client is Always Nullable

```typescript
import { client, isSanityConfigured } from "@/sanity/lib/client"

// ALWAYS check before using:
if (client) {
  try {
    data = await client.fetch(YOUR_QUERY)
  } catch {
    // Sanity fetch failed — use env var fallbacks or static defaults
  }
}
```

### 2. Environment Variables

All client-side vars **must** be prefixed `NEXT_PUBLIC_`. Server-only vars (no prefix) stay private.

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID      # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET         # default: "production"
NEXT_PUBLIC_SANITY_API_VERSION     # default: "2024-01-01"
SANITY_API_READ_TOKEN              # Server-only — Sanity viewer token
NEXT_PUBLIC_PORTAL_URL             # https://portal.ctwebsiteco.com (for stega redirect)

# Site URL
NEXT_PUBLIC_SITE_URL              # https://yourdomain.com

# Email (Resend)
RESEND_API_KEY                    # Server-only
CONTACT_FROM_EMAIL                # noreply@yourdomain.com
CONTACT_TO_EMAILS                 # comma-separated recipients

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID     # G-XXXXXXXXXX
NEXT_PUBLIC_RUM_TOKEN             # CRM RUM token

# Company Info (static fallbacks when Sanity not configured)
NEXT_PUBLIC_COMPANY_NAME          # Your Business Name
NEXT_PUBLIC_COMPANY_EMAIL         # info@yourdomain.com
NEXT_PUBLIC_COMPANY_PHONE          # (555) 555-5555
NEXT_PUBLIC_COMPANY_ADDRESS        # City, State
```

### 3. Form Builder Pattern

Forms are configured in Sanity as a `contactForm` document. The frontend dynamically renders fields based on the Sanity config. Never hardcode form fields — read from Sanity.

**Sanity schema** (`sanity/schemas/contactForm.ts`):
- `formName` — internal identifier
- `fields[]` — array of `{ fieldType, label, placeholder, required, showIf }`
- `fromEmail` / `toEmails` — email routing
- `adminEmailTemplate { subject, body }` — with `{{fieldName}}` placeholders
- `autoReplyTemplate { enabled, subject, body }` — confirmation to submitter
- `submitButtonText`, `successMessage`

**Frontend** builds a Zod schema dynamically from the `contactForm` config:

```typescript
// lib/contact-schema.ts
const fieldTypeToZod = {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
}

export function buildContactSchema(fields: ContactFormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    if (field.fieldType in fieldTypeToZod) {
      let schema = fieldTypeToZod[field.fieldType as keyof typeof fieldTypeToZod]
      if (!field.required) schema = schema.optional()
      shape[field.fieldType] = schema
    }
  }
  return z.object(shape)
}
```

### 4. GROQ Queries — Always Use defineQuery

```typescript
import { defineQuery } from "next-sanity"

export const COMPANY_INFO_QUERY = defineQuery(`
  *[_type == "companyInfo"][0] {
    name,
    phone,
    email,
    address,
    tagline,
    description,
    "logoUrl": logo.asset->url,
    seo
  }
`)
```

**Rules**:
- Include `_key` in every array projection (required for Visual Editing)
- Use projections — only fetch fields you need
- Order BEFORE slice: `| order(publishedAt desc)[0...10]`
- Use `coalesce()` for defaults

### 5. SEO Metadata — Always Use `stega: false`

```typescript
export async function generateMetadata() {
  const data = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    stega: false, // Critical — prevents stega chars in metadata
  })
  return { title: data?.title, description: data?.description }
}
```

## Development Workflow

### Building a New Client Site from This Template

1. **Clone and configure**
   ```bash
   git clone git@github.com:CTWebsiteCo/base-template.git v0-client-name
   cd v0-client-name
   cp .env.local.example .env.local
   # Fill in all env vars
   ```

2. **Create Sanity project** at sanity.io/manage
   - Add schemas (companyInfo, contactForm, custom content types)
   - Run `pnpm typegen` to generate TypeScript types

3. **Build pages** — this is a blank canvas. Every client site is different:
   - Create `app/[slug]/page.tsx` for each page
   - Add GROQ queries in `sanity/lib/queries.ts`
   - Fetch data in RSC (not useEffect)

4. **Wire contact form**
   - Build the `contactForm` document in Sanity
   - Server Action reads config, builds Zod schema, sends emails via Resend

5. **SEO setup**
   - Update `app/layout.tsx` metadata
   - Update `robots.ts` and `sitemap.ts` with real URLs
   - Update `json-ld.tsx` with business data
   - Update `llms.txt/route.ts` with site-specific content

### Adding a Form (General)

1. Create Sanity `contactForm` document with field config
2. Server Action in `app/actions/[name].ts` — Zod validation + Resend emails
3. Form component in `components/` — reads config from Sanity, renders dynamically
4. Page in `app/[name]/page.tsx`

### Adding a Content Type

1. Create schema in `sanity/schemas/[type].ts` (use `defineType`, `defineField`)
2. Export in `sanity/schemas/index.ts`
3. Add query in `sanity/lib/queries.ts` (use `defineQuery`)
4. Run `pnpm typegen`
5. Add page or component to render

## Color Design Tokens (globals.css)

```css
--background    #FFFFFF
--foreground    oklch(0.145)
--primary       oklch(0.205)
--secondary     oklch(0.97)
--accent        oklch(0.97)
--destructive   oklch(0.58 0.22 27)
--muted         oklch(0.97)
--border        oklch(0.922)
```

Use as Tailwind classes: `bg-background`, `text-foreground`, `border-border`

## Testing Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Contact form renders with correct fields from Sanity
- [ ] Form submission sends admin email + auto-reply
- [ ] RUM metrics appear in CRM when `NEXT_PUBLIC_RUM_TOKEN` set
- [ ] GA4 receives pageview data when `NEXT_PUBLIC_GA_MEASUREMENT_ID` set
- [ ] Sanity content renders correctly in live mode
- [ ] 404 page works
- [ ] Mobile responsive

## DO / DON'T

**DO**
- Fetch data in RSC (not useEffect)
- Check `if (client)` before every Sanity fetch
- Use Zod for ALL form validation
- Use design tokens (CSS variables) for colors
- Use `text-balance` on headings
- Send confirmation emails to form submitters
- Use `navigator.sendBeacon` for RUM metrics
- Use `stega: false` for SEO metadata

**DON'T**
- Use localStorage for persistence
- Hardcode colors (use CSS variables)
- Create inline GROQ queries (use centralized queries)
- Fetch data in useEffect
- Skip Zod validation
- Use absolute positioning for layout
- Mix margin/padding with gap
- Pre-build pages or sections (this is a blank canvas)