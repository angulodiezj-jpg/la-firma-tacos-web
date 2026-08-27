export const SITE_URL = "https://lafirma-tacos.com";

/** Enlace a Google Maps generado desde una dirección real (sin coordenadas inventadas). */
export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const siteConfig = {
  brand: "La Firma",
  brandFull: "La Firma Tacos",
  tagline: "Original French Tacos",
  description:
    "La Firma Tacos: el auténtico taco francés hecho al momento. Descubre la carta y monta tu taco a tu manera.",
  rating: {
    value: 4.8,
    count: 103,
    source: "Google",
  },
  location: {
    name: "La Firma Tacos — Castellana",
    address: "Paseo de la Castellana, 122, Chamartín, 28046 Madrid",
    phone: "614 28 09 50",
    phoneHref: "tel:+34614280950",
    email: "jmtacomadrid@gmail.com",
    hours: "Abre a las 20:00",
    // Horario semanal completo. `null` = el local no ha confirmado ese día,
    // y entonces la web no lo muestra en vez de inventarlo.
    // Formato 24 h, p. ej. { abre: "20:00", cierra: "00:30" }.
    schedule: {
      lunes: null,
      martes: null,
      miercoles: null,
      jueves: null,
      viernes: null,
      sabado: null,
      domingo: null,
    } as Record<string, { abre: string; cierra: string } | null>,
    amenities: ["Terraza", "Platos veganos", "Wi-Fi"],
    status: "Abierto" as const,
  },
  // Expansión: sin dirección/fecha reales todavía — solo teaser de apertura futura.
  expansion: {
    city: "Valencia",
    status: "Próximamente" as const,
    message: "La Firma sigue creciendo: nueva apertura muy pronto en Valencia.",
  },
  social: {
    instagram: "https://instagram.com/lafirmatacos",
    instagramHandle: "@lafirmatacos",
    tiktok: "https://tiktok.com/@lafirmaoff",
    tiktokHandle: "@lafirmaoff",
  },
  // Pedido online: SOLO a través de plataformas externas (no hay pedido propio).
  order: {
    uberEats: "https://www.ubereats.com/es/store/la-firma-tacos-castellana/dM1nGYO7Rg-g77HPRUD_ew",
    glovo: "https://glovoapp.com/es/es/madrid/stores/la-firma-tacos-madrid",
  },
} as const;

export type SiteConfig = typeof siteConfig;
