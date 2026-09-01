import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EntitiesStrip } from "@/components/entities-strip";
import { PhotoFrame } from "@/components/photo-frame";
import { siteUrl } from "@/lib/site-url";
import fotoMujerCasa from "@/assets/fotos/presencia-1.jpg";
import fotoArtesana from "@/assets/fotos/presencia-3.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finactivos Group | Compra de sentencias judiciales en Colombia" },
      {
        name: "description",
        content:
          "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin.",
      },
      {
        property: "og:title",
        content: "Finactivos Group | Compra de sentencias judiciales en Colombia",
      },
      {
        property: "og:description",
        content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],

  }),
  component: Index,
});

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setSeen(true);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:py-28">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Reparación directa contra el Estado
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-teal sm:text-5xl md:text-6xl">
            Somos su aliado estratégico en el cumplimiento de sus objetivos
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-fin-ink/75">
            Si ya tiene una sentencia o conciliación en firme, no tiene que seguir esperando el pago
            de la entidad. Nosotros asumimos la espera.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contacto"
              className="rounded-[3px] bg-fin-lime px-6 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-green hover:text-fin-cream"
            >
              Solicite una valoración
            </Link>
            <Link
              to="/proceso"
              className="rounded-[3px] border border-fin-teal px-6 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
            >
              Conozca el proceso
            </Link>
          </div>
        </div>
        <TimeRelief />
      </div>
    </section>

  );
}


