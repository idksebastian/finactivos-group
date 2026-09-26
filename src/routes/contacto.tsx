import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import { ContactForm } from "@/components/contact-form";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

const ADDRESS = "Cll 28 No. 13a 24, Oficina 303, Parque Bavaria — Torre Museo, Bogotá";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Calle+28+%2313a-24+Parque+Bavaria+Torre+Museo+Bogot%C3%A1";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Calle+28+%2313a-24+Parque+Bavaria+Torre+Museo+Bogot%C3%A1";


export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Evalúe su sentencia — Finactivos Group" },
      {
        name: "description",
        content:
          "Complete el formulario para evaluar su sentencia o conciliación en firme. Oficina en Bogotá, lunes a viernes de 8:00 am a 5:00 pm.",
      },
      { property: "og:title", content: "Contacto | Finactivos Group" },
      {
        property: "og:description",
        content: "Hable directamente con nuestro equipo y reciba una valoración escrita sin costo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/contacto") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/contacto") }],
  }),
  component: Page,
});

const label = "font-sans text-xs uppercase tracking-[0.16em] text-fin-ink/60";

function LocationCard() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(ADDRESS);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-10 overflow-hidden rounded-[6px] border border-fin-line bg-white/60">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-fin-line px-6 py-5">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-fin-green">
            Nuestra oficina
          </p>
          <p className="mt-2 font-display text-lg font-extrabold uppercase tracking-tight text-fin-teal">
            Parque Bavaria — Torre Museo
          </p>
          <p className="mt-1 font-sans text-sm text-fin-ink/70">
            Cll 28 No. 13a 24, Oficina 303, Bogotá
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyAddress}
            className="cursor-pointer rounded-[3px] border border-fin-line px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-ink/70 transition-colors hover:border-fin-teal hover:text-fin-teal"
            aria-live="polite"
          >
            {copied ? "Dirección copiada" : "Copiar dirección"}
          </button>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-[3px] border-2 border-fin-green px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-green transition-colors hover:bg-fin-green hover:text-fin-cream"
          >
            Cómo llegar
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-[3px] bg-fin-teal px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-cream transition-colors hover:bg-fin-green"
          >
            Abrir en Google Maps
          </a>
        </div>
      </div>


      <div className="relative">
        <iframe
          title="Ubicación de Finactivos Group en Bogotá"
          src="https://www.google.com/maps?q=Calle+28+%2313a-24+Parque+Bavaria+Torre+Museo,+Bogot%C3%A1&z=17&output=embed"
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] w-full border-0 grayscale-[70%] contrast-[1.05] sm:h-[440px]"
          allowFullScreen
        />

        {/* Pin de marca sobre la ubicación exacta */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="flex flex-col items-center">
            <span className="rounded-[3px] bg-fin-teal px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-fin-cream shadow-sm">
              Finactivos Group
            </span>
            <svg viewBox="0 0 24 32" className="mt-1 h-9 w-7 drop-shadow-sm" aria-hidden="true">
              <path
                d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0Z"
                fill="var(--fin-lime)"
              />
              <circle cx="12" cy="12" r="4.6" fill="var(--fin-cream)" />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-fin-teal/15" />
      </div>
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
          eyebrow="Contacto"
          title="Cuéntenos su caso"
          support="La búsqueda de convertir sus derechos en recursos líquidos o efectivo, es nuestra meta. No es solo una transacción, es materializar sus proyectos."
        >
          <dl
            className={`mt-12 grid gap-8 border-t border-fin-line pt-12 sm:grid-cols-2 lg:grid-cols-4 ${ds.body} text-fin-ink/75`}
          >
            <div>
              <dt className={label}>Oficina</dt>
              <dd className="mt-1 leading-relaxed">
                Cll 28 No. 13a 24, Oficina 303
                <br />
                Parque Bavaria — Torre Museo, Bogotá
              </dd>
            </div>
            <div>
              <dt className={label}>Teléfonos</dt>
              <dd className="mt-1">
                <a href="tel:+573128085632" className="hover:text-fin-green">
                  312 808 5632
                </a>
                <br />
                <a href="tel:+573134537849" className="hover:text-fin-green">
                  313 453 7849
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Correo</dt>
              <dd className="mt-1">
                <a href="mailto:comercial@finactivos.com" className="hover:text-fin-green">
                  comercial@finactivos.com
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Horario</dt>
              <dd className="mt-1">Lunes a viernes, 8:00 am – 5:00 pm</dd>
            </div>
          </dl>
        </PageHeader>

        <Section tone="green" id="formulario">
          <div className="grid gap-8 md:grid-cols-[5fr_6fr]">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-lime">Formulario</p>
              <SectionTitle tone="cream" className="mt-4">O escríbanos aquí</SectionTitle>
              <p className={`mt-4 max-w-sm ${ds.body} text-fin-cream/80`}>
                Complete sus datos y un asesor de Finactivos Group se pondrá en contacto con usted.
              </p>
            </div>
            <ContactForm tone="solid" />
          </div>
        </Section>

        <Section>
          <div className="grid gap-8 md:grid-cols-[5fr_6fr] md:items-end">
            <div>
              <p className={ds.eyebrow}>Cómo llegar</p>
              <SectionTitle className="mt-4">Parque Bavaria — Torre Museo</SectionTitle>
            </div>
            <p className={`${ds.body} text-fin-ink/70`}>
              Cll 28 No. 13a 24, Oficina 303, Bogotá. Atendemos con cita previa de lunes a viernes.
            </p>
          </div>

          <LocationCard />
        </Section>

        <CtaBlock
          title="Si prefiere hablar antes de escribir, llámenos. Escuchamos primero."
          action="Llámenos: 312 808 5632"
          href="tel:+573128085632"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
