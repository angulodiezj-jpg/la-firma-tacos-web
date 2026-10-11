/**
 * Bodegón de cada talla de Monta Tu Taco para la carta: el taco recortado
 * sobre el rojo de marca, la letra de la talla en grande detrás y, flotando
 * alrededor, tantas carnes y salsas del cartel como admite la talla.
 * Así se ve de un vistazo qué cambia de M a XL.
 */
const MEATS = ["carne-tenders", "carne-carne-picada", "carne-cordon-bleu"];
const SAUCES = ["salsa-biggy", "salsa-algerina", "salsa-samurai"];

// Posición de cada carne (arriba) y salsa (abajo), en % de la tarjeta.
const MEAT_POS = [
  "left-[6%] top-[13%] w-[30%] -rotate-6",
  "right-[5%] top-[10%] w-[30%] rotate-6",
  "left-[36%] top-[4%] w-[27%] -rotate-3",
];
const SAUCE_POS = [
  "right-[6%] bottom-[9%] w-[25%]",
  "left-[6%] bottom-[11%] w-[23%]",
  "left-[39%] bottom-[17%] w-[21%]",
];

const COUNT: Record<string, number> = { M: 1, L: 2, XL: 3 };
const TACO_W: Record<string, string> = { M: "w-[62%]", L: "w-[72%]", XL: "w-[82%]" };

export default function MontaTallaVisual({ talla }: { talla: "M" | "L" | "XL" }) {
  const n = COUNT[talla];
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#A00812_100%)]">
      <span
        aria-hidden="true"
        className="absolute inset-0 flex select-none items-center justify-center font-heading text-[15rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,210,122,0.35)] md:text-[17rem]"
      >
        {talla}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#FFD27A]/30"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/cut-monta.webp"
        alt={`Monta tu taco talla ${talla}`}
        width={820}
        height={506}
        loading="lazy"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] drop-shadow-[0_24px_24px_rgba(60,0,0,0.55)] transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-105 ${TACO_W[talla]}`}
      />

      {MEATS.slice(0, n).map((m, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={m}
          src={`/images/cartel/${m}.webp`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute drop-shadow-[0_12px_12px_rgba(60,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1 ${MEAT_POS[i]}`}
        />
      ))}
      {SAUCES.slice(0, n).map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s}
          src={`/images/cartel/${s}.webp`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute drop-shadow-[0_12px_12px_rgba(60,0,0,0.5)] transition-transform duration-500 group-hover:translate-y-1 ${SAUCE_POS[i]}`}
        />
      ))}

      <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink/85 px-4 py-2 font-heading text-xs uppercase tracking-[1.5px] text-white backdrop-blur-sm md:text-sm">
        <span className="text-[#FFD27A]">
          {n} {n === 1 ? "carne" : "carnes"}
        </span>
        ·
        <span className="text-[#FFD27A]">
          {n} {n === 1 ? "salsa" : "salsas"}
        </span>
      </span>
    </div>
  );
}
