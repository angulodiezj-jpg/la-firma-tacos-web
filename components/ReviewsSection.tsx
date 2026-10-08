import { siteConfig } from "@/data/siteConfig";
import Reveal from "./Reveal";
import { StarIcon, StarSolidIcon } from "./ValueIcons";

/**
 * Prueba social.
 *
 * A propósito NO hay tarjetas de testimonio escritas aquí: publicar opiniones
 * que no ha dejado un cliente real sería inventar reseñas. Lo que se muestra es
 * la nota agregada (la misma que consta en el perfil de Google y en los datos
 * estructurados) y se envía a la gente a leer las opiniones auténticas en la
 * ficha del local y en las plataformas de reparto, donde también puede dejar
 * la suya.
 */

const PLATAFORMAS = [
  {
    nombre: "Google",
    detalle: "Ficha del local en Castellana",
    href: siteConfig.rating.url,
    acento: "from-red to-red-dark",
  },
  {
    nombre: "Uber Eats",
    detalle: "Opiniones de pedidos a domicilio",
    href: siteConfig.order.uberEats,
    acento: "from-[#2b2522] to-black ring-1 ring-white/15",
  },
  {
    nombre: "Glovo",
    detalle: "Opiniones de pedidos a domicilio",
    href: siteConfig.order.glovo,
    acento: "from-orange to-red",
  },
];

/** Estrellas parcialmente rellenas según la nota (4,8 → 4 llenas + 80 % de la quinta). */
function Estrellas({ nota }: { nota: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const relleno = Math.max(0, Math.min(1, nota - i));
        return (
          <span key={i} className="relative inline-block h-7 w-7">
            <StarSolidIcon className="absolute inset-0 h-7 w-7 text-white/20" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${relleno * 100}%` }}>
              <StarSolidIcon className="h-7 w-7 text-[#FFD27A]" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  const { rating } = siteConfig;

  return (
    <section id="opiniones" className="relative scroll-mt-[140px] overflow-hidden bg-ink py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-red/30 blur-[120px]"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-0 hidden select-none font-heading text-[16rem] font-bold leading-[0.8] text-white/[0.04] lg:block"
      >
        RESEÑAS
      </span>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/30 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
                Opiniones reales
              </span>
              <h2 className="font-heading text-[2.7rem] font-bold uppercase leading-[0.92] md:text-6xl lg:text-7xl">
                Que lo cuenten <span className="text-[#FFD27A]">ellos</span>
              </h2>
            </div>
            <p className="max-w-md text-white/75 md:text-lg">
              No nos inventamos ninguna reseña. Léelas todas, buenas y malas, donde las dejan nuestros clientes, y deja
              la tuya.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={rating.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-[#C70C18] bg-[radial-gradient(ellipse_70%_90%_at_80%_20%,#E3151F_0%,rgba(199,12,24,0)_70%)] p-7 transition-transform duration-300 hover:-translate-y-1 md:flex-row md:items-center md:p-10"
          >
            <div className="flex flex-col gap-3">
              <Estrellas nota={rating.value} />
              <span className="font-heading text-3xl font-bold uppercase leading-none md:text-4xl">
                {rating.count} reseñas en {rating.source}
              </span>
              <span className="text-white/80">Ficha de La Firma Castellana en Google Maps</span>
            </div>
            <span className="rounded-full bg-white px-7 py-4 font-heading text-sm font-bold uppercase tracking-[1.5px] text-red-dark transition-transform group-hover:translate-x-1 md:text-base">
              Leer y dejar tu reseña →
            </span>
          </a>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {PLATAFORMAS.map((p, i) => (
            <Reveal key={p.nombre} delay={0.15 + i * 0.06}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.05] p-5 transition-colors hover:border-white/30 hover:bg-white/[0.09]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.acento} text-white`}
                >
                  <StarIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-lg font-bold uppercase leading-none">{p.nombre}</span>
                  <span className="mt-1 block text-sm text-white/60">{p.detalle}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-[#FFD27A] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
