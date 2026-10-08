import Link from "next/link";
import BrandMark from "./BrandMark";
import Logo from "./Logo";
import { footerAboutLinks, footerLegalLinks, footerProductLinks } from "@/data/navigation";
import { mapsUrl, siteConfig } from "@/data/siteConfig";
import { valenciaLaunch } from "@/data/valenciaLaunch";

const SOCIAL = [
  { nombre: "Instagram", handle: siteConfig.social.instagramHandle, href: siteConfig.social.instagram },
  { nombre: "TikTok", handle: siteConfig.social.tiktokHandle, href: siteConfig.social.tiktok },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="mb-5 flex items-center gap-2 font-heading text-xs uppercase tracking-[3px] text-[#FFD27A]">
      <span className="h-px w-5 bg-[#FFD27A]/60" aria-hidden="true" />
      {children}
    </h5>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-heading text-[0.95rem] uppercase tracking-[1px] text-white/80 transition-colors hover:text-white"
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-red opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
      {children}
    </Link>
  );
}

/**
 * Pie de franquicia: marca grande con redes, columnas de carta y marca, una
 * ficha por local y el nombre gigante en contorno cerrando la página.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-16 text-white md:pt-20 lg:pb-10">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-red/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Marca + redes */}
        <div className="flex flex-col items-center gap-8 border-b border-white/10 pb-12 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Logo size={84} />
            <div className="flex flex-col items-center gap-3 md:items-start">
              <BrandMark size="lg" theme="dark" />
              <p className="font-heading text-xs uppercase tracking-[3px] text-white/60">
                Original French Tacos · Hecho al momento · 100 % Halal
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.nombre}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-left transition-colors hover:border-red hover:bg-red"
              >
                <span className="font-heading text-[0.65rem] uppercase tracking-[2px] text-white/60">{s.nombre}</span>
                <span className="font-heading text-base uppercase tracking-[1px]">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Columnas */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.3fr]">
          <div>
            <ColumnTitle>La carta</ColumnTitle>
            <ul className="space-y-3">
              {footerProductLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>La Firma</ColumnTitle>
            <ul className="space-y-3">
              {footerAboutLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-2xl font-bold uppercase leading-none">Madrid</span>
              <span className="flex items-center gap-1.5 font-heading text-[0.65rem] uppercase tracking-[1.5px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                Castellana
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{siteConfig.location.address}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              {siteConfig.location.scheduleGroups.map((g) => (
                <li key={g.dias} className="flex justify-between gap-3">
                  <span className="text-white/90">{g.dias}</span>
                  <span className="text-right">{g.turnos.join(" · ")}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={mapsUrl(siteConfig.location.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-[#FFD27A]"
              >
                Cómo llegar
              </a>
              <a
                href={siteConfig.location.phoneHref}
                className="rounded-full border border-white/25 px-4 py-2 font-heading text-xs uppercase tracking-wide transition-colors hover:border-white"
              >
                {siteConfig.location.phone}
              </a>
            </div>
            <a
              href={`mailto:${siteConfig.location.email}`}
              className="mt-3 block text-xs text-white/55 hover:text-white"
            >
              {siteConfig.location.email}
            </a>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-2xl font-bold uppercase leading-none">Valencia</span>
              <span className="flex items-center gap-1.5 font-heading text-[0.65rem] uppercase tracking-[1.5px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FCB6B]" aria-hidden="true" />
                Paterna · nuevo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {valenciaLaunch.location.fullAddress.replace(", España", "")}
            </p>
            <p className="mt-4 text-sm text-white/70">Pedidos a domicilio en Uber Eats.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/valencia"
                className="rounded-full bg-white px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-[#FFD27A]"
              >
                Ver local y pedir
              </Link>
              <a
                href={mapsUrl(valenciaLaunch.location.fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-4 py-2 font-heading text-xs uppercase tracking-wide transition-colors hover:border-white"
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>

        {/* Nombre gigante en contorno */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none text-center font-heading text-[19vw] font-bold uppercase leading-[0.8] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)] lg:text-[15rem]"
        >
          La Firma
        </div>

        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <span>© {new Date().getFullYear()} La Firma Tacos. Todos los derechos reservados.</span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
