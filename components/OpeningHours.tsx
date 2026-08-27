import { siteConfig } from "@/data/siteConfig";
import { ClockIcon } from "./ValueIcons";

/**
 * Horario de apertura del local, agrupado como en el cartel de la puerta.
 * Es de lo primero que mira alguien antes de venir, así que va visible
 * junto a la dirección y no escondido en el pie.
 */
export default function OpeningHours() {
  return (
    <div className="mx-auto max-w-md rounded-xl2 border border-white/25 bg-black/20 p-5 backdrop-blur-sm">
      <p className="mb-4 flex items-center justify-center gap-2 font-heading text-sm font-bold uppercase tracking-[2px] text-gold">
        <ClockIcon className="h-4 w-4 shrink-0" />
        Horario
      </p>

      <dl className="space-y-3">
        {siteConfig.location.scheduleGroups.map((grupo) => (
          <div
            key={grupo.dias}
            className="flex flex-col gap-1 border-b border-white/15 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <dt className="font-heading text-xs font-semibold uppercase tracking-wide text-white/70">
              {grupo.dias}
            </dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-0.5 font-heading text-base font-bold text-white sm:justify-end">
              {grupo.turnos.map((turno) => (
                <span key={turno} className="whitespace-nowrap tabular-nums">
                  {turno}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
