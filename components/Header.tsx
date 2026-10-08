"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import BrandMark from "./BrandMark";
import Logo from "./Logo";

type HeaderProps = {
  onMenuOpen: () => void;
};

export default function Header({ onMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // En las páginas que abren con banda roja (portada, carta y Monta Tu Taco),
  // arriba del todo la cabecera se funde con ese rojo; al hacer scroll vuelve
  // a la versión blanca de siempre.
  const onRed = ["/", "/carta", "/monta-tu-taco"].includes(pathname) && !scrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-sm border-b transition-[background-color,box-shadow] duration-300 ${
          onRed ? "bg-[#C70C18] border-transparent" : "bg-white/95 border-line"
        } ${scrolled ? "shadow-card" : ""}`}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 transition-all">
          <button
            aria-label="Abrir menú"
            onClick={onMenuOpen}
            className={`text-2xl leading-none ${onRed ? "text-white" : "text-red"}`}
          >
            ☰
          </button>

          <Link href="/" className="flex items-center gap-2.5 py-2 transition-all">
            <Logo size={scrolled ? 40 : 48} className="transition-all" />
            <BrandMark size={scrolled ? "sm" : "md"} theme={onRed ? "dark" : "light"} />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-underline font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${
                  onRed ? "text-white hover:text-[#FFD27A]" : "text-ink hover:text-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#locales"
            className={`hidden items-center gap-2 rounded-full border px-3.5 py-2 font-heading text-xs uppercase tracking-[1.5px] transition-colors xl:flex ${
              onRed ? "border-white/40 text-white hover:bg-white/10" : "border-line text-ink hover:border-red"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
            Madrid · Valencia
          </Link>

          {/* Por debajo de lg este botón duplica el de la barra fija inferior
              (StickyMobileCTA), y apretaba el logotipo. Se muestra solo en
              escritorio, donde esa barra no existe. */}
          <Link
            href="/monta-tu-taco"
            className={
              onRed
                ? "hidden rounded-full bg-white px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-red-dark shadow-[0_10px_24px_rgba(80,0,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5 lg:inline-block"
                : "btn-shine group/btn neon-cta hidden rounded-full bg-gradient-to-br from-red to-red-dark px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-red-glow hover:to-red hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] active:translate-y-0 active:scale-[0.97] lg:inline-block"
            }
          >
            Monta Tu Tacos
          </Link>

          {/* En móvil, las ciudades hacen de contrapeso a la hamburguesa y
              dejan el logotipo centrado. */}
          <Link
            href="/#locales"
            aria-label="Nuestros locales en Madrid y Valencia"
            className={`flex flex-col gap-1 font-heading text-[0.6rem] uppercase leading-none tracking-[1.5px] lg:hidden ${
              onRed ? "text-white" : "text-ink"
            }`}
          >
            {["Madrid", "Valencia"].map((c) => (
              <span key={c} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                {c}
              </span>
            ))}
          </Link>
        </div>
      </header>
    </>
  );
}
