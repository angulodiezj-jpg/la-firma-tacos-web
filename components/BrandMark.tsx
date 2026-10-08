type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
};

const sizes = {
  sm: { script: "text-[1.55rem]", swash: "h-[2px] -mt-1", sub: "text-[0.5rem] tracking-[3px]", dash: "w-3" },
  md: { script: "text-[1.8rem] sm:text-[2.1rem]", swash: "h-[2px] -mt-1", sub: "text-[0.55rem] sm:text-[0.62rem] tracking-[3px] sm:tracking-[4px]", dash: "w-3 sm:w-4" },
  lg: { script: "text-5xl sm:text-6xl", swash: "h-[3px] -mt-2", sub: "text-[0.8rem] sm:text-sm tracking-[5px]", dash: "w-5" },
};

/**
 * Rotulado de marca copiado del logotipo: "LaFirma" de pincel con degradado
 * dorado, el subrayado naranja que lo cruza y "TACOS" en romana entre dos
 * guiones. theme="dark" es para fondos rojos u oscuros (como en el logo);
 * en fondo blanco "TACOS" pasa a granate para no perder contraste.
 */
export default function BrandMark({ size = "md", theme = "light", align = "center", className = "" }: BrandMarkProps) {
  const s = sizes[size];

  return (
    <span
      className={`inline-flex flex-col leading-none ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <span
        className={`bg-[linear-gradient(180deg,#FFF1B8_0%,#F9CF5A_45%,#E39A1C_100%)] bg-clip-text px-1 font-logo text-transparent ${
          theme === "dark" ? "drop-shadow-[0_2px_0_rgba(70,8,8,0.85)]" : "drop-shadow-[0_1.5px_0_rgba(122,58,10,0.9)]"
        } ${s.script}`}
      >
        LaFirma
      </span>
      <span
        aria-hidden="true"
        className={`w-[105%] -rotate-[2deg] rounded-full bg-[linear-gradient(90deg,rgba(227,154,28,0)_0%,#F9B233_40%,#E35A1C_100%)] ${s.swash}`}
      />
      <span
        className={`mt-1 flex items-center gap-1.5 font-logo-serif font-bold ${s.sub} ${
          theme === "dark" ? "text-[#F6E3B4]" : "text-[#7A1E10]"
        }`}
      >
        <span className={`h-px ${s.dash} bg-current opacity-70`} aria-hidden="true" />
        TACOS
        <span className={`h-px ${s.dash} bg-current opacity-70`} aria-hidden="true" />
      </span>
    </span>
  );
}
