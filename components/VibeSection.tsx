"use client";

import { vibeItems } from "@/data/videos";
import Reveal from "./Reveal";

export default function VibeSection() {
  return (
    <section id="local" className="py-20 md:py-24 bg-bgsoft">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="eyebrow-neon font-heading text-sm font-semibold uppercase tracking-[3px] text-red">
              El Ambiente
            </span>
            <h2 className="font-heading font-bold uppercase text-3xl md:text-4xl text-ink mt-2">
              La Firma Vibe
            </h2>
            <p className="text-ink-soft mt-3">
              Calle, sabor y buena mesa en pleno Paseo de la Castellana.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {vibeItems.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.08}
              className="w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl2 shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".vibe-fallback")) {
                      const div = document.createElement("div");
                      div.className = "vibe-fallback ph-block h-full w-full";
                      div.innerText = "FOTO PENDIENTE";
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
