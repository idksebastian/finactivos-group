import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { siteUrl } from "@/lib/site-url";
import { breadcrumbLd, jsonLd, serviceLd } from "@/lib/seo";

export const Route = createFileRoute("/servicios/inversion")({
  head: () => ({
    meta: [
      { title: "Inversión respaldada en activos judiciales | Finactivos Group" },
      {
        name: "description",
        content:
          "Vehículos de inversión respaldados en sentencias en firme contra el Estado, con debida diligencia jurídica y horizontes de tiempo controlados.",
      },
      { property: "og:title", content: "Inversión | Finactivos Group" },
      {
        property: "og:description",
        content: "Solidez del pagador más gestión Finactivos: retornos con horizontes de tiempo definidos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/servicios/inversion") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/servicios/inversion") }],
    scripts: [
      jsonLd(
        serviceLd({
          name: "Inversión respaldada en activos judiciales",
          description:
            "Vehículo de inversión respaldado en sentencias y conciliaciones en firme contra el Estado, con reglas de retorno y plazos definidos.",
          path: "/servicios/inversion",
        }),
      ),
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: "Inversión", path: "/servicios/inversion" },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton fallbackTo="/servicios" />
      <main>
        <section className="border-b border-fin-line bg-white/50">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[6fr_5fr] md:py-24">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-green">
                Inversión
              </p>
              <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-teal sm:text-5xl">
                Proyecte su portafolio sobre activos ya reconocidos
              </h1>
              <div className="mt-6 max-w-lg border-l-2 border-fin-lime pl-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-fin-green">
                  ¿Qué es?
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/75">
                  Es un vehículo de inversión respaldado en sentencias y conciliaciones en firme
                  contra el Estado, con reglas de retorno y plazos definidos desde el inicio.
                </p>
              </div>
              <p className="max-w-lg font-sans text-base leading-relaxed text-fin-ink/75">
                La volatilidad exige alternativas que protejan el capital. Estructuramos inversión
                respaldada en derechos económicos con título judicial en firme, con reglas de
                retorno y plazos definidos desde el primer día.
              </p>
            </div>

            {/* ecuación: solidez + gestión = retorno */}
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 border border-fin-line bg-fin-cream p-5 text-center">
                <p className="font-display text-sm font-bold uppercase text-fin-teal">
                  Solidez del pagador
                </p>
                <p className="mt-1 font-sans text-xs text-fin-ink/60">El Estado como deudor</p>
              </div>
              <span className="text-center font-display text-2xl font-extrabold text-fin-lime">+</span>
              <div className="flex-1 border border-fin-line bg-fin-cream p-5 text-center">
                <p className="font-display text-sm font-bold uppercase text-fin-teal">
                  Gestión Finactivos
                </p>
                <p className="mt-1 font-sans text-xs text-fin-ink/60">Debida diligencia y cobro</p>
              </div>
              <span className="text-center font-display text-2xl font-extrabold text-fin-lime">=</span>
              <div className="flex-1 bg-fin-teal p-5 text-center">
                <p className="font-display text-sm font-bold uppercase text-fin-cream">
                  Rentabilidad superior
                </p>
                <p className="mt-1 font-sans text-xs text-fin-cream/70">Horizonte definido</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-fin-line">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
              Cómo se estructura
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-fin-ink/70">
              Diez pasos en cinco etapas, con rentabilidad superior.
            </p>
            <div className="mt-10 grid gap-px bg-fin-line md:grid-cols-5">
              {[
                {
                  etapa: "Análisis",
                  dias: "Días 1 – 3",
                  pasos: ["Recepción y revisión del activo", "Debida diligencia jurídica"],
                },
                {
                  etapa: "Negociación",
                  dias: "Días 4 – 5",
                  pasos: ["Valoración y propuesta de retorno", "Acuerdo de condiciones"],
                },
                {
                  etapa: "Formalización",
                  dias: "Días 6 – 7",
                  pasos: ["Firma del contrato de inversión", "Radicación de soportes"],
                },
                {
                  etapa: "Giro de la inversión",
                  dias: "Días 8 – 9",
                  pasos: ["Desembolso del inversionista", "Confirmación de aplicación de recursos"],
                },
                {
                  etapa: "Recaudo de la inversión",
                  dias: "Día 10",
                  pasos: ["Seguimiento al pago de la entidad", "Liquidación y entrega del retorno"],
                },
              ].map((e, i) => (
                <div key={e.etapa} className="bg-fin-cream p-6">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-base font-bold uppercase leading-tight text-fin-teal">
                    {e.etapa}
                  </p>
                  <p className="mt-2 inline-block rounded-[3px] bg-fin-lime px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-fin-teal">
                    {e.dias}
                  </p>
                  <ol className="mt-3 space-y-2">
                    {e.pasos.map((p, j) => (
                      <li key={p} className="font-sans text-sm leading-relaxed text-fin-ink/70">
                        <span className="font-display font-bold text-fin-green">
                          {String(i * 2 + j + 1).padStart(2, "0")}.
                        </span>{" "}
                        {p}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-fin-line bg-fin-green">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 md:grid-cols-[4fr_6fr]">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
              A quién está dirigido
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                ["Inversionistas patrimoniales", "Buscan proteger capital con horizontes de tiempo controlados."],
                ["Family offices", "Diversificación en activos alternativos con respaldo jurídico verificable."],
                ["Empresas con excedentes", "Rentabilizar caja ociosa sin exposición a mercados volátiles."],
                ["Fondos y aliados", "Coinversión estructurada sobre portafolios de activos judiciales."],
              ].map(([t, d]) => (
                <li key={t} className="border-l-2 border-fin-lime pl-5">
                  <p className="font-display text-base font-bold uppercase text-fin-cream">{t}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-fin-cream/70">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-fin-teal">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
              Estructuremos una estrategia a la medida de sus objetivos patrimoniales.
            </h2>
            <Link
              to="/contacto"
              className="self-start rounded-[3px] bg-fin-lime px-7 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-cream"
            >
              Agendar evaluación de portafolio
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
