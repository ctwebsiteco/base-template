# Agent Development Guide

This directory contains task-specific agent instructions. Each file is self-contained guidance for a particular development task.

## Available Guides

| File | Purpose |
|------|---------|
| `form-builder.md` | Building dynamic contact forms using Sanity form builder config |
| `schema-design.md` | Creating Sanity schemas — best practices and patterns |
| `deployment.md` | Deploying to Vercel and connecting custom domains |
| `seo.md` | SEO setup — metadata, JSON-LD, sitemap, robots, llms.txt |

## When Building a Client Site

1. Read the relevant guide(s) from this directory before starting
2. Follow the patterns exactly — this is a blank canvas template
3. Every client is unique — do not pre-build pages or sections
4. Use the form builder pattern for all contact forms
5. Check `if (client)` before every Sanity fetch
6. Use `stega: false` for all SEO metadata

## Quick Reference

**Sanity client** — always nullable:
```typescript
import { client, isSanityConfigured } from "@/sanity/lib/client"
if (client) { /* fetch */ }
```

**Form builder** — fields come from Sanity, not hardcoded:
```typescript
// lib/contact-schema.ts
export function buildContactSchema(fields: FormFieldConfig[]) { ... }
```

**GROQ queries** — use `defineQuery`:
```typescript
import { defineQuery } from "next-sanity"
export const QUERY = defineQuery(`*[_type == "doc"][0] { field1, field2 }`)
```

**SEO metadata** — always `stega: false`:
```typescript
sanityFetch({ query: PAGE_QUERY, stega: false })
```

**Environment** — client-side vars must have `NEXT_PUBLIC_` prefix.