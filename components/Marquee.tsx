type MarqueeProps = {
  items: string[];
};

export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative -rotate-[1.2deg] my-2 overflow-hidden bg-red py-3.5 shadow-cardHover">
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 font-heading text-base font-bold uppercase tracking-[2.5px] text-white after:ml-9 after:content-['★'] after:text-gold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
