import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";

type BuildMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  keywords?: string;
  path?: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  keywords,
  path = "/",
}: BuildMetadataArgs): Metadata {
  const url = new URL(path === "/" ? (locale === "es" ? "/" : "/en") : path, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    applicationName: siteConfig.name,
    referrer: "strict-origin-when-cross-origin",
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
      languages: {
        es: new URL("/", siteConfig.url).toString(),
        en: new URL("/en", siteConfig.url).toString(),
        "x-default": new URL("/", siteConfig.url).toString(),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-cover.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    icons: {
      icon: [
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/manifest.webmanifest",
  };
}
