# The Brunch Break — Web premium

Web oficial de **The Brunch Break**, cafetería de brunch, fit bakery y coffee de especialidad en Arrecife, Lanzarote.

Construida con **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis** (smooth scroll) e **next-intl** (ES/EN).

---

## 1. Requisitos

- Node.js 18.18 o superior (recomendado 20 LTS)
- npm 9+ (o pnpm/yarn si prefieres, adaptando los comandos)

## 2. Instalación

```bash
npm install
```

## 3. Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige automáticamente a `/` en español; la versión en inglés vive en `/en`).

## 4. Build de producción

```bash
npm run build
npm run start
```

## 5. Comprobaciones de calidad

```bash
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # TypeScript sin emitir archivos
```

---

## 6. Despliegue en Vercel

1. Sube el proyecto a un repositorio Git (GitHub/GitLab/Bitbucket).
2. Importa el repo en [vercel.com/new](https://vercel.com/new). Vercel detecta Next.js automáticamente — no requiere configuración extra.
3. Define las variables de entorno (Project Settings → Environment Variables) usando `.env.example` como referencia:
   - `NEXT_PUBLIC_SITE_URL` → dominio final, ej. `https://thebrunchbreak.com`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → código de Google Search Console (opcional)
   - `NEXT_PUBLIC_GA_ID` → ID de Google Analytics si se añade en el futuro (opcional)
4. Despliega. El `sitemap.xml`, `robots.txt` y `manifest.webmanifest` se generan automáticamente en cada build (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`).
5. Añade el dominio final en Search Console y envía el sitemap: `https://tu-dominio.com/sitemap.xml`.

---

## 7. Estructura del proyecto

```
src/
  app/
    [locale]/            → páginas (layout, home, legal) por idioma (es/en)
    sitemap.ts robots.ts manifest.ts  → SEO técnico
  components/
    layout/               → Header, Footer, LanguageSwitcher, SmoothScrollProvider
    sections/             → Hero, Story, Philosophy, Specialties, FeaturedProducts,
                             Gallery, MenuSection, Reviews, InstagramSection,
                             Location, Contact
    ui/                    → primitivas: botones, marquee, cursor, placeholders...
    legal/                 → layout compartido de páginas legales
  content/                → CONFIGURACIÓN EDITABLE del negocio (ver sección 8)
  messages/               → es.json / en.json (todos los textos traducibles)
  animations/             → GSAP setup + variants de Framer Motion
  hooks/                  → Lenis, magnetic buttons, scroll horizontal, etc.
  lib/                    → utils, SEO (metadata builder), JSON-LD (schema.org)
  i18n/                   → configuración de next-intl (rutas, locales)
public/
  icons/                  → favicons y iconos PWA (generados, ver sección 9)
  images/og-cover.jpg     → imagen Open Graph (generada, ver sección 9)
```

---

## 8. Personalizar contenido (sin tocar componentes)

### 8.1 Datos del negocio
Edita **`src/content/site-config.ts`**: dirección, coordenadas, horario, teléfono, WhatsApp, email, Instagram y el enlace de la carta (smartmenu). Los campos marcados `// PENDIENTE` son datos reales que el cliente debe confirmar antes de publicar:

- `location.streetAddress`, `location.postalCode`, `location.latitude/longitude` → dirección exacta del local (ahora mismo solo se sabe "Arrecife, Lanzarote").
- `contact.email`, `contact.phone`, `contact.whatsapp` → no estaban disponibles en el brief ni en la bio pública de Instagram.
- `legalName` → razón social completa para el aviso legal (CIF/NIF, domicilio social — ver `src/app/[locale]/legal/aviso-legal/page.tsx` y `legal/privacidad/page.tsx`, marcados con "PENDIENTE").

### 8.2 Textos (español / inglés)
Todos los textos visibles están en **`src/messages/es.json`** y **`src/messages/en.json`** (misma estructura de claves en ambos). Cambia cualquier copy ahí — no hace falta tocar componentes.

### 8.3 Reseñas
Las reseñas en `messages/*.json` → `reviews.items` son **de ejemplo**. Sustitúyelas por reseñas reales verificadas (Google Business Profile, TripAdvisor) antes de publicar. Hay una nota discreta bajo la sección que lo recuerda (`reviews.placeholderNote`) — puedes borrarla en cuanto el contenido sea real.

### 8.4 Sustituir imágenes y vídeos placeholder (IMPORTANTE)

No ha sido posible descargar automáticamente el contenido publicado en Instagram (@the_brunch_break): Instagram bloquea el scraping para usuarios no autenticados y sus términos de servicio no permiten la descarga masiva de contenido ajeno sin autorización explícita del propietario. Por eso, **toda fotografía y vídeo del sitio se renderiza con el componente `<MediaPlaceholder>`** (`src/components/ui/MediaPlaceholder.tsx`): un degradado de marca con una etiqueta visible indicando qué foto real debe ir ahí. Esto cumple el encargo de "dejar la galería preparada para sustituir fácilmente los recursos".

**Para reemplazar una imagen placeholder por la foto real:**

1. Consigue la foto autorizada por el propietario del negocio (formato `.jpg`/`.webp`, recomendado ≥1600px de ancho).
2. Colócala en la ruta indicada en los archivos de contenido (`src/content/gallery.ts`, `src/content/products.ts` — cada entrada ya tiene un campo `src` con la ruta prevista, ej. `/images/gallery/sala-01.jpg`), dentro de `public/images/...`.
3. En el componente correspondiente, sustituye `<MediaPlaceholder tone="..." label="..." />` por:
   ```tsx
   import Image from "next/image";
   <Image src="/images/gallery/sala-01.jpg" alt="Descripción real de la foto" fill className="object-cover" />
   ```
4. Repite para cada placeholder. Los nombres de archivo y descripciones ya están documentados en `content/gallery.ts` y `content/products.ts`.

**Vídeo del Hero:** si se dispone de un vídeo autorizado, colócalo en `public/videos/hero.mp4` y añade un `<video autoPlay muted loop playsInline>` en `src/components/sections/Hero.tsx` en lugar del `<MediaPlaceholder>` de fondo.

### 8.5 Favicons e imagen Open Graph
Ya están generados en `public/icons/` y `public/images/og-cover.jpg` como marca de marca provisional (monograma "B" sobre degradado terracota). Cuando el cliente tenga un logotipo definitivo, sustituye esos mismos archivos manteniendo nombres y tamaños (16×16, 32×32, 180×180, 192×192, 512×512) para que favicons, PWA y Open Graph sigan funcionando sin tocar código.

---

## 9. SEO incluido

- Metadata completa (title, description, keywords, canonical, hreflang es/en) — `src/lib/seo.ts`.
- Open Graph + Twitter Cards con imagen dedicada (`public/images/og-cover.jpg`).
- JSON-LD **Restaurant + LocalBusiness** y **Organization** (`src/lib/schema.ts`), inyectado en `src/app/[locale]/layout.tsx`.
- `sitemap.xml` y `robots.txt` generados dinámicamente (`src/app/sitemap.ts`, `robots.ts`).
- `manifest.webmanifest` para PWA (`src/app/manifest.ts`).
- Un único `<h1>` por página, jerarquía de encabezados semántica, `alt` en todas las imágenes reales que se añadan.

## 10. Rendimiento y accesibilidad

- Smooth scroll (Lenis) y animaciones (GSAP/Framer Motion) se **desactivan automáticamente** si el usuario tiene activado `prefers-reduced-motion`.
- Cursor personalizado y efectos "magnéticos" se desactivan en dispositivos táctiles.
- Skip link al contenido principal, `:focus-visible` visible en toda la web, roles ARIA en el banner de cookies y el menú móvil.
- Fuentes cargadas vía `next/font` (self-hosted en build, sin bloqueo de render) con `preconnect` a Google Fonts.
- Sin librerías de imágenes pesadas: los placeholders son CSS/gradientes, no archivos — el peso real llegará con las fotos definitivas (usa siempre `next/image` para que Next.js las optimice en AVIF/WebP automáticamente).

## 11. Cookies y privacidad (RGPD)

El banner de cookies (`src/components/ui/CookieConsent.tsx`) sigue el modelo "opt-in" europeo: **ninguna cookie no esencial se activa hasta que el usuario acepta explícitamente** (Aceptar todas / Rechazar no esenciales / Personalizar). La preferencia se guarda en `localStorage` (`src/lib/cookie-consent.ts`) y se dispara un evento `tbb-cookie-consent-change` que puedes escuchar para cargar Google Analytics u otras herramientas solo tras el consentimiento.

Las páginas legales (`/legal/privacidad`, `/legal/cookies`, `/legal/aviso-legal` — y sus equivalentes en inglés) incluyen textos base; los campos marcados **PENDIENTE** deben completarse con los datos fiscales reales del negocio antes de publicar.

## 12. Idiomas

- Español (`/`) es el idioma por defecto; inglés vive en `/en`.
- El selector de idioma (arriba a la derecha) usa next-intl — no Google Translate — y conserva la página actual al cambiar de idioma.
- Para añadir un idioma nuevo: crea `src/messages/xx.json`, añade `"xx"` a `locales` en `src/i18n/routing.ts` y traduce las rutas legales en `pathnames`.

## 13. Mantenimiento habitual

- **Cambiar el enlace de la carta**: `src/content/site-config.ts` → `menu.url`.
- **Actualizar horario**: `src/content/site-config.ts` → `hours` (y el texto correspondiente en `messages/*.json` → `location.hours`).
- **Añadir/quitar reseñas**: `messages/*.json` → `reviews.items`.
- **Nuevas fotos de galería**: añade entradas en `src/content/gallery.ts`.
- **Auditoría de rendimiento**: `npx lighthouse http://localhost:3000 --view` tras `npm run build && npm run start`.

---

## 14. Notas de autoría de este proyecto

- La referencia de diseño (deanira.co/onestopshop) se analizó a nivel de arquitectura, ritmo de scroll, tipografía grande y elementos flotantes — **no se ha copiado ningún diseño ni asset**; la identidad visual (paleta terracota/miel/crema, tipografía Fraunces + Inter, iconografía) es propia y generada a partir de la marca real de The Brunch Break (bio pública de Instagram, horario, tono cálido "fit bakery & coffee").
- El contenido fotográfico/vídeo de Instagram **no se ha podido descargar automáticamente** por restricciones de acceso de Instagram para usuarios no autenticados; ver sección 8.4 para el proceso de sustitución.
