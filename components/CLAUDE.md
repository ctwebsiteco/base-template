# Components Directory

## File Map

```
components/
├── ui/                     shadcn/ui managed (do not edit directly)
├── contact-form.tsx        hybrid (server config fetch + client form)
├── site-header.tsx        async server component
├── site-footer.tsx        async server component
├── json-ld.tsx            server component (LocalBusiness schema)
├── ga4.tsx                "use client" (Google Analytics)
├── rum-client.tsx          "use client" (web-vitals RUM)
└── disable-draft-mode.tsx  client component
```

## shadcn/ui Rule

**Never modify files in `components/ui/` directly.**

```bash
pnpm ui add button    # add component
pnpm ui init          # reset (rarely needed)
```

## Component Types

| Type | Directive | When to Use |
|------|-----------|-------------|
| Server Component | (none) | Default. Fetches data directly. |
| Client Component | `"use client"` | Event handlers, useState, useEffect, browser APIs |
| Hybrid | server wrapper + client inner | Form needing RSC data + client interactivity |

## Hybrid Pattern

```typescript
// components/my-form.tsx (server — fetches config)
import { getContactForm } from "@/lib/data/forms"
import { MyFormClient } from "./my-form-client"

export async function MyForm() {
  const config = await getContactForm()
  return <MyFormClient config={config} />
}

// components/my-form-client.tsx (client)
"use client"
export function MyFormClient({ config }) {
  // useForm, useActionState, etc.
}
```

## data-testid Convention

All tests depend on `data-testid`. Add to every interactive element:

```tsx
<input data-testid="contact-name" ... />
<span data-testid="error-name" className="text-destructive">Name is required</span>
<button data-testid="contact-submit">Send</button>
```

## Analytics Components

`ga4.tsx` and `rum-client.tsx` are `"use client"` and always mounted in `app/layout.tsx`. Both are conditional on env var presence.

## Site Header/Footer

Both are wrapped in `<Suspense>` in the layout because they may fetch from Sanity.
