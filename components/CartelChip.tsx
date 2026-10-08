import { CheckIcon } from "./ValueIcons";

type CartelChipProps = {
  name: string;
  image: string;
  /** "bowl" para los cuencos de salsa, "gratin" para las bandejas de gratinado. */
  shape: "bowl" | "gratin";
  spice?: 0 | 1 | 2 | 3;
  selected: boolean;
  locked?: boolean;
  onToggle: () => void;
};

/**
 * Producto recortado sobre el panel amarillo, como en el cartel del local:
 * foto sin fondo, nombre con letra de letrero y chiles si pica. Sin precios.
 */
export default function CartelChip({ name, image, shape, spice, selected, locked, onToggle }: CartelChipProps) {
  const lockedOut = !selected && !!locked;
  const bowl = shape === "bowl";

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={lockedOut}
      onClick={onToggle}
      className={`group relative flex flex-col items-center rounded-[22px] px-1.5 pb-3 pt-3 text-center transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:px-2 ${
        selected
          ? "bg-white/70 shadow-[0_10px_24px_rgba(90,50,0,0.22)] ring-[3px] ring-red"
          : "hover:-translate-y-1 hover:bg-white/35"
      }`}
    >
      <span
        className={`flex w-full items-end justify-center ${bowl ? "h-[64px] sm:h-[84px]" : "h-[118px] sm:h-[150px]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`max-h-full w-auto object-contain drop-shadow-[0_10px_10px_rgba(90,50,0,0.3)] transition-transform duration-300 group-hover:scale-105 ${
            bowl ? "max-w-[92%]" : "max-w-[96%]"
          }`}
        />
      </span>
      <span
        className={`cartel-label mt-2.5 flex min-h-[2.1em] flex-wrap items-center justify-center gap-x-1 font-heading font-bold uppercase leading-[1.02] tracking-[0.5px] ${
          bowl ? "text-[0.8rem] sm:text-[0.95rem]" : "text-[0.85rem] sm:text-base"
        }`}
      >
        {name}
        {!!spice && (
          <span className="flex" title={`Picante: ${spice}/3`} aria-label={`Picante nivel ${spice} de 3`} role="img">
            {Array.from({ length: spice }).map((_, i) => (
              <Chili key={i} />
            ))}
          </span>
        )}
      </span>
      <span
        className={`absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red text-white shadow-card transition-all ${
          selected ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        aria-hidden="true"
      >
        <CheckIcon className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

/** Guindilla roja con rabito verde, como la del cartel. */
function Chili() {
  return (
    <svg viewBox="0 0 16 24" className="-mx-0.5 h-[1.15em] w-auto rotate-[18deg]" aria-hidden="true">
      <path
        d="M8 6c-3.5 1-4.6 6-3.2 11.2C5.6 20.5 7.4 23 8.6 23c1.1 0 1.2-2 1.6-5.4C10.8 12 11.8 7.4 8 6z"
        fill="#E0161E"
        stroke="#3B1607"
        strokeWidth="1.2"
      />
      <path d="M8 6.5C8 4 9 2.4 11 1.5" fill="none" stroke="#2C8A2E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
