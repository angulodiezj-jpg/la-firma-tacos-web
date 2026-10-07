import type { Metadata } from "next";
import ValenciaLaunch from "@/components/ValenciaLaunch";
import { siteConfig, SITE_URL } from "@/data/siteConfig";
import { valenciaLaunch } from "@/data/valenciaLaunch";

const title = "La Firma Tacos Valencia | French Tacos en Paterna, ya abierto";
const description =
  "La Firma Tacos ya está abierto en Paterna (Valencia): el auténtico French Tacos de Lyon. Pide a domicilio en Uber Eats o ven al local en Calle de Carboners, 21.";
const ogImage = "/images/campaign/valencia-og.jpg";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "La Firma Tacos Paterna",
    "La Firma Tacos Valencia",
    "French Tacos Paterna",
    "French Tacos Valencia",
    "tacos franceses Paterna",
    "tacos franceses Valencia",
    "tacos de Lyon Valencia",
    "restaurante Paterna",
    "La Firma Paterna",
    "La Firma Tacos Uber Eats Valencia",
    "French Tacos a domicilio Valencia",
  ],
  alternates: {
    canonical: "/valencia",
  },
  openGraph: {
    title: "La Firma Tacos Valencia, ya abierto",
    description,
    url: `${SITE_URL}/valencia`,
    siteName: siteConfig.brandFull,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Mural de La Firma Tacos en Paterna, Valencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Firma Tacos Valencia, ya abierto",
    description,
    images: [ogImage],
  },
};

export default function ValenciaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: valenciaLaunch.location.name,
    servesCuisine: "French Tacos",
    address: {
      "@type": "PostalAddress",
      streetAddress: valenciaLaunch.location.street,
      postalCode: valenciaLaunch.location.postalCode,
      addressLocality: valenciaLaunch.city,
      addressRegion: valenciaLaunch.region,
      addressCountry: "ES",
    },
    url: `${SITE_URL}/valencia`,
    image: `${SITE_URL}/images/campaign/valencia-og.jpg`,
    hasMenu: `${SITE_URL}/carta`,
    potentialAction: { "@type": "OrderAction", target: [valenciaLaunch.uberEats] },
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brandFull,
      url: SITE_URL,
    },
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/campaign/valencia-mural-hero.jpg"
        imageSrcSet="/images/campaign/valencia-mural-hero-900.jpg 900w, /images/campaign/valencia-mural-hero-1200.jpg 1200w, /images/campaign/valencia-mural-hero.jpg 1600w"
        imageSizes="100vw"
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ValenciaLaunch />
    </>
  );
}
