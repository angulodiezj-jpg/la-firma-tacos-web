type MarqueeProps = {
  items: string[];
  /** "gold": franja dorada bajo la portada roja (el rojo no se vería sobre ella). */
  variant?: "red" | "gold";
  className?: string;
};

export default function Marquee({ items, variant = "red", className = "my-2" }: MarqueeProps) {
  const doubled = [...items, ...items];
  const gold = variant === "gold";

  return (
    <div
      className={`relative -rotate-[1.2deg] overflow-hidden py-3.5 shadow-cardHover ${gold ? "bg-gold" : "bg-red"} ${className}`}
    >
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap px-4 font-heading text-base font-bold uppercase tracking-[2.5px] after:ml-9 after:content-['★'] ${
              gold ? "text-ink after:text-red" : "text-white after:text-gold"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
