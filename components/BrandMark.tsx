type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
};

const sizes = {
  sm: { script: "text-2xl", sub: "text-[0.5rem] tracking-[3px]" },
  md: { script: "text-3xl", sub: "text-[0.55rem] tracking-[4px]" },
  lg: { script: "text-5xl", sub: "text-[0.7rem] tracking-[5px]" },
};

/**
 * Lockup tipográfico de marca: "La Firma" en cursiva dorada + "TACOS" en
 * condensada debajo, replicando la composición del logotipo real (círculo
 * con "La Firma" cursiva sobre "TACOS" en mayúsculas).
 * theme="dark" se usa sobre fondos oscuros (footer, splash) donde el rojo
 * oscuro no tendría suficiente contraste.
 */
export default function BrandMark({ size = "md", theme = "light", align = "center", className = "" }: BrandMarkProps) {
  const s = sizes[size];
  return (
    <span
      className={`inline-flex flex-col leading-none ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <span
        className={`font-display font-bold bg-gradient-to-br from-gold-deep via-gold to-orange bg-clip-text text-transparent ${s.script}`}
      >
        La Firma
      </span>
      <span
        className={`font-heading font-bold ${s.sub} -mt-0.5 ${theme === "dark" ? "text-white/90" : "text-red-dark"}`}
      >
        TACOS
      </span>
    </span>
  );
}
