import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, CtaBlock } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";
import { slugify } from "@/lib/blog-format";

export const Route = createFileRoute("/proceso")({
  head: () => ({
    meta: [
      { title: "Proceso de compra de sentencias: etapas y pasos | Finactivos Group" },
      {
        name: "description",
        content:
          "Cómo funciona la compra de su sentencia: análisis, negociación, formalización y pago, con tiempos claros por etapa.",
      },
      { property: "og:title", content: "Proceso | Finactivos Group" },
      {
        property: "og:description",
        content: "Finactivos espera los 6 años que la entidad pague.",
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
        d: "Firma con acompañamiento de nuestro equipo jurídico y desembolso a su favor.",
      },
      {
        t: "Radicación ante la entidad",
        d: "Radicamos la cesión ante la entidad condenada.",
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
        d: "Finactivos gira los recursos a los Cedentes. Ese tiempo ya no es suyo: el riesgo de espera quedó en nuestras manos.",
      },
    ],
  },
];

/** Una tarjeta por etapa, con un color propio; al tocarla se expande y muestra sus pasos. */
const themes = [
  {
    card: "border-fin-line bg-white",
    title: "text-fin-teal",
    body: "text-fin-ink/70",
    numeral: "text-fin-teal/[0.07]",
    badge: "bg-fin-lime text-fin-teal",
    divider: "border-fin-line",
    stepBox: "border-fin-lime text-fin-teal",
    stepTitle: "text-fin-teal",
    toggle: "border-fin-lime text-fin-teal",
  },
  {
    card: "border-fin-green bg-fin-green",
    title: "text-fin-cream",
    body: "text-fin-cream/80",
    numeral: "text-fin-cream/15",
    badge: "bg-fin-lime text-fin-teal",
    divider: "border-fin-cream/20",
    stepBox: "border-fin-lime text-fin-cream",
    stepTitle: "text-fin-cream",
    toggle: "border-fin-lime text-fin-cream",
  },
  {
    card: "border-fin-teal bg-fin-teal",
    title: "text-fin-cream",
    body: "text-fin-cream/80",
    numeral: "text-fin-cream/10",
    badge: "bg-fin-lime text-fin-teal",
    divider: "border-fin-cream/20",
    stepBox: "border-fin-lime text-fin-cream",
    stepTitle: "text-fin-cream",
    toggle: "border-fin-lime text-fin-cream",
  },
  {
    card: "border-fin-lime bg-fin-lime",
    title: "text-fin-teal",
    body: "text-fin-teal",
    numeral: "text-fin-teal/15",
    badge: "bg-fin-teal text-fin-cream",
    divider: "border-fin-teal/20",
    stepBox: "border-fin-teal text-fin-teal",
    stepTitle: "text-fin-teal",
    toggle: "border-fin-teal text-fin-teal",
  },
] as const;

function StageCard({
  stage,
  index,
  startCount,
  open,
  onToggle,
}: {
  stage: (typeof stages)[number];
  index: number;
  startCount: number;
  open: boolean;
  onToggle: () => void;
}) {
  const t = themes[index % themes.length]!;
  const id = slugify(stage.stage);
  const first = stage.steps[0]?.t;

  return (
    <article
      id={id}
      className={`relative scroll-mt-24 overflow-hidden rounded-[6px] border ${t.card}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-3 -top-8 select-none font-display text-[10rem] font-extrabold leading-none ${t.numeral}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-pasos`}
        className="relative flex w-full cursor-pointer flex-col items-start gap-4 p-7 text-left sm:p-8"
      >
        <span
          className={`inline-block rounded-[3px] px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] ${t.badge}`}
        >
          {stage.time}
        </span>
        <h3 className={`${ds.h2} ${t.title}`}>{stage.stage}</h3>
        <p className={`max-w-xs ${ds.body} ${t.body}`}>
          {stage.steps.length} {stage.steps.length === 1 ? "paso" : "pasos"} · {first}
          {stage.steps.length > 1 ? "…" : ""}
        </p>
        <span
          className={`mt-2 inline-flex items-center gap-2 border-b-2 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] ${t.toggle}`}
        >
          {open ? "Ocultar pasos" : "Ver pasos"}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={`h-3.5 w-3.5 stroke-current transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            aria-hidden="true"
          >
            <path d="M8 3v10M3 8h10" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-pasos`}
        aria-hidden={!open}
        className={`relative grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ol className={`mx-7 divide-y border-t pb-4 sm:mx-8 ${t.divider}`}>
            {stage.steps.map((st, j) => (
              <li key={st.t} className="flex gap-4 py-5">
                <span
                  className={`inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-[3px] border-2 px-1.5 font-display text-sm font-bold ${t.stepBox}`}
                >
                  {String(startCount + j + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={`${ds.h3} ${t.stepTitle}`}>{st.t}</p>
                  <p className={`mt-1 ${ds.body} ${t.body}`}>{st.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function Page() {
  const [openStages, setOpenStages] = useState<number[]>([0]);
  const openStage = (i: number) => setOpenStages((o) => (o.includes(i) ? o : [...o, i]));
  const toggleStage = (i: number) =>
    setOpenStages((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  const startCounts = stages.map((_, i) =>
    stages.slice(0, i).reduce((n, st) => n + st.steps.length, 0),
  );

  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton />
      <main>
        <PageHeader
          eyebrow="Proceso"
          title="De la sentencia al desembolso, etapa por etapa"
          support="Cuatro etapas con tiempos definidos. Finactivos espera los 6 años que la entidad pague."
        >
          <div className="mt-12 hidden border-t border-fin-line pt-10 md:block">
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
                  <a href={`#${slugify(s.stage)}`} onClick={() => openStage(i)}>
                    <p className={`${ds.h3} text-fin-teal transition-colors hover:text-fin-green`}>
                      {s.stage}
                    </p>
                  </a>
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
          <div className="grid items-start gap-4 md:grid-cols-2">
            {stages.map((s, i) => (
              <StageCard
                key={s.stage}
                stage={s}
                index={i}
                startCount={startCounts[i] ?? 0}
                open={openStages.includes(i)}
                onToggle={() => toggleStage(i)}
              />
            ))}
          </div>
        </Section>

        <section className="bg-fin-green">
          <div className={`${ds.container} py-8`}>
          <p className={`${ds.body} text-fin-cream/85`}>
            ¿Quiere saber si su entidad aplica?{" "}
            <Link
              to="/servicios/compra-de-sentencias"
              className="font-semibold text-fin-lime underline underline-offset-4 hover:text-fin-cream"
            >
              Ver el detalle en Compra de sentencias
            </Link>
            .
          </p>
          </div>
        </section>

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
