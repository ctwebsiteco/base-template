# Deployment Guide

## Vercel

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import the GitHub repository (`ctwebsiteco/v0-client-name`)
4. Vercel auto-detects Next.js — click Deploy

### 2. Environment Variables

In Vercel dashboard → Project → Environment Variables, add ALL vars from `.env.local.example`:

```bash
# Public (NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://clientdomain.com
NEXT_PUBLIC_PORTAL_URL=https://portal.ctwebsiteco.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RUM_TOKEN=...
NEXT_PUBLIC_COMPANY_NAME=Client Business Name
NEXT_PUBLIC_COMPANY_EMAIL=info@clientdomain.com
NEXT_PUBLIC_COMPANY_PHONE=(555) 555-5555
NEXT_PUBLIC_COMPANY_ADDRESS=City, State

# Server-only (no prefix)
SANITY_API_READ_TOKEN=...
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=noreply@clientdomain.com
CONTACT_TO_EMAILS=info@clientdomain.com,owner@clientdomain.com
```

### 3. Custom Domain

1. Project Settings → Domains → Add
2. Enter `clientdomain.com` → Add
3. Add the DNS records shown (CNAME to `cname.vercel-dns.com`)
4. Wait for SSL certificate to provision (auto, ~1 min)
5. Update `NEXT_PUBLIC_SITE_URL` to match the custom domain

### 4. Deploy Flow

- **Every push to `main`** → auto-deploys to production
- **Every push to a PR** → preview deployment (unique URL)
- **Re-deploy**: Project → Deployments → ⋮ → Redeploy

### Build Settings

Vercel auto-detects these — no changes needed:
```
Framework: Next.js
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
```

## Sanity Setup

### Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create new project → name it (e.g., "Client Name Site")
3. Copy the Project ID
4. Go to API → Tokens → Add API token (Viewer role)
5. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_READ_TOKEN` in Vercel

### Sanity Studio

The Studio is embedded at `https://portal.ctwebsiteco.com` (stega redirect configured in client.ts).

To access editing for a specific site, Sanity uses the `NEXT_PUBLIC_SANITY_PROJECT_ID` to route to the correct project.

## DNS Configuration

### Cloudflare (recommended)

1. DNS → Add record:
   - Type: `CNAME`
   - Name: `www` (or `@` for root)
   - Value: `cname.vercel-dns.com`
   - Proxy: DNS only (not Proxy)

2. For root domain redirect to www:
   - Add a Page Rule or another CNAME for `clientdomain.com` → `www.clientdomain.com`

### A Record (alternative)

If A records are required:
```
Type: A
Name: @
Value: 76.76.21.21
```

## Post-Deploy Checklist

- [ ] All env vars set in Vercel (check no `***` remaining)
- [ ] Custom domain verified and SSL active
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain
- [ ] Contact form sends test email successfully
- [ ] RUM metrics appear in CRM (if RUM token set)
- [ ] GA4 receives data (if GA Measurement ID set)
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] Test contact form submission end-to-end