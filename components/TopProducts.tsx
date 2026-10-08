import Link from "next/link";
import Reveal from "./Reveal";

/**
 * "Los que más salen de cocina": escaparate de lo más pedido justo debajo de la
 * portada. Mosaico de 4 columnas en escritorio (F1 y Monta Tu Taco a doble
 * alto, burger y crousty a doble ancho) y de 2 columnas en móvil.
 */
export default function TopProducts() {
  return (
    <section className="bg-[#FBF5EC] pb-20 pt-16 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div>
              <span className="font-heading text-xs uppercase tracking-[3px] text-red md:text-sm">Lo más pedido</span>
              <h2 className="mt-1 font-heading text-4xl font-bold uppercase leading-none text-ink md:text-6xl">
                Los que más salen de cocina
              </h2>
            </div>
            <Link
              href="/carta"
              className="border-b-2 border-red pb-1 font-heading text-sm font-bold uppercase tracking-[1.5px] text-ink hover:text-red md:text-base"
            >
              Ver la carta completa →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3 md:h-[440px] md:grid-cols-4 md:grid-rows-2 md:gap-[18px]">
            {/* F1 */}
            <Link
              href="/carta#tacos"
              className="group relative col-span-2 h-[230px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_55%_42%,#E3141F_0%,#B30A15_78%)] text-white md:col-span-1 md:row-span-2 md:h-auto md:rounded-[28px]"
            >
              <span className="absolute left-5 top-5 font-heading text-[0.7rem] tracking-[2px] text-[#FFD27A] md:text-xs">
                F1 · EL ORIGINAL
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/cut-f1.webp"
                alt="F1 Tacos La Firma"
                width={565}
                height={820}
                loading="lazy"
                className="absolute right-6 top-1/2 h-[240px] w-auto -translate-y-1/2 -rotate-[60deg] drop-shadow-[0_18px_18px_rgba(60,0,0,0.5)] transition-transform duration-500 group-hover:-rotate-[54deg] md:left-1/2 md:right-auto md:top-[46%] md:h-[300px] md:-translate-x-1/2 md:-rotate-[30deg] md:group-hover:-rotate-[24deg]"
              />
              <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="font-heading text-[1.65rem] font-bold uppercase leading-none md:text-3xl">
                  Tacos
                  <br className="md:hidden" /> La Firma
                </span>
                <span className="hidden rounded-full bg-white px-3.5 py-2 font-heading text-xs font-bold tracking-wide text-red-dark md:inline">
                  PEDIR
                </span>
              </span>
            </Link>

            {/* Big Crunch */}
            <Link
              href="/carta#burgers"
              className="group relative order-4 col-span-2 h-[200px] overflow-hidden rounded-[24px] bg-ink text-white md:order-none md:h-auto md:rounded-[28px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/cut-bigcrunch.webp"
                alt="F21 Big Crunch"
                width={820}
                height={631}
                loading="lazy"
                className="absolute right-3 top-1/2 h-[160px] w-auto -translate-y-1/2 drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105 md:right-5 md:h-[190px]"
              />
              <span className="absolute left-5 top-5 font-heading text-[0.7rem] tracking-[2px] text-gold md:left-6 md:text-xs">
                F21 · CROUSTY BURGER
              </span>
              <span className="absolute bottom-5 left-5 flex flex-col gap-2 md:left-6">
                <span className="font-heading text-[1.65rem] font-bold uppercase leading-none md:text-3xl">Big Crunch</span>
                <span className="hidden max-w-[300px] text-sm text-white/70 md:block">
                  Carne smash y tenders de pollo, lechuga, tomate, cebolla y salsa Tasty.
                </span>
              </span>
            </Link>

            {/* Monta Tu Taco */}
            <Link
              href="/monta-tu-taco"
              className="group relative order-3 h-[190px] overflow-hidden rounded-[24px] border border-[#EADFD2] bg-white text-red md:order-none md:row-span-2 md:h-auto md:rounded-[28px]"
            >
              <span className="absolute left-4 top-4 hidden font-heading text-xs tracking-[2px] md:left-6 md:top-5 md:block">
                A TU MANERA · M · L · XL
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/cut-monta.webp"
                alt="Monta tu taco"
                width={820}
                height={506}
                loading="lazy"
                className="absolute -right-6 bottom-3 w-[170px] drop-shadow-[0_16px_18px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:-rotate-3 md:left-1/2 md:right-auto md:top-[45%] md:bottom-auto md:w-[260px] md:-translate-x-1/2 md:-translate-y-1/2 md:-rotate-[8deg]"
              />
              <span className="absolute left-4 top-4 flex flex-col gap-3 md:bottom-5 md:left-6 md:right-6 md:top-auto">
                <span className="font-heading text-xl font-bold uppercase leading-none md:text-3xl">
                  Monta
                  <br className="md:hidden" /> tu taco
                </span>
                <span className="hidden self-start rounded-full bg-red px-4 py-2 font-heading text-xs font-bold tracking-wide text-white md:inline">
                  MONTAR EL MÍO →
                </span>
              </span>
            </Link>

            {/* Crousty */}
            <Link
              href="/carta#crousty"
              className="group relative order-2 h-[190px] overflow-hidden rounded-[24px] bg-gold text-ink md:order-none md:col-span-2 md:h-auto md:rounded-[28px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/cut-crousty.webp"
                alt="Crousty La Firma"
                width={820}
                height={690}
                loading="lazy"
                className="absolute -bottom-1.5 -right-4 w-[150px] drop-shadow-[0_16px_18px_rgba(80,40,0,0.35)] transition-transform duration-500 group-hover:scale-105 md:bottom-auto md:right-3 md:top-1/2 md:h-[190px] md:w-auto md:-translate-y-1/2"
              />
              <span className="absolute left-5 top-5 hidden font-heading text-xs tracking-[2px] md:left-6 md:block">
                F40 · F41 · CROUSTY
              </span>
              <span className="absolute left-4 top-4 flex flex-col gap-2 md:bottom-5 md:left-6 md:top-auto">
                <span className="font-heading text-xl font-bold uppercase leading-none md:text-3xl">
                  Crousty
                  <span className="hidden md:inline"> La Firma</span>
                </span>
                <span className="hidden max-w-[300px] text-sm text-[#4A3A20] md:block">
                  Tenders crujientes sobre arroz. Sweet o spicy.
                </span>
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
