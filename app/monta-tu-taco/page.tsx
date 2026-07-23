import type { Metadata } from "next";
import IngredientChip from "@/components/IngredientChip";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { HalalBadge } from "@/components/SupplementIcons";
import { DrinkIcon, FlameIcon, FriesIcon } from "@/components/ValueIcons";
import { formatPrice, montaTuTaco } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Monta Tu Taco | ${siteConfig.brandFull}`,
  description: "Elige tamaño, carne, salsa, suplementos y gratinado. Tú lo eliges, tú lo haces único.",
};

// Misma foto para las 3 tallas (petición del cliente).
const SIZE_PHOTO = "/images/products/monta-tu-taco-plano.jpg";

export default function MontaTuTacoPage() {
  return (
    <>
      <section className="pt-16 pb-4 md:pt-20 text-center bg-[#faf7f2]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              A Tu Manera
            </span>
            <h1 className="font-heading font-bold uppercase text-4xl md:text-6xl text-ink mt-2 mb-4">
              <span className="text-red">★</span> Monta Tu Taco <span className="text-red">★</span>
            </h1>
            <span className="inline-block -rotate-[1.5deg] rounded bg-red px-6 py-2 font-heading text-sm font-semibold uppercase tracking-wide text-white shadow-card">
              ¡Tú lo eliges, tú lo haces único!
            </span>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#faf7f2]">
        <div className="mx-auto max-w-[1180px] px-6">
          {/* Tallas */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {montaTuTaco.sizes.map((size, i) => (
              <Reveal key={size.size} delay={i * 0.1}>
                <div className="text-center rounded-xl2 border border-line bg-white shadow-card p-8 transition-all hover:-translate-y-2 hover:shadow-cardHover">
                  <div
                    className="mx-auto mb-3 overflow-hidden rounded-full border-2 border-cream bg-[#f6f0e7] shadow-card transition-transform duration-500 hover:scale-105"
                    style={{ width: `${88 + i * 16}px`, height: `${88 + i * 16}px` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SIZE_PHOTO}
                      alt={`Monta Tu Taco talla ${size.size}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="block font-heading text-xs uppercase tracking-[2px] text-ink-soft">Tamaño</span>
                  <span className="block font-heading font-bold text-4xl text-ink">{size.size}</span>
                  <span className="mt-2.5 inline-block rounded-full bg-red px-5 py-1.5 font-heading font-bold text-lg text-white">
                    {formatPrice(size.price)}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Menú badge */}
          <Reveal delay={0.2}>
            <div className="mb-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 rounded-2xl bg-red-dark px-6 py-5 text-white shadow-cardHover animate-badgePulse">
              <span className="flex items-center justify-center gap-2 font-heading text-sm md:text-base uppercase tracking-wide text-center">
                <FriesIcon className="h-5 w-5 text-gold" />
                <DrinkIcon className="h-5 w-5 text-gold" />
                {montaTuTaco.menuSupplement.label}
              </span>
              <span className="font-heading font-bold text-2xl text-gold">
                +{formatPrice(montaTuTaco.menuSupplement.price)}
              </span>
            </div>
          </Reveal>

          {/* Paneles de ingredientes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <IngredientPanel title="Elige tu carne">
                {montaTuTaco.meats.map((m) => (
                  <IngredientChip key={m.name} icon={m.icon} image={m.image} name={m.name} tag={m.tag} />
                ))}
              </IngredientPanel>
            </Reveal>

            <Reveal delay={0.08}>
              <IngredientPanel title="Elige tus salsas">
                {montaTuTaco.sauces.map((s) => (
                  <IngredientChip key={s.name} icon={s.icon} image={s.image} name={s.name} spice={s.spice} />
                ))}
              </IngredientPanel>
            </Reveal>

            <Reveal delay={0.16}>
              <IngredientPanel title="Suplementos" priceTag={`+${formatPrice(montaTuTaco.supplements.price)}`}>
                {montaTuTaco.supplements.items.map((s) => (
                  <IngredientChip
                    key={s.name}
                    icon={s.icon}
                    image={s.image}
                    name={s.name}
                    extraBadge={s.halal ? <HalalBadge /> : undefined}
                  />
                ))}
              </IngredientPanel>
            </Reveal>

            <Reveal delay={0.24}>
              <IngredientPanel title="Gratinados">
                {montaTuTaco.gratins.map((g) => (
                  <IngredientChip
                    key={g.name}
                    icon={g.icon}
                    image={g.image}
                    name={g.name}
                    priceTag={`+${formatPrice(g.price)}`}
                  />
                ))}
              </IngredientPanel>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-3 rounded-full bg-red px-6 py-4 font-heading font-bold uppercase tracking-[2px] text-white text-base md:text-lg">
              <FlameIcon className="h-5 w-5 shrink-0" />
              100% Hecho al Momento
              <FlameIcon className="h-5 w-5 shrink-0" />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Monta tu taco", "10 salsas a elegir", "Hecho al momento", "La Firma"]} />
    </>
  );
}

function IngredientPanel({
  title,
  priceTag,
  children,
}: {
  title: string;
  priceTag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-white shadow-card p-7">
      <h3 className="flex items-center justify-center gap-2.5 text-center font-heading font-bold text-xl text-ink mb-6">
        <span className="text-red text-sm">→</span>
        {title}
        {priceTag && (
          <span className="rounded-full bg-red px-3 py-0.5 text-xs font-semibold text-white">{priceTag}</span>
        )}
        <span className="text-red text-sm">←</span>
      </h3>
      <div className="flex flex-wrap justify-center gap-4">{children}</div>
    </div>
  );
}
