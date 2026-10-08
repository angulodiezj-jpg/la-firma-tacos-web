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
          className={`scroll-mt-[140px] py-16 md:py-24 ${catIndex % 2 === 1 ? "bg-[#FBF5EC]" : "bg-white"}`}
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <Reveal>
              <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-ink/10 pb-5">
                <div className="flex items-end gap-4 md:gap-6">
                  <span className="font-heading text-5xl font-bold leading-[0.8] text-red md:text-7xl">
                    {String(catIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-heading text-xs uppercase tracking-[3px] text-gold-deep">
                      {category.eyebrow}
                    </span>
                    <h2 className="mt-1 font-heading text-3xl font-bold uppercase leading-none text-ink md:text-5xl">
                      {category.title}
                    </h2>
                  </div>
                </div>
                {category.slug !== "bebidas" && (
                  <span className="hidden shrink-0 rounded-full bg-ink px-4 py-2 font-heading text-xs uppercase tracking-[1.5px] text-white sm:inline">
                    {category.products.length} {category.products.length === 1 ? "producto" : "productos"}
                  </span>
                )}
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
                    <h3 className="mb-5 flex items-center gap-3 font-heading text-lg font-bold uppercase tracking-[1px] text-ink md:text-xl">
                      <span className="h-0.5 w-8 bg-red" aria-hidden="true" />
                      {block.group}
                    </h3>
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
                  className="group relative mt-10 flex min-h-[180px] items-center overflow-hidden rounded-[28px] bg-[#C70C18] bg-[radial-gradient(ellipse_60%_100%_at_80%_50%,#E3151F_0%,rgba(199,12,24,0)_70%)] p-7 text-white transition-transform hover:-translate-y-1 md:p-10"
                >
                  <div className="relative z-10 flex max-w-[60%] flex-col gap-3">
                    <span className="font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">M · L · XL</span>
                    <span className="font-heading text-3xl font-bold uppercase leading-[0.95] md:text-5xl">
                      Tu taco, <span className="text-[#FFD27A]">tus reglas</span>
                    </span>
                    <span className="self-start rounded-full bg-white px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[1.5px] text-red-dark md:text-sm">
                      Monta el tuyo →
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hero/cut-monta-gratinado.webp"
                    alt=""
                    aria-hidden="true"
                    width={657}
                    height={820}
                    loading="lazy"
                    className="absolute -right-6 top-1/2 h-[200px] w-auto -translate-y-1/2 rotate-[62deg] drop-shadow-[0_24px_24px_rgba(60,0,0,0.5)] transition-transform duration-500 group-hover:rotate-[56deg] md:right-10 md:h-[280px]"
                  />
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
