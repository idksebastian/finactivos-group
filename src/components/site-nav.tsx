import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const otherServices = [
  { label: "Factoring", to: "/servicios/factoring" as const },
  { label: "Inversión", to: "/servicios/inversion" as const },
];

/** Orden pedido por el cliente: Inicio, Nosotros, [Otros servicios], producto principal, Proceso, Blog, [Contacto]. */
const items = [
  { label: "Inicio", to: "/" as const, exact: true },
  { label: "Nosotros", to: "/nosotros" as const, exact: false },
  { label: "Compra de sentencias", to: "/servicios/compra-de-sentencias" as const, exact: false },
  { label: "Proceso", to: "/proceso" as const, exact: false },
  { label: "Blog", to: "/blog" as const, exact: false },
] as const;

const navLink =
  "font-sans text-sm text-fin-cream/80 transition-colors hover:text-fin-lime";

const ctaButton =
  "rounded-[3px] bg-fin-lime px-5 py-2 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-green hover:text-fin-cream";

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
        className={`flex items-center gap-1.5 hover:cursor-pointer ${navLink}`}
      >
        Otros servicios
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className={`h-3.5 w-3.5 stroke-current transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
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
    <header className="sticky top-0 z-40 bg-fin-teal shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label="Finactivos Group — Inicio"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <BrandLogo markSize="large" tone="cream" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to={items[0].to}
            className={navLink}
            activeOptions={{ exact: items[0].exact }}
            activeProps={{ className: "text-fin-cream font-medium" }}
          >
            {items[0].label}
          </Link>
          <Link
            to={items[1].to}
            className={navLink}
            activeProps={{ className: "text-fin-cream font-medium" }}
          >
            {items[1].label}
          </Link>
          <OtherServicesDropdown />
          {items.slice(2).map((i) => (
            <Link
              key={i.label}
              to={i.to}
              className={navLink}
              activeProps={{ className: "text-fin-cream font-medium" }}
            >
              {i.label}
            </Link>
          ))}
          <Link to="/contacto" className={ctaButton}>
            Contáctenos
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-5 bg-fin-cream transition-transform duration-300 ease-out ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-fin-cream transition-transform duration-300 ease-out ${
              open ? "translate-y-[-3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className={`border-t border-fin-cream/20 px-6 py-4 transition-[opacity,transform] duration-300 ease-out ${
              open ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
            }`}
          >
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
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className={`mt-4 block text-center ${ctaButton}`}
            >
              Contáctenos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
