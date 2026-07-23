import { siteConfig } from "@/data/siteConfig";
import OrderButtons from "./OrderButtons";
import Reveal from "./Reveal";
import { StarIcon } from "./ValueIcons";

/**
 * Único bloque promocional full-width (en la referencia había 2: Boss Club +
 * Click & Collect; aquí no aplica ninguno de los dos tal cual, así que se
 * sustituye por un bloque real: ubicación + redes + pedido a domicilio).
 */
export default function PromoSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-red to-red-dark px-8 py-16 md:px-16 md:py-20 text-center text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-luminosity"
              style={{
                backgroundImage: "url(/images/brand/firma-pattern.jpg)",
                backgroundSize: "340px",
                backgroundRepeat: "repeat",
              }}
            />
            <div className="ambient-glow h-80 w-80 -top-20 -left-10 mix-blend-screen" aria-hidden="true" />
            <div
              className="ambient-glow h-72 w-72 -bottom-24 -right-10 mix-blend-screen"
              style={{ animationDelay: "3s" }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="font-heading text-xs md:text-sm font-semibold uppercase tracking-[3px] text-cream">
                {siteConfig.rating.value}★ en {siteConfig.rating.source} · {siteConfig.rating.count} reseñas
              </span>
              <h2 className="font-heading font-bold uppercase text-3xl md:text-5xl leading-tight mt-3 mb-4">
                Visítanos en
                <br />
                Castellana
              </h2>
              <p className="max-w-lg mx-auto text-white/85 mb-8">
                {siteConfig.location.address} · {siteConfig.location.hours}
                <br />
                {siteConfig.location.amenities.join(" · ")}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <OrderButtons />
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-red"
                >
                  Síguenos {siteConfig.social.instagramHandle}
                </a>
              </div>

              <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3">
                <StarIcon className="h-4 w-4 text-gold shrink-0" />
                <span className="font-heading text-xs md:text-sm font-semibold uppercase tracking-[2px] text-gold">
                  {siteConfig.expansion.status}
                </span>
                <span className="text-sm text-white/90">{siteConfig.expansion.message}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
