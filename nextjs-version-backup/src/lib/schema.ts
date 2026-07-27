import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";

/**
 * JSON-LD Schema.org: Restaurant + LocalBusiness.
 * https://schema.org/Restaurant
 */
export function buildRestaurantSchema(locale: Locale) {
  const { location, hours, contact, social, url } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}/#restaurant`,
    name: siteConfig.name,
    description:
      locale === "es"
        ? "Cafetería de brunch, fit bakery y coffee de especialidad en Arrecife, Lanzarote."
        : "Brunch café, fit bakery and specialty coffee in Arrecife, Lanzarote.",
    image: `${url}${siteConfig.organizationLogo}`,
    url,
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    servesCuisine: ["Brunch", "Bakery", "Coffee", "Healthy"],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress || undefined,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: location.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: hours.days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: [social.instagram.url],
    hasMenu: siteConfig.menu.url,
  };
}

export function buildBreadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  const base = locale === "es" ? siteConfig.url : `${siteConfig.url}/en`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.organizationLogo}`,
    sameAs: [siteConfig.social.instagram.url],
  };
}
