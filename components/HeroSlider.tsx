"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { heroSlides } from "@/data/videos";
import MediaBackground from "./MediaBackground";

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
    <section className="relative h-[calc(100vh-96px)] md:h-[80vh] w-full overflow-hidden bg-ink">
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
              <MediaBackground video={slide.video} fallbackImage={slide.fallbackImage} alt={slide.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div
                className="ambient-glow hidden md:block h-72 w-72 -top-10 -right-10 mix-blend-screen"
                aria-hidden="true"
              />
              <div
                className="ambient-glow h-64 w-64 -bottom-16 -left-16 mix-blend-screen"
                style={{ animationDelay: "2.4s" }}
                aria-hidden="true"
              />

              <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-16 pb-32 md:pb-0">
                <div className="max-w-lg animate-fadeUp">
                  <span className="font-heading text-xs md:text-sm font-semibold uppercase tracking-[3px] text-gold">
                    {slide.eyebrow}
                  </span>
                  <h1 className="font-heading font-bold uppercase text-white text-4xl md:text-6xl leading-[1.02] mt-2 mb-3">
                    {slide.title}
                  </h1>
                  <p className="text-white/85 text-base md:text-lg mb-6">{slide.subtitle}</p>
                  <Link
                    href={slide.ctaHref}
                    className="btn-shine neon-cta inline-block rounded-full bg-gradient-to-r from-gold to-orange text-white font-heading font-semibold uppercase tracking-wide text-sm px-8 py-3.5 transition-transform hover:-translate-y-0.5"
                  >
                    {slide.ctaLabel}
                  </Link>
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
