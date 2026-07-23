"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";

type StickyMobileCTAProps = {
  onMenuOpen: () => void;
};

/**
 * Barra fija inferior solo en móvil: hamburguesa + Monta Tu Tacos + Pedir
 * (el botón "Pedir" despliega un popover con Uber Eats / Glovo, ya que no
 * hay pedido online propio — solo enlaces a plataformas externas).
 */
export default function StickyMobileCTA({ onMenuOpen }: StickyMobileCTAProps) {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
      {orderOpen && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm rounded-2xl bg-white shadow-cardHover border border-line p-4 animate-fadeUp">
          <p className="font-heading text-xs uppercase tracking-wide text-ink-soft mb-3 text-center">
            Pide a domicilio con
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={siteConfig.order.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink text-white text-center py-3 font-heading text-sm font-semibold uppercase"
            >
              Uber Eats
            </a>
            <a
              href={siteConfig.order.glovo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange text-white text-center py-3 font-heading text-sm font-semibold uppercase"
            >
              Glovo
            </a>
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
