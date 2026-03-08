import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fancybagels.com";

export function createPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${BASE_URL}${opts.path}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: opts.path,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: "website",
      ...(opts.image && {
        images: [{ url: opts.image, width: 1200, height: 630 }],
      }),
    },
  };
}
