# Base Template — Blank Canvas

This is a starting point for custom CT Website Co client sites. No pre-built pages, sections, or content patterns are included. Every site is unique and built from scratch.

## What's Included

- **Next.js 16** with App Router + TypeScript
- **Sanity.io** CMS with nullable client (check `if (client)` before fetch)
- **Resend** for transactional email
- **Zod** validation for all forms
- **shadcn/ui** components ready to use
- **RUM + GA4** analytics wired up
- **Form builder** pattern — fields configured in Sanity, not hardcoded

## What's NOT Included

- No homepage sections (hero, features, services, testimonials, etc.)
- No pre-built page templates
- No navigation structure (besides a basic nav link list)
- No content types beyond `companyInfo`, `contactForm`, and reusable object schemas

## Getting Started

```bash
git clone git@github.com:CTWebsiteCo/base-template.git v0-client-name
cd v0-client-name
cp .env.local.example .env.local
# Fill in all values

pnpm install
pnpm dev
```

## Workflow

1. Configure `.env.local` with Sanity project ID, Resend key, company info
2. Run `pnpm typegen` after adding Sanity schemas
3. Build pages from scratch per the client's needs
4. Wire forms using the form builder pattern

## Env Vars Required

See `.env.local.example` — all documented there.

## Key Patterns

- **Sanity client is nullable** — always `if (client)` before fetch
- **Forms are dynamic** — field config comes from Sanity `contactForm` document
- **GROQ queries** use `defineQuery` from `next-sanity`
- **SEO metadata** always uses `stega: false` on Sanity fetches
- **`text-balance`** on all headings

## Agent Guides

See `agents/` directory for task-specific guides:
- `form-builder.md` — building dynamic contact forms
- `schema-design.md` — Sanity schema best practices
- `deployment.md` — Vercel deployment
- `seo.md` — SEO setup