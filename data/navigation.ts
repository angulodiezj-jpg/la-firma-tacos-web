export type NavLink = {
  label: string;
  href: string;
};

// Navegación real de La Firma Tacos.
// Eliminado respecto a la referencia (o-tacos.com/fr): Devenir Franchisé, Boss Club,
// Rejoins-nous, BOX FRERO', O'Boss, FrerO', O'Fresh, O'Brunch, O'Mini, PROMOS,
// selector de país — ninguno aplica a este negocio (ver mapeo acordado).
export const mainNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "La Carta", href: "/carta" },
  { label: "Monta Tu Taco", href: "/monta-tu-taco" },
  { label: "Nueva Apertura", href: "/valencia" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Nuestro Local", href: "/#local" },
];

export const footerProductLinks: NavLink[] = [
  { label: "Tacos La Firma", href: "/carta#tacos" },
  { label: "Crousty La Firma", href: "/carta#crousty" },
  { label: "Burgers La Firma", href: "/carta#burgers" },
  { label: "Bocatas La Firma", href: "/carta#bocatas" },
  { label: "Postres La Firma", href: "/carta#postres" },
  { label: "Bebidas", href: "/carta#bebidas" },
];

export const footerAboutLinks: NavLink[] = [
  { label: "Nuestra Historia", href: "/#nosotros" },
  { label: "Nuestro Local", href: "/#local" },
  { label: "Monta Tu Taco", href: "/monta-tu-taco" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Política de Privacidad", href: "/legal/privacidad" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Tabla de Alérgenos", href: "/legal/alergenos" },
];
