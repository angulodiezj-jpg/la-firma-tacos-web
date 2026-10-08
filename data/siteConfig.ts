// El dominio .com ya es del cliente, pero a día de hoy sigue sin enlazarse
// en Vercel (sin DNS, sin resolver — verificado el 23/09/2026). Mientras
// tanto SITE_URL se mantiene en .es, que es el dominio que responde de
// verdad: publicar aquí ya el .com rompería el canonical y el Open Graph
// del sitio en vivo. En cuanto el DNS esté propagado, este valor vuelve a
// "https://www.lafirma-tacos.com" (ese cambio ya existe hecho en el
// commit cdfd2c7, solo hay que traerlo).
export const SITE_URL = "https://www.lafirma-tacos.es";

/** Enlace a Google Maps generado desde una dirección real (sin coordenadas inventadas). */
export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const siteConfig = {
  brand: "La Firma",
  brandFull: "La Firma Tacos",
  tagline: "Original French Tacos",
  description:
    "La Firma Tacos: el auténtico taco francés hecho al momento, en Madrid y Valencia. Descubre la carta, monta tu taco y pídelo a domicilio.",
  // Valoración agregada. IMPORTANTE: estos dos números deben copiarse tal cual
  // del perfil de Google Business del local; no se estiman ni se redondean al
  // alza, porque además alimentan el aggregateRating de los datos
  // estructurados y una cifra inflada ahí es motivo de penalización en Google.
  rating: {
    // Verificado en la ficha de Google Maps el 02/09/2026.
    value: 4.8,
    count: 151,
    source: "Google",
    /** Ficha del local: leer todas las opiniones y dejar la propia. */
    url: "https://www.google.com/maps/search/?api=1&query=La+Firma+Tacos+Paseo+de+la+Castellana+122+Madrid",
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
  // Expansión: Valencia (Paterna) abrió el 04/10/2026. Los datos del local
  // viven en data/valenciaLaunch.ts; aquí solo el aviso corto de la web.
  expansion: {
    city: "Valencia",
    status: "Ya abierto" as const,
    message: "La Firma Valencia ya está abierta en Paterna. Pide a domicilio en Uber Eats.",
  },
  social: {
    instagram: "https://instagram.com/lafirmatacos",
    instagramHandle: "@lafirmatacos",
    tiktok: "https://tiktok.com/@lafirmaoff",
    tiktokHandle: "@lafirmaoff",
  },
  // Pedido online: SOLO a través de plataformas externas (no hay pedido propio).
  // `order` es el de Madrid (Castellana); el de cada local está en `locales`.
  order: {
    uberEats: "https://www.ubereats.com/es/store/la-firma-tacos-castellana/dM1nGYO7Rg-g77HPRUD_ew",
    glovo: "https://glovoapp.com/es/es/madrid/stores/la-firma-tacos-madrid",
  },
} as const;

export type OrderLink = { plataforma: "Uber Eats" | "Glovo"; url: string };

export type Local = {
  id: "madrid" | "valencia";
  ciudad: string;
  zona: string;
  direccion: string;
  /** Página o ancla con la información del local. */
  href: string;
  pedir: OrderLink[];
};

// Enlace del local de Valencia en Uber Eats. PENDIENTE: pegar aquí el enlace
// directo a la tienda (ubereats.com/es/store/...) en cuanto lo tengamos;
// mientras tanto lleva a la búsqueda de Uber Eats con el nombre del local.
export const UBER_EATS_VALENCIA =
  "https://www.ubereats.com/es/search?q=La%20Firma%20Tacos%20Paterna";

/** Todos los locales abiertos, en el orden en que se muestran. */
export const locales: Local[] = [
  {
    id: "madrid",
    ciudad: "Madrid",
    zona: "Castellana",
    direccion: siteConfig.location.address,
    href: "/#locales",
    pedir: [
      { plataforma: "Uber Eats", url: siteConfig.order.uberEats },
      { plataforma: "Glovo", url: siteConfig.order.glovo },
    ],
  },
  {
    id: "valencia",
    ciudad: "Valencia",
    zona: "Paterna",
    direccion: "Calle de Carboners, 21, Parque Empresarial Táctica, 46980 Paterna, Valencia",
    href: "/valencia",
    pedir: [{ plataforma: "Uber Eats", url: UBER_EATS_VALENCIA }],
  },
];

export type SiteConfig = typeof siteConfig;
