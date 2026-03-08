# AGENTS.md - AI Development Guide

This document is designed for AI agents (like v0) to understand the template structure and development patterns.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io (via `next-sanity`)
- **Email**: Resend (for form submissions and notifications)
- **Forms**: Server Actions (`'use server'`) with Zod validation
- **UI Components**: shadcn/ui + Radix UI

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Tailwind config + design tokens
│   └── actions/                 # Server Actions
│       └── contact.ts           # Contact form handler (uses Resend)
├── components/                  # React components
│   ├── site-header.tsx          # Navigation header
│   ├── site-footer.tsx          # Footer with contact info
│   ├── json-ld.tsx              # Schema.org structured data
│   └── [feature-specific]/      # Organized by feature
├── sanity/
│   ├── lib/
│   │   ├── client.ts            # Sanity client config
│   │   ├── queries.ts           # GROQ queries
│   │   └── types.ts             # Generated TypeScript types
│   ├── schemas/
│   │   └── index.ts             # Schema definitions
│   └── structure.ts             # Sanity Studio structure
├── lib/
│   ├── metadata.ts              # SEO metadata helpers
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── sanity.config.ts             # Sanity Studio config
├── next.config.ts               # Next.js config
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                # TypeScript config
```

## Key Patterns & Conventions

### 1. Environment Variables

All environment variables are prefixed with `NEXT_PUBLIC_` for client-side access:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (defaults to "production")
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version (defaults to "2024-01-01")
- `NEXT_PUBLIC_SITE_URL` - Full site URL for metadata
- `RESEND_API_KEY` - Resend API key (server-side only)
- `NEXT_PUBLIC_COMPANY_*` - Company info (name, email, phone, address)

See `.env.local.example` for complete reference.

### 2. Server Actions

All form submissions use Next.js Server Actions with Zod validation:

```typescript
'use server'

import { z } from 'zod'
import { resend } from '@/lib/resend'

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
})

export async function submitForm(formData: FormData) {
  const data = Object.fromEntries(formData)
  const validated = schema.parse(data)
  
  await resend.emails.send({
    from: 'noreply@example.com',
    to: process.env.COMPANY_EMAIL,
    subject: 'New Contact',
    html: `<p>${validated.message}</p>`,
  })
  
  return { success: true }
}
```

### 3. Sanity Integration

**GROQ Queries**: Use typed GROQ queries in `sanity/lib/queries.ts`:

```typescript
export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0] {
    title,
    description,
    "image": image.asset->url,
  }
`

// In components:
const data = await client.fetch(HOMEPAGE_QUERY)
```

**Schemas**: Define all content types in `sanity/schemas/index.ts` with TypeScript interfaces:

```typescript
export interface HomePage {
  _type: 'homepage'
  title: string
  description: string
  image?: {
    asset: Reference<'sanity.imageAsset'>
  }
}
```

### 4. Components

- **RSC (React Server Components)**: Fetch data at component level, not in useEffect
- **Client Components**: Use `'use client'` only when necessary (interactivity, hooks)
- **UI Library**: Import from `@/components/ui` (shadcn/ui components)
- **Styling**: Use Tailwind classes with design tokens from `globals.css`

Example RSC:
```typescript
export async function HomePage() {
  const data = await client.fetch(HOMEPAGE_QUERY)
  
  return (
    <main className="bg-background">
      <h1 className="text-foreground">{data.title}</h1>
    </main>
  )
}
```

### 5. Design System

**Colors** (defined in `globals.css`):
- `--background` - Main background
- `--foreground` - Main text
- `--primary` - Primary brand color
- `--secondary` - Secondary accent
- `--accent` - Tertiary accent
- `--destructive` - Error/delete state
- `--muted` - Disabled/secondary text
- `--border` - Border color

Use semantic Tailwind classes: `bg-background`, `text-foreground`, `border-border`

**Typography**:
- Default font: Geist (sans)
- Mono font: Geist Mono (for code)
- Line height: `leading-relaxed` for body (1.6)
- Use `text-balance` for headings

### 6. Metadata & SEO

Use `metadata.ts` helper for consistent SEO:

```typescript
export const metadata: Metadata = getMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
  image: 'og-image.jpg',
})
```

Include JSON-LD schema via `<JsonLd>` component for rich snippets.

