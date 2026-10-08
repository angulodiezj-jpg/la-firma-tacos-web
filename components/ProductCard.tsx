"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";

const tagStyles: Record<string, string> = {
  popular: "bg-red text-white",
  menu: "bg-cream text-gold-deep border border-[#f0dcb0]",
  "no-disponible": "bg-[#f1efec] text-[#9a918a] border border-[#e2ddd6]",
  proximamente: "bg-[#f1efec] text-[#9a918a] border border-[#e2ddd6]",
};

const tagLabels: Record<string, string> = {
  popular: "★ Lo más pedido",
  menu: "Menú",
  "no-disponible": "No disponible",
  proximamente: "Próximamente",
};

export default function ProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  // Productos con `href` (las tallas de Monta Tu Taco) se comportan como
  // tarjeta pulsable y llevan a su pantalla de reglas.
  const Wrapper = product.href ? Link : "div";
  const wrapperProps = product.href ? { href: product.href } : {};

  return (
    <Wrapper
      {...(wrapperProps as { href: string })}
      // h-full + flex: todas las tarjetas de una fila acaban a la misma altura
      // aunque unas lleven etiquetas y otras no, que era lo que descuadraba
      // el borde inferior de la rejilla.
      className={`group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-card ring-1 ring-[#EADFD2] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover hover:ring-red/40 ${
        product.href ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-[#C70C18]">
        {product.image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="ph-block h-full w-full">
            FOTO
            <br />
            {product.name}
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block rounded-full px-3 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[1.5px] shadow-card ${
                  tag === "popular" ? "bg-[#FFD27A] text-ink" : tagStyles[tag]
                }`}
              >
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}
        {product.code && (
          <span className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1 font-heading text-xs tracking-[1.5px] text-white backdrop-blur-sm">
            {product.code}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <h4 className="font-heading text-xl font-bold uppercase leading-tight text-ink md:text-2xl">{product.name}</h4>
        {product.description && <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>}
        {product.menuPrice && (
          <p className="mt-auto flex items-center gap-2 pt-2 font-heading text-xs uppercase tracking-[1.5px] text-gold-deep">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Hazlo menú: patatas + bebida
          </p>
        )}
        {product.href && (
          <span className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full bg-red px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-white">
            Montar esta talla →
          </span>
        )}
      </div>
    </Wrapper>
  );
}
