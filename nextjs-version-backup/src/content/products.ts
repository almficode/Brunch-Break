/**
 * Imágenes asociadas a Especialidades y Productos destacados.
 * Mismas reglas de placeholder que content/gallery.ts — ver README.md.
 */

export const specialtyImages = [
  { id: "spec-brunch", src: "/images/products/brunch-autor.jpg", tone: "rust" as const },
  { id: "spec-fitgo", src: "/images/products/fit-go.jpg", tone: "sage" as const },
  { id: "spec-bakery", src: "/images/products/bakery-coffee.jpg", tone: "honey" as const },
  { id: "spec-catering", src: "/images/products/catering.jpg", tone: "ink" as const },
];

export const featuredImages = [
  { id: "feat-donuts", src: "/images/products/party-donuts.jpg", tone: "honey" as const },
  { id: "feat-bowl", src: "/images/products/fitgo-bowl.jpg", tone: "sage" as const },
  { id: "feat-toast", src: "/images/products/tostas-autor.jpg", tone: "rust" as const },
  { id: "feat-coffee", src: "/images/products/coffee-especialidad.jpg", tone: "ink" as const },
];

export const storyImage = { id: "story-main", src: "/images/story/interior-principal.jpg", tone: "rust" as const };

export const heroMedia = {
  image: { id: "hero-image", src: "/images/hero/hero-main.jpg", tone: "rust" as const },
  // Si se dispone de vídeo autorizado, colocarlo en /public/videos/hero.mp4
  // y el componente Hero lo usará automáticamente como fondo (ver README.md).
  video: "/videos/hero.mp4",
};
