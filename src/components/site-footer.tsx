import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { socialLinks } from "@/lib/social-links";

const columns = [
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", to: "/nosotros" as const },
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
              {socialLinks.map((s) => (
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
