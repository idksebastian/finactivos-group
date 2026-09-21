import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, CtaBlock } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios | Compra de sentencias, factoring e inversión" },
      {
        name: "description",
        content:
          "Compra de sentencias y conciliaciones contra el Estado, factoring de facturas e inversión respaldada en activos judiciales.",
      },
      { property: "og:title", content: "Servicios | Finactivos Group" },
      {
        property: "og:description",
        content: "Tres líneas de negocio para convertir derechos ciertos en liquidez real.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/servicios") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/servicios") }],
  }),
  component: Page,
});

const lines = [
  {
    n: "01",
    to: "/servicios/compra-de-sentencias" as const,
    t: "Compra de sentencias",
    lead:
      "Adquirimos sentencias y conciliaciones ejecutoriadas de reparación directa contra entidades del Estado. Usted recibe el dinero ahora; la espera de la entidad la asumimos nosotros.",
    points: [
      "Sentencia o conciliación en firme y ejecutoriada",
      "Estudio jurídico sin costo para el titular",
      "Cesión y radicación ante la entidad",
      "Pago al titular antes del giro estatal",
    ],
  },
  {
    n: "02",
    to: "/servicios/factoring" as const,
    t: "Factoring",
    lead:
      "Anticipamos el pago de sus facturas de sus clientes para que su operación no dependa de los plazos de pago de terceros.",
    points: [
      "Facturas radicadas y aceptadas",
      "Descuento según plazo y perfil del pagador",
      "Sin afectar cupos de crédito bancario",
      "Desembolso en días, no en meses",
    ],
  },
  {
    n: "03",
    to: "/servicios/inversion" as const,
    t: "Inversión",
    lead:
      "Estructuramos vehículos de inversión respaldados en activos judiciales ya reconocidos, con estudio jurídico previo y reglas de retorno definidas desde el inicio.",
    points: [
      "Activos con título judicial en firme",
      "Debida diligencia jurídica documentada",
      "Retorno y plazos definidos por contrato",
      "Reportes periódicos al inversionista",
    ],
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton />
      <main>
        <PageHeader
          eyebrow="Servicios"
          title="Tres formas de adelantar un pago que ya le pertenece"
          support="Compramos derechos ciertos, anticipamos cartera y estructuramos inversión sobre activos judiciales. Siempre con estudio jurídico previo y condiciones escritas."
        />

        {lines.map((l, i) => {
          const green = i % 2 === 1;
          return (
          <Section key={l.n} tone={green ? "green" : "cream"}>
            <div className="grid gap-10 md:grid-cols-[1fr_5fr_4fr]">
              <div>
                <span
                  className={
                    green
                      ? "inline-flex h-8 min-w-8 items-center justify-center rounded-[3px] border-2 border-fin-lime px-1.5 font-display text-sm font-bold text-fin-cream"
                      : ds.numberBox
                  }
                >
                  {l.n}
                </span>
              </div>
              <div>
                <h2 className={`${ds.h2} ${green ? "text-fin-cream" : "text-fin-teal"}`}>{l.t}</h2>
                <p className={`mt-4 max-w-lg ${ds.body} ${green ? "text-fin-cream/80" : "text-fin-ink/75"}`}>{l.lead}</p>
                <Link to={l.to} className={`mt-6 inline-flex items-center gap-2 ${green ? ds.btnLime : ds.btnTeal}`}>
                  Ver detalle del servicio
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <ul className={`space-y-3 border-t pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 ${green ? "border-fin-cream/20" : "border-fin-line"}`}>
                {l.points.map((p) => (
                  <li key={p} className={`flex gap-3 ${ds.body} ${green ? "text-fin-cream/85" : "text-fin-ink/80"}`}>
                    <span className={`mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-[1px] ${green ? "bg-fin-lime" : "bg-fin-green"}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
          );
        })}

        <CtaBlock
          title="¿No sabe cuál línea corresponde a su caso?"
          action="Escríbanos"
          to="/contacto"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
