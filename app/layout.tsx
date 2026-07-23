import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SplashLoader from "@/components/SplashLoader";
import { siteConfig, SITE_URL } from "@/data/siteConfig";
import "./globals.css";

const title = `${siteConfig.brandFull} | ${siteConfig.tagline} en España`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: siteConfig.description,
  keywords: ["tacos franceses", "french tacos", "la firma tacos", "tacos madrid", "comida halal madrid"],
  openGraph: {
    title,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: siteConfig.brandFull,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.brandFull,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SplashLoader />
        <SiteChrome>{children}</SiteChrome>
        <Footer />
      </body>
    </html>
  );
}
