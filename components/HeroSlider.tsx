"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import { useEffect, useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { heroSlides } from "@/data/videos";
import { siteConfig } from "@/data/siteConfig";
import { ButtonLink } from "./Button";
import MediaBackground from "./MediaBackground";
import { StarIcon } from "./ValueIcons";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  // El vídeo no entra en la primera pintura: primero se ve la foto (rápida),
  // y solo cuando la página ha terminado de cargar se pide el vídeo de la
  // diapositiva activa. Sin vídeo con ahorro de datos, red lenta o si el
  // usuario prefiere menos movimiento.
  const [loadVideo, setLoadVideo] = useState(false);
  // Diapositivas cuya foto ya se ha pedido: la primera, y cada una cuando
  // pasa a ser la siguiente. Así no se descargan las tres fotos de golpe.
  const [warm, setWarm] = useState<Set<number>>(() => new Set([0, 1]));

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const slowNet = !!conn && (conn.saveData === true || /(^|-)2g|3g/.test(conn.effectiveType ?? ""));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slowNet || reducedMotion) return;
    const enable = () => setLoadVideo(true);
    if (document.readyState === "complete") enable();
    else window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, []);

  const togglePlay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (playing) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setPlaying(!playing);
  };

  return (
    <section className="relative h-[calc(100vh-132px)] md:h-[80vh] w-full overflow-hidden bg-ink">
      {/* Un único H1 que dice qué es la marca; los títulos de cada diapositiva son H2. */}
      <h1 className="sr-only">
        {siteConfig.brandFull} · {siteConfig.tagline} en Madrid
      </h1>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        speed={800}
        className="hero-swiper h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const i = swiper.realIndex;
          setActiveIndex(i);
          setWarm((prev) => new Set(prev).add(i).add((i + 1) % heroSlides.length));
        }}
        onAutoplayTimeLeft={(_swiper, _time, percentage) => setProgress(1 - percentage)}
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <MediaBackground
                video={slide.video}
                fallbackImage={slide.fallbackImage}
                alt={slide.title}
                className="hero-video-zoom"
                playVideo={loadVideo && i === activeIndex}
                deferred={!warm.has(i)}
                priority={i === 0}
              />
              {/* Velos de legibilidad. Los vídeos tienen zonas muy claras
                  (queso), donde el texto blanco se perdía: en móvil el velo
                  cubre en firme la mitad inferior, que es donde va el texto;
                  en escritorio se refuerza además por el lado izquierdo. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/25 md:from-black/85 md:via-black/45 md:to-black/20" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-16 pb-36 md:pb-0">
                <div className="max-w-xl animate-fadeUp">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/45 px-4 py-1.5 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5 shrink-0 rounded-full bg-red-glow">
                      <span className="absolute inset-0 animate-ping rounded-full bg-red-glow opacity-75" />
                    </span>
                    <span className="font-heading text-[0.68rem] md:text-xs font-semibold uppercase tracking-[3px] text-white">
                      {slide.eyebrow}
                    </span>
                  </span>

                  <h2 className="font-heading font-bold uppercase text-white text-5xl md:text-7xl leading-[0.98] mt-4 mb-3 drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-base md:text-xl mb-7 max-w-md">{slide.subtitle}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <ButtonLink href={slide.ctaHref} variant="primary" size="lg" arrow>
                      {slide.ctaLabel}
                    </ButtonLink>
                    {/* Acción fija y distinta del CTA de cada diapositiva,
                        para que nunca salgan dos botones repetidos. */}
                    <ButtonLink href="#locales" variant="outline" size="lg">
                      Pedir a domicilio
                    </ButtonLink>
                  </div>

                  {/* Señales de confianza: lo que busca quien no os conoce */}
                  <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85">
                    <li className="flex items-center gap-1.5 font-heading text-xs md:text-sm font-semibold uppercase tracking-wide">
                      <StarIcon className="h-4 w-4 shrink-0 text-gold" />
                      {siteConfig.rating.value} en {siteConfig.rating.source} · {siteConfig.rating.count} reseñas
                    </li>
                    <li className="hidden sm:block h-4 w-px bg-white/30" aria-hidden="true" />
                    <li className="font-heading text-xs md:text-sm font-semibold uppercase tracking-wide">
                      Hecho al momento
                    </li>
                    <li className="hidden sm:block h-4 w-px bg-white/30" aria-hidden="true" />
                    <li className="font-heading text-xs md:text-sm font-semibold uppercase tracking-wide">
                      100 % Halal
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controles: play/pause + barra de progreso + dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          aria-label={playing ? "Pausar" : "Reproducir"}
          onClick={togglePlay}
          className="text-white text-lg w-8 h-8 flex items-center justify-center"
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <div className="flex items-center gap-2">
          {heroSlides.map((slide, i) => (
            <div key={slide.id} className="relative h-1 w-10 rounded-full bg-white/30 overflow-hidden">
              {i === activeIndex && (
                <div
                  className="absolute inset-y-0 left-0 bg-gold"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
              {i < activeIndex && <div className="absolute inset-0 bg-gold" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
