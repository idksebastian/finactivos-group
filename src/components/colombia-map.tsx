import { useState } from "react";
import { departments, COLOMBIA_VIEWBOX } from "@/lib/colombia-departments-data";

/**
 * Mapa interactivo de Colombia: cada departamento es una figura clicable
 * que muestra su nombre. Geometría con atribución en el pie del componente.
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
        {departments.map((d) => {
          const isActive = active === d.name;
          return (
            <path
              key={d.name}
              d={d.d}
              transform={d.transform}
              onMouseEnter={() => setHovered(d.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(d.name)}
              onBlur={() => setHovered(null)}
              onClick={() => setSelected((s) => (s === d.name ? null : d.name))}
              tabIndex={0}
              role="button"
              aria-label={d.name}
              stroke="var(--fin-cream)"
              strokeWidth={2}
              strokeLinejoin="round"
              className={`cursor-pointer outline-none transition-colors duration-200 ${
                isActive ? "fill-fin-lime" : "fill-fin-teal/15 hover:fill-fin-teal/35"
              }`}
            >
              <title>{d.name}</title>
            </path>
          );
        })}
      </svg>

      <div className="mt-6 flex min-h-9 items-center justify-center">
        {active ? (
          <span className="rounded-[3px] bg-fin-teal px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-fin-cream">
            {active}
          </span>
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
