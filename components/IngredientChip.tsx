"use client";

import { useState } from "react";
import { ChiliIcon } from "./ValueIcons";

type IngredientChipProps = {
  icon: string;
  name: string;
  image?: string;
  customIcon?: React.ReactNode;
  extraBadge?: React.ReactNode;
  priceTag?: string;
  tag?: string;
  spice?: 0 | 1 | 2 | 3;
};

export default function IngredientChip({
  icon,
  name,
  image,
  customIcon,
  extraBadge,
  priceTag,
  tag,
  spice,
}: IngredientChipProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="group w-[calc(33.333%-10.667px)] text-center transition-transform hover:-translate-y-1.5 hover:scale-105 sm:w-[calc(25%-12px)]">
      <div className="relative mx-auto mb-2 h-14 w-14 overflow-hidden rounded-full border border-line bg-[#f6f0e7] transition-colors group-hover:border-red">
        {image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : customIcon ? (
          <span className="flex h-full w-full items-center justify-center">{customIcon}</span>
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl">{icon}</span>
        )}
      </div>
      <span className="flex items-center justify-center gap-1 font-heading text-[0.68rem] font-semibold uppercase tracking-wide text-ink leading-tight">
        {name}
        {extraBadge}
      </span>
      {!!spice && (
        <span
          className="mt-1 flex items-center justify-center gap-0.5 text-red"
          title={`Picante: ${spice}/3`}
          aria-label={`Picante nivel ${spice} de 3`}
        >
          {Array.from({ length: spice }).map((_, i) => (
            <ChiliIcon key={i} className="h-3 w-3" />
          ))}
        </span>
      )}
      {priceTag && (
        <span className="mt-1 inline-block rounded bg-red-dark px-1.5 py-0.5 text-[0.55rem] font-heading uppercase text-white">
          {priceTag}
        </span>
      )}
      {tag === "proximamente" && (
        <span className="mt-1 inline-block rounded bg-red-dark px-1.5 py-0.5 text-[0.55rem] font-heading uppercase text-white">
          Próximamente
        </span>
      )}
    </div>
  );
}
