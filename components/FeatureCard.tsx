import Link from "next/link";

type FeatureCardProps = {
  title: string;
  subtitle: string;
  href: string;
  ctaLabel?: string;
  image?: string;
  large?: boolean;
};

/** Card grande de categoría, estilo o-tacos.com (Cro'usty / À Composer / O'Boss). */
export default function FeatureCard({ title, subtitle, href, ctaLabel = "¿Qué es?", image, large = false }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={`group neon-ring-hover relative block overflow-hidden rounded-xl3 shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-cardHover ${
        large ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/5]"
      }`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 ph-block">
          FOTO
          <br />
          {title}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="font-heading font-bold uppercase text-white text-2xl md:text-3xl mb-1">{title}</h3>
        <p className="text-white/90 font-semibold text-sm mb-4">{subtitle}</p>
        <span className="inline-block rounded-full bg-white text-ink font-heading text-xs font-semibold uppercase tracking-wide px-5 py-2.5 transition-colors group-hover:bg-red group-hover:text-white">
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}
