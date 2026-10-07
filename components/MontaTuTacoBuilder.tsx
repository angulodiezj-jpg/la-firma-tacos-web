"use client";

import { useEffect, useRef, useState } from "react";
import IngredientChip from "@/components/IngredientChip";
import Marquee from "@/components/Marquee";
import OrderButtons from "@/components/OrderButtons";
import Reveal from "@/components/Reveal";
import { HalalBadge } from "@/components/SupplementIcons";
import { CheckIcon, DrinkIcon, FlameIcon, FriesIcon, PlusIcon } from "@/components/ValueIcons";
import { montaTuTaco } from "@/data/products";

// La misma foto en las tres tallas; el círculo crece de M a XL.
const SIZE_PHOTOS: Record<string, string> = {
  M: "/images/products/monta-tu-taco-talla.jpg",
  L: "/images/products/monta-tu-taco-talla.jpg",
  XL: "/images/products/monta-tu-taco-talla.jpg",
};

// Reglas de la casa: cada tamaño fija cuántas carnes y salsas se pueden elegir.
const SIZE_LIMITS: Record<string, number> = { M: 1, L: 2, XL: 3 };

export default function MontaTuTacoBuilder() {
  const [selectedSize, setSelectedSize] = useState(montaTuTaco.sizes[0].size);
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [selectedGratins, setSelectedGratins] = useState<string[]>([]);
  const [withMenu, setWithMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const sizesRef = useRef<HTMLDivElement>(null);

  // ?talla=M|L|XL — al llegar desde una tarjeta de talla de la carta, se
  // preselecciona esa talla y se hace scroll hasta sus reglas. Se lee tras
  // hidratar (y no con useSearchParams) para que Next prerenderice el
  // configurador completo en el HTML y Google pueda leerlo.
  useEffect(() => {
    const requested = (new URLSearchParams(window.location.search).get("talla") ?? "").toUpperCase();
    if (!SIZE_LIMITS[requested]) return;
    setSelectedSize(requested);
    sizesRef.current?.scrollIntoView({ block: "center" });
  }, []);

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

  const toggleIn = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (name: string) =>
    setter((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  const toggleSupplement = toggleIn(setSelectedSupplements);
  const toggleGratin = toggleIn(setSelectedGratins);

  const missing: string[] = [];
  if (selectedMeats.length === 0) missing.push("una carne");
  if (selectedSauces.length === 0) missing.push("una salsa");
  const ready = missing.length === 0;

  const summaryLines = [
    `Tacos talla ${selectedSize}`,
    selectedMeats.length ? `Carne: ${selectedMeats.join(", ")}` : "",
    selectedSauces.length ? `Salsa: ${selectedSauces.join(", ")}` : "",
    selectedSupplements.length ? `Suplementos: ${selectedSupplements.join(", ")}` : "",
    selectedGratins.length ? `Gratinado: ${selectedGratins.join(", ")}` : "",
    withMenu ? "Menú: patatas + bebida" : "",
  ].filter(Boolean);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryLines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
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
          <div ref={sizesRef} className="grid items-stretch gap-6 mb-10 scroll-mt-40 sm:grid-cols-3">
            {montaTuTaco.sizes.map((size, i) => {
              const active = selectedSize === size.size;
              return (
                <Reveal key={size.size} delay={i * 0.1} className="h-full">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleSizeSelect(size.size)}
                    className={`group relative flex h-full w-full flex-col items-center rounded-xl2 border bg-white p-8 text-center shadow-card transition-all hover:-translate-y-2 hover:shadow-cardHover ${
                      active ? "border-2 border-red ring-2 ring-red/25" : "border-line"
                    }`}
                  >
                    {active && (
                      <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-red text-white shadow-card">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                    {/* Hueco de alto fijo (el de la talla mayor) con el círculo
                        centrado dentro: la foto sigue creciendo de M a XL —que
                        es lo que cuenta la diferencia de tamaño— pero las tres
                        tarjetas empiezan y acaban a la misma altura. */}
                    <div className="mb-3 flex h-[120px] w-full items-center justify-center">
                      <div
                        className={`overflow-hidden rounded-full border-2 bg-[#f6f0e7] shadow-card transition-all duration-500 group-hover:scale-105 ${
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
                    </div>
                    <span className="block font-heading text-xs uppercase tracking-[2px] text-ink-soft">Tamaño</span>
                    <span className="block font-heading font-bold text-4xl text-ink">{size.size}</span>
                    <span className="mt-2 block font-heading text-[0.65rem] uppercase tracking-wide text-ink-soft">
                      {SIZE_LIMITS[size.size]} {SIZE_LIMITS[size.size] === 1 ? "carne" : "carnes"} ·{" "}
                      {SIZE_LIMITS[size.size]} {SIZE_LIMITS[size.size] === 1 ? "salsa" : "salsas"}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Hazlo Menú: ahora es una decisión dentro del flujo, no solo un cartel */}
          <Reveal delay={0.2}>
            <button
              type="button"
              aria-pressed={withMenu}
              onClick={() => setWithMenu((v) => !v)}
              className={`mb-14 flex w-full flex-col items-center justify-center gap-3 rounded-2xl px-6 py-5 text-white shadow-cardHover transition-colors sm:flex-row sm:gap-5 ${
                withMenu ? "bg-red" : "bg-red-dark animate-badgePulse"
              }`}
            >
              <span className="flex items-center justify-center gap-2 font-heading text-sm md:text-base uppercase tracking-wide text-center">
                <FriesIcon className="h-5 w-5 text-gold" />
                <DrinkIcon className="h-5 w-5 text-gold" />
                {montaTuTaco.menuSupplement.label}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80 ${
                  withMenu ? "bg-white text-red" : "text-white"
                }`}
              >
                {withMenu ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
              </span>
            </button>
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
              <IngredientPanel title="Suplementos" counter="Opcional">
                {montaTuTaco.supplements.items.map((s) => (
                  <IngredientChip
                    key={s.name}
                    icon={s.icon}
                    image={s.image}
                    name={s.name}
                    extraBadge={s.halal ? <HalalBadge /> : undefined}
                    selected={selectedSupplements.includes(s.name)}
                    onToggle={() => toggleSupplement(s.name)}
                  />
                ))}
              </IngredientPanel>
            </Reveal>

            <Reveal delay={0.24}>
              <IngredientPanel title="Gratinados" counter="Opcional">
                {montaTuTaco.gratins.map((g) => (
                  <IngredientChip
                    key={g.name}
                    icon={g.icon}
                    image={g.image}
                    name={g.name}
                    selected={selectedGratins.includes(g.name)}
                    onToggle={() => toggleGratin(g.name)}
                  />
                ))}
              </IngredientPanel>
            </Reveal>
          </div>

          {/* Resumen: el configurador termina en un pedido, no en el vacío */}
          <div
            id="tu-taco"
            className="mt-12 rounded-xl3 border-2 border-red bg-white p-7 shadow-cardHover md:p-9"
            aria-live="polite"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex-1 min-w-0">
                <span className="font-heading text-xs font-semibold uppercase tracking-[3px] text-red">Tu taco</span>
                <h2 className="mt-1 font-heading text-3xl font-bold uppercase text-ink">Talla {selectedSize}</h2>
                <dl className="mt-5 grid gap-3 text-sm">
                  <SummaryRow label="Carne" values={selectedMeats} empty="Elige al menos una" />
                  <SummaryRow label="Salsa" values={selectedSauces} empty="Elige al menos una" />
                  <SummaryRow label="Suplementos" values={selectedSupplements} empty="Sin suplementos" />
                  <SummaryRow label="Gratinado" values={selectedGratins} empty="Sin gratinado extra" />
                  <SummaryRow label="Menú" values={withMenu ? ["Patatas + bebida"] : []} empty="Solo el taco" />
                </dl>
              </div>
              <div className="flex flex-col gap-4 md:w-[340px]">
                <p className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
                  {ready ? "¡Listo! Pídelo así:" : `Te falta elegir ${missing.join(" y ")}`}
                </p>
                <OrderButtons className="flex-col [&>a]:w-full" />
                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!ready}
                  className="rounded-full border-2 border-line px-5 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:border-red hover:text-red disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? "Copiado ✓" : "Copiar mi taco para el pedido"}
                </button>
                <p className="text-xs text-ink-soft">
                  O pídelo tal cual en barra: Paseo de la Castellana, 122.
                </p>
              </div>
            </div>
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
  counter,
  children,
}: {
  title: string;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-white shadow-card p-7">
      <h3 className="flex items-center justify-center gap-2.5 text-center font-heading font-bold text-xl text-ink mb-1">
        <span className="text-red text-sm">→</span>
        {title}
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

function SummaryRow({ label, values, empty }: { label: string; values: string[]; empty: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3">
      <dt className="w-28 shrink-0 font-heading text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="min-w-0 flex-1 font-semibold text-ink">
        {values.length ? values.join(" · ") : <span className="font-normal text-ink-soft">{empty}</span>}
      </dd>
    </div>
  );
}
