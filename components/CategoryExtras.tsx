import { formatPrice, type CategoryExtra } from "@/data/products";

/**
 * Tira de extras bajo una categoría de la carta: suplementos y/o gratinados
 * disponibles para esos productos, con su precio.
 */
export default function CategoryExtras({ extras }: { extras: CategoryExtra[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
      <div className="flex flex-col divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0">
        {extras.map((extra) => (
          <div key={extra.label} className="flex-1 px-6 py-5">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
                {extra.label}
              </span>
              <span className="rounded-full bg-red px-2.5 py-0.5 font-heading text-[0.65rem] font-bold uppercase tracking-wide text-white">
                +{formatPrice(extra.price)}
              </span>
            </div>
            <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
              {extra.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-bgsoft px-3 py-1 font-heading text-xs font-semibold uppercase tracking-wide text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
