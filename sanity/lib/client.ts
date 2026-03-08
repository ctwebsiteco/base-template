import { createClient } from "next-sanity";

// Fancy Bagels Sanity Project Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hhq2kyly";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "/studio",
  },
});
