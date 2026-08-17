import type { Metadata } from "next";
import { Suspense } from "react";
import MontaTuTacoBuilder from "@/components/MontaTuTacoBuilder";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Monta Tu Taco | ${siteConfig.brandFull}`,
  description: "Elige tamaño, carne, salsa, suplementos y gratinado. Tú lo eliges, tú lo haces único.",
};

export default function MontaTuTacoPage() {
  // El builder lee ?talla= con useSearchParams, que en Next 14 exige un
  // límite de Suspense para poder prerenderizar la página como estática.
  return (
    <Suspense>
      <MontaTuTacoBuilder />
    </Suspense>
  );
}
