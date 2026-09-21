const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const lime = "var(--fin-lime)";

const ICONS = {
  reloj: (
    <>
      <circle cx="28" cy="36" r="18" />
      <path d="M24 12h8M28 12v6M28 36V26M28 36l7 4" />
      <rect x="36" y="42" width="24" height="14" rx="2" fill={lime} />
      <circle cx="48" cy="49" r="3.5" />
    </>
  ),
  escudo: (
    <>
      <path d="M32 6l20 7v18c0 13-9 22-20 27C21 53 12 44 12 31V13l20-7Z" />
      <rect x="23" y="30" width="18" height="14" rx="2.5" fill={lime} />
      <path d="M27 30v-5a5 5 0 0 1 10 0v5" />
    </>
  ),
  documentos: (
    <>
      <path d="M16 8h20l8 8v30H16Z" />
      <path d="M36 8v8h8M22 24h16M22 31h16M22 38h10" />
      <rect x="38" y="34" width="20" height="22" rx="3" fill={lime} />
      <path d="M43 45l4 4 7-8" />
    </>
  ),
  cobranza: (
    <>
      <rect x="14" y="12" width="30" height="42" rx="3" />
      <path d="M22 12V9h14v3M21 26h16M21 33h16M21 40h9" />
      <circle cx="46" cy="44" r="11" fill={lime} />
      <path d="M41 44l4 4 7-8" />
    </>
  ),
  balanza: (
    <>
      <path d="M32 10v40M20 54h24M12 20h40" />
      <path d="M12 20L8 36M12 20l16 16M52 20L36 36M52 20l4 16" />
      <path d="M8 36h20c0 6-4 9-10 9s-10-3-10-9Z" fill={lime} />
      <path d="M36 36h20c0 6-4 9-10 9s-10-3-10-9Z" />
    </>
  ),
  estado: (
    <>
      <path d="M8 24L32 10l24 14Z" fill={lime} />
      <path d="M15 30v18M27 30v18M37 30v18M49 30v18" />
      <path d="M10 54h44M12 48h40" />
    </>
  ),
  lupa: (
    <>
      <circle cx="28" cy="28" r="17" fill={lime} />
      <path d="M40.5 40.5L54 54" />
      <path d="M20 28l6 6 10-11" />
    </>
  ),
  grafica: (
    <>
      <path d="M10 10v44h46" />
      <rect x="18" y="38" width="8" height="16" rx="1" />
      <rect x="31" y="28" width="8" height="26" rx="1" />
      <rect x="44" y="16" width="8" height="38" rx="1" fill={lime} />
    </>
  ),
};

export type InfoItem = { icon: keyof typeof ICONS; t: string; d: string };

export function InfoIcon({ name, className = "h-20 w-20" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...stroke}>
      {ICONS[name]}
    </svg>
  );
}

/** Tarjeta de infografía: ícono grande, título y descripción centrados. */
export function InfoCard({
  item,
  tone = "light",
  className = "",
}: {
  item: InfoItem;
  tone?: "light" | "teal";
  className?: string;
}) {
  const teal = tone === "teal";
  return (
    <div
      className={`flex flex-col items-center rounded-[6px] border px-5 py-7 text-center ${
        teal ? "border-fin-teal bg-fin-teal" : "border-fin-line bg-white"
      } ${className}`}
    >
      <InfoIcon name={item.icon} className={`h-20 w-20 ${teal ? "text-fin-cream" : "text-fin-teal"}`} />
      <p
        className={`mt-4 font-display text-base font-bold leading-tight ${
          teal ? "text-fin-cream" : "text-fin-teal"
        }`}
      >
        {item.t}
      </p>
      <p
        className={`mt-2 font-sans text-sm leading-relaxed ${
          teal ? "text-fin-cream/80" : "text-fin-ink/70"
        }`}
      >
        {item.d}
      </p>
    </div>
  );
}
