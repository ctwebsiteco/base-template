import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/lib/client";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { RumClient } from "@/components/rum-client";
import Script from "next/script";

import "./globals.css";

// TODO: Replace with client brand font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

// TODO: Update title, description, and domain for the client site
export const metadata: Metadata = {
  title: "Business Name | City, ST | Services",
  description:
    "Business description — services offered, location, and key differentiators. Update this for the client site.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Business Name | City, ST",
    description:
      "Business description for social sharing. Update this for the client site.",
    url: BASE_URL,
    siteName: "Business Name",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraft } = await draftMode();

  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name";
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@example.com";
  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(555) 555-5555";
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "City, State";

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased" style={{ "--company-name": companyName, "--company-email": companyEmail, "--company-phone": companyPhone, "--company-address": companyAddress } as React.CSSProperties}>
        <JsonLd />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {isSanityConfigured && SanityLive && <SanityLive />}
        {isDraft && isSanityConfigured && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-config" strategy="lazyOnload">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}</Script>
          </>
        )}
        <RumClient />
      </body>
    </html>
  );
}
