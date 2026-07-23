"use client";

import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";
import BrandMark from "./BrandMark";
import Logo from "./Logo";
import OrderButtons from "./OrderButtons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      {/* Overlay oscuro */}
      <button
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* Panel deslizante */}
      <div
        className={`absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-2.5">
            <Logo size={40} />
            <BrandMark size="sm" />
          </div>
          <button aria-label="Cerrar" onClick={onClose} className="text-2xl text-ink">
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-6">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 font-heading text-lg font-semibold uppercase tracking-wide text-ink border-b border-line hover:text-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6">
          <OrderButtons size="sm" />
        </div>

        <div className="mt-8 px-6 text-sm text-ink-soft">
          <p className="font-heading uppercase tracking-wide text-xs mb-2 text-gold-deep">Síguenos</p>
          <div className="flex gap-3">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="underline">
              Instagram
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="underline">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
