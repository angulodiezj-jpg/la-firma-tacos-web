import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Página no encontrada | ${siteConfig.brandFull}`,
  robots: { index: false, follow: true },
};

const ATAJOS = [
  { href: "/carta", label: "La Carta" },
  { href: "/monta-tu-taco", label: "Monta Tu Taco" },
  { href: "/valencia", label: "Nueva Apertura" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url(/images/brand/firma-pattern.jpg)",
          backgroundSize: "320px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="ambient-glow -top-16 left-1/4 h-72 w-72 mix-blend-screen" aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
          Error 404
        </span>
        <h1 className="mt-3 font-heading text-5xl font-bold uppercase leading-none text-white md:text-7xl">
          Aquí no hay taco
        </h1>
        <p className="mx-auto mt-5 max-w-md text-white/75">
          La página que buscas no existe o ha cambiado de sitio. Pero lo bueno sigue donde siempre:
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ATAJOS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-full border-2 border-white/70 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
            >
              {a.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="btn-shine neon-cta inline-block rounded-full bg-red px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
