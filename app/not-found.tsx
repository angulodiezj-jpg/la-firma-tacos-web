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
  { href: "/valencia", label: "La Firma Valencia" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#A00812_100%)] text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-0 select-none font-heading text-[16rem] font-bold leading-none text-white/[0.07] md:text-[24rem]"
      >
        404
      </span>
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
            Error 404
          </span>
          <h1 className="font-heading text-[3rem] font-bold uppercase leading-[0.9] md:text-7xl">
            Aquí no hay <span className="text-[#FFD27A]">taco</span>
          </h1>
          <p className="max-w-md text-white/85 md:text-lg">
            La página que buscas no existe o ha cambiado de sitio. Pero lo bueno sigue donde siempre:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-ink px-7 py-4 font-heading text-sm font-bold uppercase tracking-[1.5px] text-white shadow-[0_12px_26px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5"
            >
              Volver al inicio →
            </Link>
            {ATAJOS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="rounded-full border-2 border-white px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[1.5px] transition-colors hover:bg-white hover:text-red-dark"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/cut-f1.webp"
          alt=""
          aria-hidden="true"
          width={565}
          height={820}
          className="mx-auto hidden h-[420px] w-auto -rotate-[40deg] drop-shadow-[0_30px_30px_rgba(60,0,0,0.55)] lg:block"
        />
      </div>
    </section>
  );
}
