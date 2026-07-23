import CategoryShowcase from "@/components/CategoryShowcase";
import HeroSlider from "@/components/HeroSlider";
import Marquee from "@/components/Marquee";
import PromoSection from "@/components/PromoSection";
import ValuesSection from "@/components/ValuesSection";
import VibeSection from "@/components/VibeSection";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <Marquee items={["Original French Tacos", "Hecho al Momento", "Salsa de Queso de la Casa", "La Firma"]} />

      <CategoryShowcase />
      <ValuesSection />
      <PromoSection />
      <VibeSection />

      <Marquee
        items={["Monta Tu Taco", "100% Hecho al Momento", `${siteConfig.rating.value}★ en Google`, "La Firma"]}
      />
    </>
  );
}
