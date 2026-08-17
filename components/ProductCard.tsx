"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

const tagStyles: Record<string, string> = {
  popular: "bg-red text-white",
  menu: "bg-cream text-gold-deep border border-[#f0dcb0]",
  "no-disponible": "bg-[#f1efec] text-[#9a918a] border border-[#e2ddd6]",
  proximamente: "bg-[#f1efec] text-[#9a918a] border border-[#e2ddd6]",
};

const tagLabels: Record<string, string> = {
  popular: "★ Popular",
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
      className={`group block rounded-xl2 border border-line bg-white shadow-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover ${
        product.href ? "neon-ring-hover cursor-pointer" : ""
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-line bg-[#f6f0e7]">
        {product.image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="ph-block h-full w-full">
            FOTO
            <br />
            {product.name}
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="flex items-center justify-between gap-2 font-heading text-base font-bold uppercase text-ink mb-1.5">
          <span>
            {product.code ? `${product.code} ` : ""}
            {product.name}
          </span>
          <span className="whitespace-nowrap font-heading font-bold text-red">{formatPrice(product.price)}</span>
        </h4>
        {product.description && <p className="text-sm text-ink-soft">{product.description}</p>}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-heading font-semibold uppercase tracking-wide ${tagStyles[tag]} ${tag === "popular" ? "neon-badge" : ""}`}
              >
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}
        {product.href && (
          <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-red">
            Ver reglas de la talla →
          </span>
        )}
      </div>
    </Wrapper>
  );
}