/** Contraste de tiempos como recorrido, no como gráfico de datos. */
function TimeRelief() {
  const { ref, seen } = useInView<HTMLDivElement>(0.35);

  return (
    <div
      ref={ref}
      className="rounded-[6px] border border-fin-line bg-white/60 p-7 sm:p-9"
      aria-label="Comparación del tiempo de espera"
    >
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-fin-ink/45">
        El camino hasta recibir su dinero
      </p>

      {/* camino largo */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-sm text-fin-ink/70">Esperando a la entidad</span>
          <span className="font-display text-sm font-bold text-fin-ink/60">
            90% de los casos: más de 6 años
          </span>
        </div>
        <div className="relative mt-4 h-10">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-fin-ink/25" />
          <div className="relative flex h-full items-center justify-between">
            {["Hoy", "", "", "", "Pago"].map((label, i) => (
              <span key={i} className="flex flex-col items-center gap-2">
                <span
                  className={`block h-2 w-2 rounded-full ${
                    i === 0 ? "bg-fin-ink/60" : "bg-fin-ink/20"
                  }`}
                />
                {label && (
                  <span className="absolute top-7 font-sans text-[11px] text-fin-ink/45">
                    {label}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* camino corto */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-sm font-medium text-fin-teal">Con Finactivos</span>
          <span className="font-display text-sm font-bold text-fin-green">Máximo 3 meses</span>
        </div>
        <div className="relative mt-4 h-10">
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-fin-line" />
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-fin-lime transition-[width] duration-[1600ms] ease-out"
            style={{ width: seen ? "100%" : "0%" }}
          />
          <div
            className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fin-green text-fin-cream transition-[left] duration-[1600ms] ease-out"
            style={{ left: seen ? "100%" : "0%" }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p className="mt-6 font-sans text-sm leading-relaxed text-fin-ink/70">
          En un máximo de tres meses usted recibe sus derechos económicos. La espera de hasta 6 años
          ante la entidad corre por nuestra cuenta.
        </p>
      </div>
    </div>
  );
}

/* ---------- empatía: personas reales, mismo tratamiento que Nosotros ---------- */

function Empathy() {
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Cobertura nacional
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
            Personas, no expedientes
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-fin-ink/75">
            Detrás de cada sentencia hay alguien que ya esperó suficiente. Trabajamos para que esa
            espera termine antes.
          </p>
        </div>
        <div className="order-1 grid grid-cols-2 gap-10 pt-6 md:order-2">
          <PhotoFrame
            src={fotoMujerCasa}
            alt="Colombiana en su hogar, representando a las familias que acompañamos"
            block="green"
            className="aspect-4/5"
          />
          <PhotoFrame
            src={fotoArtesana}
            alt="Colombiana en su lugar de trabajo, representando a los titulares que acompañamos"
            block="lime"
            className="aspect-4/5 translate-y-8"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- servicios: split asimétrico ---------- */

function Services() {
  const items = [
    {
      t: "Compra de sentencias",
      to: "/servicios/compra-de-sentencias" as const,
      d: "Adquirimos sentencias y conciliaciones ejecutoriadas de reparación directa contra entidades del Estado, con pago al titular antes de que la entidad gire.",
    },
    {
      t: "Factoring",
      to: "/servicios/factoring" as const,
      d: "Anticipamos el pago de sus facturas de sus clientes, sin afectar el flujo de su operación.",
    },
    {
      t: "Inversión",
      to: "/servicios/inversion" as const,
      d: "Estructuramos vehículos respaldados en activos judiciales, con estudio jurídico previo y retorno definido.",
    },
  ];
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-20 md:grid-cols-[4fr_6fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
            Qué hacemos
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-fin-ink/70">
            Tres líneas de negocio con un mismo principio: convertir derechos ciertos en liquidez
            real.
          </p>
          <Link
            to="/servicios"
            className="mt-6 inline-block border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal transition-colors hover:border-fin-teal"
          >
            Ver servicios
          </Link>
        </div>
        <div className="divide-y divide-fin-line border-t border-fin-line">
          {items.map((i) => (
            <article key={i.t} className="group py-7">
              <Link to={i.to} className="block">
                <h3 className="flex items-center gap-3 font-display text-xl font-bold uppercase text-fin-teal transition-colors group-hover:text-fin-green">
                  {i.t}
                  <span
                    aria-hidden
                    className="translate-x-0 text-fin-lime transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-fin-ink/70">
                  {i.d}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- proceso: flujo por etapas (referencia material Finactivos) ---------- */

const stages = [
  {
    stage: "Análisis",
    time: "Días 1 – 3",
    out: "Propuesta económica escrita",
    steps: ["Envío de documentos", "Análisis técnico-jurídico", "Propuesta económica"],
  },
  {
    stage: "Negociación",
    time: "Días 4 – 5",
    out: "Condiciones aceptadas",
    steps: ["Aprobación de la propuesta", "Solicitud de documentos contractuales"],
  },
  {
    stage: "Formalización",
    time: "Días 6 – 9",
    out: "Cesión firmada y desembolso",
    steps: ["Firma de cesión", "Radicación ante la entidad condenada"],
  },
  {
    stage: "Pago",
    time: "Días 60 – 90",
    out: "Giro de la entidad a Finactivos",
    steps: ["Aceptación oficial de la entidad", "Giro de recursos"],
  },
];

function Process() {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  let counter = 0;

  return (
    <section className="bg-fin-teal">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
            Nueve pasos, cuatro etapas
          </h2>
          <p className="max-w-xs font-sans text-sm text-fin-cream/70">
            Usted firma en el día 9. El resto lo esperamos nosotros.
          </p>
        </div>

        {/* riel continuo con hitos */}
        <div ref={ref} className="mt-14">
          <div className="relative hidden h-4 md:block">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-fin-cream/20" />
            <div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-fin-lime transition-[width] duration-[1800ms] ease-out"
              style={{ width: seen ? "100%" : "0%" }}
            />
            <div className="relative grid grid-cols-4">
              {stages.map((s, si) => (
                <span key={s.stage} className="flex justify-start">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-fin-teal bg-fin-lime transition-opacity duration-500"
                    style={{
                      opacity: seen ? 1 : 0.25,
                      transitionDelay: `${si * 380}ms`,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-fin-cream/15 md:mt-6 md:grid-cols-4">
            {stages.map((s, si) => (
              <div key={s.stage} className="relative bg-fin-teal p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-lg font-bold uppercase text-fin-cream">
                    {s.stage}
                  </p>
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-lime">
                    0{si + 1}
                  </span>
                </div>
                <p className="mt-3 inline-block rounded-[3px] bg-fin-lime px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-fin-teal">
                  {s.time}
                </p>

                <ol className="mt-5 space-y-3">
                  {s.steps.map((step) => {
                    counter += 1;
                    return (
                      <li key={step} className="flex gap-3">
                        <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border border-fin-cream/35 font-sans text-[11px] text-fin-cream/70">
                          {counter}
                        </span>
                        <span className="font-sans text-sm leading-relaxed text-fin-cream/85">
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-6 border-t border-fin-cream/15 pt-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-fin-cream/45">
                    Resultado
                  </p>
                  <p className="mt-1 font-sans text-sm leading-snug text-fin-lime">{s.out}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-fin-cream/15 pt-6">
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-fin-cream/50">
              Su tiempo real de gestión
            </span>
            <span className="rounded-[3px] bg-fin-cream px-3 py-1 font-display text-sm font-bold uppercase text-fin-teal">
              Máximo 3 meses
            </span>
            <span className="font-sans text-sm text-fin-cream/70">
              — los 6 años restantes los espera Finactivos, no usted.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- elegibilidad: diagrama de condiciones ---------- */

function Eligibility() {
  const conditions = [
    { label: "Sentencia o conciliación en firme y ejecutoriada", ok: true },
    { label: "Proceso de reparación directa contra el Estado", ok: true },
    { label: "Entidad condenada plenamente identificada", ok: true },
    { label: "Cuenta de cobro presentada", ok: true },
  ];
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
          ¿Su caso aplica?
        </h2>
        <div className="mt-10 grid gap-px bg-fin-line sm:grid-cols-2 lg:grid-cols-4">
          {conditions.map((c) => (
            <div key={c.label} className="bg-fin-cream p-7">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-[3px] ${
                  c.ok ? "bg-fin-lime text-fin-teal" : "bg-fin-line text-fin-ink/50"
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  {c.ok ? (
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                  )}
                </svg>
              </span>
              <p className="mt-4 font-sans text-sm leading-relaxed text-fin-ink/80">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- cifras ---------- */

function Figures() {
  const stat = (value: string, label: string) => (
    <div className="border-l-2 border-fin-lime pl-5">
      <p className="font-display text-4xl font-extrabold tracking-tight text-fin-teal">{value}</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/70">{label}</p>
    </div>
  );
  return (
    <section className="border-b border-fin-line bg-white/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 sm:grid-cols-2 lg:grid-cols-4">
        {stat("+17", "años de experiencia jurídica y financiera")}
        {stat("+250", "procesos analizados")}
        {stat("9", "días hábiles hasta la firma de cesión")}
        {stat("100%", "acompañamiento jurídico y contractual")}
      </div>
    </section>
  );
}

/* ---------- cierre ---------- */

function CTA() {
  return (
    <section className="bg-fin-teal">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
          Tiene una sentencia en firme. Nosotros tenemos el capital y la experiencia.
        </h2>
        <Link
          to="/contacto"
          className="self-start rounded-[3px] bg-fin-lime px-7 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-cream"
        >
          Hablemos hoy
        </Link>
      </div>
    </section>
  );
}


function Index() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <Hero />
        <EntitiesStrip />
        <Empathy />
        <Services />
        <Process />
        <Eligibility />
        <Figures />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
