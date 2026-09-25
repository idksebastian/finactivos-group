import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { siteUrl } from "@/lib/site-url";
import { breadcrumbLd, jsonLd, serviceLd } from "@/lib/seo";
import { InfoCard, type InfoItem } from "@/components/info-graphics";

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
    scripts: [
      jsonLd(
        serviceLd({
          name: "Factoring de facturas",
          description:
            "Venta anticipada de facturas por cobrar a cambio de liquidez inmediata, sin adquirir deuda bancaria.",
          path: "/servicios/factoring",
        }),
      ),
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: "Factoring", path: "/servicios/factoring" },
        ]),
      ),
    ],
  }),
  component: Page,
});

const ventajas: InfoItem[] = [
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

const gestion: InfoItem[] = [
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
        <section className="bg-fin-green">
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
                  "Proveedores de bienes o servicios a empresas en Colombia, que emitan facturas electrónicas a plazo y estén registradas en RADIAN.",
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
                  "Factura electrónica emitida a plazo y aceptada en RADIAN por el cliente pagador",
                  "Información de la empresa para realizar la respectiva vinculación al programa de Factoring",
                  "En casos puntuales, contratos u órdenes de compra",
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
              hash="formulario"
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
