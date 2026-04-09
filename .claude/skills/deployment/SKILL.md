---
name: deployment
description: Deploy to Vercel, connect custom domains, set up Sanity, and configure environment variables
---

# Deployment

## Vercel CLI Setup

```bash
npm install -g vercel
vercel login
vercel  # first deploy — follow prompts
```

## Environment Variables

Set via `vercel env`:

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add NEXT_PUBLIC_SANITY_API_VERSION
vercel env add SANITY_API_READ_TOKEN
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_PORTAL_URL
vercel env add RESEND_API_KEY
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add NEXT_PUBLIC_RUM_TOKEN
vercel env add DRAFT_MODE_SECRET
```

## Sanity Setup

```bash
npm install -g @sanity/cli
sanity login
sanity init --reconfigure
```

Configure and deploy the embedded studio:

```bash
cd sanity
sanity project set-project-id $PROJECT_ID
sanity token add --role viewer  # for read token
sanity deploy
```

## Import Seed Data

After Sanity project is created, import seed data so editors have a starting point:

```bash
./seed/import.sh
# Or manually:
sanity documents import ./seed/seed.ndjson --dataset=production --replace
```

The seed includes `companyInfo` and `contactForm` documents matching local seed data.

## Custom Domains

```bash
vercel domains add clientdomain.com
vercel domains add www.clientdomain.com
vercel domains verify clientdomain.com
vercel project domain add clientdomain.com
```

DNS records (Cloudflare or DNS provider):
```
Type    Name    Value
CNAME   www     cname.vercel-dns.com
CNAME   @       cname.vercel-dns.com
```

## GitHub + Vercel

```bash
gh repo create ctwebsiteco/v0-client-name --private --clone false
git remote add origin git@github.com:ctwebsiteco/v0-client-name.git
git push -u origin main
# Vercel auto-deploys on push to main
```

## Post-Deploy Checklist

- [ ] All env vars set in Vercel (`vercel env ls`)
- [ ] Custom domain verified
- [ ] SSL active
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain
- [ ] Contact form sends test email
- [ ] `curl https://clientdomain.com/robots.txt` correct
- [ ] `curl https://clientdomain.com/sitemap.xml` returns sitemap
- [ ] Playwright tests pass: `pnpm test:e2e`
