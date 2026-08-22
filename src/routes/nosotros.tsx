import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Finactivos Group S.A.S." },
      {
        name: "description",
        content:
          "Quiénes somos: un equipo jurídico y financiero colombiano dedicado a convertir sentencias en firme en liquidez para sus titulares.",
      },
      { property: "og:title", content: "Nosotros | Finactivos Group" },
      {
        property: "og:description",
        content: "Equipo jurídico y financiero con respaldo, criterio y trato humano.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/nosotros") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/nosotros") }],
  }),
  component: Page,
});

const values = [
  {
    t: "Claridad",
    d: "Cada propuesta se entrega por escrito, con el valor, los descuentos y los tiempos a la vista. Nunca hay letra pequeña.",
  },
  {
    t: "Respeto",
    d: "Detrás de cada sentencia hay una pérdida. Acompañamos con el cuidado que ese hecho exige.",
  },
  {
    t: "Rigor",
    d: "No hacemos ofertas sin estudio jurídico. Si el caso no aplica, se lo decimos de una vez.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <PageHeader
          variant="solid"
          eyebrow="Nosotros"
          title="Existimos porque la espera también tiene un costo"
          support="Finactivos Group S.A.S. es una compañía colombiana de estructuración financiera y jurídica. Compramos derechos económicos reconocidos judicialmente para que sus titulares no dependan de los plazos del Estado."
        />

        <Section>
          <div className="grid gap-12 md:grid-cols-[4fr_6fr]">
            <SectionTitle>Quiénes somos</SectionTitle>
            <div className={`space-y-5 ${ds.lead} text-fin-ink/75`}>
              <p>
                Nacimos de la unión entre abogados especializados en responsabilidad del Estado y
                estructuradores financieros. Esa mezcla es la que permite valorar un fallo con
                precisión y asumir con responsabilidad el riesgo de su cobro.
              </p>
              <p>
                Trabajamos principalmente con sentencias y conciliaciones de reparación directa,
                donde las familias llevan años esperando un pago que ya fue ordenado por un juez.
                Nuestro papel es adelantar ese momento sin trasladarle riesgos al titular.
              </p>
              <p>
                Operamos desde Bogotá con cobertura nacional, y acompañamos cada cesión hasta su
                radicación ante la entidad condenada.
              </p>
            </div>
          </div>
        </Section>

        <Section tone="paper">
          <div className="grid gap-px bg-fin-line md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.t} className="bg-fin-cream p-8">
                <span className={ds.numberBox}>{String(i + 1).padStart(2, "0")}</span>
                <p className={`mt-4 ${ds.h3} text-fin-teal`}>{v.t}</p>
                <p className={`mt-3 ${ds.body} text-fin-ink/75`}>{v.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "+17", l: "años de experiencia jurídica y financiera" },
              { v: "Bogotá", l: "sede principal, cobertura nacional" },
              { v: "+250", l: "procesos analizados" },
              { v: "901.389.322-5", l: "NIT" },
            ].map((d) => (
              <div key={d.l} className="border-l-2 border-fin-lime pl-5">
                <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">
                  {d.v}
                </p>
                <p className={`mt-2 ${ds.body} text-fin-ink/70`}>{d.l}</p>
              </div>
            ))}
          </div>
        </Section>

        <CtaBlock
          title="Conversemos sobre su caso, sin compromiso."
          action="Contáctenos"
          to="/contacto"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
