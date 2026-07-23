import { siteConfig } from "@/data/siteConfig";

type OrderButtonsProps = {
  className?: string;
  size?: "sm" | "md";
};

/**
 * Botones de pedido a plataformas externas (Uber Eats / Glovo).
 * La Firma Tacos no tiene pedido online propio: solo se muestra la carta
 * y se deriva al cliente a la plataforma de delivery que prefiera.
 */
export default function OrderButtons({ className = "", size = "md" }: OrderButtonsProps) {
  const padding = size === "sm" ? "px-5 py-2.5 text-xs" : "px-7 py-3.5 text-sm";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={siteConfig.order.uberEats}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-shine inline-flex items-center gap-2 rounded-full bg-ink text-white font-heading font-semibold uppercase tracking-wide ${padding} shadow-card transition-transform hover:-translate-y-0.5 hover:bg-black`}
      >
        Pedir en Uber Eats
      </a>
      <a
        href={siteConfig.order.glovo}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-shine inline-flex items-center gap-2 rounded-full bg-orange text-white font-heading font-semibold uppercase tracking-wide ${padding} shadow-card transition-transform hover:-translate-y-0.5 hover:brightness-110`}
      >
        Pedir en Glovo
      </a>
    </div>
  );
}
