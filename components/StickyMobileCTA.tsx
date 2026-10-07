"use client";

import Link from "next/link";
import { useState } from "react";
import { locales } from "@/data/siteConfig";

type StickyMobileCTAProps = {
  onMenuOpen: () => void;
};

/**
 * Barra fija inferior solo en móvil: hamburguesa + Monta Tu Tacos + Pedir
 * (el botón "Pedir" despliega un popover con las plataformas de cada local,
 * ya que no hay pedido online propio — solo enlaces a plataformas externas).
 */
export default function StickyMobileCTA({ onMenuOpen }: StickyMobileCTAProps) {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
      {orderOpen && (
        // El centrado va en un contenedor aparte: la animación fadeUp usa
        // transform y pisaría el -translate-x-1/2, sacando el panel de pantalla.
        <div className="absolute bottom-full inset-x-0 mb-2 flex justify-center">
          <div className="w-[92vw] max-w-sm rounded-2xl bg-white shadow-cardHover border border-line p-4 animate-fadeUp">
            <p className="font-heading text-xs uppercase tracking-wide text-ink-soft mb-3 text-center">
              ¿Dónde te lo llevamos?
            </p>
            <div className="flex flex-col gap-4">
              {locales.map((local) => (
                <div key={local.id}>
                  <p className="mb-2 font-heading text-[0.7rem] font-semibold uppercase tracking-[2px] text-ink">
                    {local.ciudad} · {local.zona}
                  </p>
                  <div className="flex gap-2">
                    {local.pedir.map((o) => (
                      <a
                        key={o.plataforma}
                        href={o.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 rounded-full text-white text-center py-3 font-heading text-sm font-semibold uppercase ${
                          o.plataforma === "Glovo" ? "bg-orange" : "bg-ink"
                        }`}
                      >
                        {o.plataforma}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-3 mb-3 flex items-center gap-2 rounded-full bg-white shadow-cardHover border border-line px-3 py-2">
        <button
          aria-label="Abrir menú"
          onClick={onMenuOpen}
          className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full text-red text-xl"
        >
          ☰
        </button>
        <Link
          href="/monta-tu-taco"
          className="flex-1 text-center rounded-full bg-gold text-white font-heading text-xs font-semibold uppercase tracking-wide py-3"
        >
          Monta Tu Tacos
        </Link>
        <button
          onClick={() => setOrderOpen((v) => !v)}
          className="btn-shine neon-cta flex-1 rounded-full bg-red text-white font-heading text-xs font-semibold uppercase tracking-wide py-3"
        >
          Pedir
        </button>
      </div>
    </div>
  );
}
