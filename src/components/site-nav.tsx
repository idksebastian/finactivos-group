import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const otherServices = [
  { label: "Factoring", to: "/servicios/factoring" as const },
  { label: "Inversión", to: "/servicios/inversion" as const },
];

const items = [
  { label: "Compra de sentencias", to: "/servicios/compra-de-sentencias" as const },
  { label: "Proceso", to: "/proceso" as const },
  { label: "Nosotros", to: "/nosotros" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contacto", to: "/contacto" as const },
] as const;

function OtherServicesDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 font-sans text-sm text-fin-ink/70 transition-colors hover:text-fin-teal"
      >
        Otros servicios
        <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-current" aria-hidden="true">
          <path d="M6 8 0 0h12L6 8Z" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-52 rounded-[3px] border border-fin-line bg-white py-2 shadow-lg"
        >
          {otherServices.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              role="menuitem"
              className="block px-4 py-2.5 font-sans text-sm text-fin-ink/75 transition-colors hover:bg-fin-cream hover:text-fin-teal"
            >
              {s.label}
            </Link>
          ))}
          <Link
            to="/servicios"
            role="menuitem"
            className="block border-t border-fin-line px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-fin-green transition-colors hover:text-fin-teal"
          >
            Ver todos
          </Link>
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-fin-line bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Finactivos Group — Inicio">
          <BrandLogo markSize="large" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to={items[0].to}
            className="font-sans text-sm text-fin-ink/70 transition-colors hover:text-fin-teal"
            activeProps={{ className: "text-fin-teal font-medium" }}
          >
            {items[0].label}
          </Link>
          <OtherServicesDropdown />
          {items.slice(1).map((i) => (
            <Link
              key={i.label}
              to={i.to}
              className="font-sans text-sm text-fin-ink/70 transition-colors hover:text-fin-teal"
              activeProps={{ className: "text-fin-teal font-medium" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/servicios/compra-de-sentencias"
            className="hidden rounded-[3px] bg-fin-teal px-4 py-2 font-sans text-sm font-medium text-fin-cream transition-colors hover:bg-fin-green sm:inline-block"
          >
            Evalúe su sentencia
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="block h-px w-5 bg-fin-ink" />
            <span className="block h-px w-5 bg-fin-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-fin-line px-6 py-4 md:hidden">
          {items.map((i) => (
            <Link
              key={i.label}
              to={i.to}
              onClick={() => setOpen(false)}
              className="block border-b border-fin-line/70 py-3 font-sans text-sm text-fin-ink"
            >
              {i.label}
            </Link>
          ))}
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-green">
            Otros servicios
          </p>
          {otherServices.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              onClick={() => setOpen(false)}
              className="block border-b border-fin-line/70 py-3 font-sans text-sm text-fin-ink"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
