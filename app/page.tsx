import HeroFirma from "@/components/HeroFirma";
import LocalesSection from "@/components/LocalesSection";
import Marquee from "@/components/Marquee";
import PromoSection from "@/components/PromoSection";
import RestaurantSchema from "@/components/RestaurantSchema";
import ReviewsSection from "@/components/ReviewsSection";
import TopProducts from "@/components/TopProducts";
import ValuesSection from "@/components/ValuesSection";
import VibeSection from "@/components/VibeSection";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <>
      <RestaurantSchema />
      <HeroFirma />

      {/* Franja dorada montada sobre el borde inferior de la portada roja. */}
      <Marquee
        variant="gold"
        className="z-10 -mt-7 mb-0"
        items={["Hecho al Momento", "Salsa de Queso de la Casa", "100 % Halal", "Madrid · Valencia", "Original French Tacos"]}
      />

      <TopProducts />
      <ValuesSection />
      {/* La prueba social va justo antes del bloque de "Visítanos": quien acaba
          de convencerse leyendo opiniones tiene la dirección a un scroll. */}
      <ReviewsSection />
      <LocalesSection />
      <PromoSection />
      <VibeSection />

      <Marquee
        items={["Monta Tu Taco", "Madrid · Valencia", "100% Hecho al Momento", `${siteConfig.rating.value}★ en Google`, "La Firma"]}
      />
    </>
  );
}
