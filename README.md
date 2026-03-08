# Base Template

A production-ready Next.js 16 template for local business websites with Sanity CMS and Resend email integration.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **CMS**: Sanity.io with next-sanity
- **Email**: Resend for contact form handling
- **Testing**: Vitest (unit) + Playwright (E2E)

## Features

- Sanity CMS integration with draft mode preview
- Contact form with Zod validation and Resend emails
- SEO-optimized with JSON-LD structured data
- Google Analytics support
- AI-ready with sitemap, robots.txt, and llms.txt
- Fully typed with TypeScript and Sanity type generation

## Quick Start

1. Clone or fork this repository
2. Copy `.env.local.example` to `.env.local`
3. Fill in the required environment variables (see below)
4. Install dependencies:
   ```bash
   pnpm install
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID from sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (default: `production`) |
| `RESEND_API_KEY` | Resend API key for sending emails |
| `CONTACT_FROM_EMAIL` | Sender email address (must be verified in Resend) |
| `CONTACT_TO_EMAILS` | Comma-separated list of recipient emails |

### Optional

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version (default: `2024-01-01`) |
| `SANITY_API_READ_TOKEN` | Viewer role token for fetching email templates |
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO metadata |
| `DRAFT_MODE_SECRET` | Secret for Sanity draft preview |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── actions/            # Server actions (contact form)
│   ├── api/                # API routes (draft mode)
│   └── contact/            # Contact page
├── components/             # React components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions and schemas
├── sanity/
│   ├── lib/                # Sanity client, queries, image helpers
│   └── schemas/            # Sanity document and object schemas
└── __tests__/              # Test files (unit and E2E)
```

## Customization

See `CLAUDE.md` for a detailed customization checklist covering:

1. Environment setup and Sanity configuration
2. Branding (fonts, colors, metadata, favicon)
3. Content schemas and GROQ queries
4. Pages and components
5. Contact form customization
6. SEO and AI readiness
7. Testing updates

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run E2E tests with Playwright |
| `pnpm typegen` | Generate Sanity TypeScript types |

## Sanity Schemas Included

- **companyInfo**: Business name, contact details, hours, ratings
- **emailTemplates**: Customizable email templates with placeholders
- **seo**: Reusable SEO metadata object
- **imageWithAlt**: Image with alt text for accessibility
- **sectionHeader**: Reusable section header with title and description

## Deployment

Deploy to Vercel with one click or via the Vercel CLI:

```bash
vercel
```

Make sure to add all required environment variables in your Vercel project settings.

## License

MIT
