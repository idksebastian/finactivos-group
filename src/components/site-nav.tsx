import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";


const items = [
  { label: "Servicios", to: "/servicios" },
  { label: "Proceso", to: "/proceso" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Blog", to: "/blog" },
  { label: "Contacto", to: "/contacto" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-fin-line bg-fin-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Finactivos Group — Inicio">
          <BrandLogo />
        </Link>


        <nav className="hidden gap-7 md:flex">
          {items.map((i) => (
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
            to="/contacto"
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
        </nav>
      )}
    </header>
  );
}
