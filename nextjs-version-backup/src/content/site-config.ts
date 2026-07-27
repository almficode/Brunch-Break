/**
 * Configuración central del negocio. Edita este archivo para actualizar
 * datos de contacto, horarios y enlaces sin tocar componentes.
 *
 * Los campos marcados con "// PENDIENTE" son placeholders: sustitúyelos
 * por los datos reales del cliente antes de publicar.
 */

export const siteConfig = {
  name: "The Brunch Break",
  legalName: "The Brunch Break", // PENDIENTE: razón social completa para el aviso legal
  shortTagline: "Fit Bakery & Coffee",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrunchbreak.com",

  location: {
    city: "Arrecife",
    region: "Lanzarote",
    country: "Islas Canarias, España",
    streetAddress: "", // PENDIENTE: calle y número exactos
    postalCode: "35500", // PENDIENTE: confirmar código postal exacto
    addressLocality: "Arrecife",
    addressRegion: "Las Palmas",
    addressCountry: "ES",
    latitude: 28.9648, // PENDIENTE: coordenadas exactas del local
    longitude: -13.5484,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Brunch+Break+Arrecife+Lanzarote",
  },

  hours: {
    display: "Lunes a domingo · 7:30 – 17:00",
    opens: "07:30",
    closes: "17:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  contact: {
    email: "", // PENDIENTE: email de contacto del negocio
    phone: "", // PENDIENTE: teléfono de contacto (formato +34...)
    whatsapp: "", // PENDIENTE: número de WhatsApp (formato internacional sin '+', ej. 34600000000)
  },

  social: {
    instagram: {
      handle: "@the_brunch_break",
      url: "https://www.instagram.com/the_brunch_break/",
    },
  },

  menu: {
    // Enlace oficial al smartmenu — se abre en una pestaña nueva.
    url: "https://smartmenu.agorapos.com/?id=502djxab%23%2F&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacknWByK1cSNw_NsgiGR1T-_OvFt_-yibVFTu-P5HVa4TTXBvrCdtoJGsTj4Q_aem_zOyz8LPTQ8bmRY9Vw7aOyg#/",
  },

  organizationLogo: "/icons/icon-512.png",
} as const;
