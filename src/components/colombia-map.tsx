import { useState } from "react";
import { departments, COLOMBIA_VIEWBOX } from "@/lib/colombia-departments-data";
import { departmentCapitals } from "@/lib/colombia-department-capitals";

/**
 * Mapa interactivo de Colombia: cada departamento es una figura clicable
 * que muestra su nombre y su capital. San Andrés y Providencia no viene
 * como un trazo aprovechable en la fuente original, así que se representa
 * como un marcador propio en la esquina superior izquierda.
 * Geometría con atribución en el pie del componente.
 */
export function ColombiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = hovered ?? selected;

  return (
    <div>
      <svg
        viewBox={COLOMBIA_VIEWBOX}
        role="img"
        aria-label="Mapa de cobertura de Finactivos Group en Colombia, por departamento"
        className="mx-auto h-auto w-full max-w-md"
      >
        {departments.map((dep) => {
          const isActive = active === dep.name;
          const fillClass = isActive
            ? "fill-fin-lime"
            : "fill-fin-teal/15 hover:fill-fin-teal/35";
          const common = {
            onMouseEnter: () => setHovered(dep.name),
            onMouseLeave: () => setHovered(null),
            onFocus: () => setHovered(dep.name),
            onBlur: () => setHovered(null),
            onClick: () => setSelected((s) => (s === dep.name ? null : dep.name)),
            tabIndex: 0,
            role: "button" as const,
            "aria-label": dep.name,
          };

          if ("marker" in dep) {
            return (
              <circle
                key={dep.name}
                cx={dep.marker.cx}
                cy={dep.marker.cy}
                r={dep.marker.r}
                stroke="var(--fin-cream)"
                strokeWidth={2}
                className={`cursor-pointer outline-none transition-colors duration-200 ${fillClass}`}
                {...common}
              >
                <title>{dep.name}</title>
              </circle>
            );
          }

          return (
            <path
              key={dep.name}
              d={dep.d}
              stroke="var(--fin-cream)"
              strokeWidth={2}
              strokeLinejoin="round"
              className={`cursor-pointer outline-none transition-colors duration-200 ${fillClass}`}
              {...common}
            >
              <title>{dep.name}</title>
            </path>
          );
        })}
      </svg>

      <div className="mt-6 flex min-h-14 flex-col items-center justify-center gap-1.5">
        {active ? (
          <>
            <span className="rounded-[3px] bg-fin-teal px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-fin-cream">
              {active}
            </span>
            {departmentCapitals[active] && (
              <span className="font-sans text-xs text-fin-ink/60">
                Capital: {departmentCapitals[active]}
              </span>
            )}
          </>
        ) : (
          <span className="font-sans text-sm text-fin-ink/50">
            Seleccione un departamento
          </span>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-[10px] leading-relaxed text-fin-ink/35">
        Mapa base: Milenioscuro / Wikimedia Commons (CC BY-SA 4.0)
      </p>
    </div>
  );
}
