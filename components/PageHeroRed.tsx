import type { ReactNode } from "react";

type PageHeroRedProps = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  /** Palabra gigante y casi transparente de fondo (solo escritorio). */
  watermark?: string;
  image?: { src: string; alt: string; width: number; height: number; className: string };
  children?: ReactNode;
};

/**
 * Cabecera roja de página con el mismo rojo y la misma tipografía que la
 * portada: así la carta y Monta Tu Taco abren con la misma presencia de marca.
 */
export default function PageHeroRed({ eyebrow, title, text, watermark, image, children }: PageHeroRedProps) {
  return (
    <section className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_60%_80%_at_75%_55%,#E3151F_0%,rgba(199,12,24,0)_70%),linear-gradient(180deg,#C70C18_0%,#C70C18_55%,#A00812_100%)] text-white">
      {watermark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-2 hidden select-none font-heading text-[20rem] font-bold leading-none tracking-[-0.04em] text-white/[0.06] lg:block"
        >
          {watermark}
        </span>
      )}
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-6 px-5 pb-12 pt-8 sm:px-8 md:pb-16 md:pt-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-4 md:gap-5">
          <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="font-heading text-[2.9rem] font-bold uppercase leading-[0.92] sm:text-6xl lg:text-[5.4rem]">{title}</h1>
          {text && <p className="max-w-[520px] text-base leading-relaxed text-white/90 md:text-lg">{text}</p>}
          {children}
        </div>
        {image && (
          <div className="relative mx-auto flex h-[210px] w-full max-w-[420px] items-center justify-center sm:h-[300px] lg:h-[380px] lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute aspect-square h-full rounded-full border-2 border-dashed border-[#FFD27A]/35"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              className={`relative drop-shadow-[0_30px_30px_rgba(60,0,0,0.55)] ${image.className}`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
