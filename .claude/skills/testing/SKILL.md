---
name: testing
description: Write and run Playwright smoke tests for client sites
---

# Playwright Testing

## Run Tests

```bash
pnpm test:e2e           # local (port 3100)
CI=1 pnpm test:e2e      # CI mode (port 3000, retries enabled)
```

## Test File Location

```
__tests__/e2e/
  home.spec.ts
  contact.spec.ts
  [feature].spec.ts
```

## data-testid Convention

**Always use `data-testid`** on interactive elements — never use CSS selectors in tests:

```tsx
<input data-testid="contact-name" ... />
<p data-testid="error-name" className="text-destructive">Name is required</p>
<button data-testid="contact-submit">Send</button>
```

## Homepage Smoke Test Pattern

```typescript
import { test, expect } from "@playwright/test"

test.describe("Home page", () => {
  test("renders h1", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("has site header and footer", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByTestId("site-header")).toBeVisible()
    await expect(page.getByTestId("site-footer")).toBeVisible()
  })

  test("no console errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text()
        if (text.includes("sanity.io")) return  // ignore CORS on placeholder
        errors.push(text)
      }
    })
    await page.goto("/")
    expect(errors).toEqual([])
  })
})
```

## Form Validation Test Pattern

```typescript
test("shows validation error for empty required field on blur", async ({ page }) => {
  await page.goto("/contact")
  const field = page.locator('[data-testid="contact-name"]')
  await field.focus()
  await field.blur()
  await expect(page.locator('[data-testid="error-name"]')).toBeVisible()
})

test("shows validation error for invalid email on blur", async ({ page }) => {
  await page.goto("/contact")
  const field = page.locator('[data-testid="contact-email"]')
  await field.fill("not-an-email")
  await field.blur()
  await expect(page.locator('[data-testid="error-email"]')).toBeVisible()
})
```

## Form Success Test Pattern

```typescript
test("submits and shows success message", async ({ page }) => {
  await page.goto("/contact")
  await page.getByTestId("contact-name").fill("Jane Doe")
  await page.getByTestId("contact-email").fill("delivered@resend.dev")
  await page.getByTestId("contact-message").fill("This is a test message that is long enough to pass validation.")
  await page.getByTestId("contact-submit").click()
  await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 15000 })
})
```

## Infrastructure Tests (run on every deploy)

```typescript
test("robots.txt returns 200", async ({ page }) => {
  const res = await page.goto("/robots.txt")
  expect(res?.status()).toBe(200)
})

test("sitemap.xml returns 200", async ({ page }) => {
  const res = await page.goto("/sitemap.xml")
  expect(res?.status()).toBe(200)
})
```

## Playwright Config

The config is in `playwright.config.ts`. It starts the dev server automatically and injects test env vars from the `webServer` block. No manual setup needed.

## Checklist Before Pushing

- [ ] `pnpm test:e2e` passes locally
- [ ] Tests use `data-testid`, not CSS selectors
- [ ] Form tests cover both validation errors AND successful submission
- [ ] Infrastructure tests included for new routes
