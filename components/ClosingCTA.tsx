import { locales } from "@/data/siteConfig";

/**
 * Cierre rojo de todas las páginas, justo encima del pie: último empujón al
 * pedido, con la tienda de delivery de cada ciudad (un pedido de Valencia no
 * puede caer en la tienda de Madrid).
 */
export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_55%_90%_at_50%_45%,#E3151F_0%,rgba(199,12,24,0)_70%)] px-5 py-16 text-white md:py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/cut-bigcrunch.webp"
        alt=""
        aria-hidden="true"
        width={820}
        height={631}
        loading="lazy"
        className="pointer-events-none absolute -left-24 bottom-[-40px] hidden w-[340px] rotate-[10deg] drop-shadow-[0_26px_26px_rgba(60,0,0,0.5)] lg:block xl:-left-10 xl:w-[380px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/cut-crousty.webp"
        alt=""
        aria-hidden="true"
        width={820}
        height={690}
        loading="lazy"
        className="pointer-events-none absolute -right-24 bottom-[-30px] hidden w-[330px] drop-shadow-[0_26px_26px_rgba(60,0,0,0.5)] lg:block xl:-right-10 xl:w-[360px]"
      />

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
        <span className="font-heading text-xs uppercase tracking-[4px] text-[#FFD27A] md:text-sm">
          {locales.map((l) => l.ciudad).join(" · ")}
        </span>
        <h2 className="font-heading text-[2.9rem] font-bold uppercase leading-[0.9] sm:text-6xl md:text-[5.4rem]">
          ¿Hambre? <span className="block text-[#FFD27A]">Te lo llevamos</span>
        </h2>
        <p className="max-w-md text-white/85">Elige tu ciudad y pide en tu app de siempre.</p>

        <div className="mt-2 grid w-full gap-4 sm:grid-cols-2">
          {locales.map((local) => (
            <div key={local.id} className="flex flex-col gap-2.5 rounded-[22px] bg-black/20 p-4">
              <span className="font-heading text-sm uppercase tracking-[2px]">
                {local.ciudad} <span className="text-white/60">· {local.zona}</span>
              </span>
              <div className="flex flex-wrap justify-center gap-2.5">
                {local.pedir.map((o) => (
                  <a
                    key={o.plataforma}
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir en ${o.plataforma} — La Firma ${local.ciudad}`}
                    className={`flex-1 rounded-full px-5 py-3 font-heading text-sm font-bold uppercase tracking-[1.5px] transition-transform hover:-translate-y-0.5 ${
                      o.plataforma === "Glovo" ? "bg-white text-red-dark" : "bg-ink text-white"
                    }`}
                  >
                    {o.plataforma} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
