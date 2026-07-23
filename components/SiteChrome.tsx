"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import PageTransition from "./PageTransition";
import StickyMobileCTA from "./StickyMobileCTA";

/**
 * Contenedor cliente que agrupa Header + menú móvil + barra flotante,
 * compartiendo un único estado de "menú abierto" entre los tres.
 * layout.tsx se mantiene como Server Component (para exportar metadata)
 * y delega toda la interactividad de la cabecera a este wrapper.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <PageTransition>{children}</PageTransition>
      <StickyMobileCTA onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
