import { defineLive } from "next-sanity/live";
import { client, isSanityConfigured } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

// Only create live features if Sanity is configured
const liveConfig =
  client && isSanityConfigured
    ? defineLive({
        client,
        serverToken: token,
        browserToken: token,
        fetchOptions: {
          revalidate: 60,
        },
      })
    : null;

export const sanityFetch = liveConfig?.sanityFetch ?? null;
export const SanityLive = liveConfig?.SanityLive ?? null;
