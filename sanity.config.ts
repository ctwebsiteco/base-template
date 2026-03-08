import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  schema: { types: schemaTypes },
});