## Common Tasks

### Adding a New Page

1. Create `app/[page-slug]/page.tsx`
2. Define GROQ query in `sanity/lib/queries.ts`
3. Fetch data in component (RSC)
4. Use `getMetadata()` for SEO
5. Add to Sanity schema if content-driven

### Adding a Form

1. Create form component with `'use client'`
2. Create Server Action in `app/actions/`
3. Use Zod for validation
4. Send email via Resend
5. Return success/error state

### Adding Content Type

1. Define interface in `sanity/lib/types.ts`
2. Create schema in `sanity/schemas/[type].ts`
3. Export schema in `sanity/schemas/index.ts`
4. Add GROQ query in `sanity/lib/queries.ts`
5. Update `sanity/structure.ts` for Studio UI

### Styling New Component

1. Use design tokens from `globals.css`
2. Use semantic Tailwind classes
3. Follow layout priority: flexbox > grid > absolute
4. Use `gap-*` for spacing, not margin/padding
5. Test responsiveness with Tailwind breakpoints

## Important Files to Know

### Environment & Config
- `.env.local.example` - Environment template
- `sanity.config.ts` - Sanity Studio configuration
- `next.config.ts` - Next.js build/runtime config
- `tailwind.config.ts` - Tailwind customization

### Core Files
- `app/layout.tsx` - Root layout, metadata, fonts
- `app/globals.css` - Design tokens, font declarations
- `lib/metadata.ts` - SEO helper functions
- `sanity/lib/client.ts` - Sanity client with API version

### Data Layer
- `sanity/lib/queries.ts` - All GROQ queries (centralized)
- `sanity/lib/types.ts` - TypeScript interfaces for content
- `sanity/schemas/` - Content schema definitions

### Actions
- `app/actions/` - Server Actions for forms
- Always use Zod for validation
- Always use Resend for emails

## Development Workflow for Agents

### When Adding Features

1. **Check existing patterns** - Look for similar features already in codebase
2. **Define content** - Add Sanity schema and GROQ query
3. **Build UI** - Create React component using existing patterns
4. **Add actions** - If form needed, create Server Action with Resend
5. **Set metadata** - Include SEO metadata via `getMetadata()`
6. **Test** - Run locally and verify with Sanity

### When Debugging

- Check `NEXT_PUBLIC_` env vars are set correctly
- Verify Sanity project ID matches `.env.local`
- Check GROQ queries return expected data
- Ensure form data validates with Zod schema
- Use RSC for data fetching, not useEffect

### When Deploying

1. Ensure all `NEXT_PUBLIC_*` vars set in Vercel
2. Ensure `RESEND_API_KEY` set in Vercel (not public)
3. Verify Sanity project and dataset configured
4. Test form submissions send emails to correct address
5. Verify SEO metadata renders correctly

## Best Practices

✅ **DO**
- Use Server Actions for all form handling
- Fetch data in RSCs, pass down to clients
- Centralize GROQ queries in `queries.ts`
- Use design tokens for colors
- Use Zod for all form validation
- Export TypeScript types for all Sanity schemas
- Use `text-balance` for headings
- Test on mobile before desktop

❌ **DON'T**
- Fetch data in useEffect
- Use localStorage for persistence (use Sanity instead)
- Use hardcoded colors (use design tokens)
- Create inline Sanity queries (use centralized queries)
- Skip Zod validation on forms
- Use emojis as icons
- Use absolute positioning for layout
- Mix margin and gap on same element

## Troubleshooting

**Sanity client errors**
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Verify API version is valid date format (YYYY-MM-DD)
- Ensure dataset exists in Sanity project

**Form submission fails**
- Verify `RESEND_API_KEY` is set in environment
- Check Zod schema matches FormData keys
- Ensure Resend has correct "from" email configured

**Styling issues**
- Check design tokens exist in `globals.css`
- Verify Tailwind class applied to correct element
- Check for conflicting margin/padding with gap
- Use browser DevTools to inspect computed styles

**Metadata not showing**
- Verify `getMetadata()` called in page
- Check OpenGraph image URL is accessible
- Ensure metadata exported from page.tsx

## Learning Resources for Agents

- Sanity GROQ docs: https://www.sanity.io/docs/groq
- Next.js Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- Resend docs: https://resend.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Zod validation: https://zod.dev
