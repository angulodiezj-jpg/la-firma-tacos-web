import { UBER_EATS_VALENCIA, siteConfig } from "./siteConfig";

/**
 * Datos del local de Valencia — La Firma Tacos Paterna.
 * Dirección real confirmada por el cliente; abrió el 04/10/2026.
 * El horario no se publica hasta que el local lo confirme.
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
  // Fecha real de apertura (ISO).
  openingDate: "2026-10-04",
  // Pedido a domicilio en Valencia: de momento solo Uber Eats.
  uberEats: UBER_EATS_VALENCIA,
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
