type IconProps = { className?: string };

/** Set de iconos de línea propios (sin emojis) para la sección de valores. */

export function FlameIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5c.4 2.4-.6 3.6-1.8 4.9-1.5 1.6-3.2 3.4-3.2 6.4a5 5 0 0 0 10 0c0-1.7-.7-2.8-1.4-3.8-.3 1.6-1 2.3-1.8 2.3-1.3 0-1.6-1.3-1.1-2.4.7-1.6 1.2-3.5-.7-7.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Olla con vapor y cuchara de pie (cuenco abajo, palo hacia arriba) — icono de "Salsa de la Casa". */
export function CheeseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Vapor subiendo de la olla */}
      <path d="M7.5 10.5c-1.3-1.7-1.3-3 0-4.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16.5 10.5c1.3-1.7 1.3-3 0-4.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />

      {/* Mango de la cuchara, recto hacia arriba */}
      <path d="M12 2v9.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      {/* Cuenco de la cuchara, abajo, apoyado en la olla */}
      <ellipse cx="12" cy="12.8" rx="2.3" ry="1.5" stroke="currentColor" strokeWidth="1.5" />

      {/* Olla */}
      <path d="M4 14.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M5 14.5 6.2 20a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8l1.2-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Asas de la olla */}
      <path d="M4 13.3c-1.2-.2-1.9-1-1.6-1.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M20 13.3c1.2-.2 1.9-1 1.6-1.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5l2.5 5.3 5.7.8-4.2 4.1 1 5.8L12 16.7l-5 2.8 1-5.8-4.2-4.1 5.7-.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChiliIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 4.5c1.5-.8 3-.8 3.8.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.2 5.2c3.6-.6 8.8 1.7 9.7 6.4.8 4.2-2.6 8.9-6.7 8.9-3.4 0-6.2-2.6-6.2-6.4 0-3 1.4-5.2 3.2-8.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FriesIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 10 5 21h14l-1-11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 10V5M11 10V4M13 10V4M16 10V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DrinkIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 8h10l-1 12.5a1 1 0 0 1-1 .9H9a1 1 0 0 1-1-.9L7 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 5 15 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChefIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 10.5c-1.9 0-3.2-2-2.4-3.7.6-1.3 2-2 3.3-1.6.3-1.7 1.9-3 3.8-3s3.5 1.3 3.8 3c1.3-.4 2.7.3 3.3 1.6.8 1.7-.5 3.7-2.4 3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 10.5v6.5h10v-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 20.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 17v3.5M17 17v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
