import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#D31F1F",
          dark: "#A91414",
          glow: "#FF3B30",
        },
        gold: {
          DEFAULT: "#E8A923",
          deep: "#C8891A",
        },
        orange: "#FF7A1A",
        ink: {
          DEFAULT: "#1A1412",
          soft: "#5C524D",
        },
        cream: "#FFF7E8",
        line: "#ECE7E1",
        bgsoft: "#F6F4F1",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "18px",
        xl3: "26px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(26,20,18,0.08)",
        cardHover: "0 18px 44px rgba(26,20,18,0.14)",
      },
      keyframes: {
        tacoFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-9px) rotate(4deg)" },
        },
        badgePulse: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 8px 20px rgba(169,20,20,0.25)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 12px 30px rgba(169,20,20,0.35)" },
        },
        fabBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "12%": { transform: "translateY(-7px)" },
          "24%": { transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        progressBar: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        tacoFloat: "tacoFloat 3.2s ease-in-out infinite",
        badgePulse: "badgePulse 2.6s ease-in-out infinite",
        fabBounce: "fabBounce 2.8s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        kenburns: "kenburns 12s ease-out forwards",
        fadeUp: "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) forwards",
        slideInLeft: "slideInLeft 0.35s ease-out forwards",
        progressBar: "progressBar 1.4s ease-out 0.4s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
