import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import { PhotoFrame } from "@/components/photo-frame";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";
import fotoHombre from "@/assets/fotos/hero-tranquilidad.jpg";
import fotoPareja from "@/assets/fotos/presencia-2.jpg";
import fotoCiudad from "@/assets/fotos/nosotros-ciudad.jpg";
import fotoAcuerdo from "@/assets/fotos/nosotros-acuerdo.jpg";

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

const services = [
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

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton />
      <main>
        <PageHeader
          variant="solid"
          eyebrow="Nosotros"
          title="Existimos porque la espera también tiene un costo"
          support="Finactivos Group S.A.S. es una compañía colombiana de estructuración financiera y jurídica. Compramos derechos económicos reconocidos judicialmente para que sus titulares no dependan de los plazos del Estado."
        />

        <Section tone="paper">
          <div className="grid gap-12 md:grid-cols-[4fr_6fr]">
            <SectionTitle>Quiénes somos</SectionTitle>
            <div className={`space-y-5 ${ds.lead} text-fin-ink/75`}>
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
          <div className="grid items-center gap-14 md:grid-cols-2">
            <PhotoFrame
              src={fotoCiudad}
              alt="Vista aérea nocturna de una ciudad colombiana"
              block="green"
              className="aspect-4/5"
            />
            <div>
              <p className={ds.eyebrow}>Nuestra misión</p>
              <div className={`mt-5 space-y-4 ${ds.lead} text-fin-ink/75`}>
                <p>
                  En Finactivos Group SAS estructuramos soluciones de inversión, financiación y
                  liquidez sobre activos alternativos y títulos no tradicionales, brindando a
                  nuestros clientes asesoría especializada, acompañamiento cercano y gestión
                  integral durante cada etapa del proceso.
                </p>
                <p>
                  Trabajamos para construir relaciones de largo plazo basadas en la confianza, la
                  transparencia, la ética y el compromiso, entendiendo las necesidades
                  particulares de cada cliente y ofreciendo soluciones oportunas, seguras y
                  orientadas al cumplimiento de sus objetivos.
                </p>
                <p>
                  A través de nuestra experiencia y conocimiento, buscamos generar valor no solo
                  para nuestros clientes y aliados, sino también para la sociedad, contribuyendo
                  especialmente a facilitar oportunidades de acceso a recursos y acompañamiento
                  para víctimas del conflicto armado.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section tone="teal">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <div className="md:order-2">
              <p className={`${ds.eyebrow} text-fin-lime`}>Nuestra visión</p>
              <div className={`mt-5 space-y-4 ${ds.lead} text-fin-cream/85`}>
                <p>
                  Ser una compañía reconocida en Colombia por nuestra experiencia, confiabilidad e
                  innovación en la estructuración de soluciones de inversión, financiación y
                  liquidez sobre activos alternativos, destacándose por ofrecer un servicio
                  cercano, transparente y centrado en las necesidades de nuestros clientes.
                </p>
                <p>
                  Buscaremos consolidarnos como un aliado estratégico y asesor de confianza,
                  construyendo relaciones sostenibles y de largo plazo con nuestros clientes,
                  inversionistas y aliados, respaldados por la excelencia operativa y el
                  compromiso con los resultados.
                </p>
                <p>
                  Asimismo, aspiramos a fortalecer nuestro impacto social, convirtiéndonos en un
                  referente empresarial por nuestra contribución a la inclusión económica y al
                  apoyo de las víctimas del conflicto armado, generando oportunidades que aporten
                  a su proceso de reparación, estabilidad y construcción de un mejor futuro.
                </p>
              </div>
            </div>
            <PhotoFrame
              src={fotoAcuerdo}
              alt="Dos personas cerrando un acuerdo de negociación con un apretón de manos"
              block="lime"
              border="cream"
              className="aspect-4/5 md:order-1"
            />
          </div>
        </Section>

        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <SectionTitle>Qué hacemos</SectionTitle>
              <p className={`mt-4 ${ds.body} text-fin-ink/70`}>
                Tres líneas de negocio con un mismo principio: convertir derechos ciertos en
                liquidez real.
              </p>
            </div>
            <Link to="/servicios" className={ds.linkUnderline}>
              Ver todos los servicios
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {services.map((s, idx) => (
              <div key={s.t} className="flex flex-col border border-fin-line bg-white p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-fin-lime font-display text-sm font-bold text-fin-teal">
                  0{idx + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold uppercase text-fin-teal">{s.t}</h3>
                <p className={`mt-3 flex-1 ${ds.body} text-fin-ink/70`}>{s.d}</p>
                <Link
                  to={s.to}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-fin-teal px-5 py-2.5 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
                >
                  Conocer más
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="paper">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-10 pt-6">
              <PhotoFrame
                src={fotoHombre}
                alt="Colombiano en su comunidad, representando a los titulares que acompañamos"
                block="lime"
                className="aspect-4/5 mt-8"
              />
              <PhotoFrame
                src={fotoPareja}
                alt="Pareja colombiana, representando a los beneficiarios y herederos que acompañamos"
                block="green"
                className="aspect-4/5"
              />
            </div>
            <div>
              <p className={ds.eyebrow}>Cobertura nacional</p>
              <h2 className={`mt-4 ${ds.h2} text-fin-teal`}>Detrás de cada sentencia hay una persona</h2>
              <p className={`mt-5 ${ds.lead} text-fin-ink/75`}>
                Víctimas, herederos y familias en distintas regiones del país que ya obtuvieron un
                fallo a su favor y ahora esperan que el Estado cumpla. Ese es el titular con el que
                trabajamos: alguien con un derecho reconocido y sin tiempo de sobra para esperarlo.
              </p>
            </div>
          </div>
        </Section>

        <Section tone="green">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className={`${ds.h3} text-fin-cream`}>Esencia de Finactivos</p>
              <p className={`mt-3 ${ds.body} text-fin-cream/80`}>
                Trabajamos bajo principios éticos y profesionales: el trato a los clientes, la
                confianza en el manejo de la información, transparencia en los procesos y
                compromiso con los resultados pactados. Estos principios hacen parte del ADN de
                nuestra empresa, con miras a aportar en el ámbito social.
              </p>
            </div>
            <div>
              <p className={`${ds.h3} text-fin-cream`}>Personalidad Finactivos</p>
              <p className={`mt-3 ${ds.body} text-fin-cream/80`}>
                Nuestra personalidad de marca es socialmente consciente y responsable. Creemos que,
                con un trato cercano pero respetuoso, podemos influir de manera positiva en la
                vida de nuestros clientes.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">2020</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>año de fundación</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">+17</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>años de experiencia jurídica y financiera</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">Bogotá</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>sede principal, cobertura nacional</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">+10.000</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>procesos analizados</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">901.389.322-5</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>NIT</p>
            </div>
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
