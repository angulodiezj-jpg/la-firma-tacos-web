"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IngredientChip from "@/components/IngredientChip";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { HalalBadge } from "@/components/SupplementIcons";
import { CheckIcon, DrinkIcon, FlameIcon, FriesIcon } from "@/components/ValueIcons";
import { formatPrice, montaTuTaco } from "@/data/products";

// Una foto real por talla. XL comparte foto con la L todavía (pendiente
// que nos pasen la tercera foto real, distinta, para esa talla).
const SIZE_PHOTOS: Record<string, string> = {
  M: "/images/products/monta-tu-taco-m.jpg",
  L: "/images/products/monta-tu-taco-l.jpg",
  XL: "/images/products/monta-tu-taco-l.jpg",
};

// Reglas de la casa: cada tamaño fija cuántas carnes y salsas se pueden elegir.
const SIZE_LIMITS: Record<string, number> = { M: 1, L: 2, XL: 3 };

export default function MontaTuTacoBuilder() {
  const searchParams = useSearchParams();
  // ?talla=M|L|XL — al llegar desde una tarjeta de talla de la carta, se
  // preselecciona esa talla y se hace scroll hasta sus reglas.
  const requestedSize = (searchParams.get("talla") ?? "").toUpperCase();
  const initialSize = SIZE_LIMITS[requestedSize] ? requestedSize : montaTuTaco.sizes[0].size;

  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const sizesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SIZE_LIMITS[requestedSize]) return;
    sizesRef.current?.scrollIntoView({ block: "center" });
  }, [requestedSize]);

  const limit = SIZE_LIMITS[selectedSize] ?? 1;

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    const newLimit = SIZE_LIMITS[size] ?? 1;
    setSelectedMeats((prev) => prev.slice(0, newLimit));
    setSelectedSauces((prev) => prev.slice(0, newLimit));
  }

  function toggleMeat(name: string) {
    setSelectedMeats((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < limit ? [...prev, name] : prev
    );
  }

  function toggleSauce(name: string) {
    setSelectedSauces((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < limit ? [...prev, name] : prev
    );
  }

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
          <div ref={sizesRef} className="grid sm:grid-cols-3 gap-6 mb-10 scroll-mt-40">
            {montaTuTaco.sizes.map((size, i) => {
              const active = selectedSize === size.size;
              return (
                <Reveal key={size.size} delay={i * 0.1}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleSizeSelect(size.size)}
                    className={`group relative w-full rounded-xl2 border bg-white p-8 text-center shadow-card transition-all hover:-translate-y-2 hover:shadow-cardHover ${
                      active ? "border-2 border-red ring-2 ring-red/25" : "border-line"
                    }`}
                  >
                    {active && (
                      <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-red text-white shadow-card">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                    <div
                      className={`mx-auto mb-3 overflow-hidden rounded-full border-2 bg-[#f6f0e7] shadow-card transition-all duration-500 group-hover:scale-105 ${
                        active ? "border-red" : "border-cream"
                      }`}
                      style={{ width: `${88 + i * 16}px`, height: `${88 + i * 16}px` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={SIZE_PHOTOS[size.size]}
                        alt={`Monta Tu Taco talla ${size.size}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="block font-heading text-xs uppercase tracking-[2px] text-ink-soft">Tamaño</span>
                    <span className="block font-heading font-bold text-4xl text-ink">{size.size}</span>
                    <span className="mt-2.5 inline-block rounded-full bg-red px-5 py-1.5 font-heading font-bold text-lg text-white">
                      {formatPrice(size.price)}
                    </span>
                    <span className="mt-2 block font-heading text-[0.65rem] uppercase tracking-wide text-ink-soft">
                      {SIZE_LIMITS[size.size]} {SIZE_LIMITS[size.size] === 1 ? "carne" : "carnes"} ·{" "}
                      {SIZE_LIMITS[size.size]} {SIZE_LIMITS[size.size] === 1 ? "salsa" : "salsas"}
                    </span>
                  </button>
                </Reveal>
              );
            })}
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
              <IngredientPanel
                title="Elige tu carne"
                counter={`${selectedMeats.length}/${limit} elegidas`}
              >
                {montaTuTaco.meats.map((m) => (
                  <IngredientChip
                    key={m.name}
                    icon={m.icon}
                    image={m.image}
                    name={m.name}
                    tag={m.tag}
                    selected={selectedMeats.includes(m.name)}
                    onToggle={() => toggleMeat(m.name)}
                    locked={selectedMeats.length >= limit}
                  />
                ))}
              </IngredientPanel>
            </Reveal>

            <Reveal delay={0.08}>
              <IngredientPanel
                title="Elige tus salsas"
                counter={`${selectedSauces.length}/${limit} elegidas`}
              >
                {montaTuTaco.sauces.map((s) => (
                  <IngredientChip
                    key={s.name}
                    icon={s.icon}
                    image={s.image}
                    name={s.name}
                    spice={s.spice}
                    selected={selectedSauces.includes(s.name)}
                    onToggle={() => toggleSauce(s.name)}
                    locked={selectedSauces.length >= limit}
                  />
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
  counter,
  children,
}: {
  title: string;
  priceTag?: string;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-white shadow-card p-7">
      <h3 className="flex items-center justify-center gap-2.5 text-center font-heading font-bold text-xl text-ink mb-1">
        <span className="text-red text-sm">→</span>
        {title}
        {priceTag && (
          <span className="rounded-full bg-red px-3 py-0.5 text-xs font-semibold text-white">{priceTag}</span>
        )}
        <span className="text-red text-sm">←</span>
      </h3>
      {counter && (
        <p className="mb-5 text-center font-heading text-xs font-semibold uppercase tracking-wide text-gold-deep">
          {counter}
        </p>
      )}
      <div className={`flex flex-wrap justify-center gap-4 ${counter ? "" : "mt-6"}`}>{children}</div>
    </div>
  );
}
