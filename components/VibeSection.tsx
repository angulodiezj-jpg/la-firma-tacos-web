import { vibeItems } from "@/data/videos";
import Reveal from "./Reveal";

// Mosaico 4×3: la primera foto a 2×2, cuatro sueltas a su lado y las dos
// últimas a doble ancho cerrando. En móvil (2 columnas) encaja igual.
const SPANS = ["col-span-2 row-span-2", "", "", "", "", "col-span-2", "col-span-2"];

export default function VibeSection() {
  return (
    <section id="local" className="bg-[#FBF5EC] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-red/30 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] text-red md:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
                El local
              </span>
              <h2 className="font-heading text-[2.7rem] font-bold uppercase leading-[0.92] text-ink md:text-6xl lg:text-7xl">
                Ven a <span className="text-red">vernos</span>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft md:text-lg">
              Neón, madera y buena mesa en pleno Paseo de la Castellana. Para venir con la cuadrilla.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:gap-4 lg:grid-cols-4">
          {vibeItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.06} className={SPANS[i] ?? ""}>
              <div className="group relative h-full overflow-hidden rounded-[22px] md:rounded-[26px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
