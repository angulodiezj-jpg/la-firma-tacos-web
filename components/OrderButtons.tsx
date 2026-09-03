import { siteConfig } from "@/data/siteConfig";

type OrderButtonsProps = {
  className?: string;
  size?: "sm" | "md";
};

/**
 * Botones de pedido a plataformas externas (Uber Eats / Glovo).
 * La Firma Tacos no tiene pedido online propio: solo se muestra la carta
 * y se deriva al cliente a la plataforma de delivery que prefiera.
 *
 * Llevan el color de cada plataforma (negro Uber Eats, naranja Glovo) en vez
 * del rojo de la marca: así se reconocen de un vistazo y no compiten con el
 * CTA principal de la página.
 */
export default function OrderButtons({ className = "", size = "md" }: OrderButtonsProps) {
  const padding = size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";
  const base =
    "btn-shine group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold uppercase tracking-wide text-white " +
    "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
    padding;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={siteConfig.order.uberEats}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-ink shadow-[0_8px_22px_rgba(26,20,18,0.35)] hover:shadow-[0_12px_32px_rgba(26,20,18,0.5)]`}
      >
        <span className="relative z-10">Pedir en Uber Eats</span>
        <span
          aria-hidden="true"
          className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          →
        </span>
      </a>
      <a
        href={siteConfig.order.glovo}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-orange shadow-[0_8px_22px_rgba(255,122,26,0.38)] hover:shadow-[0_12px_32px_rgba(255,122,26,0.55)]`}
      >
        <span className="relative z-10">Pedir en Glovo</span>
        <span
          aria-hidden="true"
          className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}
