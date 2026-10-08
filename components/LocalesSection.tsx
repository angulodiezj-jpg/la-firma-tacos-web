import Link from "next/link";
import { locales, mapsUrl, siteConfig } from "@/data/siteConfig";
import OrderButtons from "./OrderButtons";
import Reveal from "./Reveal";
import { PinIcon } from "./ValueIcons";

const FOTOS: Record<string, { src: string; alt: string }> = {
  madrid: { src: "/images/vibe/fachada.jpg", alt: "Fachada de La Firma Tacos en Paseo de la Castellana, Madrid" },
  valencia: {
    src: "/images/campaign/valencia-mural-hero-900.jpg",
    alt: "Mural de La Firma Tacos en Paterna, Valencia",
  },
};

/**
 * Todos los locales de la marca en un vistazo: cada tarjeta lleva a su
 * ficha, a Google Maps y a SU tienda de delivery (un pedido de Valencia no
 * puede caer en la tienda de Madrid). Al abrir un local nuevo basta con
 * añadirlo a `locales` en data/siteConfig.ts y darle foto aquí.
 */
export default function LocalesSection() {
  return (
    <section id="locales" className="scroll-mt-24 bg-[#FBF5EC] pb-20 md:pb-24">
      {/* Ancla antigua de "Visítanos", para que los enlaces viejos sigan llegando aquí. */}
      <span id="visitanos" className="block scroll-mt-24" aria-hidden="true" />
      {/* Banda roja con el titular; las tarjetas montan sobre su borde inferior. */}
      <div className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_60%_90%_at_75%_40%,#E3151F_0%,rgba(199,12,24,0)_70%)] pb-28 pt-14 text-white md:pb-36 md:pt-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-6 hidden select-none font-heading text-[18rem] font-bold leading-none tracking-[-0.04em] text-white/[0.06] lg:block"
        >
          LOCALES
        </span>
        <Reveal>
          <div className="relative mx-auto flex max-w-[1280px] flex-col gap-4 px-5 sm:px-8">
            <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
              {locales.map((l) => l.ciudad).join(" · ")}
            </span>
            <h2 className="font-heading text-[2.6rem] font-bold uppercase leading-[0.92] sm:text-6xl lg:text-[5.2rem]">
              Dos ciudades, <span className="text-[#FFD27A]">la misma receta</span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto -mt-20 grid max-w-[1280px] gap-5 px-5 sm:px-8 md:-mt-24 md:grid-cols-2 md:gap-6">
        {locales.map((local, i) => (
          <Reveal key={local.id} delay={0.1 * i}>
            <article className="relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[28px] text-white shadow-[0_24px_50px_rgba(60,10,10,0.25)] md:min-h-[540px] md:rounded-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FOTOS[local.id].src}
                alt={FOTOS[local.id].alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,18,0)_25%,rgba(26,20,18,0.92)_75%)]"
                aria-hidden="true"
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-heading text-xs uppercase tracking-[1.5px] text-ink md:left-7 md:top-6">
                <span className="h-2 w-2 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                {local.id === "valencia" ? "Nuevo · abierto" : "Abierto"}
              </span>
              <div className="relative flex flex-col gap-3 p-6 md:p-8">
                <h3 className="font-heading text-5xl font-bold uppercase leading-[0.9] md:text-6xl">{local.ciudad}</h3>
                <p className="text-sm text-white/85 md:text-base">{local.direccion}</p>
                {local.id === "madrid" && (
                  <p className="text-sm text-[#FFD27A]">
                    {siteConfig.location.scheduleGroups.map((g) => `${g.dias}: ${g.turnos.join(" y ")}`).join(" · ")}
                  </p>
                )}
                <OrderButtons city={local.id} size="sm" className="mt-2" />
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <a
                    href={mapsUrl(local.direccion)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-white hover:text-[#FFD27A]"
                  >
                    <PinIcon className="h-4 w-4 shrink-0" />
                    Cómo llegar
                  </a>
                  <Link
                    href={local.href}
                    className="font-heading text-xs font-bold uppercase tracking-wide text-[#FFD27A] underline underline-offset-2"
                  >
                    Ver local →
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-[1280px] px-5 sm:px-8">
        <a
          href={`mailto:${siteConfig.location.email}?subject=${encodeURIComponent("Quiero abrir La Firma en mi ciudad")}`}
          className="flex flex-col items-center justify-center gap-1 rounded-[22px] border-2 border-dashed border-[#D9C9B6] px-6 py-5 text-center transition-colors hover:border-red sm:flex-row sm:gap-3"
        >
          <span className="font-heading text-sm uppercase tracking-[2px] text-[#8A7866]">Próxima ciudad</span>
          <span className="hidden text-red sm:inline" aria-hidden="true">★</span>
          <span className="text-sm text-ink">
            ¿Quieres abrir uno en tu ciudad? <span className="font-bold text-red underline underline-offset-2">Escríbenos</span>
          </span>
        </a>
      </div>
    </section>
  );
}
