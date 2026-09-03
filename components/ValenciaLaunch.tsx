"use client";

import { siteConfig } from "@/data/siteConfig";
import { formatOpeningDate, getGoogleMapsUrl, valenciaLaunch } from "@/data/valenciaLaunch";
import Reveal from "./Reveal";

const HERO_IMAGE = "/images/campaign/valencia-mural-hero.jpg";
const HERO_SRCSET =
  "/images/campaign/valencia-mural-hero-900.jpg 900w, /images/campaign/valencia-mural-hero-1200.jpg 1200w, /images/campaign/valencia-mural-hero.jpg 1600w";

/** Ítem de texto del hero: fade + translateY escalonado al cargar (no al hacer scroll). */
function HeroBeat({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <div className={`animate-fadeUp ${className}`} style={{ opacity: 0, animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function ValenciaLaunch() {
  const mapsUrl = getGoogleMapsUrl();
  const dateLabel = valenciaLaunch.openingDate
    ? `Apertura — ${formatOpeningDate(valenciaLaunch.openingDate)}`
    : "Próximamente";

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[calc(100svh-96px)] min-h-[560px] w-full overflow-hidden bg-ink md:h-[92vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          srcSet={HERO_SRCSET}
          sizes="100vw"
          alt="Mural de La Firma Tacos, próxima apertura en Paterna, Valencia"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div
          className="ambient-glow h-72 w-72 top-10 -left-10 mix-blend-screen hidden md:block"
          aria-hidden="true"
        />
        <div
          className="ambient-glow h-72 w-72 bottom-10 -right-10 mix-blend-screen"
          style={{ animationDelay: "2.6s" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 text-center md:justify-center md:pb-0">
          <HeroBeat delay={0.1}>
            <span className="eyebrow-neon inline-block rounded-full border border-red/50 bg-black/40 px-5 py-2 pl-7 font-heading text-[0.68rem] font-semibold uppercase tracking-[3px] text-white backdrop-blur-sm">
              Nueva Apertura
            </span>
          </HeroBeat>

          <HeroBeat delay={0.3} className="mt-4">
            <h1 className="font-heading font-bold uppercase leading-[0.92] text-white">
              <span className="block text-7xl sm:text-8xl md:text-[9rem]">Valencia</span>
            </h1>
          </HeroBeat>

          <HeroBeat delay={0.5} className="mt-2">
            <p className="text-red-glow font-heading text-xl font-bold uppercase tracking-wide md:text-3xl">
              La Firma llega a Paterna
            </p>
          </HeroBeat>

          <HeroBeat delay={0.68} className="mt-5">
            <p className="max-w-sm text-sm text-white/80 md:text-base">
              {valenciaLaunch.location.street} · {valenciaLaunch.location.postalCode} {valenciaLaunch.city}
            </p>
            <span className="mt-2 inline-block font-heading text-xs font-bold uppercase tracking-[2px] text-gold">
              {dateLabel} · Paterna · Valencia
            </span>
          </HeroBeat>

          <HeroBeat delay={0.86} className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href="#ubicacion"
              className="btn-shine group/btn neon-cta rounded-full bg-gradient-to-br from-red to-red-dark px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-red-glow hover:to-red hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] active:translate-y-0 active:scale-[0.97]"
            >
              Descubre La Nueva Firma
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full border-2 border-white/85 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-[0.97]"
            >
              Síguenos en Instagram
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full border-2 border-white/85 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-[0.97]"
            >
              Síguenos en TikTok
            </a>
          </HeroBeat>
        </div>
      </section>

      {/* ===== EXPECTACIÓN ===== */}
      <section className="bg-ink py-20 text-center md:py-28">
        <div className="mx-auto max-w-[900px] px-6">
          <Reveal>
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              Expansión La Firma
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase leading-tight text-white md:text-5xl">
              Algo grande está llegando.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              La Firma sigue creciendo. Después de Madrid, damos el siguiente paso.
              <br />
              <strong className="text-white">Paterna</strong> será la próxima dirección de La Firma.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex items-center justify-center gap-3 md:gap-6">
              {valenciaLaunch.route.map((city, i) => {
                const isLast = i === valenciaLaunch.route.length - 1;
                return (
                  <div key={city} className="flex items-center gap-3 md:gap-6">
                    <div className="text-center">
                      <span
                        className={`block font-heading font-bold uppercase tracking-wide ${
                          isLast ? "text-2xl text-red md:text-4xl" : "text-sm text-white/40 md:text-lg"
                        }`}
                      >
                        {city}
                      </span>
                      {isLast && (
                        <span className="relative mt-2 block h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                          <span className="animate-progressBar absolute inset-y-0 left-0 bg-red" />
                        </span>
                      )}
                    </div>
                    {!isLast && <span className="text-xl text-white/25 md:text-2xl">→</span>}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== UBICACIÓN ===== */}
      <section id="ubicacion" className="bg-bgsoft py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
                Nueva Dirección
              </span>
              <h2 className="mt-2 font-heading text-3xl font-bold uppercase text-ink md:text-5xl">
                Nos vemos en Paterna
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="neon-ring-hover mx-auto max-w-lg rounded-xl3 border border-line bg-white p-8 text-center shadow-cardHover md:p-10">
              <p className="font-display text-3xl text-red">La Firma Tacos</p>
              <p className="mt-3 font-heading text-lg font-bold uppercase text-ink md:text-xl">
                {valenciaLaunch.location.street}
              </p>
              <p className="font-heading text-sm uppercase tracking-wide text-gold-deep md:text-base">
                {valenciaLaunch.location.area}
              </p>
              <p className="font-heading text-sm uppercase tracking-wide text-ink-soft md:text-base">
                {valenciaLaunch.location.postalCode} {valenciaLaunch.city}, {valenciaLaunch.region}
              </p>
              <span className="mt-4 inline-block rounded-full bg-red-dark px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-white">
                {dateLabel}
              </span>
              <div className="mt-7">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group/btn neon-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-red to-red-dark px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-red-glow hover:to-red hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] active:translate-y-0 active:scale-[0.97]"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SOCIAL ===== */}
      <section className="relative overflow-hidden bg-ink py-20 text-center md:py-28">
        <div className="ambient-glow left-1/4 top-0 h-80 w-80 mix-blend-screen" aria-hidden="true" />
        <div className="relative mx-auto max-w-[700px] px-6">
          <Reveal>
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              Síguenos
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase text-white md:text-5xl">
              Esto acaba de empezar.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/75">
              La fecha de apertura, los primeros anuncios y todas las novedades se publicarán en nuestras redes.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine neon-cta inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red to-red-dark px-9 py-4 font-heading text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 font-heading text-base font-bold uppercase tracking-wide text-ink shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.97]"
              >
                TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red to-red-dark py-20 text-center md:py-24">
        <div className="ambient-glow -bottom-16 right-10 h-72 w-72 mix-blend-screen" aria-hidden="true" />
        <div
          className="ambient-glow -top-16 left-10 h-64 w-64 mix-blend-screen"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[700px] px-6">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold uppercase text-white md:text-5xl">
              ¿Vas a ser de los primeros?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/90">
              Síguenos y descubre antes que nadie cuándo abrimos las puertas de La Firma en Paterna.
            </p>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-8 inline-block rounded-full bg-white px-9 py-4 font-heading text-base font-bold uppercase tracking-wide text-red shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.97]"
            >
              Quiero saber cuándo abrís
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
