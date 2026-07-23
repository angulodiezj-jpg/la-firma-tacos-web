"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 550);
    const removeTimer = setTimeout(() => setVisible(false), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className={`transition-all duration-500 ${fading ? "scale-95" : "scale-100"}`}>
        <Logo size={140} />
      </div>
    </div>
  );
}
