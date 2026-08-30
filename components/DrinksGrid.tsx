"use client";

import { useState } from "react";
import { drinkBrands } from "@/data/drinks";
import { CheckIcon, PlusIcon } from "./ValueIcons";

function DrinkLogo({
  name,
  logo,
  ribbon,
  selected,
  onToggle,
}: {
  name: string;
  logo: string;
  ribbon?: string;
  selected: boolean;
  onToggle: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl2 border bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover ${
        selected
          ? "border-2 border-red ring-2 ring-red/25 animate-bebidaPop"
          : "border-line neon-ring-hover"
      }`}
    >
      {ribbon && (
        <span className="absolute -left-11 top-4 w-40 -rotate-45 bg-red py-1 text-center font-heading text-[0.62rem] font-bold uppercase tracking-wide text-white shadow-md">
          {ribbon}
        </span>
      )}

      {/* Marca de selección, mismo lenguaje que los ingredientes de Monta Tu Taco */}
      <span
        className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-white shadow-card transition-all ${
          selected
            ? "scale-100 bg-red opacity-100"
            : "scale-90 bg-gold opacity-0 group-hover:scale-100 group-hover:opacity-100"
        }`}
      >
        {selected ? <CheckIcon className="h-3.5 w-3.5" /> : <PlusIcon className="h-3.5 w-3.5" />}
      </span>

      <div className="flex h-16 w-full items-center justify-center">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className={`max-h-16 max-w-full object-contain transition-transform duration-300 ${
              selected ? "scale-110" : "group-hover:scale-105"
            }`}
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="font-heading text-sm font-bold uppercase text-ink">{name}</span>
        )}
      </div>

      <span
        className={`font-heading text-xs font-semibold uppercase tracking-wide transition-colors ${
          selected ? "text-red" : "text-ink-soft"
        }`}
      >
        {name}
      </span>
    </button>
  );
}

export default function DrinksGrid() {
  const [elegidas, setElegidas] = useState<string[]>([]);

  const alternar = (nombre: string) =>
    setElegidas((prev) => (prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
        {drinkBrands.map((brand) => (
          <DrinkLogo
            key={brand.name}
            name={brand.name}
            logo={brand.logo}
            ribbon={brand.ribbon}
            selected={elegidas.includes(brand.name)}
            onToggle={() => alternar(brand.name)}
          />
        ))}
      </div>

      {elegidas.length > 0 && (
        <p className="mt-5 animate-fadeUp text-center font-heading text-sm font-semibold uppercase tracking-wide text-red">
          {elegidas.length} {elegidas.length === 1 ? "bebida elegida" : "bebidas elegidas"}
        </p>
      )}
    </>
  );
}
