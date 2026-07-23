import { siteConfig } from "@/data/siteConfig";
import Reveal from "./Reveal";
import { CheeseIcon, ChefIcon, FlameIcon, StarIcon } from "./ValueIcons";

const values = [
  {
    Icon: FlameIcon,
    title: "Hecho al Momento",
    text: "Nada de precocinado. Cada taco se prepara cuando lo pides.",
    accent: "from-red to-red-dark",
  },
  {
    Icon: CheeseIcon,
    title: "Salsa de la Casa",
    text: "Nuestra salsa de queso especialidad, la firma que nadie más tiene.",
    accent: "from-gold to-gold-deep",
  },
  {
    Icon: StarIcon,
    title: "Calidad Valorada",
    text: `${siteConfig.rating.value} estrellas en Google con más de ${siteConfig.rating.count} reseñas de clientes.`,
    accent: "from-orange to-red",
  },
  {
    Icon: ChefIcon,
    title: "A Tu Manera",
    text: "3 tamaños, 6 carnes, 10 salsas y todos los extras que quieras.",
    accent: "from-red-dark to-ink",
  },
];

export default function ValuesSection() {
  return (
    <section id="nosotros" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              Quiénes Somos
            </span>
            <h2 className="font-heading font-bold uppercase text-4xl md:text-6xl leading-[1.05] text-ink mt-3 mb-10">
              De Lyon a España.
              <br />
              <span className="text-red">Una historia firmada por la pasión.</span>
            </h2>

            <div className="space-y-5 text-left text-ink-soft text-base md:text-lg leading-relaxed">
              <p>
                Nuestra historia comenzó en <strong className="font-semibold text-ink">Lyon</strong>, la ciudad
                donde nació el auténtico <strong className="font-semibold text-ink">taco francés</strong>. Allí,
                desde <strong className="font-semibold text-ink">2004</strong>, vivimos de cerca la evolución de
                este fenómeno gastronómico, aprendiendo sus recetas, perfeccionando cada detalle y convirtiendo
                una pasión en una forma de vida.
              </p>
              <p>
                Durante más de veinte años crecimos junto a la cultura del taco francés, siempre con una misma
                idea: la excelencia no está en hacer más, sino en hacerlo mejor.
              </p>
              <p>
                Ese legado nos llevó a crear el corazón de nuestra cocina:{" "}
                <strong className="font-semibold text-ink">la Salsa de Queso La Firma</strong>. Una receta
                familiar transmitida de generación en generación, elaborada con{" "}
                <strong className="font-semibold text-ink">más de cinco ingredientes cuidadosamente
                seleccionados</strong> y protegida como nuestro mayor secreto. Es el sabor que define cada uno de
                nuestros tacos y lo que nos hace verdaderamente diferentes.
              </p>
              <p>
                Hoy damos un paso más llevando toda esa experiencia a España. No hemos venido a copiar una
                tendencia, sino a traer la auténtica esencia de Lyon con un equipo formado íntegramente por
                profesionales de nuestra ciudad y una misión muy clara:{" "}
                <strong className="font-semibold text-ink">
                  convertirnos en el referente del fast food halal en España
                </strong>
                .
              </p>
              <p>
                Cada taco que servimos representa más de dos décadas de tradición, innovación y compromiso con
                la calidad.
              </p>
            </div>

            <p className="mt-10 font-heading font-bold uppercase text-xl md:text-2xl text-ink">
              Porque esto no es solo un restaurante. Es nuestra historia. Es nuestro legado. Es{" "}
              <span className="font-display bg-gradient-to-br from-gold-deep via-gold to-orange bg-clip-text text-transparent normal-case">
                La Firma
              </span>
              .
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group neon-ring-hover relative h-full overflow-hidden rounded-xl2 border border-line bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-cardHover md:p-8">
                {/* Línea de acento que se despliega al hover */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-out group-hover:scale-x-100 ${v.accent}`}
                />
                {/* Número de orden, detalle editorial de franquicia */}
                <span className="absolute right-4 top-4 font-heading text-2xl font-bold text-line">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${v.accent}`}
                >
                  <v.Icon className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-base font-bold uppercase tracking-wide text-ink mb-2">
                  {v.title}
                </h4>
                <p className="text-ink-soft text-sm leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
