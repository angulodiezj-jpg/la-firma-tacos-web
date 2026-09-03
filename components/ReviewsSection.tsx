import { siteConfig } from "@/data/siteConfig";
import { ButtonLink } from "./Button";
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
    acento: "from-ink to-black",
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
            <StarSolidIcon className="absolute inset-0 h-7 w-7 text-gold/20" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${relleno * 100}%` }}>
              <StarSolidIcon className="h-7 w-7 text-gold" />
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
    <section id="opiniones" className="scroll-mt-[140px] bg-bgsoft py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              Lo que dicen de nosotros
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase text-ink md:text-5xl">
              Opiniones reales
            </h2>
            <p className="mt-4 text-ink-soft">
              No nos inventamos ninguna reseña: aquí está nuestra nota y el enlace directo para que leas todas las
              opiniones —buenas y malas— donde las dejan nuestros clientes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-xl3 bg-white p-8 shadow-card md:p-12">
            <div className="ambient-glow -right-16 -top-20 h-64 w-64" aria-hidden="true" />

            <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-left">
                <div className="flex flex-col items-center gap-3 sm:flex-row md:items-center">
                  <span className="font-heading text-6xl font-bold leading-none text-ink md:text-7xl">
                    {rating.value.toLocaleString("es-ES", { minimumFractionDigits: 1 })}
                  </span>
                  <div className="flex flex-col items-center gap-1 sm:items-start">
                    <Estrellas nota={rating.value} />
                    <span className="font-heading text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {rating.count} reseñas en {rating.source}
                    </span>
                  </div>
                </div>
              </div>

              <ButtonLink href={rating.url} variant="primary" size="lg" arrow>
                Leer y dejar tu reseña
              </ButtonLink>
            </div>

            <div className="relative mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
              {PLATAFORMAS.map((p) => (
                <a
                  key={p.nombre}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-ring-hover group flex items-center gap-3 rounded-xl2 border border-line bg-white p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${p.acento} text-white shadow-card`}
                  >
                    <StarIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-sm font-bold uppercase tracking-wide text-ink">
                      {p.nombre}
                    </span>
                    <span className="block text-xs text-ink-soft">{p.detalle}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-red transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
