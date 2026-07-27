/**
 * Datos de la galería / sección Instagram.
 *
 * `src` apunta a rutas de imagen que TODAVÍA NO EXISTEN en /public/images.
 * Mientras no se suban las fotos reales (autorizadas por el propietario de
 * @the_brunch_break), los componentes <GalleryTile> renderizan un
 * <MediaPlaceholder> con la etiqueta indicada, para dejar claro qué
 * contenido real debe ir ahí. En cuanto coloques el archivo en la ruta
 * indicada, el componente lo detecta automáticamente (ver README.md).
 */

export type GalleryItem = {
  id: string;
  src: string;
  labelEs: string;
  labelEn: string;
  tone: "rust" | "honey" | "sage" | "ink";
  span: "tall" | "wide" | "square";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-01",
    src: "/images/gallery/sala-01.jpg",
    labelEs: "Sala y ambiente",
    labelEn: "Dining room & atmosphere",
    tone: "rust",
    span: "tall",
  },
  {
    id: "gallery-02",
    src: "/images/gallery/vitrina-01.jpg",
    labelEs: "Vitrina de bakery",
    labelEn: "Bakery display case",
    tone: "honey",
    span: "square",
  },
  {
    id: "gallery-03",
    src: "/images/gallery/brunch-01.jpg",
    labelEs: "Plato de brunch",
    labelEn: "Brunch plate",
    tone: "sage",
    span: "wide",
  },
  {
    id: "gallery-04",
    src: "/images/gallery/coffee-01.jpg",
    labelEs: "Coffee de especialidad",
    labelEn: "Specialty coffee",
    tone: "ink",
    span: "square",
  },
  {
    id: "gallery-05",
    src: "/images/gallery/donuts-01.jpg",
    labelEs: "Party Donuts",
    labelEn: "Party Donuts",
    tone: "honey",
    span: "tall",
  },
  {
    id: "gallery-06",
    src: "/images/gallery/detalle-01.jpg",
    labelEs: "Detalle de mesa",
    labelEn: "Table detail",
    tone: "rust",
    span: "square",
  },
  {
    id: "gallery-07",
    src: "/images/gallery/exterior-01.jpg",
    labelEs: "Fachada / exterior",
    labelEn: "Storefront / exterior",
    tone: "sage",
    span: "wide",
  },
  {
    id: "gallery-08",
    src: "/images/gallery/equipo-01.jpg",
    labelEs: "Equipo en barra",
    labelEn: "Team behind the bar",
    tone: "ink",
    span: "square",
  },
];

export const instagramReels = [
  { id: "reel-01", labelEs: "Reel: making of bakery", labelEn: "Reel: bakery making of" },
  { id: "reel-02", labelEs: "Reel: montaje de brunch", labelEn: "Reel: brunch plating" },
  { id: "reel-03", labelEs: "Reel: detrás de barra", labelEn: "Reel: behind the counter" },
];
