import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

// Only create builder if client is configured
const builder = client ? createImageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!source || !builder) return null;
  return builder.image(source);
}
