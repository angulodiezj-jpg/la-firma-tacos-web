"use client";

import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { locales, siteConfig } from "@/data/siteConfig";
import BrandMark from "./BrandMark";
import Logo from "./Logo";

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
      <button aria-label="Cerrar menú" onClick={onClose} className="absolute inset-0 bg-black/60" />

      {/* Panel deslizante */}
      <div
        className={`absolute left-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-[#C70C18] bg-[radial-gradient(ellipse_90%_60%_at_80%_20%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#A00812_100%)] text-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <Logo size={44} />
            <BrandMark size="sm" theme="dark" />
          </div>
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-lg"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4">
          {mainNav.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-baseline gap-4 border-b border-white/15 py-3.5 font-heading text-[1.7rem] font-bold uppercase leading-none transition-colors hover:text-[#FFD27A]"
            >
              <span className="w-6 text-xs font-normal text-[#FFD27A]/80">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-6 mt-4 flex flex-col gap-4 rounded-[22px] bg-black/20 p-5">
          {locales.map((l) => (
            <div key={l.id} className="flex flex-col gap-2">
              <span className="flex items-center gap-2 font-heading text-sm uppercase tracking-[2px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                {l.ciudad} <span className="text-white/60">· {l.zona}</span>
              </span>
              <div className="flex gap-2">
                {l.pedir.map((o) => (
                  <a
                    key={o.plataforma}
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 rounded-full px-4 py-2.5 text-center font-heading text-xs font-bold uppercase tracking-[1.5px] ${
                      o.plataforma === "Glovo" ? "bg-white text-red-dark" : "bg-ink text-white"
                    }`}
                  >
                    {o.plataforma} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex gap-3 px-6 pb-8 pt-8">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-2xl border border-white/25 px-4 py-3 font-heading text-sm uppercase tracking-[1px]"
          >
            Instagram
          </a>
          <a
            href={siteConfig.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-2xl border border-white/25 px-4 py-3 font-heading text-sm uppercase tracking-[1px]"
          >
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
}
