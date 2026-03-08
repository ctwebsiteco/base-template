# Base Template Project

## Quick Start
1. Copy `.env.local.example` to `.env.local` and fill in values
2. `pnpm install`
3. `pnpm dev`

## Customization Checklist (in order)

### 1. Environment & Sanity
- [ ] Create Sanity project → set NEXT_PUBLIC_SANITY_PROJECT_ID
- [ ] Set all env vars in .env.local
- [ ] Run `pnpm typegen`

### 2. Branding
- [ ] Replace Inter font in app/layout.tsx with client font
- [ ] Update CSS variables in app/globals.css for brand colors
- [ ] Update metadata in app/layout.tsx (title, description, domain)
- [ ] Set NEXT_PUBLIC_SITE_URL
- [ ] Generate favicon assets from logo (favicon.ico, apple-icon.png, icon.png)

### 3. Schemas & Content
- [ ] Analyze v0 site content → create site-specific Sanity schemas
- [ ] Add schemas to sanity/schemas/index.ts
- [ ] Run `pnpm typegen`
- [ ] Add GROQ queries to sanity/lib/queries.ts

### 4. Pages & Components
- [ ] Replace placeholder homepage with v0 components
- [ ] Create all page routes
- [ ] Wire pages to Sanity via sanityFetch
- [ ] Replace site-header.tsx and site-footer.tsx
- [ ] Update json-ld.tsx @type if needed

### 5. Contact Form
- [ ] Add/modify fields in lib/contact-schema.ts
- [ ] Update zones 1-4 in app/actions/contact.ts
- [ ] Update emailTemplates.ts placeholder list
- [ ] Customize contact-form.tsx for site fields

### 6. AI Readiness
- [ ] Update robots.ts with production domain
- [ ] Update sitemap.ts with all routes
- [ ] Update llms.txt/route.ts with site-specific content
- [ ] Update json-ld.tsx with full business data

### 7. Testing
- [ ] Update routes in infrastructure.spec.ts
- [ ] Update contact.spec.ts for site fields
- [ ] Add page-specific E2E tests
- [ ] Update unit test mocks

### 8. Verify
- [ ] pnpm lint (zero warnings)
- [ ] pnpm build (passes)
- [ ] pnpm test (all pass)
- [ ] pnpm test:e2e (all pass)
