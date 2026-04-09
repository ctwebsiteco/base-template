# Base Template — Blank Canvas

Next.js 16 + Sanity.io blank canvas for CT Website Co client sites. Every site is custom-built from scratch.

## Tech Stack

- **Next.js 16** App Router + TypeScript
- **Sanity.io** CMS (nullable client)
- **Resend** transactional email
- **Zod** form validation
- **shadcn/ui** components
- **RUM + GA4** analytics
- **Playwright** e2e tests

## Source of Truth

**Local seed data is the source of truth.** Sanity overrides when configured.

```
data/
  companyInfo.ts    ← seed data (Sanity document shape)
  contactForm.ts   ← seed data for form config

lib/data/
  company.ts       → getCompanyInfo()   ← ONLY accessor for company data
  forms.ts        → getContactForm()   ← ONLY accessor for form config
```

Pages/components call `getCompanyInfo()` and `getContactForm()` — never `client.fetch()` directly.

## Non-Negotiable Patterns

1. **Data access**: Use `lib/data/` accessors exclusively in pages/components
2. **Sanity client is nullable**: `if (client)` only in low-level utilities (`sanity/lib/`)
3. **GROQ queries**: Use `defineQuery` from `next-sanity` in `sanity/lib/queries.ts`
4. **SEO fetches**: Always `stega: false`
5. **Headings**: Always `text-balance` class
6. **Forms**: Use `buildContactSchema()` from `lib/contact-schema.ts`
7. **Typegen**: Run `pnpm typegen` after changing Sanity schemas
8. **Tests**: `pnpm test:e2e` — test form validation AND success; use `data-testid`

## Skills

Load skills on demand for specialized tasks:

| Task | Skill |
|------|-------|
| Building/editing contact forms | `/form-builder` |
| Adding/changing Sanity schemas | `/schema-design` |
| Page SEO, JSON-LD, sitemap | `/seo` |
| Vercel deployment + Sanity setup | `/deployment` |
| Writing/running Playwright tests | `/testing` |

## Directory Map

```
app/           pages, layouts, server actions
components/   UI components (shadcn in components/ui/)
lib/           utilities, data accessors, metadata helpers
sanity/        schemas, GROQ queries, client, image helpers
data/          local seed data (mirrors Sanity document shapes)
seed/          NDJSON import files for Sanity
__tests__/e2e/ Playwright smoke tests
.claude/       skills and subagents
```

## Env Vars

See `.env.local.example`. Client-side vars need `NEXT_PUBLIC_` prefix.

## Getting Started

```bash
git clone git@github.com:CTWebsiteCo/base-template.git v0-client-name
cd v0-client-name
cp .env.local.example .env.local
# Fill in values

pnpm install
pnpm dev
```

## Subagents

For multi-step tasks, use subagents:

- **page-scaffolding**: Create a new page end-to-end with tests
- **schema-migration**: Add a new Sanity content type end-to-end

Invoke with: `"Use the page-scaffolding subagent to add a services page"`
