"use client";

import { useEffect, useRef, useState } from "react";
import CartelChip from "@/components/CartelChip";
import IngredientChip from "@/components/IngredientChip";
import Marquee from "@/components/Marquee";
import PageHeroRed from "@/components/PageHeroRed";
import Reveal from "@/components/Reveal";
import { HalalBadge } from "@/components/SupplementIcons";
import { CheckIcon, DrinkIcon, FriesIcon } from "@/components/ValueIcons";
import { montaTuTaco } from "@/data/products";
import { locales, type Local } from "@/data/siteConfig";

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
  const [city, setCity] = useState<Local["id"]>("madrid");
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
  const localActual = locales.find((l) => l.id === city) ?? locales[0];

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    const newLimit = SIZE_LIMITS[size] ?? 1;
    setSelectedMeats((prev) => prev.slice(0, newLimit));
    setSelectedSauces((prev) => prev.slice(0, newLimit));
  }

  function toggleMeat(name: string) {
    setSelectedMeats((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < limit ? [...prev, name] : prev,
    );
  }

  function toggleSauce(name: string) {
    setSelectedSauces((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < limit ? [...prev, name] : prev,
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
      <PageHeroRed
        eyebrow="Monta tu taco · M · L · XL"
        title={
          <>
            Tu taco, <span className="text-[#FFD27A]">tus reglas</span>
          </>
        }
        text="Tú eliges la talla, las carnes, las salsas y si va gratinado. Nosotros lo hacemos al momento."
        image={{
          src: "/images/hero/cut-monta-gratinado.webp",
          alt: "Monta tu taco gratinado",
          width: 657,
          height: 820,
          className: "h-[220px] w-auto rotate-[58deg] sm:h-[300px] lg:h-[400px]",
        }}
      >
        <ol className="mt-2 flex flex-wrap gap-2.5">
          {["Elige talla", "Elige carnes", "Elige salsas"].map((paso, i) => (
            <li
              key={paso}
              className="flex items-center gap-2 rounded-full bg-black/20 py-2 pl-2 pr-4 font-heading text-xs uppercase tracking-[1.5px] md:text-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD27A] text-xs font-bold text-ink">
                {i + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
      </PageHeroRed>

      <section className="bg-[#faf7f2] py-14 md:py-20">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-5 sm:px-6 md:gap-8">
          <div ref={sizesRef} className="scroll-mt-40">
            <StepCard n={1} title="Elige tu talla" hint="La talla marca cuántas carnes y salsas lleva." done>
              <div className="grid grid-cols-3 items-stretch gap-2.5 sm:gap-6">
                {montaTuTaco.sizes.map((size, i) => {
                  const active = selectedSize === size.size;
                  return (
                    <Reveal key={size.size} delay={i * 0.1} className="h-full">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSizeSelect(size.size)}
                        className={`group relative flex h-full w-full flex-col items-center rounded-xl2 border bg-white px-2 py-5 text-center [--s:0.6] sm:p-8 sm:[--s:1] shadow-card transition-all hover:-translate-y-2 hover:shadow-cardHover ${
                          active ? "border-2 border-red ring-2 ring-red/25" : "border-line"
                        }`}
                      >
                        {active && (
                          <span className="absolute right-2 top-2 flex h-6 w-6 sm:right-4 sm:top-4 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-red text-white shadow-card">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                        )}
                        {/* Hueco de alto fijo (el de la talla mayor) con el círculo
                            centrado dentro: la foto sigue creciendo de M a XL —que
                            es lo que cuenta la diferencia de tamaño— pero las tres
                            tarjetas empiezan y acaban a la misma altura. */}
                        <div className="mb-3 flex h-[76px] sm:h-[120px] w-full items-center justify-center">
                          <div
                            className={`overflow-hidden rounded-full border-2 bg-[#f6f0e7] shadow-card transition-all duration-500 group-hover:scale-105 ${
                              active ? "border-red" : "border-cream"
                            }`}
                            style={{
                              width: `calc(${88 + i * 16}px * var(--s))`,
                              height: `calc(${88 + i * 16}px * var(--s))`,
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={SIZE_PHOTOS[size.size]}
                              alt={`Monta Tu Taco talla ${size.size}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="block font-heading text-xs uppercase tracking-[2px] text-ink-soft">
                          Tamaño
                        </span>
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
            </StepCard>
          </div>

          <StepCard
            id="paso-carnes"
            n={2}
            title="Elige tus carnes"
            hint={`Talla ${selectedSize}: hasta ${limit} ${limit === 1 ? "carne" : "carnes"}.`}
            counter={{ value: selectedMeats.length, max: limit }}
            done={selectedMeats.length > 0}
          >
            <ChipGrid>
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
            </ChipGrid>
          </StepCard>

          <StepCard
            id="paso-salsas"
            n={3}
            title="Elige tus salsas"
            hint={`Talla ${selectedSize}: hasta ${limit} ${limit === 1 ? "salsa" : "salsas"}. Los chiles marcan el picante.`}
            counter={{ value: selectedSauces.length, max: limit }}
            done={selectedSauces.length > 0}
            cartel
          >
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2">
              {montaTuTaco.sauces.map((sauce) => (
                <div key={sauce.name} className="w-[31%] sm:w-[23%] lg:w-[15.6%]">
                  <CartelChip
                    shape="bowl"
                    image={sauce.image ?? ""}
                    name={sauce.name}
                    spice={sauce.spice}
                    selected={selectedSauces.includes(sauce.name)}
                    onToggle={() => toggleSauce(sauce.name)}
                    locked={selectedSauces.length >= limit}
                  />
                </div>
              ))}
            </div>
          </StepCard>

          <StepCard
            n={4}
            title="Suplementos"
            hint="Opcional. Añade todos los que quieras."
            done={selectedSupplements.length > 0}
            optional
          >
            <ChipGrid>
              {montaTuTaco.supplements.items.map((sup) => (
                <IngredientChip
                  key={sup.name}
                  icon={sup.icon}
                  image={sup.image}
                  name={sup.name}
                  extraBadge={sup.halal ? <HalalBadge /> : undefined}
                  selected={selectedSupplements.includes(sup.name)}
                  onToggle={() => toggleSupplement(sup.name)}
                />
              ))}
            </ChipGrid>
          </StepCard>

          <StepCard
            n={5}
            title="Gratinados"
            hint="Opcional. Queso fundido por encima, al horno."
            done={selectedGratins.length > 0}
            optional
            cartel
          >
            <div className="grid grid-cols-3 gap-x-1 gap-y-3 sm:gap-x-3 lg:grid-cols-6">
              {montaTuTaco.gratins.map((g) => (
                <CartelChip
                  key={g.name}
                  shape="gratin"
                  image={g.image ?? ""}
                  name={g.name}
                  selected={selectedGratins.includes(g.name)}
                  onToggle={() => toggleGratin(g.name)}
                />
              ))}
            </div>
          </StepCard>

          <StepCard
            n={6}
            title="¿Lo hacemos menú?"
            hint="Opcional. Patatas y bebida con tu taco."
            done={withMenu}
            optional
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: false, label: "Solo el taco", icon: null },
                { value: true, label: "Menú: patatas + bebida", icon: true },
              ].map((opt) => {
                const active = withMenu === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setWithMenu(opt.value)}
                    className={`flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border-2 px-4 py-4 font-heading text-sm uppercase tracking-wide transition-colors md:text-base ${
                      active ? "border-red bg-red text-white" : "border-line bg-white text-ink hover:border-red"
                    }`}
                  >
                    {opt.icon && (
                      <>
                        <FriesIcon className={`h-5 w-5 ${active ? "text-[#FFD27A]" : "text-gold-deep"}`} />
                        <DrinkIcon className={`h-5 w-5 ${active ? "text-[#FFD27A]" : "text-gold-deep"}`} />
                      </>
                    )}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </StepCard>

          {/* Final: el taco montado y dónde pedirlo, en ese orden. */}
          <div
            id="tu-taco"
            aria-live="polite"
            className="overflow-hidden rounded-[28px] bg-ink text-white shadow-[0_24px_50px_rgba(26,20,18,0.3)] md:rounded-[32px]"
          >
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col gap-5 p-6 md:p-9">
                <span className="font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">Tu taco</span>
                <h2 className="-mt-3 font-heading text-5xl font-bold uppercase leading-none md:text-6xl">
                  Talla {selectedSize}
                </h2>
                <dl className="flex flex-col gap-3">
                  <TicketRow label="Carnes" values={selectedMeats} empty="Falta elegir" required />
                  <TicketRow label="Salsas" values={selectedSauces} empty="Falta elegir" required />
                  <TicketRow label="Suplementos" values={selectedSupplements} empty="Ninguno" />
                  <TicketRow label="Gratinado" values={selectedGratins} empty="Sin gratinar" />
                  <TicketRow label="Menú" values={withMenu ? ["Patatas + bebida"] : []} empty="Solo el taco" />
                </dl>
              </div>

              <div className="flex flex-col gap-4 bg-[#C70C18] bg-[radial-gradient(ellipse_80%_80%_at_70%_30%,#E3151F_0%,rgba(199,12,24,0)_70%)] p-6 md:p-9">
                <span className="font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">¿Dónde lo pides?</span>
                <div className="grid grid-cols-2 gap-2 rounded-full bg-black/25 p-1.5">
                  {locales.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={city === l.id}
                      onClick={() => setCity(l.id)}
                      className={`rounded-full px-4 py-2.5 font-heading text-sm uppercase tracking-[1.5px] transition-colors ${
                        city === l.id ? "bg-white text-red-dark" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {l.ciudad}
                    </button>
                  ))}
                </div>

                {ready ? (
                  <>
                    <div className="flex flex-col gap-2.5">
                      {localActual.pedir.map((o) => (
                        <a
                          key={o.plataforma}
                          href={o.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={copySummary}
                          className={`flex items-center justify-center gap-2 rounded-full px-6 py-4 font-heading text-base font-bold uppercase tracking-[1.5px] shadow-[0_12px_26px_rgba(60,0,0,0.3)] transition-transform hover:-translate-y-0.5 ${
                            o.plataforma === "Glovo" ? "bg-white text-red-dark" : "bg-ink text-white"
                          }`}
                        >
                          Pedir en {o.plataforma} →
                        </a>
                      ))}
                    </div>
                    <p className="text-sm text-white/85">
                      {copied
                        ? "Copiado. Pégalo en la nota del pedido."
                        : "Al pulsar copiamos tu taco para que lo pegues en la nota del pedido."}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 rounded-2xl bg-black/20 p-5">
                    <p className="font-heading text-lg uppercase leading-tight">
                      Te falta elegir {missing.join(" y ")}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(selectedMeats.length === 0 ? "paso-carnes" : "paso-salsas")
                          ?.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                      className="self-start rounded-full bg-white px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-red-dark"
                    >
                      Seguir montando ↑
                    </button>
                  </div>
                )}

                <p className="mt-auto border-t border-white/20 pt-4 text-sm text-white/80">
                  ¿Prefieres pedirlo en barra? Te esperamos en {localActual.ciudad} · {localActual.zona}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Monta tu taco",
          `${montaTuTaco.sauces.length} salsas a elegir`,
          "Hecho al momento",
          "Tu taco, tus reglas",
        ]}
      />
    </>
  );
}

function StepCard({
  id,
  n,
  title,
  hint,
  counter,
  done,
  optional,
  cartel,
  children,
}: {
  id?: string;
  n: number;
  title: string;
  hint: string;
  counter?: { value: number; max: number };
  done?: boolean;
  optional?: boolean;
  /** Panel amarillo con letrero, como el cartel del local (salsas y gratinados). */
  cartel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 rounded-[26px] p-5 shadow-card sm:p-7 md:rounded-[30px] md:p-8 ${
        cartel
          ? "bg-[#F8D93A] bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,250,200,0.75)_0%,rgba(255,250,200,0)_45%),radial-gradient(ellipse_at_85%_90%,rgba(224,160,0,0.35)_0%,rgba(224,160,0,0)_55%)] shadow-[0_18px_40px_rgba(150,90,0,0.22)] ring-1 ring-[#E4B814]"
          : "border border-line bg-white"
      }`}
    >
      <header className="mb-6 flex items-center gap-4 md:mb-8">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold transition-colors md:h-12 md:w-12 ${
            done ? "bg-[#2FCB6B] text-white" : "bg-red text-[#FFD27A]"
          }`}
          aria-hidden="true"
        >
          {done ? <CheckIcon className="h-5 w-5" /> : n}
        </span>
        <div className="min-w-0 flex-1">
          {cartel ? (
            <h3 className="cartel-title -rotate-1 font-heading text-[1.6rem] sm:text-[1.9rem] font-bold uppercase leading-none tracking-[0.5px] md:text-[2.6rem]">
              {title}
            </h3>
          ) : (
            <h3 className="font-heading text-2xl font-bold uppercase leading-none text-ink md:text-3xl">{title}</h3>
          )}
          <p className={`text-sm ${cartel ? "mt-3 font-semibold text-[#5A3A06]" : "mt-1.5 text-ink-soft"}`}>{hint}</p>
        </div>
        {counter ? (
          <span className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="font-heading text-sm font-bold text-ink">
              {counter.value}/{counter.max}
            </span>
            <span className="flex gap-1" aria-hidden="true">
              {Array.from({ length: counter.max }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-4 rounded-full ${i < counter.value ? "bg-red" : cartel ? "bg-[#3B1607]/20" : "bg-line"}`}
                />
              ))}
            </span>
          </span>
        ) : optional ? (
          <span className="hidden shrink-0 rounded-full bg-white/80 px-3 py-1.5 font-heading text-[0.65rem] uppercase tracking-[1.5px] text-gold-deep sm:inline">
            Opcional
          </span>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** Rejilla centrada de ancho fijo por chip: las filas incompletas quedan centradas y simétricas. */
function ChipGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 sm:gap-x-4">{children}</div>;
}

function TicketRow({
  label,
  values,
  empty,
  required,
}: {
  label: string;
  values: string[];
  empty: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-white/10 pb-3">
      <dt className="w-28 shrink-0 font-heading text-xs uppercase tracking-[1.5px] text-white/55">{label}</dt>
      <dd className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {values.length ? (
          values.map((v) => (
            <span key={v} className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-semibold">
              {v}
            </span>
          ))
        ) : (
          <span className={`text-sm ${required ? "font-semibold text-[#FFD27A]" : "text-white/55"}`}>{empty}</span>
        )}
      </dd>
    </div>
  );
}
