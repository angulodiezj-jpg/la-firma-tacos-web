"use client";

import { useEffect, useRef, useState } from "react";

type MediaBackgroundProps = {
  video?: string;
  fallbackImage?: string;
  alt: string;
  className?: string;
  /** Si es false se pinta solo la foto; el vídeo se monta cuando pasa a true. */
  playVideo?: boolean;
  /** Foto de la primera diapositiva: se pide con prioridad alta (es el LCP). */
  priority?: boolean;
  /** Diapositiva lejana: no se pide nada todavía, solo el fondo de marca. */
  deferred?: boolean;
};

/**
 * Cadena de fallback para fondos hero: vídeo → imagen (Ken Burns) → bloque
 * de marcador de posición. Si el vídeo no existe o falla la carga, cae
 * automáticamente a la imagen (o al placeholder si tampoco hay imagen).
 * `poster` = la misma imagen de fallback, para que nunca se vea un
 * fotograma negro mientras el vídeo carga sus primeros bytes.
 */
export default function MediaBackground({
  video,
  fallbackImage,
  alt,
  className = "",
  playVideo = true,
  priority = false,
  deferred = false,
}: MediaBackgroundProps) {
  const [videoFailed, setVideoFailed] = useState(!video);
  const [imageFailed, setImageFailed] = useState(!fallbackImage);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Red de seguridad: algunos navegadores ignoran el atributo autoPlay si el
  // vídeo se monta tras la carga inicial o si hay varios <video> a la vez.
  // Forzamos play() explícito y lo reintentamos si el navegador lo pausa.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || videoFailed || !playVideo) return;

    const tryPlay = () => {
      el.play().catch(() => {
        /* autoplay bloqueado por el navegador; se reintenta en el próximo evento */
      });
    };

    tryPlay();
    el.addEventListener("pause", tryPlay);
    return () => el.removeEventListener("pause", tryPlay);
  }, [videoFailed, video, playVideo]);

  if (deferred) {
    return <div className={`absolute inset-0 bg-ink ${className}`} aria-hidden="true" />;
  }

  if (!videoFailed && playVideo) {
    return (
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        src={video}
        poster={fallbackImage}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (!imageFailed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className={`absolute inset-0 w-full h-full object-cover kenburns-img ${className}`}
        src={fallbackImage}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        // @ts-expect-error -- fetchpriority aún no está en los tipos de React 18
        fetchpriority={priority ? "high" : "auto"}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={`absolute inset-0 ph-block ${className}`}>
      FOTO/VÍDEO PENDIENTE
      <br />
      {alt}
    </div>
  );
}
