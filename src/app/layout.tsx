import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://alwaysintheclub.org";
const DESCRIPTION =
  "Education, Arts, Resources… Social Impact. Reunited Mouseketeers using our E.A.R.S. to make a difference through mentorship, youth arts education, and the MMC'89 Social Impact Initiative.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Always In The Club Foundation",
    template: "%s — Always In The Club Foundation",
  },
  description: DESCRIPTION,
  applicationName: "Always In The Club Foundation",
  authors: [{ name: "Always In The Club Foundation" }],
  keywords: [
    "Always In The Club",
    "AITC Foundation",
    "Mickey Mouse Club",
    "MMC'89",
    "youth arts education",
    "mentorship",
    "Mouseketeers",
    "nonprofit",
    "501(c)(3)",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Always In The Club Foundation",
    title: "Always In The Club Foundation",
    description: DESCRIPTION,
    images: [
      {
        url: "/images/mmc89_mmc30.png",
        width: 1200,
        height: 630,
        alt: "Mouseketeers reunited on stage under the MMC'89 logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AITCFoundation",
    creator: "@AITCFoundation",
    title: "Always In The Club Foundation",
    description: DESCRIPTION,
    images: ["/images/mmc89_mmc30.png"],
  },
  verification: {
    google: "6apbSKkzwndwjN4zuoTyevImTUGk93zvGSY6R0tyZjQ",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#AB0707",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        fraunces.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream focus:shadow-soft"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
