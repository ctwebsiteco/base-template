import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Only export a valid config if projectId is set, otherwise export a placeholder
// that won't be used (Sanity Studio route checks isSanityConfigured before rendering)
export default defineConfig({
  projectId: projectId || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  schema: { types: schemaTypes },
});
