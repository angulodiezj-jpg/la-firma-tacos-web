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

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-line transition-shadow ${
          scrolled ? "shadow-card" : ""
        }`}
      >
        {pathname !== "/valencia" && (
          <Link
            href="/valencia"
            className="flex h-9 items-center justify-center gap-2 bg-ink px-4 text-center transition-colors hover:bg-black"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0 rounded-full bg-red">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-glow opacity-75" />
            </span>
            <span className="font-heading text-[0.68rem] font-semibold uppercase tracking-[1.5px] text-white sm:text-xs">
              Nueva Apertura: La Firma llega a Valencia
            </span>
            <span className="hidden font-heading text-[0.68rem] font-bold uppercase tracking-wide text-gold sm:inline">
              Descúbrelo →
            </span>
          </Link>
        )}
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 transition-all">
          <button
            aria-label="Abrir menú"
            onClick={onMenuOpen}
            className="text-red text-2xl leading-none"
          >
            ☰
          </button>

          <Link href="/" className="flex items-center gap-2.5 py-2 transition-all">
            <Logo size={scrolled ? 40 : 48} className="transition-all" />
            <BrandMark size={scrolled ? "sm" : "md"} />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-underline font-heading text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Por debajo de lg este botón duplica el de la barra fija inferior
              (StickyMobileCTA), y apretaba el logotipo. Se muestra solo en
              escritorio, donde esa barra no existe. */}
          <Link
            href="/monta-tu-taco"
            className="btn-shine group/btn neon-cta hidden rounded-full bg-gradient-to-br from-red to-red-dark px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(211,31,31,0.32)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-red-glow hover:to-red hover:shadow-[0_12px_34px_rgba(211,31,31,0.48),0_0_26px_4px_rgba(255,59,48,0.42)] active:translate-y-0 active:scale-[0.97] lg:inline-block"
          >
            Monta Tu Tacos
          </Link>

          {/* Contrapeso de la hamburguesa: sin él, al ocultar el botón el
              logotipo se iría al borde derecho en vez de quedar centrado. */}
          <span className="w-6 lg:hidden" aria-hidden="true" />
        </div>
      </header>
    </>
  );
}
