"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { heroSlides } from "@/data/videos";
import { siteConfig } from "@/data/siteConfig";
import MediaBackground from "./MediaBackground";
import { StarIcon } from "./ValueIcons";

export default function HeroSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(_swiper, _time, percentage) => setProgress(1 - percentage)}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <MediaBackground
                video={slide.video}
                fallbackImage={slide.fallbackImage}
                alt={slide.title}
                className="hero-video-zoom"
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

                  <h1 className="font-heading font-bold uppercase text-white text-5xl md:text-7xl leading-[0.98] mt-4 mb-3 drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 text-base md:text-xl mb-7 max-w-md">{slide.subtitle}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Link
                      href={slide.ctaHref}
                      className="btn-shine inline-block rounded-full bg-red px-8 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-white shadow-cardHover transition-transform hover:-translate-y-0.5 hover:bg-red-glow"
                    >
                      {slide.ctaLabel}
                    </Link>
                    {/* Acción fija y distinta del CTA de cada diapositiva,
                        para que nunca salgan dos botones repetidos. */}
                    <a
                      href="#visitanos"
                      className="inline-block rounded-full border-2 border-white/80 px-8 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
                    >
                      Pedir a domicilio
                    </a>
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
