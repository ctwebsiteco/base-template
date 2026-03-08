import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      RESEND_API_KEY: "re_WbjJhnf1_AidvzxJeC7NeW2GrCp55hauL",
      CONTACT_FROM_EMAIL: "onboarding@resend.dev",
      CONTACT_TO_EMAILS: "delivered@resend.dev",
    },
  },
});
