import { SITE_URL, siteConfig } from "@/data/siteConfig";

const DIAS: Record<string, string> = {
  lunes: "Monday",
  martes: "Tuesday",
  miercoles: "Wednesday",
  jueves: "Thursday",
  viernes: "Friday",
  sabado: "Saturday",
  domingo: "Sunday",
  festivos: "PublicHolidays",
};

/**
 * Datos estructurados (schema.org) del local de Madrid, para que Google
 * pueda mostrar ficha enriquecida: dirección, teléfono, valoración y carta.
 * El horario solo se declara si el local lo ha confirmado en siteConfig;
 * publicar un horario inventado haría que la gente viniera a puerta cerrada.
 */
export default function RestaurantSchema() {
  const { location, rating, social, order } = siteConfig;

  // Un bloque por turno: los laborables tienen dos (mediodía y noche).
  const horario = Object.entries(location.schedule).flatMap(([dia, turnos]) =>
    (turnos ?? []).map((t) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DIAS[dia]}`,
      opens: t.abre,
      closes: t.cierra,
    }))
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurante-madrid`,
    name: location.name,
    description: siteConfig.description,
    servesCuisine: ["French Tacos", "Comida rápida", "Halal"],
    priceRange: "€€",
    url: SITE_URL,
    telephone: `+34${location.phoneHref.replace(/\D/g, "").slice(-9)}`,
    email: location.email,
    image: `${SITE_URL}/images/og-image.jpg`,
    hasMenu: `${SITE_URL}/carta`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Paseo de la Castellana, 122",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      postalCode: "28046",
      addressCountry: "ES",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
    },
    sameAs: [social.instagram, social.tiktok],
    potentialAction: {
      "@type": "OrderAction",
      target: [order.uberEats, order.glovo],
    },
    ...(horario.length > 0 ? { openingHoursSpecification: horario } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
