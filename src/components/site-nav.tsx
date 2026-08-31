import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
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

const navLink =
  "font-sans text-sm text-fin-cream/80 transition-colors hover:text-fin-lime";

function OtherServicesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1.5 ${navLink}`}
      >
        Otros servicios
        <svg
          viewBox="0 0 12 8"
          className={`h-2.5 w-2.5 fill-current transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 8 0 0h12L6 8Z" />
        </svg>
      </button>
      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[6px] border border-fin-line bg-white py-2 shadow-xl">
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
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-fin-green shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Finactivos Group — Inicio">
          <BrandLogo markSize="large" tone="cream" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to={items[0].to}
            className={navLink}
            activeProps={{ className: "text-fin-cream font-medium" }}
          >
            {items[0].label}
          </Link>
          <OtherServicesDropdown />
          {items.slice(1).map((i) => (
            <Link
              key={i.label}
              to={i.to}
              className={navLink}
              activeProps={{ className: "text-fin-cream font-medium" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="block h-px w-5 bg-fin-cream" />
          <span className="block h-px w-5 bg-fin-cream" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-fin-cream/20 px-6 py-4 md:hidden">
          {items.map((i) => (
            <Link
              key={i.label}
              to={i.to}
              onClick={() => setOpen(false)}
              className="block border-b border-fin-cream/15 py-3 font-sans text-sm text-fin-cream/90"
            >
              {i.label}
            </Link>
          ))}
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-lime">
            Otros servicios
          </p>
          {otherServices.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              onClick={() => setOpen(false)}
              className="block border-b border-fin-cream/15 py-3 font-sans text-sm text-fin-cream/90"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
