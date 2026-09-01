import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de tratamiento de datos personales | Finactivos Group" },
      { name: "description", content: "Política de tratamiento de datos personales de Finactivos Group S.A.S., conforme a la Ley 1581 de 2012." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/politica-de-privacidad") }],
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
          title="Política de tratamiento de datos personales"
          support="Conforme a la Ley 1581 de 2012 y sus decretos reglamentarios sobre protección de datos personales en Colombia."
        />

        <Section className="max-w-3xl">
          <Article n={1} title="Responsable del tratamiento">
            <p>
              <strong>Finactivos Group S.A.S.</strong>, identificada con NIT 901.389.322-5, con
              domicilio en Cll 28 No. 13a 24, Oficina 303, Parque Bavaria — Torre Museo, Bogotá,
              Colombia, es responsable del tratamiento de los datos personales que usted suministre a
              través de este sitio web.
            </p>
            <p>
              Correo de contacto para asuntos de protección de datos:{" "}
              <a href="mailto:comercial@finactivos.com" className="text-fin-green underline underline-offset-4">
                comercial@finactivos.com
              </a>
              .
            </p>
          </Article>

          <Article n={2} title="Datos que recolectamos">
            <p>
              A través del formulario de contacto de este sitio recolectamos: nombre, correo
              electrónico, número de celular, asunto y el mensaje que usted escriba. No solicitamos ni
              recolectamos datos sensibles (salud, datos biométricos, origen racial, entre otros) a
              través de este formulario.
            </p>
          </Article>

          <Article n={3} title="Finalidad del tratamiento">
            <p>Los datos personales que usted suministre serán tratados para:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Responder su solicitud de información o contacto.</li>
              <li>Evaluar la elegibilidad de su caso frente a los servicios de Finactivos Group.</li>
              <li>Comunicarnos con usted por correo electrónico, teléfono o WhatsApp sobre su solicitud.</li>
              <li>Dar cumplimiento a obligaciones legales aplicables.</li>
            </ul>
            <p>No compartimos sus datos personales con terceros para fines comerciales o publicitarios.</p>
          </Article>

          <Article n={4} title="Derechos del titular de los datos">
            <p>Conforme a la Ley 1581 de 2012, usted tiene derecho a:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
              <li>
                Ser informado sobre el uso que se ha dado a sus datos personales, previa solicitud.
              </li>
              <li>
                Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la
                normativa de protección de datos.
              </li>
              <li>Revocar la autorización y/o solicitar la supresión de sus datos, cuando proceda.</li>
              <li>Acceder de forma gratuita a sus datos personales tratados.</li>
            </ul>
          </Article>

          <Article n={5} title="Cómo ejercer sus derechos">
            <p>
              Puede ejercer cualquiera de los derechos anteriores enviando una solicitud al correo{" "}
              <a href="mailto:comercial@finactivos.com" className="text-fin-green underline underline-offset-4">
                comercial@finactivos.com
              </a>
              , indicando su nombre completo, el derecho que desea ejercer, y adjuntando copia de su
              documento de identidad.
            </p>
          </Article>

          <Article n={6} title="Seguridad de la información">
            <p>
              Los datos recolectados a través de este sitio se almacenan en infraestructura provista
              por proveedores de hosting y bases de datos reconocidos, con medidas técnicas y
              administrativas orientadas a evitar el acceso no autorizado, la pérdida o la alteración
              de la información.
            </p>
          </Article>

          <Article n={7} title="Vigencia">
            <p>
              Esta política rige a partir de su publicación en este sitio web y permanecerá vigente
              mientras Finactivos Group S.A.S. trate datos personales de los titulares, sin perjuicio
              de las modificaciones que se realicen para mantenerla actualizada frente a cambios
              normativos o de operación.
            </p>
          </Article>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
