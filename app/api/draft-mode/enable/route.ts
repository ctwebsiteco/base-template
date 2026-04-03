import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

function notConfigured() {
  return NextResponse.json(
    { error: "Sanity is not configured" },
    { status: 503 },
  );
}

export const { GET } = isSanityConfigured && client
  ? defineEnableDraftMode({
      client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
    })
  : { GET: () => notConfigured() };
