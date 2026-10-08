import Link from "next/link";

/**
 * Portada de marca: rojo La Firma a pantalla completa (el mismo rojo de
 * fondo que las fotos de producto) con F1, Big Crunch y Crousty compuestos
 * como un cartel. Sustituye al antiguo slider de vídeo: carga tres imágenes
 * recortadas (~300 KB en total) en vez de vídeo.
 *
 * Orden en móvil: titular → bodegón → botones. En escritorio el bodegón
 * ocupa la columna derecha a toda altura.
 */
export default function HeroFirma() {
  return (
    <section className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_60%_70%_at_70%_55%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#C70C18_55%,#A00812_100%)] text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-6 hidden select-none font-heading text-[26rem] font-bold leading-none tracking-[-0.04em] text-white/[0.06] lg:block"
      >
        FIRMA
      </span>

      <div className="relative mx-auto grid max-w-[1280px] gap-x-10 px-5 pb-20 pt-8 sm:px-8 md:pb-28 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto]">
        {/* Titular */}
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1 lg:self-end lg:gap-6">
          <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
            Original French Tacos
          </span>
          <h1 className="font-heading text-[3.4rem] font-bold uppercase leading-[0.92] tracking-[-0.01em] sm:text-7xl lg:text-[6.4rem]">
            El taco francés, <span className="text-[#FFD27A]">firmado</span> al momento
          </h1>
        </div>

        {/* Bodegón de producto */}
        <div className="relative mx-auto mt-6 aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[560px] lg:self-center">
          <span
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full border-2 border-dashed border-[#FFD27A]/35"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/cut-bigcrunch.webp"
            alt="F21 Big Crunch"
            width={820}
            height={631}
            className="absolute right-0 top-[2%] w-[68%] drop-shadow-[0_26px_26px_rgba(60,0,0,0.5)]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/cut-crousty.webp"
            alt="Crousty La Firma"
            width={820}
            height={690}
            className="absolute bottom-[4%] right-[2%] w-[58%] drop-shadow-[0_26px_26px_rgba(60,0,0,0.55)]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/cut-f1.webp"
            alt="F1 Tacos La Firma"
            width={565}
            height={820}
            fetchPriority="high"
            className="absolute left-[10%] top-[8%] h-[84%] w-auto -rotate-[40deg] drop-shadow-[0_34px_34px_rgba(60,0,0,0.6)]"
          />
        </div>

        {/* Texto, botones y locales */}
        <div className="mt-6 flex flex-col gap-5 lg:col-start-1 lg:row-start-2 lg:mt-6 lg:self-start lg:gap-6">
          <p className="max-w-[480px] text-base leading-relaxed text-white/90 md:text-xl">
            Hecho al momento con tu carne, tus salsas y nuestra salsa de queso de la casa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#locales"
              className="rounded-full bg-ink px-8 py-4 text-center font-heading text-base font-bold uppercase tracking-[1.5px] text-white shadow-[0_14px_30px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 md:py-5"
            >
              Pedir a domicilio →
            </Link>
            <Link
              href="/carta"
              className="rounded-full border-2 border-white px-8 py-[14px] text-center font-heading text-base font-bold uppercase tracking-[1.5px] text-white transition-colors hover:bg-white hover:text-red-dark md:py-[18px]"
            >
              Ver la carta
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Link
              href="/#visitanos"
              className="flex items-center gap-2.5 rounded-2xl bg-black/20 px-4 py-3 transition-colors hover:bg-black/30"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-sm uppercase tracking-wide">Madrid</span>
                <span className="text-xs text-white/75">Castellana, 122</span>
              </span>
            </Link>
            <Link
              href="/valencia"
              className="flex items-center gap-2.5 rounded-2xl bg-black/20 px-4 py-3 transition-colors hover:bg-black/30"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-sm uppercase tracking-wide">Valencia</span>
                <span className="text-xs text-white/75">Paterna · nuevo</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
