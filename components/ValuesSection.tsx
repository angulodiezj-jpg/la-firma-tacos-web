import { montaTuTaco } from "@/data/products";
import Reveal from "./Reveal";
import { CheeseIcon, ChefIcon, CheckIcon, FlameIcon } from "./ValueIcons";

const values = [
  {
    Icon: FlameIcon,
    title: "Hecho al momento",
    text: "Nada de precocinado. Cada taco se prepara cuando lo pides.",
    tile: "bg-[radial-gradient(circle_at_70%_30%,#E3141F_0%,#B30A15_80%)] text-white",
    icon: "bg-white/15 text-[#FFD27A]",
    sub: "text-white/80",
  },
  {
    Icon: CheeseIcon,
    title: "Salsa de la casa",
    text: "Nuestra salsa de queso, la que no vas a encontrar en otro sitio.",
    tile: "bg-gold text-ink",
    icon: "bg-ink text-gold",
    sub: "text-[#4A3A20]",
  },
  {
    Icon: CheckIcon,
    title: "100 % Halal",
    text: "Toda nuestra carne es halal. Sin excepciones.",
    tile: "bg-ink text-white",
    icon: "bg-white/10 text-gold",
    sub: "text-white/70",
  },
  {
    Icon: ChefIcon,
    title: "A tu manera",
    text: `${montaTuTaco.sizes.length} tallas, ${montaTuTaco.meats.length} carnes, ${montaTuTaco.sauces.length} salsas y todos los extras que quieras.`,
    tile: "border border-[#EADFD2] bg-white text-ink",
    icon: "bg-red text-white",
    sub: "text-ink-soft",
  },
];

const HITOS = [
  { valor: "2004", texto: "Empezamos en Lyon" },
  { valor: "+20", texto: "Años de taco francés" },
  { valor: "2", texto: "Ciudades en España" },
];

export default function ValuesSection() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-[#FBF5EC] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <div className="relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[30px] bg-[#C70C18] bg-[radial-gradient(ellipse_80%_70%_at_70%_30%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#A00812_100%)] p-8 text-white md:p-12 lg:sticky lg:top-24">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-6 select-none font-heading text-[11rem] font-bold leading-none text-white/[0.06]"
              >
                LYON
              </span>
              <div className="relative flex flex-col gap-5">
                <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
                  Nosotros
                </span>
                <h2 className="font-heading text-[2.7rem] font-bold uppercase leading-[0.92] md:text-6xl">
                  De Lyon a tu barrio. <span className="text-[#FFD27A]">Sabor de calle, hecho con oficio.</span>
                </h2>
              </div>
              <div className="relative grid grid-cols-3 gap-3">
                {HITOS.map((h) => (
                  <div key={h.texto} className="rounded-2xl bg-black/20 p-4">
                    <span className="block font-heading text-3xl font-bold leading-none text-[#FFD27A] md:text-4xl">
                      {h.valor}
                    </span>
                    <span className="mt-2 block font-heading text-[0.65rem] uppercase leading-tight tracking-[1.5px] text-white/80 md:text-xs">
                      {h.texto}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col justify-center py-2">
              <div className="space-y-5 text-base leading-relaxed text-ink-soft md:text-lg [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-heading [&>p:first-child]:first-letter:text-7xl [&>p:first-child]:first-letter:font-bold [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-red">
                <p>
                  Nuestra historia comenzó en <strong className="font-semibold text-ink">Lyon</strong>, la ciudad donde
                  nació el auténtico <strong className="font-semibold text-ink">taco francés</strong>. Allí, desde{" "}
                  <strong className="font-semibold text-ink">2004</strong>, vivimos de cerca la evolución de este
                  fenómeno gastronómico, aprendiendo sus recetas, perfeccionando cada detalle y convirtiendo una pasión
                  en una forma de vida.
                </p>
                <p>
                  Durante más de veinte años crecimos junto a la cultura del taco francés, siempre con una misma idea:
                  la excelencia no está en hacer más, sino en hacerlo mejor.
                </p>
                <p>
                  Ese legado nos llevó a crear el corazón de nuestra cocina:{" "}
                  <strong className="font-semibold text-ink">la Salsa de Queso La Firma</strong>. Una receta familiar
                  transmitida de generación en generación, elaborada con{" "}
                  <strong className="font-semibold text-ink">
                    más de cinco ingredientes cuidadosamente seleccionados
                  </strong>{" "}
                  y protegida como nuestro mayor secreto. Es el sabor que define cada uno de nuestros tacos y lo que nos
                  hace verdaderamente diferentes.
                </p>
                <p>
                  Hoy damos un paso más llevando toda esa experiencia a España. No hemos venido a copiar una tendencia,
                  sino a traer la auténtica esencia de Lyon con un equipo formado íntegramente por profesionales de
                  nuestra ciudad y una misión muy clara:{" "}
                  <strong className="font-semibold text-ink">
                    convertirnos en el referente del fast food halal en España
                  </strong>
                  .
                </p>
                <p>
                  Cada taco que servimos representa más de dos décadas de tradición, innovación y compromiso con la
                  calidad.
                </p>
              </div>

              <p className="mt-10 border-l-4 border-red pl-5 font-heading text-xl font-bold uppercase leading-snug text-ink md:text-2xl">
                Porque esto no es solo un restaurante. Es nuestra historia. Es nuestro legado.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div
                className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] p-5 transition-transform duration-300 hover:-translate-y-1.5 md:rounded-[28px] md:p-7 ${v.tile}`}
              >
                <span className="absolute right-5 top-4 font-heading text-4xl font-bold leading-none opacity-15 md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 md:h-14 md:w-14 ${v.icon}`}
                >
                  <v.Icon className="h-6 w-6 md:h-7 md:w-7" />
                </span>
                <h3 className="font-heading text-xl font-bold uppercase leading-none md:text-2xl">{v.title}</h3>
                <p className={`text-sm leading-relaxed ${v.sub}`}>{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
