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
        items={["Hecho al Momento", "Se dobla, se plancha, se disfruta", "100 % Halal", "Queso de la casa, hambre de la calle", "Madrid · Valencia", "Original French Tacos"]}
      />

      <TopProducts />
      <ValuesSection />
      {/* La prueba social va justo antes del bloque de "Visítanos": quien acaba
          de convencerse leyendo opiniones tiene la dirección a un scroll. */}
      <ReviewsSection />
      <LocalesSection />
      <VibeSection />

      <Marquee
        items={["Un taco que no cabe en una mano", "Pide fuerte", "Crujiente por fuera, fundente por dentro", "Madrid · Valencia", "Pide en Uber Eats y Glovo"]}
      />
    </>
  );
}
