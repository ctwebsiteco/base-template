import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.CI ? 3000 : 3100;

export default defineConfig({
  testDir: "__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      RESEND_API_KEY: "re_WbjJhnf1_AidvzxJeC7NeW2GrCp55hauL",
      CONTACT_FROM_EMAIL: "onboarding@resend.dev",
      CONTACT_TO_EMAILS: "delivered@resend.dev",
    },
  },
});
