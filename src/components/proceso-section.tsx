import { useState } from "react";
import * as ds from "@/lib/design-system";
import { slugify } from "@/lib/blog-format";

const stages = [
  {
    stage: "Análisis",
    time: "Días 1 – 3",
    steps: [
      {
        t: "Envío de documentos",
        d: "Recibimos copia de la sentencia o acta de conciliación, la cuenta de cobro, la constancia de ejecutoria y su identificación.",
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
        link: { label: "Ver el checklist completo", href: "#checklist" },
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
                  {"link" in st && st.link ? (
                    <a
                      href={st.link.href}
                      className={`mt-2 inline-block border-b-2 pb-0.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] ${t.toggle}`}
                    >
                      {st.link.label}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

/** Etapas del proceso, en tarjetas expandibles. Vive dentro de Compra de sentencias. */
export function ProcesoSection() {
  const [openStages, setOpenStages] = useState<number[]>([0]);
  const toggleStage = (i: number) =>
    setOpenStages((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  const startCounts = stages.map((_, i) =>
    stages.slice(0, i).reduce((n, st) => n + st.steps.length, 0),
  );

  return (
    <section id="proceso" className="scroll-mt-20 border-b border-fin-line bg-fin-cream">
      <div className={`${ds.container} ${ds.sectionPad}`}>
        <p className={ds.eyebrow}>Proceso</p>
        <h2 className={`mt-5 max-w-2xl ${ds.h2} text-fin-teal`}>
          De la sentencia al desembolso, etapa por etapa
        </h2>
        <p className={`mt-4 max-w-2xl ${ds.lead} text-fin-ink/75`}>
          Cuatro etapas con tiempos definidos. Finactivos espera en promedio los 6 años que la
          entidad pague.
        </p>
        <div className="mt-10 grid items-start gap-4 md:grid-cols-2">
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
      </div>
    </section>
  );
}

const checklist = [
  "Copia simple de la sentencia de primera instancia.",
  "Copia simple de la sentencia de segunda instancia.",
  "Si hubo conciliación de las pretensiones: copia del acta y del auto que la aprobó.",
  "Constancia secretarial de ejecutoria de la sentencia.",
  "Copia simple de la cuenta de cobro de los derechos económicos, radicada ante la entidad condenada por los titulares o sus apoderados.",
  "Copia simple del poder otorgado por cada beneficiario para presentar la cuenta de cobro.",
  "Asignación de turno de pago emitida por la entidad demandada (comunicado, resolución o correo).",
  "Copia simple del poder otorgado por cada beneficiario al abogado para iniciar la acción.",
  "Constancia de vigencia del poder, expedida por el despacho judicial que profirió la sentencia.",
  "Si algún beneficiario era menor de edad al iniciar la acción y ya es mayor de edad: ratificación del poder ante la entidad pagadora.",
  "Copia de los documentos de identidad de los beneficiarios y de los abogados con su tarjeta profesional (registro civil y tarjeta de identidad si son menores).",
  "Si el beneficiario falleció: escritura pública o sentencia de sucesión, para establecer los herederos de los derechos económicos (si aplica).",
];

/** Lista de documentos para el contrato de cesión, enlazada desde el paso "Documentos contractuales". */
export function ChecklistSection() {
  return (
    <section id="checklist" className="scroll-mt-20 border-b border-fin-line bg-white/50">
      <div className={`${ds.container} ${ds.sectionPad}`}>
        <p className={ds.eyebrow}>Documentos contractuales</p>
        <h2 className={`mt-5 max-w-2xl ${ds.h2} text-fin-teal`}>
          Checklist de documentos para la cesión
        </h2>
        <p className={`mt-4 max-w-2xl ${ds.lead} text-fin-ink/75`}>
          Lo que necesitamos para elaborar el contrato de cesión de derechos económicos.
        </p>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[6px] border border-fin-line bg-fin-line sm:grid-cols-2">
          {checklist.map((item, i) => (
            <li key={item} className="flex gap-4 bg-fin-cream p-5">
              <span className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-[3px] border-2 border-fin-lime font-display text-sm font-bold text-fin-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`${ds.body} text-fin-ink/75`}>{item}</p>
            </li>
          ))}
        </ol>
        <p className={`mt-6 max-w-2xl ${ds.caption} text-fin-ink/55`}>
          Si el honorario del abogado hace parte de la cesión, también se requiere el contrato de
          prestación de servicios profesionales u honorarios pactados con los beneficiarios.
        </p>
      </div>
    </section>
  );
}
