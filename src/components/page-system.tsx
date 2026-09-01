import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import * as ds from "@/lib/design-system";

/** Sección estándar: mismo padding vertical en todo el sitio. */
export function Section({
  children,
  tone = "cream",
  border = true,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "cream" | "paper" | "teal" | "green" | "lime";
  border?: boolean;
  size?: "default" | "header" | "cta";
  className?: string;
}) {
  const tones = {
    cream: "bg-fin-cream",
    paper: "bg-white/50",
    teal: "bg-fin-teal",
    green: "bg-fin-green",
    lime: "bg-fin-lime",
  } as const;
  const pad =
    size === "header" ? ds.sectionPadHeader : size === "cta" ? ds.sectionPadCta : ds.sectionPad;
  return (
    <section className={`${tones[tone]} ${border ? "border-b border-fin-line" : ""}`}>
      <div className={`${ds.container} ${pad} ${className}`}>{children}</div>
    </section>
  );
}

/**
 * Encabezado de página — patrón estándar del sistema.
 * variant "cream": eyebrow + H1 a la izquierda, párrafo de apoyo a la derecha.
 * variant "solid": mismo esqueleto sobre bloque teal. Reservado a páginas de
 * identidad editorial (Nosotros, Blog).
 */
export function PageHeader({
  eyebrow,
  title,
  support,
  variant = "cream",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  support?: ReactNode;
  variant?: "cream" | "solid";
  children?: ReactNode;
}) {
  const solid = variant === "solid";
  return (
    <section className={solid ? "bg-fin-teal" : "border-b border-fin-line bg-fin-cream"}>
      <div className={`${ds.container} ${ds.sectionPadHeader}`}>
        <div className="grid gap-8 md:grid-cols-[6fr_5fr] md:gap-12">
          <div>
            <p className={solid ? `${ds.eyebrow} text-fin-lime` : ds.eyebrow}>{eyebrow}</p>
            <h1 className={`title-enter mt-5 ${ds.h1} ${solid ? "text-fin-cream" : "text-fin-teal"}`}>
              {title}
            </h1>
          </div>
          {support ? (
            <p
              className={`max-w-md self-end ${ds.lead} ${
                solid ? "text-fin-cream/80" : "text-fin-ink/75"
              }`}
            >
              {support}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  tone = "teal",
  className = "",
}: {
  children: ReactNode;
  tone?: "teal" | "cream";
  className?: string;
}) {
  return (
    <h2
      className={`${ds.h2} ${tone === "cream" ? "text-fin-cream" : "text-fin-teal"} ${className}`}
    >
      {children}
    </h2>
  );
}

/** Cierre de sección con CTA: siempre bloque sólido teal + botón lima. */
export function CtaBlock({
  title,
  action,
  to = "/contacto",
  href,
}: {
  title: string;
  action: string;
  to?: "/contacto" | "/servicios" | "/proceso";
  href?: string;
}) {
  return (
    <section className="bg-fin-teal">
      <div
        className={`${ds.container} ${ds.sectionPadCta} flex flex-col gap-8 md:flex-row md:items-end md:justify-between`}
      >
        <h2 className={`max-w-xl ${ds.h2} text-fin-cream`}>{title}</h2>
        {href ? (
          <a href={href} className={ds.btnLime}>
            {action}
          </a>
        ) : (
          <Link to={to} className={ds.btnLime}>
            {action}
          </Link>
        )}
      </div>
    </section>
  );
}

export function StepNumber({ n }: { n: number | string }) {
  return (
    <span className={ds.numberBox}>
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}
