// Vídeos del hero — ya colocados en /public/videos (autoplay + loop + muted,
// siempre en reproducción). Si algún vídeo faltara o fallara la carga, cada
// slide cae automáticamente a la imagen de fallback (Ken Burns), y si esa
// imagen tampoco existe, muestra un bloque de marcador de posición.

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  video: string; // /public/videos/...
  fallbackImage: string; // /public/images/hero/...
  videoPrompt: string; // prompt para Runway/Pika/Sora
};

export const heroSlides: HeroSlide[] = [
  {
    id: "monta-tu-taco",
    eyebrow: "A tu manera",
    title: "Monta Tu Taco",
    subtitle: "3 tamaños, 6 carnes, 10 salsas. Tú decides.",
    ctaLabel: "Descúbrelo",
    ctaHref: "/monta-tu-taco",
    video: "/videos/hero-monta-tu-taco.mp4",
    fallbackImage: "/images/hero/monta-tu-taco.jpg",
    videoPrompt:
      "Cinematic food video, hands folding a large French tacos wrap with melted cheese pull, warm golden lighting, shallow depth of field, slow motion, vertical 9:16, 6 seconds, loop-friendly, no text, no logos",
  },
  {
    id: "f1-tacos",
    eyebrow: "El original",
    title: "F1 Tacos La Firma",
    subtitle: "Nuestro taco insignia, con la receta de la casa.",
    ctaLabel: "Ver la Carta",
    ctaHref: "/carta#tacos",
    video: "/videos/hero-f1-tacos.mp4",
    fallbackImage: "/images/hero/f1-tacos.jpg",
    videoPrompt:
      "Cinematic close-up of a French tacos being sliced open revealing meat, fries and cheese sauce, steam rising, warm restaurant lighting, slow motion, vertical 9:16, 6 seconds, loop-friendly, no text",
  },
  {
    id: "crousty-spicy",
    eyebrow: "Para valientes",
    title: "Crousty Spicy",
    subtitle: "Crujiente, picante, irresistible.",
    ctaLabel: "Pídelo Ya",
    ctaHref: "/carta#crousty",
    video: "/videos/hero-crousty-spicy.mp4",
    fallbackImage: "/images/hero/crousty-spicy.jpg",
    videoPrompt:
      "Cinematic food video, spicy sauce drizzling over crispy loaded fries in a box, red chili flakes, warm dramatic lighting, slow motion, vertical 9:16, 6 seconds, loop-friendly, no text",
  },
];

export type VibeItem = {
  id: string;
  image: string;
  alt: string;
};

// Grid "La Firma Vibe". Nombres de archivo ya acordados con el dueño — coloca
// las fotos reales del local en /public/images/vibe/ con estos nombres exactos.
export const vibeItems: VibeItem[] = [
  { id: "fachada", image: "/images/vibe/fachada.jpg", alt: "Fachada de La Firma Tacos con letrero de neón en Castellana" },
  { id: "sala-paneles", image: "/images/vibe/sala-paneles.jpg", alt: "Zona de mesas con paneles de madera retroiluminados" },
  { id: "mostrador", image: "/images/vibe/mostrador.jpg", alt: "Mostrador con salsas, bebidas y pantallas de la carta" },
  { id: "comedor-real-madrid", image: "/images/vibe/comedor-real-madrid.jpg", alt: "Comedor con mural del Real Madrid y techo de vigas de madera" },
  { id: "neon-la-firma", image: "/images/vibe/neon-la-firma.jpg", alt: "Letrero de neón La Firma Tacos sobre pared roja" },
  { id: "sala-butacas", image: "/images/vibe/sala-butacas.jpg", alt: "Sala con butacas y ambiente de La Firma Tacos" },
  { id: "mesa-grupo", image: "/images/vibe/mesa-grupo.jpg", alt: "Grupo de amigos disfrutando de una mesa llena de tacos y burgers de La Firma" },
];
