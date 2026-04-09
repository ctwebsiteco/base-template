# App Directory

Next.js App Router patterns for this project.

## File Map

```
app/
├── layout.tsx              root layout (Suspense for header/footer)
├── page.tsx               homepage
├── not-found.tsx
├── robots.ts               AI bot access
├── sitemap.ts              all public routes
├── llms.txt/route.ts      AI-readable site docs
├── globals.css
├── actions/
│   └── contact.ts         submitContactForm server action
└── [slug]/
    └── page.tsx           dynamic pages
```

## Data Fetching Rule

**Always fetch in Server Components (RSC).** Never use `useEffect` for data.

```typescript
// CORRECT
export default async function Page() {
  const data = await getData()
  return <Main data={data} />
}

// WRONG
export default function Page() {
  const [data, setData] = useState()
  useEffect(() => { fetchData().then(setData) }, [])
}
```

## Server Actions

Colocate in `app/actions/`. Always validate with Zod, return `{ success: boolean; error?: string }`.

```typescript
// app/actions/contact.ts
"use server"
import { buildContactSchema } from "@/lib/contact-schema"
import { getContactForm } from "@/lib/data/forms"

export async function submitContactForm(prev, formData: FormData) {
  const formConfig = await getContactForm()
  const schema = buildContactSchema(formConfig.fields || [])
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }
  // ... send email
  return { success: true }
}
```

## Metadata Pattern

```typescript
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Page Title",
  description: "...",
  path: "/slug",
})

export default async function Page() { ... }
```

For Sanity-driven pages, `generateMetadata` must use `stega: false`.

## Suspense for Header/Footer

Wrap in `<Suspense>` — they may fetch from Sanity:

```typescript
<Suspense fallback={<HeaderSkeleton />}>
  <SiteHeader />
</Suspense>
```

## Adding a New Page

1. Create `app/[slug]/page.tsx` as async RSC
2. Fetch data via `lib/data/` accessors
3. Export `metadata` using `createPageMetadata()`
4. Add `data-testid` on key elements for tests
5. Add route to `app/sitemap.ts`
6. Write Playwright smoke test in `__tests__/e2e/`
