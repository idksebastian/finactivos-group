import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { EntitiesGrid } from "@/components/entities-grid";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/servicios/compra-de-sentencias")({
  head: () => ({
    meta: [
      { title: "Compra de sentencias contra el Estado | Finactivos Group" },
      {
        name: "description",
        content:
          "Compramos sentencias y conciliaciones ejecutoriadas de reparación directa contra entidades del Estado. Pago al titular antes del giro estatal.",
      },
      { property: "og:title", content: "Compra de sentencias | Finactivos Group" },
      {
        property: "og:description",
        content: "Reciba hoy el dinero de una sentencia en firme. La espera de la entidad la asumimos nosotros.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/servicios/compra-de-sentencias") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/servicios/compra-de-sentencias") }],
  }),
  component: Page,
});

const requisitos = [
  { ok: true, t: "Sentencia o conciliación ejecutoriada", d: "Con constancia de ejecutoria expedida por el despacho." },
  { ok: true, t: "Proceso de reparación directa", d: "Contra una entidad del orden nacional." },
  { ok: true, t: "Titular plenamente identificado", d: "Beneficiario o heredero con documentación en regla." },
  { ok: false, t: "Procesos en primera instancia", d: "Aún sin decisión en firme: no son elegibles." },
  { ok: false, t: "Derechos ya cedidos", d: "Si el crédito fue cedido antes, no podemos adquirirlo." },
  { ok: false, t: "Sentencias con embargo total", d: "Requiere análisis particular antes de cualquier oferta." },
];

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton fallbackTo="/servicios" />
      <main>
        {/* hero: bloque sólido a la izquierda */}
        <section className="border-b border-fin-line">
          <div className="mx-auto grid max-w-6xl gap-0 px-6 py-0 md:grid-cols-[4fr_6fr]">
            <div className="-mx-6 bg-fin-teal px-6 py-16 md:mx-0 md:px-10 md:py-24">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-lime">
                Servicio 01
              </p>
              <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-cream sm:text-5xl">
                Compra de sentencias
              </h1>
              <p className="mt-6 font-sans text-sm leading-relaxed text-fin-cream/75">
                Su derecho ya fue reconocido por un juez. Lo que falta es tiempo, y ese tiempo lo
                asumimos nosotros.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-6 py-16 md:pl-12">
              <p className="max-w-xl font-sans text-base leading-relaxed text-fin-ink/80">
                Adquirimos sentencias y conciliaciones en firme de reparación directa contra
                entidades del Estado. Usted recibe el capital en días hábiles; nosotros nos
                sustituimos en el cobro ante la entidad condenada y asumimos íntegramente el riesgo
                de la demora.
              </p>
              <dl className="grid gap-6 border-t border-fin-line pt-6 sm:grid-cols-3">
                {[
                  ["9 días", "hasta la firma de cesión"],
                  ["0 costos", "para el titular en el estudio"],
                  ["100%", "acompañamiento jurídico"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-extrabold text-fin-teal">{v}</dt>
                    <dd className="mt-1 font-sans text-xs leading-relaxed text-fin-ink/60">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* a quién está dirigido */}
        <section className="border-b border-fin-line bg-white/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 md:grid-cols-[3fr_7fr]">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
              A quién está dirigido
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                ["Víctimas y beneficiarios", "Personas naturales con fallo favorable de reparación directa que llevan años esperando el pago."],
                ["Herederos", "Sucesores del titular fallecido, con la documentación sucesoral correspondiente."],
                ["Abogados litigantes", "Apoderados que buscan una salida líquida y transparente para sus clientes."],
                ["Grupos familiares", "Varios beneficiarios de una misma sentencia que desean cobrar de forma anticipada."],
              ].map(([t, d]) => (
                <li key={t} className="border-l-2 border-fin-lime pl-5">
                  <p className="font-display text-base font-bold uppercase text-fin-ink">{t}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/70">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* elegibilidad */}
        <section className="border-b border-fin-line">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
              Condiciones de elegibilidad
            </h2>
            <div className="mt-10 grid gap-px bg-fin-line sm:grid-cols-2 lg:grid-cols-3">
              {requisitos.map((r) => (
                <div key={r.t} className="bg-fin-cream p-7">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-[3px] ${
                      r.ok ? "bg-fin-lime text-fin-teal" : "bg-fin-line text-fin-ink/50"
                    }`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      {r.ok ? (
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                      )}
                    </svg>
                  </span>
                  <p className="mt-4 font-display text-sm font-bold uppercase text-fin-ink">{r.t}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-fin-ink/65">{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EntitiesGrid tone="white" />

        <section className="bg-fin-teal">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
              Enviando tres documentos sabrá cuánto vale su sentencia hoy.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="rounded-[3px] bg-fin-lime px-7 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-cream"
              >
                Solicitar valoración
              </Link>
              <Link
                to="/proceso"
                className="rounded-[3px] border border-fin-cream px-7 py-3 font-sans text-sm font-semibold text-fin-cream transition-colors hover:bg-fin-cream hover:text-fin-teal"
              >
                Ver el proceso
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
