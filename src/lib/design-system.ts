/**
 * Sistema de diseño Finactivos — fuente única de verdad para tipografía,
 * espaciado, bloques sólidos y tratamiento de numeración.
 * Documentado en DESIGN-SYSTEM.md. No introducir tamaños ad-hoc en las páginas.
 */

/* Contenedor */
export const container = "mx-auto max-w-6xl px-6";

/* Espaciado vertical entre secciones (único en todo el sitio) */
export const sectionPad = "py-16 md:py-20";
export const sectionPadHeader = "py-20 md:py-24";
export const sectionPadCta = "py-20";

/* Escala tipográfica */
export const eyebrow =
  "font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-green";
export const h1 =
  "font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl";
export const h2 =
  "font-display text-3xl font-extrabold uppercase leading-tight tracking-tight";
export const h3 =
  "font-display text-base font-bold uppercase leading-tight tracking-tight";
export const lead = "font-sans text-base leading-relaxed";
export const body = "font-sans text-sm leading-relaxed";
export const caption = "font-sans text-xs leading-relaxed";

/* Numeración y badges — mismo radio (3px), mismo grosor (2px), misma familia de color */
export const numberText = "font-display text-sm font-bold text-fin-green";
export const numberBox =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-teal";
export const timeBadge =
  "inline-block rounded-[3px] bg-fin-lime px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-fin-teal";
export const dot = "h-3 w-3 rounded-[3px] bg-fin-lime ring-4 ring-fin-cream";

/* Botones */
export const btnLime =
  "inline-block self-start rounded-[3px] bg-fin-lime px-7 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-cream";
export const btnTeal =
  "inline-block self-start rounded-[3px] bg-fin-teal px-7 py-3 font-sans text-sm font-semibold text-fin-cream transition-colors hover:bg-fin-green";
export const linkUnderline =
  "inline-block border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal transition-colors hover:border-fin-teal";
