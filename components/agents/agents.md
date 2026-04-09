# Components Agents

Task-specific guides for the `components/` directory. Read [AGENTS.md](../AGENTS.md) first.

## File Map

```
components/
├── ui/                   → shadcn/ui components (do not modify)
├── contact-form.tsx      → agents/forms.md
├── ga4.tsx               → agents/analytics.md
├── rum-client.tsx        → agents/analytics.md
├── json-ld.tsx           → agents/seo.md
├── site-header.tsx       → agents/layout.md
├── site-footer.tsx       → agents/layout.md
├── sanity-loader.tsx     → agents/sanity.md
└── disable-draft-mode.tsx
```

## Rule: Never Modify `ui/`

The `components/ui/` directory is shadcn/ui managed. Run `pnpm ui add <component>` to add, `pnpm ui init` to reset. Do not edit `ui/` files directly.

## Component Classification

| Type | Examples | Pattern |
|------|----------|---------|
| Server Components | `json-ld.tsx`, `site-footer.tsx` | RSC by default, fetch data directly |
| Client Components | `rum-client.tsx`, `ga4.tsx` | `"use client"` directive |
| Hybrid | `contact-form.tsx` | Server wrapper + client form |

## Common Tasks

### Adding a New UI Component

```bash
pnpm ui add button
pnpm ui add input
pnpm ui add label
```

### Creating a Hybrid Component

```typescript
// components/my-component.tsx
import { MyComponentClient } from "./my-component-client"

export function MyComponent(props: Props) {
  return <MyComponentClient {...props} />
}

// components/my-component-client.tsx
"use client"
export function MyComponentClient(props: Props) {
  return <div>...</div>
}
```

## Pattern: Analytics Components

GA4 and RUM are both client-side only. GA4 loads the Google tag via Script injection. RUM uses web-vitals to send metrics to the CRM beacon endpoint.

Both are always mounted in `app/layout.tsx` — never conditionally (except for missing config).

## Pattern: Site Header/Footer

Both are wrapped in `<Suspense>` in the layout because they may fetch from Sanity.

```typescript
// components/site-header.tsx
import { Suspense } from "react"
import { client } from "@/sanity/lib/client"
import { NAV_LINKS_QUERY } from "@/sanity/lib/queries"

export async function SiteHeader() {
  const links = await getNavLinks()
  return <header>...</header>
}
```