import type { Metadata } from "next";
import { Cinzel, Dancing_Script, Kaushan_Script, Mulish, Oswald } from "next/font/google";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SplashLoader from "@/components/SplashLoader";
import { siteConfig, SITE_URL } from "@/data/siteConfig";
import "./globals.css";

const fontDisplay = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display",
  fallback: ["cursive"],
});
const fontHeading = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
  fallback: ["Arial Narrow", "sans-serif"],
});
// Rotulado del logotipo: pincel para "LaFirma" y romana para "TACOS".
const fontLogo = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-logo",
  fallback: ["cursive"],
});
const fontLogoSerif = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-logo-serif",
  fallback: ["Georgia", "serif"],
});
const fontBody = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-body",
  fallback: ["Segoe UI", "sans-serif"],
});

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
    <html lang="es" className={`${fontDisplay.variable} ${fontHeading.variable} ${fontBody.variable} ${fontLogo.variable} ${fontLogoSerif.variable}`}>
      <body>
        {/* Accesibilidad: primer tabulador permite saltarse la navegación */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SplashLoader />
        <SiteChrome>
          <main id="contenido">{children}</main>
        </SiteChrome>
        <ClosingCTA />
        <Footer />
      </body>
    </html>
  );
}
