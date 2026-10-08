import HeroFirma from "@/components/HeroFirma";
import LocalesSection from "@/components/LocalesSection";
import Marquee from "@/components/Marquee";
import RestaurantSchema from "@/components/RestaurantSchema";
import ReviewsSection from "@/components/ReviewsSection";
import TopProducts from "@/components/TopProducts";
import ValuesSection from "@/components/ValuesSection";
import VibeSection from "@/components/VibeSection";

export default function HomePage() {
  return (
    <>
      <RestaurantSchema />
      <HeroFirma />

      {/* Franja dorada montada sobre el borde inferior de la portada roja. */}
      <Marquee
        variant="gold"
        className="z-10 -mt-7 mb-0"
        items={[
          "Hecho al Momento",
          "Se dobla, se plancha, se disfruta",
          "100 % Halal",
          "Queso de la casa, hambre de la calle",
          "Original French Tacos",
        ]}
      />

      <TopProducts />
      <ValuesSection />
      <VibeSection />
      {/* La prueba social va justo antes del bloque de "Visítanos": quien acaba
          de convencerse leyendo opiniones tiene la dirección a un scroll. */}
      <ReviewsSection />
      {/* Cierre de la portada: los locales con sus botones de pedido. */}
      <LocalesSection />
    </>
  );
}
