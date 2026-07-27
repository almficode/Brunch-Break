# The Brunch Break — Web (HTML/CSS/JS estático)

Web de **The Brunch Break**, cafetería de brunch, fit bakery y coffee de especialidad en Arrecife, Lanzarote.

**Cero instalación.** No usa Node.js, npm, ni ningún build step. Es HTML, CSS y JavaScript puro — se abre directamente o se sirve con cualquier servidor estático.

---

## 1. Cómo verla (elige una opción)

### Opción A — La más simple: doble clic
Haz doble clic en **`index.html`**. Se abrirá en tu navegador por defecto. Así de fácil.

*(Nota: al abrir con doble clic, el mapa de Google y las fuentes seguirán funcionando porque cargan desde internet, pero es más correcto usar la Opción B si vas a compartirla o probarla a fondo.)*

### Opción B — Servidor local (recomendado)
Si tienes Python instalado (viene de serie en macOS), abre la Terminal:

```bash
cd "/Users/adriii/Desktop/Brunch Break"
python3 -m http.server 5500
```

Y abre [http://localhost:5500](http://localhost:5500) en tu navegador. Para pararlo, `Ctrl+C` en la Terminal.

### Opción C — Subir a un hosting gratuito
Arrastra la carpeta entera a [Netlify Drop](https://app.netlify.com/drop) o [Vercel](https://vercel.com/new) (importando como sitio estático) y en segundos tienes una URL pública.

---

## 2. Secciones de la página (en orden)

1. **Hero** — foto real de fondo, franja de texto en movimiento continuo, tilt 3D que sigue al cursor, insignia "Abierto ahora" calculada en tiempo real según el horario.
2. **Historia** (`#story`) — columna con foto fija mientras el texto hace scroll; la foto gira y escala ligeramente según lo que bajas (GSAP ScrollTrigger).
3. **Productos destacados + Carta** (`#featured` / `#menu`) — misma sección visual, sin corte: primero las fichas de producto, después las categorías de carta con el botón al smartmenu.
4. **Nuestro Código** (`#method`) — antes "Filosofía". Ahora con estética de terminal/editor de código (ventana con line numbers, comentarios, cursor parpadeante) en vez de las típicas 4 tarjetas con icono.
5. **Especialidades** (`#specialties`).
6. **Opiniones** (`#reviews`).
7. **Cómo llegar** (`#location`) y **Contacto** (`#contact`).

**`galeria.html`** existe como página independiente (mismo diseño, scroll horizontal de fotos) pero **no está enlazada desde la home ni desde el menú** — a propósito, para usarla solo donde tú decidas (por ejemplo, un QR en el local o un enlace puntual).

## 3. Estructura del proyecto

```
index.html              → página principal en español (idioma por defecto)
en/index.html           → página principal en inglés
galeria.html            → galería independiente, sin enlace desde la home
legal/
  privacidad.html        cookies.html        aviso-legal.html      (español)
  en/
    privacy-policy.html   cookies-policy.html   legal-notice.html   (inglés)
css/styles.css          → todo el diseño (colores, tipografía, layout, animaciones)
images/instagram/       → fotos reales descargadas de @the_brunch_break (ver sección 5)
js/main.js              → todo el comportamiento (menú, scroll, cursor, cookies, formulario...)
js/chat-widget.js       → widget del asistente de IA (botón flotante + panel de chat)
api/chat.js             → función serverless (Vercel) que llama a OpenAI — ver sección 10
package.json            → solo para que Vercel reconozca la función de api/; no hay dependencias
icons/                  → favicons y iconos PWA
images/og-cover.jpg      → imagen para compartir en redes (Open Graph)
favicon.ico  manifest.webmanifest  robots.txt  sitemap.xml
nextjs-version-backup/  → versión anterior en Next.js/React (por si se retoma en el futuro)
```

No hay `src/`, no hay que compilar nada. Editas un `.html` o el `.css`/`.js`, guardas, y recargas el navegador. El único archivo que existe solo por Vercel es `api/chat.js` (ver sección 10) — el resto del sitio sigue siendo HTML/CSS/JS puro.

---

## 4. Editar contenido

Todo el texto está directamente escrito dentro de los archivos `.html` — no hay archivos de traducción separados ni configuración intermedia. Para cambiar algo:

- **Textos**: busca la frase en `index.html` (español) y/o `en/index.html` (inglés) y edítala directamente.
- **Horario, dirección, enlaces**: aparecen varias veces (Hero, Ubicación, Contacto, Footer, JSON-LD del `<head>`) — usa "Buscar y reemplazar" de tu editor para cambiarlos todos a la vez.
- **Enlace de la carta**: busca `smartmenu.agorapos.com` y sustituye la URL donde aparezca.
- **Reseñas**: sección `Opiniones` / `Reviews` — son de ejemplo, sustitúyelas por reseñas reales verificadas antes de publicar (hay una nota discreta debajo que lo recuerda; bórrala cuando el contenido sea real).

### Datos pendientes de confirmar
No estaban disponibles ni en el encargo ni en la bio pública de Instagram, así que quedan marcados como "pendiente" directamente en el texto (Ubicación, Contacto, páginas legales):
- Dirección exacta (calle y número)
- Teléfono, WhatsApp y email de contacto
- Razón social / CIF (para el aviso legal)

Búscalos con "pendiente" (o "pending" en inglés) para localizarlos todos.

---

## 5. Sustituir imágenes y vídeos placeholder (IMPORTANTE)

**Actualización:** a petición del cliente, se han incorporado 3 fotos reales de la cuenta pública @the_brunch_break (extraídas directamente, con autorización expresa en la conversación) para ver el resultado visual real: `images/instagram/eggs-toast-clean.jpg` (plato de brunch, usada en el Hero e Historia... revisa cuál corresponde a cada sección en el HTML), `images/instagram/photo-may30.jpg` (conservas artesanas) y `images/instagram/donuts-cookies-clean.jpg` (galletas de vitrina). Son capturas de la resolución que ofrece la vista pública de Instagram (no el archivo original en máxima calidad) — para producción, sustitúyelas por las fotos originales en alta resolución que tenga el negocio.

El resto de fotos del sitio siguen siendo bloques `<div class="media media-tone-...">` con un degradado de marca, un icono y una etiqueta tipo *"Foto: Brunch de autor (sustituir)"*, porque Instagram bloquea la descarga masiva automática para cualquiera sin sesión iniciada. Son fáciles de encontrar: busca `class="media` en `index.html` / `en/index.html`.

**Para sustituir una por la foto real:**

1. Consigue la foto autorizada por el propietario del negocio (recomendado ≥1600px de ancho, formato `.jpg` o `.webp`).
2. Colócala dentro de una carpeta `images/` (créala si no existe), por ejemplo `images/gallery/sala-01.jpg`.
3. Sustituye el bloque completo:
   ```html
   <div class="media media-tone-rust">...</div>
   ```
   por una imagen real:
   ```html
   <img src="images/gallery/sala-01.jpg" alt="Descripción real de la foto" style="width:100%;height:100%;object-fit:cover" />
   ```
   (o `../images/...` si estás en `en/index.html` o en una página de `legal/`).
4. Repite para cada foto/placeholder.

**Vídeo del Hero:** si tienes un vídeo autorizado, colócalo como `videos/hero.mp4` y sustituye el `<div class="hero-bg">...</div>` por:
```html
<video class="hero-bg" autoplay muted loop playsinline>
  <source src="videos/hero.mp4" type="video/mp4" />
</video>
```

---

## 6. SEO incluido

- `<title>`, meta description, keywords, canonical y hreflang (es/en) en cada página.
- Open Graph y Twitter Cards con imagen dedicada (`images/og-cover.jpg`).
- JSON-LD **Restaurant + LocalBusiness** en el `<head>` de cada versión de idioma.
- `sitemap.xml` y `robots.txt` en la raíz.
- `manifest.webmanifest` para instalación como PWA.
- Un único `<h1>` por página, jerarquía de encabezados semántica.

**Antes de publicar en un dominio real**, reemplaza `https://thebrunchbreak.com` por tu dominio definitivo en: `sitemap.xml`, `robots.txt`, y las etiquetas `canonical` / `og:url` / JSON-LD de cada `.html`.

## 7. Rendimiento y accesibilidad

- GSAP + ScrollTrigger + Lenis se cargan por CDN como **mejora progresiva**: si no cargan (sin conexión), el sitio se sigue viendo y funcionando igual gracias al motor de aparición basado en `IntersectionObserver` en `js/main.js`.
- Animaciones y smooth scroll se desactivan automáticamente si el usuario tiene activado `prefers-reduced-motion`.
- Cursor personalizado y botones magnéticos se desactivan en dispositivos táctiles.
- Skip link al contenido principal y estados de foco visibles en toda la web.

## 8. Cookies y privacidad (RGPD)

El banner de cookies (parte inferior de `js/main.js`, marcado `initCookieConsent`) sigue el modelo "opt-in" europeo: **ninguna cookie no esencial se activa hasta que el usuario acepta explícitamente**. La preferencia se guarda en `localStorage`. Las páginas legales (`legal/`) incluyen los textos base — completa los campos marcados "PENDIENTE" con los datos fiscales reales antes de publicar.

## 9. Idiomas

Español (`index.html`) es el idioma por defecto; inglés vive en `en/index.html`. El selector de idioma (arriba a la derecha) enlaza directamente entre ambos archivos — no usa Google Translate. Para añadir un idioma nuevo, duplica `en/` con el nuevo código (ej. `fr/`) y traduce el contenido a mano.

## 10. Asistente de IA (OpenAI)

Hay un botón flotante (abajo a la derecha, en ambos idiomas) que abre un chat donde cualquier visitante puede preguntar sobre el negocio — horario, carta, ubicación, qué tipo de comida hay, etc. Responde con la API de OpenAI (modelo `gpt-4o-mini`), usando como base de conocimiento un resumen de los datos reales del negocio (no lee la web en directo en cada pregunta — es más rápido y fiable tener esos datos ya redactados).

### Puesta en marcha (lo único que tienes que hacer)

1. Consigue una API key en [platform.openai.com](https://platform.openai.com/api-keys) (requiere una cuenta de OpenAI con método de pago activado — el uso del asistente consume crédito de esa cuenta, se factura por uso, no hay coste fijo mensual).
2. En el proyecto de Vercel: **Settings → Environment Variables** → añade una variable llamada `OPENAI_API_KEY` con el valor de tu clave.
3. Vuelve a desplegar el proyecto (o simplemente el primer despliegue después de guardar la variable ya la incluye).

Eso es todo — no hay que tocar ningún archivo. Si la variable no está configurada, el asistente sigue apareciendo pero responde con un aviso claro explicando que falta configurarlo, en vez de fallar en silencio.

### Cómo funciona por dentro
- `js/chat-widget.js` — construye el botón y el panel de chat, y envía cada pregunta a `/api/chat`.
- `api/chat.js` — función serverless de Vercel (se detecta automáticamente por estar en la carpeta `api/`, sin configuración adicional) que llama a la API de OpenAI usando la clave del servidor. La clave **nunca** llega al navegador del visitante.
- El "conocimiento del negocio" (horario, carta, ubicación, fundadora, redes...) está escrito directamente dentro de `api/chat.js`, en la constante `BUSINESS_CONTEXT`. Si cambian datos reales del negocio, actualízalos también ahí para que el asistente no dé información desactualizada.
- Responde en español o inglés según la página desde la que se pregunte.
- Tiene límites de longitud y de coste (tope de tokens por respuesta) para evitar facturas inesperadas por abuso.

### Si no usas Vercel
La función de `api/` es específica del formato de Vercel. Si en el futuro se aloja en otro sitio (Netlify, un servidor propio...), habría que adaptar `api/chat.js` al formato de funciones serverless de ese proveedor — la lógica interna (llamada a OpenAI, prompt del negocio) es reutilizable tal cual.

## 11. Notas de autoría

- La referencia de diseño (deanira.co/onestopshop) se analizó a nivel de arquitectura, ritmo de scroll, tipografía grande y elementos flotantes — no se ha copiado ningún diseño ni asset; la identidad visual (paleta terracota/miel/crema, tipografía Fraunces + Inter) es propia, generada a partir de la marca real de The Brunch Break (bio pública de Instagram, horario, tono "fit bakery & coffee", tagline "Tu brunch, tu momento").
- El contenido fotográfico/vídeo de Instagram no se ha podido descargar automáticamente por restricciones de acceso de Instagram para usuarios no autenticados; ver sección 4 para el proceso de sustitución.
- Existe una versión previa del proyecto construida con Next.js 15 + TypeScript + next-intl en `nextjs-version-backup/`, con su propio README (`README-nextjs.md`), por si en el futuro se prefiere retomar esa arquitectura para funcionalidades más avanzadas (backend real de formulario, CMS, etc.).
