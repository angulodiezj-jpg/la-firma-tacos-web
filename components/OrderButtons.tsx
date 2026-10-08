import { locales, type Local } from "@/data/siteConfig";

type OrderButtonsProps = {
  className?: string;
  size?: "sm" | "md";
  /** Solo los botones de un local. Sin él, se agrupan por ciudad. */
  city?: Local["id"];
};

/**
 * Botones de pedido a plataformas externas (Uber Eats / Glovo).
 * La Firma Tacos no tiene pedido online propio: solo se muestra la carta
 * y se deriva al cliente a la plataforma de delivery que prefiera.
 *
 * Con varios locales, cada pedido tiene que ir a la tienda de su ciudad:
 * sin `city` se muestra un grupo por local ("Madrid · Castellana", ...).
 *
 * Llevan el color de cada plataforma (negro Uber Eats, naranja Glovo) en vez
 * del rojo de la marca: así se reconocen de un vistazo y no compiten con el
 * CTA principal de la página.
 */
export default function OrderButtons({ className = "", size = "md", city }: OrderButtonsProps) {
  const padding = size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";
  const base =
    "btn-shine group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold uppercase tracking-wide text-white " +
    "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
    padding;
  const color = {
    "Uber Eats": "bg-ink shadow-[0_8px_22px_rgba(26,20,18,0.35)] hover:shadow-[0_12px_32px_rgba(26,20,18,0.5)]",
    Glovo: "bg-orange shadow-[0_8px_22px_rgba(255,122,26,0.38)] hover:shadow-[0_12px_32px_rgba(255,122,26,0.55)]",
  };

  const buttons = (local: Local, withCity: boolean) =>
    local.pedir.map((o) => (
      <a
        key={o.plataforma}
        href={o.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Pedir en ${o.plataforma} — La Firma ${local.ciudad}`}
        className={`${base} ${color[o.plataforma]}`}
      >
        <span className="relative z-10">
          {withCity ? o.plataforma : `Pedir en ${o.plataforma}`}
        </span>
        <span
          aria-hidden="true"
          className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          →
        </span>
      </a>
    ));

  if (city) {
    const local = locales.find((l) => l.id === city)!;
    return <div className={`flex flex-wrap gap-3 ${className}`}>{buttons(local, false)}</div>;
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {locales.map((local) => (
        <div key={local.id}>
          <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[2px] text-ink-soft">
            Pedir en {local.ciudad} · {local.zona}
          </p>
          <div className="flex flex-wrap gap-3 [&>a]:flex-1">{buttons(local, true)}</div>
        </div>
      ))}
    </div>
  );
}
