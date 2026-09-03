"use client";

import { useState } from "react";
import { drinkGroups, drinkPrice, type Drink } from "@/data/drinks";
import { formatPrice } from "@/data/products";
import { CheckIcon, PlusIcon } from "./ValueIcons";

function DrinkCard({
  drink,
  price,
  selected,
  onToggle,
}: {
  drink: Drink;
  price: number;
  selected: boolean;
  onToggle: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group relative flex w-full flex-col overflow-hidden rounded-xl2 border bg-white text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover ${
        selected
          ? "border-2 border-red ring-2 ring-red/25 animate-bebidaPop"
          : "border-line neon-ring-hover"
      }`}
    >
      {drink.ribbon && (
        <span className="absolute -left-11 top-4 z-10 w-40 -rotate-45 bg-red py-1 text-center font-heading text-[0.62rem] font-bold uppercase tracking-wide text-white shadow-md">
          {drink.ribbon}
        </span>
      )}

      {/* Marca de selección, mismo lenguaje que los ingredientes de Monta Tu Taco */}
      <span
        className={`absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-white shadow-card transition-all ${
          selected
            ? "scale-100 bg-red opacity-100"
            : "scale-90 bg-gold opacity-0 group-hover:scale-100 group-hover:opacity-100"
        }`}
      >
        {selected ? <CheckIcon className="h-3.5 w-3.5" /> : <PlusIcon className="h-3.5 w-3.5" />}
      </span>

      {/* Foto: proporción fija 3:4 para que ninguna botella salga recortada
          ni descuadrada respecto a las de al lado. */}
      <div className="relative w-full overflow-hidden bg-[#2E0A0C]" style={{ aspectRatio: "3 / 4" }}>
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={drink.image}
            alt={drink.name}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-500 ${
              selected ? "scale-105" : "group-hover:scale-105"
            }`}
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-2 font-heading text-sm font-bold uppercase text-white">
            {drink.name}
          </span>
        )}
        <span
          className={`pointer-events-none absolute inset-0 bg-red/25 transition-opacity duration-300 ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-3.5">
        <span
          className={`font-heading text-[0.78rem] font-semibold uppercase leading-tight tracking-wide transition-colors ${
            selected ? "text-red" : "text-ink"
          }`}
        >
          {drink.name}
        </span>
        <span className="font-heading text-sm font-bold text-gold-deep">
          {price > 0 ? formatPrice(price) : "Consultar"}
        </span>
      </div>
    </button>
  );
}

export default function DrinksGrid() {
  const [elegidas, setElegidas] = useState<string[]>([]);

  const alternar = (id: string) =>
    setElegidas((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]));

  return (
    <>
      {drinkGroups.map((block, blockIndex) => {
        // El precio solo se enseña junto al título cuando toda la familia
        // cuesta lo mismo; si hay excepciones, cada ficha lleva el suyo.
        const precioUnico = block.items.every((d) => drinkPrice(block, d) === block.price);

        return (
          <div key={block.group} className={blockIndex > 0 ? "mt-10" : ""}>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-heading text-lg font-bold uppercase text-gold-deep">{block.group}</h3>
              {precioUnico && block.price > 0 && (
                <span className="font-heading text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {formatPrice(block.price)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-5">
              {block.items.map((drink) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                  price={drinkPrice(block, drink)}
                  selected={elegidas.includes(drink.id)}
                  onToggle={() => alternar(drink.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {elegidas.length > 0 && (
        <p className="mt-8 animate-fadeUp text-center font-heading text-sm font-semibold uppercase tracking-wide text-red">
          {elegidas.length} {elegidas.length === 1 ? "bebida elegida" : "bebidas elegidas"}
        </p>
      )}
    </>
  );
}
