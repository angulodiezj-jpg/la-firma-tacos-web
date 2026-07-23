"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import BrandMark from "./BrandMark";
import Logo from "./Logo";

type HeaderProps = {
  onMenuOpen: () => void;
};

export default function Header({ onMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

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

          <Link
            href="/monta-tu-taco"
            className="btn-shine neon-cta rounded-full bg-red px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:bg-red-glow"
          >
            Monta Tu Tacos
          </Link>
        </div>
      </header>
    </>
  );
}
