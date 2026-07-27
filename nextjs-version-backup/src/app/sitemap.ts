import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/legal/privacidad",
    "/legal/cookies",
    "/legal/aviso-legal",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "yearly",
      priority: route === "" ? 1 : 0.3,
      alternates: {
        languages: {
          es: `${siteConfig.url}${route}`,
          en: `${siteConfig.url}/en${route}`,
        },
      },
    });
  }

  return entries;
}
