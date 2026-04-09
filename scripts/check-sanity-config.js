#!/usr/bin/env node
// Check that Sanity environment variables are configured
// Exits with 0 if configured or warn-only if not

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.warn("Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
  console.warn("Sanity integration is disabled. Using local seed data.");
  console.warn("Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local to enable.");
} else {
  console.log(`Sanity configured: project=${projectId}, dataset=${dataset}`);
}

console.log("Sanity config check complete.");
process.exit(0);