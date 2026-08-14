import type { Metadata } from "next";
import MontaTuTacoBuilder from "@/components/MontaTuTacoBuilder";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Monta Tu Taco | ${siteConfig.brandFull}`,
  description: "Elige tamaño, carne, salsa, suplementos y gratinado. Tú lo eliges, tú lo haces único.",
};

export default function MontaTuTacoPage() {
  return <MontaTuTacoBuilder />;
}
