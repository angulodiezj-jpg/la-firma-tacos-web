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
    hours: "L-V 13:00-15:30 y 19:00-00:00 · S, D y festivos 13:30-01:00",
    // Horario real del local. Cada día admite varios turnos (los laborables
    // cierran a mediodía). Formato 24 h; si la hora de cierre es menor que la
    // de apertura, se entiende que cierra pasada la medianoche.
    schedule: {
      lunes: [{ abre: "13:00", cierra: "15:30" }, { abre: "19:00", cierra: "00:00" }],
      martes: [{ abre: "13:00", cierra: "15:30" }, { abre: "19:00", cierra: "00:00" }],
      miercoles: [{ abre: "13:00", cierra: "15:30" }, { abre: "19:00", cierra: "00:00" }],
      jueves: [{ abre: "13:00", cierra: "15:30" }, { abre: "19:00", cierra: "00:00" }],
      viernes: [{ abre: "13:00", cierra: "15:30" }, { abre: "19:00", cierra: "00:00" }],
      sabado: [{ abre: "13:30", cierra: "01:00" }],
      domingo: [{ abre: "13:30", cierra: "01:00" }],
      festivos: [{ abre: "13:30", cierra: "01:00" }],
    } as Record<string, { abre: string; cierra: string }[]>,
    // Agrupación tal y como la muestra el cartel del local.
    scheduleGroups: [
      { dias: "Lunes a viernes", turnos: ["13:00 – 15:30", "19:00 – 00:00"] },
      { dias: "Sábado y domingo", turnos: ["13:30 – 01:00"] },
      { dias: "Festivos", turnos: ["13:30 – 01:00"] },
    ],
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
