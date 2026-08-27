import Link from "next/link";
import Logo from "./Logo";
import { footerAboutLinks, footerLegalLinks, footerProductLinks } from "@/data/navigation";
import { mapsUrl, siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-ink text-[#cfc7c2] pt-16 pb-28 lg:pb-10">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo size={64} />
            <p className="mt-4 max-w-xs text-sm text-[#b5aca6]">
              Original French Tacos. El sabor de calle que está conquistando España, taco a taco.
            </p>
          </div>

          <div>
            <h5 className="font-heading text-xs uppercase tracking-wide text-white mb-4">Carta</h5>
            <ul className="space-y-2.5">
              {footerProductLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-underline text-sm text-[#b5aca6] hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-heading text-xs uppercase tracking-wide text-white mb-4">Nosotros</h5>
            <ul className="space-y-2.5">
              {footerAboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-underline text-sm text-[#b5aca6] hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-heading text-xs uppercase tracking-wide text-white mb-4">Visítanos</h5>
            <ul className="space-y-2.5 text-sm text-[#b5aca6]">
              <li>{siteConfig.location.address}</li>
              <li>
                <a
                  href={mapsUrl(siteConfig.location.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  📍 Cómo llegar
                </a>
              </li>
              <li>
                <a href={siteConfig.location.phoneHref} className="hover:text-white">
                  📞 {siteConfig.location.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.location.email}`} className="hover:text-white">
                  ✉️ {siteConfig.location.email}
                </a>
              </li>
            </ul>

            <h5 className="font-heading text-xs uppercase tracking-wide text-white mb-3 mt-6">Horario</h5>
            <ul className="space-y-1.5 text-sm text-[#b5aca6]">
              {siteConfig.location.scheduleGroups.map((g) => (
                <li key={g.dias}>
                  <span className="text-white/90">{g.dias}:</span> {g.turnos.join(" · ")}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-xs font-heading hover:bg-red hover:border-red transition-colors"
              >
                IG
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-xs font-heading hover:bg-red hover:border-red transition-colors"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-4 text-xs text-[#8f857f]">
          <div className="flex flex-wrap gap-4">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <span>© {new Date().getFullYear()} La Firma Tacos. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
