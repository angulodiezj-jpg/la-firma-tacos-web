"use client";

import Link from "next/link";
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
  const dateLabel = `Abierto desde el ${formatOpeningDate(valenciaLaunch.openingDate)}`;
  const uber = valenciaLaunch.uberEats;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[calc(100svh-96px)] min-h-[560px] w-full overflow-hidden bg-ink md:h-[92vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          srcSet={HERO_SRCSET}
          sizes="100vw"
          alt="Mural de La Firma Tacos en Paterna, Valencia"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="ambient-glow h-72 w-72 top-10 -left-10 mix-blend-screen hidden md:block" aria-hidden="true" />
        <div
          className="ambient-glow h-72 w-72 bottom-10 -right-10 mix-blend-screen"
          style={{ animationDelay: "2.6s" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 text-center md:justify-center md:pb-0">
          <HeroBeat delay={0.1}>
            <span className="eyebrow-neon inline-block rounded-full border border-red/50 bg-black/40 px-5 py-2 pl-7 font-heading text-[0.68rem] font-semibold uppercase tracking-[3px] text-white backdrop-blur-sm">
              Ya abierto
            </span>
          </HeroBeat>

          <HeroBeat delay={0.3} className="mt-4">
            <h1 className="font-heading font-bold uppercase leading-[0.92] text-white">
              <span className="block text-7xl sm:text-8xl md:text-[9rem]">Valencia</span>
            </h1>
          </HeroBeat>

          <HeroBeat delay={0.5} className="mt-2">
            <p className="text-red-glow font-heading text-xl font-bold uppercase tracking-wide md:text-3xl">
              La Firma ya está en Paterna
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

          <HeroBeat
            delay={0.86}
            className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <a
              href={uber}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group/btn neon-cta rounded-full bg-gradient-to-br from-red to-red-dark px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-red-glow hover:to-red hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] active:translate-y-0 active:scale-[0.97]"
            >
              Pedir en Uber Eats
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full border-2 border-white/85 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-[0.97]"
            >
              Cómo llegar
            </a>
            <Link
              href="/carta"
              className="btn-shine rounded-full border-2 border-white/85 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-[0.97]"
            >
              Ver la carta
            </Link>
          </HeroBeat>
        </div>
      </section>

      {/* ===== EXPANSIÓN + PEDIDO ===== */}
      <section id="pedir" className="bg-[#FBF5EC] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-5 sm:px-8 md:gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[30px] bg-[#C70C18] bg-[radial-gradient(ellipse_80%_70%_at_70%_30%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#A00812_100%)] p-8 text-white md:p-12">
              <div className="flex flex-col gap-5">
                <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
                  Expansión La Firma
                </span>
                <h2 className="font-heading text-[2.6rem] font-bold uppercase leading-[0.92] md:text-6xl">
                  Ya estamos en <span className="text-[#FFD27A]">Valencia</span>
                </h2>
                <p className="max-w-md text-white/85 md:text-lg">
                  Después de Madrid, La Firma abre su segundo local. El mismo taco francés y la misma salsa de queso de
                  la casa, ahora en Paterna.
                </p>
              </div>
              <ol className="flex items-center gap-2 md:gap-3">
                {valenciaLaunch.route.map((city, i) => {
                  const isLast = i === valenciaLaunch.route.length - 1;
                  return (
                    <li key={city} className="flex items-center gap-2 md:gap-3">
                      <span
                        className={`rounded-full px-4 py-2 font-heading text-xs uppercase tracking-[2px] md:text-sm ${
                          isLast ? "bg-white font-bold text-red-dark" : "bg-black/20 text-white/80"
                        }`}
                      >
                        {city}
                      </span>
                      {!isLast && (
                        <span className="text-[#FFD27A]" aria-hidden="true">
                          →
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[30px] bg-ink p-8 text-white md:p-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/cut-crousty.webp"
                alt=""
                aria-hidden="true"
                width={820}
                height={690}
                loading="lazy"
                className="pointer-events-none absolute -bottom-6 -right-10 w-[260px] drop-shadow-[0_24px_24px_rgba(0,0,0,0.6)] md:w-[340px]"
              />
              <div className="relative flex max-w-sm flex-col gap-4">
                <span className="font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">
                  A domicilio en Valencia
                </span>
                <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] md:text-5xl">
                  Pídelo en Uber Eats
                </h2>
                <p className="text-white/70">
                  Tacos, crousty, burgers y bocatas del local de Paterna, recién hechos y directos a tu puerta.
                </p>
              </div>
              <div className="relative mt-8 flex flex-col items-start gap-4">
                <a
                  href={uber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-8 py-4 font-heading text-base font-bold uppercase tracking-[1.5px] text-ink transition-transform hover:-translate-y-0.5"
                >
                  Pedir en Uber Eats →
                </a>
                <p className="text-sm text-white/60">
                  ¿Estás en Madrid?{" "}
                  <Link href="/#locales" className="font-semibold text-white underline underline-offset-2">
                    Pide en La Firma Castellana
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== UBICACIÓN ===== */}
      <section id="ubicacion" className="bg-[#FBF5EC] pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[30px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/campaign/valencia-mural-hero-1200.jpg"
                alt="Mural de La Firma Tacos en el local de Paterna"
                loading="lazy"
                decoding="async"
                className="h-[520px] w-full object-cover md:h-[560px]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-5 bottom-5 flex flex-col gap-4 rounded-[24px] bg-white p-6 text-ink shadow-cardHover sm:inset-x-auto sm:left-8 sm:max-w-md md:bottom-10 md:left-10 md:p-8">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#2FCB6B]/15 px-3 py-1.5 font-heading text-xs uppercase tracking-[1.5px] text-[#1a8c48]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                  {dateLabel}
                </span>
                <h2 className="font-heading text-3xl font-bold uppercase leading-none md:text-4xl">
                  Te esperamos en <span className="text-red">Paterna</span>
                </h2>
                <p className="text-ink-soft">
                  {valenciaLaunch.location.street} · {valenciaLaunch.location.area}
                  <br />
                  {valenciaLaunch.location.postalCode} {valenciaLaunch.city}, {valenciaLaunch.region}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start rounded-full bg-red px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[1.5px] text-white transition-transform hover:-translate-y-0.5"
                >
                  Cómo llegar →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SOCIAL ===== */}
      <section className="bg-[#FBF5EC] pb-20 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[30px] bg-ink p-8 text-white md:flex-row md:items-center md:p-12">
              <div className="flex flex-col gap-3">
                <span className="font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">Síguenos</span>
                <h2 className="font-heading text-4xl font-bold uppercase leading-none md:text-5xl">
                  Esto acaba de <span className="text-[#FFD27A]">empezar</span>
                </h2>
                <p className="max-w-md text-white/70">
                  Novedades, promos y todo lo que viene para La Firma Valencia, primero en nuestras redes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-2xl bg-red px-6 py-4 transition-transform hover:-translate-y-0.5"
                >
                  <span className="font-heading text-[0.65rem] uppercase tracking-[2px] text-white/70">Instagram</span>
                  <span className="font-heading text-lg uppercase">{siteConfig.social.instagramHandle}</span>
                </a>
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-2xl bg-white px-6 py-4 text-ink transition-transform hover:-translate-y-0.5"
                >
                  <span className="font-heading text-[0.65rem] uppercase tracking-[2px] text-ink-soft">TikTok</span>
                  <span className="font-heading text-lg uppercase">{siteConfig.social.tiktokHandle}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
