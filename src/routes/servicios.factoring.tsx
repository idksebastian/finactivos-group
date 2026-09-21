import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/servicios/factoring")({
  head: () => ({
    meta: [
      { title: "Factoring de facturas | Finactivos Group" },
      {
        name: "description",
        content:
          "Anticipamos el pago de sus facturas de sus clientes. Liquidez en 24 a 48 horas, sin deuda bancaria.",
      },
      { property: "og:title", content: "Factoring | Finactivos Group" },
      {
        property: "og:description",
        content: "El costo oculto del capital atrapado: 30, 60 o 90+ días de espera. Nosotros los adelantamos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/servicios/factoring") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/servicios/factoring") }],
  }),
  component: Page,
});

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
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
};

type Item = { icon: keyof typeof ICONS; t: string; d: string };

function InfoCard({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center rounded-[6px] border border-fin-line bg-white px-5 py-7 text-center ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-20 w-20 text-fin-teal" aria-hidden="true" {...stroke}>
        {ICONS[item.icon]}
      </svg>
      <p className="mt-4 font-display text-base font-bold leading-tight text-fin-teal">{item.t}</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/70">{item.d}</p>
    </div>
  );
}

const ventajas: Item[] = [
  {
    icon: "reloj",
    t: "Liquidez en 24 a 48 horas",
    d: "Desembolso rápido de fondos directamente en su cuenta bancaria.",
  },
  {
    icon: "escudo",
    t: "Cero deuda bancaria",
    d: "Al ser venta de activos, no afecta su capacidad de endeudamiento financiero.",
  },
  {
    icon: "documentos",
    t: "Flexibilidad absoluta",
    d: "Usted decide estratégicamente qué facturas adelantar y en qué momento.",
  },
];

const gestion: Item[] = [
  {
    icon: "cobranza",
    t: "Gestión y cobranza integral",
    d: "Finactivos se encarga de toda la operación administrativa y de cobranza.",
  },
  {
    icon: "balanza",
    t: "Tasas basadas en el pagador",
    d: "Tarifas competitivas evaluando la solidez de sus clientes y no su deuda.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton fallbackTo="/servicios" />
      <main>
        <section className="border-b border-fin-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-green">
              Factoring
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-teal sm:text-5xl">
              El costo oculto del capital atrapado
            </h1>
            <div className="mt-8 max-w-2xl border-l-2 border-fin-lime pl-4">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-fin-green">
                ¿Qué es?
              </p>
              <p className="mt-2 font-sans text-base leading-relaxed text-fin-ink/75">
                Es la venta anticipada de sus facturas por cobrar a cambio de liquidez inmediata,
                sin esperar el plazo de pago de su cliente ni adquirir deuda bancaria.
              </p>
            </div>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-fin-ink/75">
              Esperar 30, 60 o más de 90 días por el pago de una factura ralentiza la operación y
              asfixia el flujo de caja. El factoring convierte esa cartera en efectivo ahora.
            </p>
          </div>
        </section>

        {/* infografía: ventajas de liquidez y gestión del riesgo */}
        <section className="border-b border-fin-line bg-fin-green">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="rounded-[6px] bg-fin-cream p-6 sm:p-10">
              <h2 className="mx-auto max-w-3xl text-center font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal sm:text-3xl">
                Factoring corporativo: liquidez estratégica y cero deuda
              </h2>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-0">
                <div className="lg:pr-10">
                  <p className="text-center font-display text-lg font-bold text-fin-teal">
                    Ventajas de <span className="text-fin-green">liquidez y crédito</span>
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {ventajas.map((v, i) => (
                      <InfoCard
                        key={v.t}
                        item={v}
                        className={i === 2 ? "sm:col-span-2 sm:mx-auto sm:max-w-xs" : ""}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-fin-line pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <p className="text-center font-display text-lg font-bold text-fin-teal">
                    Gestión estratégica <span className="text-fin-green">del riesgo</span>
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {gestion.map((g) => (
                      <InfoCard key={g.t} item={g} />
                    ))}
                  </div>
                  <figure className="mt-4 border-l-4 border-fin-lime bg-white px-6 py-5">
                    <blockquote className="font-display text-lg font-bold leading-snug text-fin-teal">
                      “Cambiar de activo es cambiar de riesgo”
                    </blockquote>
                    <figcaption className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/70">
                      Diversificación inteligente transformando cuentas por cobrar en el motor de su
                      portafolio.
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-fin-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
                A quién está dirigido
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Empresas proveedoras del Estado con facturas radicadas y aceptadas.",
                  "Compañías con contratos de tracto sucesivo y pagos diferidos.",
                  "Pymes en crecimiento que necesitan capital de trabajo sin endeudarse.",
                  "Contratistas cuyo cobro depende de trámites administrativos largos.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 font-sans text-sm leading-relaxed text-fin-ink/75">
                    <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-[1px] bg-fin-green" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-0 border-t border-fin-line pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
                Qué necesitamos
              </h2>
              <ol className="mt-6 divide-y divide-fin-line border-t border-fin-line">
                {[
                  "Factura radicada y aceptada por el pagador",
                  "Contrato u orden de compra que la respalde",
                  "Certificado de existencia y representación legal",
                  "Estados financieros del último periodo",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4 py-4">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-fin-ink/75">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-fin-teal">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
              Libere la caja que hoy está en su cartera.
            </h2>
            <Link
              to="/contacto"
              className="self-start rounded-[3px] bg-fin-lime px-7 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-cream"
            >
              Cotizar mis facturas
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
