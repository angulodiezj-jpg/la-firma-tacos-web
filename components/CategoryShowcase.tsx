import Link from "next/link";
import FeatureCard from "./FeatureCard";
import Reveal from "./Reveal";

/**
 * Grid de categorías destacadas en home. En la referencia había:
 * BOX FRERO' (card grande) + Cro'usty / À Composer / O'Boss (3 medianas).
 * BOX FRERO' y O'Boss no tienen equivalente → eliminados. Quedan 3 cards
 * iguales (Crousty, Monta Tu Taco, Tacos La Firma) sin dejar huecos.
 */
export default function CategoryShowcase() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              Nuestra Carta
            </span>
            <h2 className="font-heading font-bold uppercase text-3xl md:text-4xl text-ink mt-2">
              Los Favoritos de La Firma
            </h2>
            <p className="text-ink-soft mt-3">
              Del taco original a la burger más gustosa. Todo hecho al momento, todo con nuestra firma.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-6">
          <Reveal delay={0}>
            <FeatureCard
              title="Tacos La Firma"
              subtitle="El taco francés original"
              href="/carta#tacos"
              ctaLabel="Ver productos"
              image="/images/products/f1-tacos-la-firma.jpg"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <FeatureCard
              title="Crousty La Firma"
              subtitle="Crujiente, dulce o picante"
              href="/carta#crousty"
              ctaLabel="¿Qué es?"
              image="/images/products/f41-crousty-spicy.jpg"
            />
          </Reveal>
          <Reveal delay={0.16}>
            <FeatureCard
              title="Monta Tu Taco"
              subtitle="+ de 500 combinaciones posibles"
              href="/monta-tu-taco"
              ctaLabel="Descúbrelo"
              image="/images/products/monta-tu-taco.jpg"
            />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/carta"
            className="group relative block overflow-hidden rounded-xl3 bg-ink px-8 py-14 text-center shadow-card transition-all hover:scale-[1.01]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: "url(/images/brand/firma-pattern.jpg)",
                backgroundSize: "300px",
                backgroundRepeat: "repeat",
              }}
            />
            <h3 className="relative font-heading font-bold uppercase text-white text-2xl md:text-4xl mb-4">
              Ver la Carta Completa
            </h3>
            <span className="btn-shine inline-block rounded-full bg-gradient-to-r from-gold to-orange text-white font-heading text-sm font-semibold uppercase tracking-wide px-8 py-3.5 transition-transform group-hover:-translate-y-0.5">
              Descubre Todos los Productos
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
