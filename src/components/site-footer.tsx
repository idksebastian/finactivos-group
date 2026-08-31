import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";

const columns = [
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", to: "/nosotros" as const },
      { label: "Proceso", to: "/proceso" as const },
      { label: "Blog", to: "/blog" as const },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Compra de sentencias", to: "/servicios/compra-de-sentencias" as const },
      { label: "Factoring", to: "/servicios/factoring" as const },
      { label: "Inversión", to: "/servicios/inversion" as const },
    ],
  },
  {
    title: "Atención",
    links: [{ label: "Contacto", to: "/contacto" as const }],
  },
];


const social = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/finactivosgroupsas",
    path: "M12 2.2c2.72 0 3.04.01 4.12.06 1.06.05 1.79.22 2.43.47a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.25.64.42 1.37.47 2.43.05 1.08.06 1.4.06 4.12s-.01 3.04-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.08.05-1.4.06-4.12.06s-3.04-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.21 15.04 2.2 14.72 2.2 12s.01-3.04.06-4.12c.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.65 2.53c.64-.25 1.37-.42 2.43-.47C9.16 2.01 9.48 2 12.2 2ZM12 6.86A5.14 5.14 0 1 0 12 17.14 5.14 5.14 0 0 0 12 6.86Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm5.34-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1JJKLhXq8h/",
    path: "M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.3 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.16H8v2.96h2.52V21h3Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/finactivos-group-sas-13987224a/",
    path: "M6.94 8.5H3.56V20.5h3.38V8.5ZM5.25 3.25a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.5 20.5h-3.37v-6.29c0-1.5-.03-3.43-2.09-3.43-2.1 0-2.42 1.64-2.42 3.32v6.4H9.25V8.5h3.24v1.64h.05c.45-.86 1.56-1.76 3.21-1.76 3.44 0 4.07 2.26 4.07 5.2v6.92Z",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-fin-teal text-fin-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" aria-label="Finactivos Group — Inicio">
              <BrandLogo tone="cream" />
            </Link>

            <p className="mt-4 max-w-xs font-sans text-base leading-relaxed text-fin-cream/85">
              Compra de sentencias y conciliaciones de reparación directa, factoring e inversión con
              respaldo jurídico.
            </p>
            <p className="mt-6 font-sans text-sm uppercase tracking-[0.18em] text-fin-cream/60">
              NIT 901.389.322-5
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-fin-lime">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-sans text-base text-fin-cream/85 transition-colors hover:text-fin-lime"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-fin-cream/20 pt-8 md:grid-cols-3">
          <div className="font-sans text-base leading-relaxed text-fin-cream/85">
            <p className="font-semibold text-fin-cream">Oficina</p>
            <p className="mt-1.5">
              Cll 28 No. 13a 24, Oficina 303
              <br />
              Parque Bavaria — Torre Museo, Bogotá
            </p>
          </div>
          <div className="font-sans text-base leading-relaxed text-fin-cream/85">
            <p className="font-semibold text-fin-cream">Contacto</p>
            <p className="mt-1.5">
              <a href="tel:+573128085632" className="hover:text-fin-lime">
                312 808 5632
              </a>
              <br />
              <a href="tel:+573134537849" className="hover:text-fin-lime">
                313 453 7849
              </a>
              <br />
              <a href="mailto:comercial@finactivos.com" className="hover:text-fin-lime">
                comercial@finactivos.com
              </a>
              <br />
              Lunes a viernes, 8:00 am – 5:00 pm
            </p>
          </div>
          <div className="font-sans text-base text-fin-cream/85">
            <p className="font-semibold text-fin-cream">Síganos</p>
            <ul className="mt-3 flex items-center gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-fin-cream/30 text-fin-cream/85 transition-colors hover:border-fin-lime hover:text-fin-lime"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-fin-cream/20 pt-6">
          <p className="font-sans text-sm text-fin-cream/60">
            © {new Date().getFullYear()} Finactivos Group S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex gap-5 font-sans text-sm text-fin-cream/60">
            <Link to="/terminos-y-condiciones" className="hover:text-fin-lime">
              Términos y condiciones
            </Link>
            <Link to="/politica-de-privacidad" className="hover:text-fin-lime">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
