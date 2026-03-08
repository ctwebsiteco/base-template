import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Playfair_Display, Open_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/disable-draft-mode";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fancybagels.com";

export const metadata: Metadata = {
  title: "Fancy Bagels | Southington, CT | Best Bagels Since 1988",
  description:
    "Fancy Bagels in Southington, CT - Crafting fresh, authentic NY-style bagels, hearty breakfast sandwiches, and specialty coffee since 1988. Order online or visit us today!",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Fancy Bagels | Southington, CT | Best Bagels Since 1988",
    description:
      "Crafting fresh, authentic NY-style bagels, hearty breakfast sandwiches, and specialty coffee since 1988. Magic in Every Fancy Day!",
    url: BASE_URL,
    siteName: "Fancy Bagels",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <SanityLive />
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
