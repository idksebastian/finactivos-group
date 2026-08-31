import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
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

const pilares = [
  { t: "Liquidez récord", d: "Desembolso directo a su cuenta bancaria entre 24 y 48 horas después de la aprobación." },
  { t: "Cero deuda bancaria", d: "Está estructurado como venta de un activo suyo: no consume cupo ni afecta su endeudamiento." },
  { t: "Flexibilidad absoluta", d: "Usted decide qué facturas adelantar y en qué momento exacto hacerlo." },
  { t: "Gestión transparente", d: "Asumimos la cobranza y la administración; usted se concentra en operar." },
  { t: "Tasas a la medida", d: "Tarifas estructuradas según la solidez y el riesgo del pagador, no según su tamaño." },
];

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <section className="border-b border-fin-line">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-green">
              Servicio 02
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-teal sm:text-5xl">
              El costo oculto del capital atrapado
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-fin-ink/75">
              Esperar 30, 60 o más de 90 días por el pago de una factura ralentiza la operación y
              asfixia el flujo de caja. El factoring convierte esa cartera en efectivo ahora.
            </p>

            {/* escalera de espera */}
            <div className="mt-14 flex items-end gap-3 border-b border-fin-line pb-4 sm:gap-6">
              {[
                { d: "30 días", h: "h-24" },
                { d: "60 días", h: "h-36" },
                { d: "90+ días", h: "h-52" },
              ].map((b) => (
                <div key={b.d} className={`flex ${b.h} flex-1 items-end justify-center bg-fin-ink/10`}>
                  <span className="pb-3 font-display text-sm font-bold uppercase text-fin-ink/60">
                    {b.d}
                  </span>
                </div>
              ))}
              <div className="flex h-16 flex-1 items-center justify-center bg-fin-lime">
                <span className="px-2 text-center font-display text-sm font-bold uppercase leading-tight text-fin-teal">
                  24 – 48 h
                  <span className="block font-sans text-[10px] font-medium tracking-[0.14em]">
                    Finactivos
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-fin-line bg-fin-teal">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h2 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
              La arquitectura del factoring corporativo
            </h2>
            <div className="mt-12 grid gap-px bg-fin-cream/15 md:grid-cols-3 lg:grid-cols-5">
              {pilares.map((p, i) => (
                <div key={p.t} className="bg-fin-teal p-6">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-base font-bold uppercase leading-tight text-fin-cream">
                    {p.t}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-fin-cream/70">{p.d}</p>
                </div>
              ))}
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
