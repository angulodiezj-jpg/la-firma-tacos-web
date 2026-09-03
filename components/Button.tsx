import Link from "next/link";

/**
 * Botón único de toda la web.
 *
 * Antes cada CTA repetía a mano su cadena de clases, así que ninguno se
 * comportaba igual: unos tenían brillo, otros no; unos levantaban al pasar el
 * ratón, otros se quedaban planos. Aquí se define una sola vez el lenguaje de
 * los botones y todos lo heredan.
 *
 * Detalles que le dan carácter sin cargar la página:
 *  - barrido de luz diagonal al pasar el ratón (.btn-shine, ya en globals)
 *  - la flecha se desplaza al pasar el ratón, señalando la acción
 *  - halo rojo que crece por detrás en la variante principal
 *  - se hunde ligeramente al pulsar (active), que es lo que hace que un botón
 *    "se sienta" pulsado en móvil
 */

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const BASE =
  "btn-shine group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold uppercase tracking-wide text-center " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "focus-visible:outline-none";

const VARIANTS: Record<Variant, string> = {
  // Acción principal: degradado rojo con profundidad + halo al pasar el ratón.
  primary:
    "bg-gradient-to-br from-red to-red-dark text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] " +
    "hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] hover:from-red-glow hover:to-red",
  // Acción secundaria sobre foto/fondo oscuro: contorno que se rellena.
  outline:
    "border-2 border-white/85 text-white hover:border-white hover:bg-white hover:text-ink " +
    "hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)]",
  // Terciaria sobre fondo de color: cristal translúcido.
  ghost:
    "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 " +
    "hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)]",
  // Destacado cálido, para lo que no debe competir con el rojo.
  gold:
    "bg-gradient-to-br from-gold to-gold-deep text-ink shadow-[0_8px_22px_rgba(232,169,35,0.35)] " +
    "hover:shadow-[0_12px_32px_rgba(232,169,35,0.5)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-sm md:text-base",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Flecha que se desplaza al pasar el ratón. */
  arrow?: boolean;
  className?: string;
};

function contenido(children: React.ReactNode, arrow: boolean) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );
}

function clases(variant: Variant, size: Size, className: string) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();
}

/** Botón que navega dentro de la web. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  // Los enlaces externos y las anclas no pasan por el router de Next.
  const externo = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const ancla = href.startsWith("#");

  if (externo || ancla) {
    return (
      <a
        href={href}
        className={clases(variant, size, className)}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {contenido(children, arrow)}
      </a>
    );
  }

  return (
    <Link href={href} className={clases(variant, size, className)} {...rest}>
      {contenido(children, arrow)}
    </Link>
  );
}

/** Botón de acción (no navega). */
export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clases(variant, size, className)} {...rest}>
      {contenido(children, arrow)}
    </button>
  );
}
