import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import { PhotoFrame } from "@/components/photo-frame";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";
import fotoHombre from "@/assets/fotos/hero-tranquilidad.jpg";
import fotoPareja from "@/assets/fotos/presencia-2.jpg";

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

        <Section>
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

        <Section>
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-10 pt-6">
              <PhotoFrame
                src={fotoHombre}
                alt="Colombiano en su comunidad, representando a los titulares que acompañamos"
                block="lime"
                className="aspect-4/5 translate-y-8"
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

        <Section tone="paper">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className={`${ds.h3} text-fin-teal`}>Esencia de Finactivos</p>
              <p className={`mt-3 ${ds.body} text-fin-ink/75`}>
                Trabajamos bajo principios éticos y profesionales: el trato a los clientes, la
                confianza en el manejo de la información, transparencia en los procesos y
                compromiso con los resultados pactados. Estos principios hacen parte del ADN de
                nuestra empresa, con miras a aportar en el ámbito social.
              </p>
            </div>
            <div>
              <p className={`${ds.h3} text-fin-teal`}>Personalidad Finactivos</p>
              <p className={`mt-3 ${ds.body} text-fin-ink/75`}>
                Nuestra personalidad de marca es socialmente consciente y responsable. Creemos que,
                con un trato cercano pero respetuoso, podemos influir de manera positiva en la
                vida de nuestros clientes.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">+17</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>años de experiencia jurídica y financiera</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">Bogotá</p>
              <p className={`mt-2 ${ds.body} text-fin-ink/70`}>sede principal, cobertura nacional</p>
            </div>
            <div className="border-l-2 border-fin-lime pl-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-fin-teal">+250</p>
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
