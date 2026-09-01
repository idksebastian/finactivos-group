import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackButton } from "@/components/back-button";
import { PageHeader, Section, SectionTitle, CtaBlock } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_URL =
  "https://wa.me/573128085632?text=" +
  encodeURIComponent("Hola, quiero información sobre la compra de mi sentencia o conciliación.");

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
          "Escríbanos por WhatsApp o llámenos para evaluar su sentencia o conciliación en firme. Oficina en Bogotá, lunes a viernes de 8:00 am a 5:00 pm.",
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Finactivos Group S.A.S.",
          email: "comercial@finactivos.com",
          telephone: ["+57 312 808 5632", "+57 313 453 7849"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cll 28 No. 13a 24, Oficina 303",
            addressLocality: "Bogotá",
            addressCountry: "CO",
          },
        }),
      },
    ],
  }),
  component: Page,
});

const label = "font-sans text-xs uppercase tracking-[0.16em] text-fin-ink/60";

function DirectContact() {
  return (
    <div className="border border-fin-line bg-white/50 p-7 sm:p-9">
      <p className={ds.eyebrow}>Hable con nosotros</p>
      <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
        Respuesta directa
      </h2>
      <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-fin-ink/70">
        Escríbanos por WhatsApp con los datos de su sentencia, llámenos en horario de oficina, o
        complete el formulario más abajo. Un asesor le acompaña desde la primera conversación.
      </p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-[3px] bg-fin-green px-6 py-4 font-sans text-sm font-semibold text-fin-cream transition-colors hover:bg-fin-teal"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.52 3.75 1.42 5.31L2 22l4.98-1.58a9.8 9.8 0 0 0 5.06 1.39h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.96h-.01a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.06.97.98-2.98-.2-.31a8.08 8.08 0 0 1-1.24-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.11 8.11 0 0 1 2.39 5.77c0 4.5-3.66 8.15-8.16 8.15Zm4.47-6.1c-.24-.13-1.45-.72-1.68-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.97-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.29.36-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.46-.29Z" />
        </svg>
        Escríbanos por WhatsApp
      </a>

      <a
        href="tel:+573128085632"
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-[3px] border-2 border-fin-teal px-6 py-4 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
        </svg>
        Llámenos: 312 808 5632
      </a>

      <p className="mt-6 font-sans text-xs leading-relaxed text-fin-ink/50">
        También puede escribirnos a{" "}
        <a href="mailto:comercial@finactivos.com" className="text-fin-green hover:text-fin-teal">
          comercial@finactivos.com
        </a>
        . El estudio de su caso no tiene costo.
      </p>
    </div>
  );
}

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

const requestTypes = [
  { value: "sentencia", label: "Compra de sentencia o conciliación" },
  { value: "factoring", label: "Factoring" },
  { value: "inversion", label: "Inversión" },
  { value: "otro", label: "Otro" },
] as const;

const fieldClass =
  "w-full rounded-[3px] border border-fin-line bg-white px-4 py-3 font-sans text-sm text-fin-ink placeholder:text-fin-ink/40 focus:border-fin-teal focus:outline-none";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [accepted, setAccepted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    const { error } = await supabase.from("contact_submissions").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      request_type: String(data.get("request_type") ?? "sentencia"),
      message: String(data.get("message") ?? ""),
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
    setAccepted(false);
  }

  if (status === "success") {
    return (
      <div className="border border-fin-line bg-white/50 p-7 sm:p-9">
        <p className={ds.eyebrow}>Mensaje enviado</p>
        <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
          Gracias por escribirnos
        </h2>
        <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-fin-ink/70">
          Recibimos su solicitud. Un asesor de Finactivos Group se pondrá en contacto con usted en
          los próximos días hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-fin-line bg-white/50 p-7 sm:p-9">
      <p className={ds.eyebrow}>Escríbanos</p>
      <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
        Deje sus datos y le contactamos
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className={label}>
            Nombre
          </label>
          <input id="name" name="name" required className={`mt-2 ${fieldClass}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className={label}>
            Celular
          </label>
          <input id="phone" name="phone" type="tel" required className={`mt-2 ${fieldClass}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className={label}>
            Correo
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${fieldClass}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="request_type" className={label}>
            Asunto
          </label>
          <select id="request_type" name="request_type" defaultValue="sentencia" className={`mt-2 ${fieldClass}`}>
            {requestTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Mensaje
          </label>
          <textarea id="message" name="message" rows={4} required className={`mt-2 ${fieldClass} resize-none`} />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 font-sans text-xs leading-relaxed text-fin-ink/70">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 rounded-[2px] border-fin-line text-fin-teal focus:ring-fin-teal"
        />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <Link to="/politica-de-privacidad" className="text-fin-green underline underline-offset-4">
            política de tratamiento de datos personales
          </Link>{" "}
          de Finactivos Group.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 font-sans text-xs text-red-600">
          No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !accepted}
        className="mt-6 w-full cursor-pointer rounded-[3px] bg-fin-teal px-6 py-4 font-sans text-sm font-semibold text-fin-cream transition-colors hover:bg-fin-green disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
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
          support="Con la sentencia, la constancia de ejecutoria y su identificación podemos entregarle una valoración escrita. El estudio no tiene costo."
        >
          <div className="mt-12 grid gap-12 border-t border-fin-line pt-12 md:grid-cols-[5fr_6fr]">
            <dl className={`order-2 space-y-6 md:order-0 ${ds.body} text-fin-ink/75`}>
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

            <div className="order-1 md:order-0">
              <DirectContact />
            </div>
          </div>
        </PageHeader>

        <Section tone="paper">
          <div className="grid gap-8 md:grid-cols-[5fr_6fr]">
            <div>
              <p className={ds.eyebrow}>Formulario</p>
              <SectionTitle className="mt-4">O escríbanos aquí</SectionTitle>
              <p className={`mt-4 max-w-sm ${ds.body} text-fin-ink/70`}>
                Complete sus datos y un asesor de Finactivos Group se pondrá en contacto con usted.
              </p>
            </div>
            <ContactForm />
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
