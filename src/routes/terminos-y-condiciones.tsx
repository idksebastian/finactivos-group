import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/terminos-y-condiciones")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones | Finactivos Group" },
      { name: "description", content: "Términos y condiciones de uso del sitio web de Finactivos Group S.A.S." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/terminos-y-condiciones") }],
  }),
  component: Page,
});

function Article({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-fin-line py-8 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className={`${ds.h3} text-fin-teal`}>
        {n}. {title}
      </h2>
      <div className={`mt-3 space-y-3 ${ds.body} text-fin-ink/75`}>{children}</div>
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton />
      <main>
        <PageHeader
          eyebrow="Legal"
          title="Términos y condiciones"
          support="Condiciones de uso del sitio web de Finactivos Group S.A.S."
        />

        <Section className="max-w-3xl">
          <Article n={1} title="Objeto">
            <p>
              Estos términos y condiciones regulan el acceso y uso del sitio web{" "}
              <strong>finactivos.com</strong> (el "Sitio"), operado por{" "}
              <strong>Finactivos Group S.A.S.</strong>, identificada con NIT 901.389.322-5, con
              domicilio en Cll 28 No. 13a 24, Oficina 303, Parque Bavaria — Torre Museo, Bogotá,
              Colombia.
            </p>
          </Article>

          <Article n={2} title="Aceptación">
            <p>
              El acceso y uso de este Sitio implica la aceptación plena de estos términos y
              condiciones. Si no está de acuerdo con ellos, le solicitamos abstenerse de utilizar el
              Sitio.
            </p>
          </Article>

          <Article n={3} title="Naturaleza informativa del contenido">
            <p>
              La información publicada en este Sitio sobre compra de sentencias judiciales, factoring
              e inversión tiene carácter informativo y comercial general. No constituye una oferta
              vinculante, ni una asesoría legal, financiera o tributaria. La viabilidad, condiciones y
              términos de cada caso particular se definen únicamente mediante la evaluación directa que
              realiza el equipo de Finactivos Group y, cuando corresponda, en los contratos que se
              suscriban con cada cliente.
            </p>
          </Article>

          <Article n={4} title="Uso del sitio">
            <p>
              Usted se compromete a utilizar el Sitio y el formulario de contacto de forma lícita,
              suministrando información veraz, y a no utilizar el Sitio para fines fraudulentos o que
              puedan afectar su funcionamiento, disponibilidad o seguridad.
            </p>
          </Article>

          <Article n={5} title="Propiedad intelectual">
            <p>
              Los textos, marca, logotipo, diseño y demás contenidos de este Sitio son propiedad de
              Finactivos Group S.A.S. o se utilizan con la debida autorización, y están protegidos por
              la normativa de propiedad intelectual aplicable. Se prohíbe su reproducción total o
              parcial sin autorización previa y expresa.
            </p>
          </Article>

          <Article n={6} title="Enlaces a sitios de terceros">
            <p>
              Este Sitio puede contener enlaces a redes sociales u otros sitios de terceros.
              Finactivos Group S.A.S. no se hace responsable por el contenido o las políticas de dichos
              sitios, sobre los cuales no tiene control.
            </p>
          </Article>

          <Article n={7} title="Modificaciones">
            <p>
              Finactivos Group S.A.S. podrá actualizar estos términos y condiciones en cualquier
              momento, con el fin de reflejar cambios en el Sitio, en sus servicios o en la normativa
              aplicable. La versión vigente será siempre la publicada en esta página.
            </p>
          </Article>

          <Article n={8} title="Ley aplicable">
            <p>
              Estos términos y condiciones se rigen por las leyes de la República de Colombia.
            </p>
          </Article>

          <Article n={9} title="Contacto">
            <p>
              Para cualquier pregunta sobre estos términos y condiciones, puede escribir a{" "}
              <a href="mailto:comercial@finactivos.com" className="text-fin-green underline underline-offset-4">
                comercial@finactivos.com
              </a>
              .
            </p>
          </Article>
        </Section>

        <Section className="max-w-3xl">
          <p className="font-sans text-sm text-fin-ink/60">
            Consulte también nuestra{" "}
            <Link to="/politica-de-privacidad" className="text-fin-green underline underline-offset-4">
              política de tratamiento de datos personales
            </Link>
            .
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
