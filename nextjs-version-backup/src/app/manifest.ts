import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.shortTagline}`,
    short_name: siteConfig.name,
    description: "Brunch, fit bakery y coffee de especialidad en Arrecife, Lanzarote.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF6EE",
    theme_color: "#B4472E",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
