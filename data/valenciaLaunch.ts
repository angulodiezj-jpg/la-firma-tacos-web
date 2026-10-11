import { UBER_EATS_VALENCIA, siteConfig } from "./siteConfig";

/**
 * Datos del local de Valencia — La Firma Tacos Paterna.
 * Dirección real confirmada por el cliente; abrió el 04/10/2026.
 * Horario confirmado por el local (ficha de Google, 10/10/2026).
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
  // Teléfonos del local, el principal primero (ficha de Google, 11/10/2026).
  phones: [
    { label: "639 03 41 95", href: "tel:+34639034195" },
    { label: "960 41 56 17", href: "tel:+34960415617" },
  ],
  // Horario real. Formato 24 h; si cierra antes de abrir, cierra pasada la
  // medianoche (viernes y sábado hasta la 01:30).
  schedule: {
    lunes: [
      { abre: "12:00", cierra: "16:00" },
      { abre: "19:30", cierra: "23:30" },
    ],
    martes: [
      { abre: "12:00", cierra: "16:00" },
      { abre: "19:30", cierra: "23:30" },
    ],
    miercoles: [
      { abre: "12:00", cierra: "16:00" },
      { abre: "19:30", cierra: "23:30" },
    ],
    jueves: [
      { abre: "12:00", cierra: "16:00" },
      { abre: "19:30", cierra: "23:30" },
    ],
    viernes: [
      { abre: "12:00", cierra: "16:00" },
      { abre: "19:30", cierra: "01:30" },
    ],
    sabado: [{ abre: "19:30", cierra: "01:30" }],
    domingo: [{ abre: "18:00", cierra: "23:30" }],
  } as Record<string, { abre: string; cierra: string }[]>,
  scheduleGroups: [
    { dias: "Lunes a jueves", turnos: ["12:00 – 16:00", "19:30 – 23:30"] },
    { dias: "Viernes", turnos: ["12:00 – 16:00", "19:30 – 01:30"] },
    { dias: "Sábado", turnos: ["19:30 – 01:30"] },
    { dias: "Domingo", turnos: ["18:00 – 23:30"] },
  ],
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
