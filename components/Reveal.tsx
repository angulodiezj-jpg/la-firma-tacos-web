"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number; // segundos
  className?: string;
};

/**
 * Registro compartido de bloques pendientes de aparecer.
 *
 * Antes esto era un IntersectionObserver por bloque y se colaban dos fallos:
 *  1. con `threshold` porcentual, un bloque más alto que la pantalla (la
 *     parrilla de bebidas en móvil) nunca alcanzaba ese porcentaje y se
 *     quedaba invisible para siempre;
 *  2. con un scroll rápido, el bloque podía pasar de "aún no ha entrado" a
 *     "ya ha salido por arriba" entre dos fotogramas. Como en ambos extremos
 *     `isIntersecting` es false, el observador no notifica ningún cambio y el
 *     bloque tampoco llegaba a mostrarse nunca.
 *
 * La comprobación de aquí es POSICIONAL, no de transición: "¿su borde superior
 * está ya por encima del final de la pantalla?". Da igual a qué velocidad se
 * haya pasado por delante; en cuanto se mira, se resuelve bien. Un único
 * listener para toda la página, limitado a un fotograma, y cada bloque sale
 * del registro en cuanto aparece.
 */
const MARGEN = 80; // px: el bloque aparece cuando ya ha subido este trozo
const pendientes = new Map<Element, () => void>();
let escuchando = false;
let programado = false;

function revisar() {
  programado = false;
  const limite = window.innerHeight - MARGEN;
  pendientes.forEach((mostrar, el) => {
    if (el.getBoundingClientRect().top < limite) {
      pendientes.delete(el);
      mostrar();
    }
  });
  if (pendientes.size === 0 && escuchando) {
    window.removeEventListener("scroll", planificar);
    window.removeEventListener("resize", planificar);
    escuchando = false;
  }
}

function planificar() {
  if (programado) return;
  programado = true;
  requestAnimationFrame(revisar);
}

function registrar(el: Element, mostrar: () => void) {
  pendientes.set(el, mostrar);
  if (!escuchando) {
    window.addEventListener("scroll", planificar, { passive: true });
    window.addEventListener("resize", planificar, { passive: true });
    escuchando = true;
  }
  planificar();
  return () => {
    pendientes.delete(el);
  };
}

/** Envuelve cualquier bloque para que aparezca con fade + translateY al hacer scroll hasta él. */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registrar(el, () => setVisible(true));
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}
