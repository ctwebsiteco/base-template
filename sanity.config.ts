import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

// Fancy Bagels Sanity Project Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hhq2kyly";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  projectId,
  dataset,
  title: "Fancy Bagels",
  schema: { types: schemaTypes },
});
