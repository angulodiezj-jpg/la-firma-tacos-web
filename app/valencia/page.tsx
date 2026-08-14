import type { Metadata } from "next";
import ValenciaLaunch from "@/components/ValenciaLaunch";
import { siteConfig, SITE_URL } from "@/data/siteConfig";
import { valenciaLaunch } from "@/data/valenciaLaunch";

const title = "La Firma Tacos Valencia | Nueva Apertura en Paterna";
const description =
  "La Firma llega a Valencia. El auténtico French Tacos de Lyon abre pronto en Paterna. Descubre la nueva dirección, síguenos y entérate antes que nadie de la fecha de apertura.";
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
  ],
  alternates: {
    canonical: "/valencia",
  },
  openGraph: {
    title: "La Firma Llega a Valencia",
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
        alt: "Mural de La Firma Tacos — Nueva apertura en Paterna, València",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Firma Llega a Valencia",
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
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brandFull,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ValenciaLaunch />
    </>
  );
}
