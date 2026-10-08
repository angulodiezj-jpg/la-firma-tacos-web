import type { Metadata } from "next";
import Link from "next/link";
import PageHeroRed from "@/components/PageHeroRed";
import CategoryExtras from "@/components/CategoryExtras";
import DrinksGrid from "@/components/DrinksGrid";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories, categoryExtras, type Product } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";

/** Agrupa productos por su campo `group`, preservando el orden de aparición. */
function groupProducts(products: Product[]): { group: string | null; items: Product[] }[] {
  const groups: { group: string | null; items: Product[] }[] = [];
  for (const product of products) {
    const key = product.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.group === key) {
      last.items.push(product);
    } else {
      groups.push({ group: key, items: [product] });
    }
  }
  return groups;
}

export const metadata: Metadata = {
  title: `La Carta | ${siteConfig.brandFull}`,
  description: "Toda la carta de La Firma Tacos: tacos, crousty, burgers, bocatas, postres y bebidas.",
};

export default function CartaPage() {
  return (
    <>
      <PageHeroRed
        eyebrow="La carta · Madrid y Valencia"
        title={
          <>
            ¿Qué te pide <span className="text-[#FFD27A]">el cuerpo</span> hoy?
          </>
        }
        text="Todo se hace al momento, delante de ti. Pídelo a domicilio por Uber Eats o Glovo. Todos los menús (con patatas y bebida) también se sirven solos."
        watermark="CARTA"
        image={{
          src: "/images/hero/cut-f1.webp",
          alt: "F1 Tacos La Firma",
          width: 565,
          height: 820,
          className: "h-[260px] w-auto -rotate-[52deg] sm:h-[360px] lg:h-[460px]",
        }}
      />

      <div className="sticky top-[57px] z-30 bg-ink py-4">
        <div className="mx-auto max-w-[1180px] px-6 flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex-shrink-0 rounded-full border border-white/25 px-5 py-2.5 font-heading text-xs font-semibold uppercase tracking-wide text-white transition-[transform,box-shadow,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#FFD27A] hover:bg-[#FFD27A] hover:text-ink hover:shadow-[0_8px_20px_rgba(211,31,31,0.3)] active:translate-y-0 active:scale-[0.96]"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </div>

      {categories.map((category, catIndex) => (
        <section
          key={category.slug}
          id={category.slug}
          // scroll-mt: la cabecera y la barra de categorías son fijas; sin este
          // margen el título de la sección queda escondido debajo al usar los enlaces.
          className={`scroll-mt-[140px] py-16 md:py-20 ${catIndex % 2 === 1 ? "bg-bgsoft" : ""}`}
        >
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal>
              <div className="mb-8 text-left">
                <span className="eyebrow-neon font-heading text-xs font-semibold uppercase tracking-[3px] text-red">
                  {category.eyebrow}
                </span>
                <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl text-ink mt-1">
                  {category.title}
                </h2>
              </div>
            </Reveal>

            {category.slug === "bebidas" ? (
              <Reveal delay={0.08}>
                <p className="mb-8 max-w-xl text-ink-soft">
                  Toda nuestra nevera: refrescos, energéticas, tés helados, Chill, agua y zumos. Toca cualquier
                  bebida para marcarla y llevar tu pedido decidido.
                </p>
                <DrinksGrid />
              </Reveal>
            ) : (
              groupProducts(category.products).map((block, blockIndex) => (
                <div key={block.group ?? `ungrouped-${blockIndex}`} className={blockIndex > 0 ? "mt-10" : ""}>
                  {block.group && (
                    <h3 className="font-heading font-bold uppercase text-lg text-gold-deep mb-4">{block.group}</h3>
                  )}
                  <div className="flex flex-wrap items-stretch justify-center gap-5 md:gap-6">
                    {block.items.map((product, i) => (
                      <Reveal
                        key={product.id}
                        delay={(i % 6) * 0.06}
                        className="w-full sm:w-[calc(50%-10px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                      >
                        <ProductCard product={product} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))
            )}

            {categoryExtras[category.slug] && (
              <Reveal delay={0.2}>
                <CategoryExtras extras={categoryExtras[category.slug]} />
              </Reveal>
            )}

            {category.slug === "tacos" && (
              <Reveal delay={0.3}>
                <Link
                  href="/monta-tu-taco"
                  className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-red-dark px-6 py-5 text-white shadow-card transition-transform hover:-translate-y-0.5 animate-badgePulse"
                >
                  <span className="font-heading text-sm md:text-base">
                    Descubre cómo Montar Tu Taco — tallas, carnes, salsas y extras
                  </span>
                  <span className="font-heading text-lg font-bold text-gold whitespace-nowrap">Ver más →</span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
