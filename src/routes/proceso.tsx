import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/proceso")({
  head: () => ({
    meta: [
      { title: "Proceso | Nueve pasos hasta su pago — Finactivos Group" },
      {
        name: "description",
        content:
          "Cómo funciona la compra de su sentencia: análisis, negociación, formalización y pago. Nueve pasos, con tiempos claros por etapa.",
      },
      { property: "og:title", content: "Proceso | Finactivos Group" },
      {
        property: "og:description",
        content: "Usted firma en el día 9. La espera de la entidad la asumimos nosotros.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/proceso") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/proceso") }],
  }),
  component: Page,
});

const stages = [
  {
    stage: "Análisis",
    time: "Días 1 – 3",
    steps: [
      {
        t: "Envío de documentos",
        d: "Recibimos copia de la sentencia o acta de conciliación, la constancia de ejecutoria y su identificación.",
      },
      {
        t: "Análisis técnico-jurídico",
        d: "Verificamos firmeza, entidad condenada, liquidación de intereses y eventuales embargos o cesiones previas.",
      },
      {
        t: "Propuesta económica",
        d: "Le presentamos por escrito el valor de compra, los descuentos aplicables y los tiempos comprometidos.",
      },
    ],
  },
  {
    stage: "Negociación",
    time: "Días 4 – 5",
    steps: [
      {
        t: "Aprobación de la propuesta",
        d: "Resolvemos sus dudas con su abogado si así lo desea. Sin presión y sin costos por evaluar.",
      },
      {
        t: "Documentos contractuales",
        d: "Solicitamos los soportes finales para elaborar el contrato de cesión de derechos económicos.",
      },
    ],
  },
  {
    stage: "Formalización",
    time: "Días 6 – 9",
    steps: [
      {
        t: "Firma de cesión",
        d: "Firma ante notaría con acompañamiento de nuestro equipo jurídico y desembolso a su favor.",
      },
      {
        t: "Radicación ante la entidad",
        d: "Radicamos la cesión ante la entidad condenada y ante el despacho que profirió la decisión.",
      },
    ],
  },
  {
    stage: "Pago",
    time: "Días 60 – 90",
    steps: [
      {
        t: "Aceptación oficial",
        d: "La entidad reconoce a Finactivos como nuevo titular del derecho económico.",
      },
      {
        t: "Giro de recursos",
        d: "La entidad gira. Ese tiempo ya no es suyo: el riesgo de espera quedó en nuestras manos.",
      },
    ],
  },
];

function Page() {
  let counter = 0;
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="Proceso"
          title="De la sentencia al desembolso en nueve pasos"
          support="Cuatro etapas con tiempos definidos. Usted firma en el día nueve; la espera de la entidad corre por nuestra cuenta."
        >
          <div className="mt-12 border-t border-fin-line pt-10">
            <div className="relative mb-6 hidden h-3 md:block">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-fin-line" />
              <div className="relative grid grid-cols-4">
                {stages.map((s) => (
                  <span key={s.stage} className="flex justify-start">
                    <span className={ds.dot} />
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-px bg-fin-line md:grid-cols-4">
              {stages.map((s, i) => (
                <div key={s.stage} className="bg-fin-cream pb-6 pr-6 md:pl-6 md:first:pl-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`${ds.h3} text-fin-ink`}>{s.stage}</p>
                    <span className={ds.numberBox}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={`mt-3 ${ds.timeBadge}`}>{s.time}</p>
                  <p className={`mt-3 ${ds.caption} text-fin-ink/60`}>
                    {s.steps.length} {s.steps.length === 1 ? "paso" : "pasos"} · {s.steps[0]?.t}
                    {s.steps.length > 1 ? "…" : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageHeader>

        <Section>
          {stages.map((s) => (
            <div
              key={s.stage}
              className="grid gap-8 border-b border-fin-line py-12 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[3fr_7fr]"
            >
              <div>
                <SectionTitle>{s.stage}</SectionTitle>
                <p className={`mt-3 ${ds.timeBadge}`}>{s.time}</p>
              </div>
              <ol className="divide-y divide-fin-line border-t border-fin-line">
                {s.steps.map((st) => {
                  counter += 1;
                  return (
                    <li key={st.t} className="flex gap-5 py-5">
                      <span className={ds.numberBox}>{String(counter).padStart(2, "0")}</span>
                      <div>
                        <p className={`${ds.h3} text-fin-ink`}>{st.t}</p>
                        <p className={`mt-1 max-w-xl ${ds.body} text-fin-ink/70`}>{st.d}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </Section>

        <Section tone="paper">
          <p className={`${ds.body} text-fin-ink/70`}>
            ¿Quiere saber si su entidad aplica?{" "}
            <Link
              to="/servicios/compra-de-sentencias"
              className="font-semibold text-fin-green underline underline-offset-4 hover:text-fin-teal"
            >
              Ver el detalle en Compra de sentencias
            </Link>
            .
          </p>
        </Section>

        <CtaBlock
          title="El primer paso solo exige enviar tres documentos."
          action="Iniciar el análisis"
          to="/contacto"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
