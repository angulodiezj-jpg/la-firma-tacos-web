"use client";

import { useState } from "react";
import { drinkBrands } from "@/data/drinks";

function DrinkLogo({ name, logo, ribbon }: { name: string; logo: string; ribbon?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl2 border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-cardHover">
      {ribbon && (
        <span className="absolute -left-11 top-4 w-40 -rotate-45 bg-red py-1 text-center font-heading text-[0.62rem] font-bold uppercase tracking-wide text-white shadow-md">
          {ribbon}
        </span>
      )}
      <div className="flex h-16 w-full items-center justify-center">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="max-h-16 max-w-full object-contain"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="font-heading text-sm font-bold uppercase text-ink">{name}</span>
        )}
      </div>
      <span className="font-heading text-xs font-semibold uppercase tracking-wide text-ink-soft text-center">
        {name}
      </span>
    </div>
  );
}

export default function DrinksGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
      {drinkBrands.map((brand) => (
        <DrinkLogo key={brand.name} name={brand.name} logo={brand.logo} ribbon={brand.ribbon} />
      ))}
    </div>
  );
}
