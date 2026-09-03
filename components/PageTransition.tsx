"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Coloca la página nueva donde toca nada más montarse.
 *
 * Con <AnimatePresence mode="wait"> el contenido nuevo no aparece hasta que
 * termina la animación de salida del anterior (~450 ms). Para entonces Next ya
 * ha hecho su reposicionamiento de scroll, así que se perdía: al pulsar el
 * banner de Valencia desde el pie de otra página, se entraba a mitad de la
 * página nueva (en la zona legal) en vez de por arriba.
 *
 * Va DENTRO del motion.div y con key de ruta, de modo que su efecto se dispara
 * justo cuando la página nueva entra en el DOM. Se usa "instant" a propósito:
 * el html lleva scroll-behavior:smooth y, sin esto, el salto se convertiría en
 * un desplazamiento largo y visible.
 */
function ScrollReset() {
  useEffect(() => {
    const hash = window.location.hash;
    const destino = hash.length > 1 ? document.querySelector(hash) : null;

    if (destino) {
      // Navegación con ancla (/carta#bebidas): respeta el scroll-margin de la
      // sección, que compensa la cabecera fija.
      destino.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  return null;
}

/**
 * Transición de página tipo crossfade + desplazamiento sutil, aplicada a
 * todo el sitio (Inicio, La Carta, Monta Tu Taco, páginas legales...).
 * Vive dentro de SiteChrome, envolviendo solo el contenido (no el Header
 * ni la barra fija), para que la cabecera no parpadee al navegar.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div key={pathname}>
        <ScrollReset />
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        data-page-transition
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <ScrollReset />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
