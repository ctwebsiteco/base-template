# Deployment Guide

## Vercel CLI

### 1. Connect and Deploy

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login (opens browser for OAuth)
vercel login

# From the project root
vercel

# First deploy — follow prompts
# - Set scope: CTWebsiteCo
# - Link to existing project: Yes
# - Project name: v0-client-name
# - Directory: ./
# - Override settings: No
```

### 2. Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add NEXT_PUBLIC_SANITY_API_VERSION
vercel env add SANITY_API_READ_TOKEN
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_PORTAL_URL
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add NEXT_PUBLIC_RUM_TOKEN
vercel env add NEXT_PUBLIC_COMPANY_NAME
vercel env add NEXT_PUBLIC_COMPANY_EMAIL
vercel env add NEXT_PUBLIC_COMPANY_PHONE
vercel env add NEXT_PUBLIC_COMPANY_ADDRESS
vercel env add RESEND_API_KEY
vercel env add CONTACT_FROM_EMAIL
vercel env add CONTACT_TO_EMAILS
vercel env add CONTACT_SUBJECT
vercel env add CONTACT_BODY
vercel env add DRAFT_MODE_SECRET
```

### 3. Deploy to Production

```bash
# Preview deployment (PRs)
vercel

# Promote preview to production
vercel deploy --prod

# Or push to main branch — auto-deploys to production
git push origin main
```

### 4. Custom Domain

```bash
# Add domain to project
vercel domains add clientdomain.com

# Add www redirect
vercel domains add www.clientdomain.com

# Verify DNS — Vercel will show the required CNAME records
vercel domains verify clientdomain.com

# Once verified, add to project
vercel project domain add clientdomain.com
```

DNS records to add (Cloudflare or your DNS provider):
```
Type    Name    Value
CNAME   www     cname.vercel-dns.com
CNAME   @       cname.vercel-dns.com
```

### 5. Useful Commands

```bash
vercel ls                          # List deployments
vercel logs v0-client-name-abc123 # View build logs
vercel domain rm clientdomain.com  # Remove domain
vercel project ls                 # List projects
vercel teams switch               # Switch between teams/orgs
```

## Sanity Setup

### 1. Create a Sanity Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project
sanity init --reconfigure

# Or use the Management API to create via curl:
curl -X POST https://api.sanity.io/v1/projects \
  -H "Authorization: Bearer $SANITY_MANAGEMENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Client Name Site", "teamId": "ctwebsiteco"}'
```

Get your `SANITY_MANAGEMENT_TOKEN` from [sanity.io/manage](https://sanity.io/manage) → Account → Tokens.

### 2. Configure the Project

```bash
cd sanity

# Set project ID
sanity project set-project-id $PROJECT_ID

# Add a Viewer token for fetching
sanity token add --role viewer
# Copy the token, set as SANITY_API_READ_TOKEN in Vercel env

# Deploy the Studio (embedded in the portal)
sanity deploy
```

### 3. Env Vars to Set

```bash
# In Vercel
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
SANITY_API_READ_TOKEN=<viewer-token>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## GitHub Setup

### 1. Push to GitHub

```bash
# Create repo via GitHub CLI
gh repo create ctwebsiteco/v0-client-name --private --clone false

# Push
git remote add origin git@github.com:ctwebsiteco/v0-client-name.git
git push -u origin main
```

### 2. Connect Repo to Vercel

```bash
# Link existing repo to Vercel project
vercel link --token $VERCEL_TOKEN

# Or via API
curl -X POST https://api.vercel.com/v13/projects \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "v0-client-name", "gitRepository": {"type": "github", "repo": "ctwebsiteco/v0-client-name"}}'
```

Get `$VERCEL_TOKEN` from [vercel.com/account/tokens](https://vercel.com/account/tokens).

## Post-Deploy Checklist

- [ ] All env vars set in Vercel (check with `vercel env ls`)
- [ ] Custom domain verified (`vercel domains ls`)
- [ ] SSL certificate active (`vercel certificates ls`)
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain
- [ ] Contact form sends test email successfully
- [ ] RUM metrics appear in CRM (if RUM token set)
- [ ] GA4 receives data (if GA Measurement ID set)
- [ ] `curl https://clientdomain.com/robots.txt` returns correct robots.txt
- [ ] `curl https://clientdomain.com/sitemap.xml` returns sitemap
- [ ] Test contact form submission end-to-end