import { test, expect } from "@playwright/test";

test.describe("Contact page form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders contact form", async ({ page }) => {
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible();
  });

  test("renders all form fields", async ({ page }) => {
    await expect(page.locator('[data-testid="contact-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="contact-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="contact-phone"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="contact-message"]')
    ).toBeVisible();
  });

  test("shows validation error for empty name on blur", async ({ page }) => {
    const nameField = page.locator('[data-testid="contact-name"]');
    await nameField.focus();
    await nameField.blur();
    await expect(page.locator('[data-testid="error-name"]')).toBeVisible();
  });

  test("shows validation error for invalid email on blur", async ({
    page,
  }) => {
    const emailField = page.locator('[data-testid="contact-email"]');
    await emailField.fill("not-an-email");
    await emailField.blur();
    await expect(page.locator('[data-testid="error-email"]')).toBeVisible();
  });

  test("submit button is present", async ({ page }) => {
    const submit = page.locator('[data-testid="contact-submit"]');
    await expect(submit).toBeVisible();
    await expect(submit).toContainText("Send Message");
  });

  test("shows validation error for short message on blur", async ({
    page,
  }) => {
    const messageField = page.locator('[data-testid="contact-message"]');
    await messageField.fill("Short");
    await messageField.blur();
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });

  test("submits form and shows success message", async ({ page }) => {
    await page.getByTestId("contact-name").fill("E2E Test User");
    await page.getByTestId("contact-email").fill("delivered@resend.dev");
    await page.getByTestId("contact-phone").fill("(555) 555-0000");
    await page
      .getByTestId("contact-message")
      .fill(
        "E2E test — verifying email sends via Resend test credentials."
      );
    await page.getByTestId("contact-submit").click();
    await expect(page.getByText(/thank you/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/failed to send/i)).not.toBeVisible();
  });
});
