type LogoProps = {
  size?: number;
  className?: string;
};

/** Logo real circular de La Firma Tacos. */
export default function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/brand/logo-badge.jpg"
      alt="La Firma Tacos"
      className={`rounded-full object-cover shadow-card ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
