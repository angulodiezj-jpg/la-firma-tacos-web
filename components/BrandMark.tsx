type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
};

// Las iniciales van a mayor cuerpo, así que el lockup es más ancho que un
// texto normal: en móvil se compone un punto más pequeño para que no choque
// con el botón del header.
const sizes = {
  sm: { script: "text-xl sm:text-2xl", sub: "text-[0.45rem] sm:text-[0.5rem] tracking-[3px]", gap: "gap-1.5" },
  md: { script: "text-2xl sm:text-3xl", sub: "text-[0.5rem] sm:text-[0.55rem] tracking-[3px] sm:tracking-[4px]", gap: "gap-1.5 sm:gap-2" },
  lg: { script: "text-4xl sm:text-5xl", sub: "text-[0.6rem] sm:text-[0.7rem] tracking-[4px] sm:tracking-[5px]", gap: "gap-2 sm:gap-2.5" },
};

/**
 * Lockup tipográfico de marca: "La Firma" en cursiva dorada + "TACOS" en
 * condensada debajo, replicando la composición del logotipo real.
 *
 * Las iniciales (L, F) se componen a mayor cuerpo que el resto — recurso
 * clásico de rotulación — alineadas por línea base para que no "bailen".
 * Los tamaños van en `em`, así el conjunto escala con la prop `size`.
 * theme="dark" se usa sobre fondos oscuros (footer, splash), donde el rojo
 * oscuro no tendría contraste suficiente.
 */
export default function BrandMark({ size = "md", theme = "light", align = "center", className = "" }: BrandMarkProps) {
  const s = sizes[size];
  const ruleTone = theme === "dark" ? "via-white/45" : "via-red-dark/35";

  return (
    <span
      className={`inline-flex flex-col leading-none ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <span
        className={`font-display font-bold bg-gradient-to-br from-gold-deep via-gold to-orange bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)] ${s.script}`}
      >
        {/* Spans en línea (no flex) para que "La Firma" siga siendo una sola
            cadena de texto seleccionable y legible por lectores de pantalla;
            los tamaños distintos ya se alinean solos por línea base. */}
        <span className="text-[1.32em]">L</span>a<span className="ml-[0.14em] text-[1.32em]">F</span>irma
      </span>

      <span
        className={`mt-0.5 flex w-full items-center ${s.gap} ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${ruleTone} to-transparent`} aria-hidden="true" />
        <span
          className={`font-heading font-bold ${s.sub} ${theme === "dark" ? "text-white/90" : "text-red-dark"}`}
        >
          TACOS
        </span>
        <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${ruleTone} to-transparent`} aria-hidden="true" />
      </span>
    </span>
  );
}
