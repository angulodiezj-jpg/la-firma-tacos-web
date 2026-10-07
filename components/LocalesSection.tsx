import Link from "next/link";
import { locales, mapsUrl } from "@/data/siteConfig";
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
    <section id="locales" className="bg-bgsoft py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              La Firma crece
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase text-ink md:text-5xl">
              {locales.length} locales, {locales.length} ciudades
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
              De Lyon a {locales.map((l) => l.ciudad).join(" y ")}. Ven a vernos o pide a domicilio en tu ciudad.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {locales.map((local, i) => (
            <Reveal key={local.id} delay={0.1 * i}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl3 border border-line bg-white shadow-card">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FOTOS[local.id].src}
                    alt={FOTOS[local.id].alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-ink shadow-card">
                    <span className="h-2 w-2 rounded-full bg-[#1fa855]" aria-hidden="true" />
                    Abierto
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-heading text-3xl font-bold uppercase text-ink">
                    {local.ciudad} <span className="text-red">· {local.zona}</span>
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{local.direccion}</p>
                  <div className="mt-6">
                    <OrderButtons city={local.id} size="sm" />
                  </div>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
                    <a
                      href={mapsUrl(local.direccion)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-ink hover:text-red"
                    >
                      <PinIcon className="h-4 w-4 shrink-0" />
                      Cómo llegar
                    </a>
                    <Link
                      href={local.href}
                      className="font-heading text-xs font-bold uppercase tracking-wide text-red underline underline-offset-2"
                    >
                      Ver local →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
