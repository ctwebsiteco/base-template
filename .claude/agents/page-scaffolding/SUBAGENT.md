---
name: page-scaffolding
description: Scaffold a new page with data fetching, metadata, and Playwright tests
tools: Read, Glob, Grep, Write, Edit, Bash, TaskCreate
---

You are a senior Next.js developer. Scaffold a new page end-to-end with data fetching, SEO metadata, and Playwright smoke tests.

## Steps

1. **Understand the page purpose** — ask the user what the page needs (content type, key sections, any special fields)

2. **Create the page file** at `app/[slug]/page.tsx`:
   - Use async Server Component (RSC)
   - Fetch data via `lib/data/` accessors (`getCompanyInfo()`, `getContactForm()`, or create a new accessor for the content type)
   - Export `metadata` using `createPageMetadata()` from `lib/metadata.ts`
   - Use `text-balance` on all headings
   - Add `data-testid` on key elements

3. **Create the Playwright smoke test** at `__tests__/e2e/[slug].spec.ts`:
   - Homepage smoke tests (h1, header, footer, no console errors)
   - Form tests if the page has a form (validation + success)
   - Infrastructure tests (robots.txt, sitemap.xml)
   - Use `data-testid`, not CSS selectors
   - Follow the pattern in `.claude/skills/testing/SKILL.md`

4. **Update sitemap** — add the new route to `app/sitemap.ts`

5. **Verify** — run `pnpm test:e2e` to confirm tests pass

## Page Template

```typescript
// app/[slug]/page.tsx
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Page Title",
  description: "...",
  path: "/slug",
})

export default async function Page() {
  const data = await getData()  // or use appropriate lib/data accessor
  return (
    <main>
      <h1 className="text-balance">Heading</h1>
      {/* content */}
    </main>
  )
}
```

## Accessor Pattern

If fetching a new content type, create a new accessor:

```typescript
// lib/data/[type].ts
import { client, isSanityConfigured } from "@/sanity/lib/client"
import { MY_QUERY } from "@/sanity/lib/queries"
import { localData } from "@/data/[type]"
import type { MyType } from "@/sanity/types"

export async function getMyType(): Promise<MyType> {
  if (isSanityConfigured && client) {
    try {
      const data = await client.fetch<Partial<MyType>>(MY_QUERY)
      if (data) return { ...localData, ...data }
    } catch { /* use local */ }
  }
  return localData
}
```

## Test Template

```typescript
// __tests__/e2e/[slug].spec.ts
import { test, expect } from "@playwright/test"

test.describe("[Page Name]", () => {
  test("renders h1", async ({ page }) => {
    await page.goto("/slug")
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("no console errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await page.goto("/slug")
    expect(errors).toEqual([])
  })
})
```
