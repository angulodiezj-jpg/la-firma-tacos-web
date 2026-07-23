type IconProps = { className?: string };

/**
 * Símbolo Halal — recortado directamente del logotipo oficial de La Firma
 * (el pequeño círculo con caligrafía árabe bajo "TACOS"), no un icono
 * genérico ni el logo de ninguna entidad certificadora externa.
 */
export function HalalBadge({ className = "h-5 w-5" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/brand/halal-symbol.jpg"
      alt="Halal"
      title="Halal"
      className={`inline-block rounded-full object-cover ${className}`}
    />
  );
}
