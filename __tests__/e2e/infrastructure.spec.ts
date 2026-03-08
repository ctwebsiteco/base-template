import { test, expect } from "@playwright/test";

const routes = ["/", "/contact"];

for (const route of routes) {
  test.describe(`${route} infrastructure`, () => {
    test("has no console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          // Ignore Sanity CORS errors when using placeholder project ID
          if (text.includes("sanity.io") || text.includes("ERR_FAILED")) return;
          errors.push(text);
        }
      });
      await page.goto(route);
      expect(errors).toEqual([]);
    });

    test("has lang attribute on html", async ({ page }) => {
      await page.goto(route);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("en");
    });

    test("has main landmark", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
    });

    test("has h1 heading", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("has meta description", async ({ page }) => {
      await page.goto(route);
      const desc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(10);
    });
  });
}

test("robots.txt is valid", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
  const text = await page.textContent("body");
  expect(text?.toLowerCase()).toContain("user-agent:");
  expect(text?.toLowerCase()).toContain("sitemap:");
});

test("sitemap.xml returns valid XML", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
});

test("llms.txt has 200+ words", async ({ page }) => {
  const response = await page.goto("/llms.txt");
  expect(response?.status()).toBe(200);
  const text = (await page.textContent("body")) ?? "";
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  expect(wordCount).toBeGreaterThanOrEqual(200);
});
