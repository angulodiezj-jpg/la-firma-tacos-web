import { siteConfig } from "./siteConfig";

/**
 * Datos de la campaña de apertura — La Firma Tacos Paterna (València).
 * Dirección real confirmada por el cliente. NO se inventan coordenadas
 * ni fecha de apertura: si `openingDate` sigue en `null`, la web muestra
 * "Próximamente" en vez de una fecha o cuenta atrás falsa.
 */
export const valenciaLaunch = {
  city: "Paterna",
  region: "València",
  location: {
    name: "La Firma Tacos — Paterna",
    street: "Carrer dels Velluters, 1",
    postalCode: "46980",
    fullAddress: "Carrer dels Velluters, 1, 46980 Paterna, València, España",
  },
  // null = todavía no hay fecha confirmada → la web muestra "Próximamente".
  // Cuando se confirme, basta con poner aquí "2026-XX-XX" (ISO) para que
  // se muestre formateada como "Apertura — XX/XX/2026".
  openingDate: null as string | null,
  route: ["Lyon", "Madrid", "Paterna"],
  social: siteConfig.social,
};

export function getGoogleMapsUrl(): string {
  const query = encodeURIComponent(valenciaLaunch.location.fullAddress);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function formatOpeningDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}
