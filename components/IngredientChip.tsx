"use client";

import { useState } from "react";
import { CheckIcon, ChiliIcon, PlusIcon } from "./ValueIcons";

type IngredientChipProps = {
  icon: string;
  name: string;
  image?: string;
  customIcon?: React.ReactNode;
  extraBadge?: React.ReactNode;
  priceTag?: string;
  tag?: string;
  spice?: 0 | 1 | 2 | 3;
  /** Modo controlado (p.ej. carnes/salsas con límite según tamaño). Si se omite, el chip gestiona su propia selección. */
  selected?: boolean;
  onToggle?: () => void;
  /** Bloqueado por haber alcanzado el límite de selección (no confundir con "próximamente"). */
  locked?: boolean;
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
  selected: controlledSelected,
  onToggle,
  locked,
}: IngredientChipProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [internalSelected, setInternalSelected] = useState(false);
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;
  const unavailable = tag === "proximamente";
  const lockedOut = !selected && !!locked && !unavailable;

  function handleClick() {
    if (unavailable || lockedOut) return;
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalSelected((v) => !v);
    }
  }

  return (
    <button
      type="button"
      disabled={unavailable || lockedOut}
      aria-pressed={selected}
      onClick={handleClick}
      className="group w-[calc(33.333%-10.667px)] border-0 bg-transparent p-0 font-body text-center transition-transform hover:-translate-y-1.5 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 sm:w-[calc(25%-12px)]"
    >
      <div
        className={`relative mx-auto mb-2 h-14 w-14 overflow-hidden rounded-full border bg-[#f6f0e7] transition-all ${
          selected ? "border-2 border-red ring-2 ring-red/25" : "border-line group-hover:border-red"
        }`}
      >
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
        {!unavailable && (
          <span
            className={`absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-white shadow-card transition-all ${
              selected ? "bg-red scale-100" : "bg-gold scale-90 opacity-90 group-hover:scale-100 group-hover:opacity-100"
            }`}
          >
            {selected ? <CheckIcon className="h-3 w-3" /> : <PlusIcon className="h-3 w-3" />}
          </span>
        )}
      </div>
      <span
        className={`flex items-center justify-center gap-1 font-heading text-[0.68rem] font-semibold uppercase tracking-wide leading-tight transition-colors ${
          selected ? "text-red" : "text-ink"
        }`}
      >
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
    </button>
  );
}
