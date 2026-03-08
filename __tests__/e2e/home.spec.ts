import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders homepage with h1", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/./);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("has site header and footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-footer")).toBeVisible();
  });
});
