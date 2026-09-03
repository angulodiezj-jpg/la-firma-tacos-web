import { siteConfig } from "./siteConfig";

/**
 * Datos de la campaña de apertura — La Firma Tacos Paterna (Valencia).
 * Dirección real confirmada por el cliente. NO se inventan coordenadas
 * ni fecha de apertura: si `openingDate` sigue en `null`, la web muestra
 * "Próximamente" en vez de una fecha o cuenta atrás falsa.
 */
export const valenciaLaunch = {
  city: "Paterna",
  region: "Valencia",
  location: {
    name: "La Firma Tacos — Paterna",
    street: "Calle de Carboners, 21",
    area: "Parque Empresarial Táctica",
    postalCode: "46980",
    fullAddress: "Calle de Carboners, 21, Parque Empresarial Táctica, 46980 Paterna, Valencia, España",
  },
  // null = todavía no hay fecha confirmada → la web muestra "Próximamente".
  // Cuando se confirme, basta con poner aquí "2026-XX-XX" (ISO) para que
  // se muestre formateada como "Apertura — XX/XX/2026".
  openingDate: null as string | null,
  // El recorrido de marca se cuenta por ciudades reconocibles: la tercera
  // parada se anuncia como Valencia (Paterna es el municipio exacto y se
  // detalla en la dirección, más abajo en la misma página).
  route: ["Lyon", "Madrid", "Valencia"],
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
