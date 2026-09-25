import { siteUrl } from "@/lib/site-url";
import { socialLinks } from "@/lib/social-links";

/** Entrada lista para `head().scripts` con datos estructurados JSON-LD. */
export function jsonLd(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

const ORG_ID = () => siteUrl("/#organization");

/** Datos de la empresa: todos provienen del sitio (contacto, pie de página, Nosotros). */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["FinancialService", "Organization"],
        "@id": ORG_ID(),
        name: "Finactivos Group S.A.S.",
        alternateName: "Finactivos Group",
        url: siteUrl("/"),
        logo: siteUrl("/favicon.png"),
        image: siteUrl("/og-image-temp.png"),
        description:
          "Compra de sentencias y conciliaciones de reparación directa contra el Estado colombiano, factoring e inversión en activos judiciales.",
        email: "comercial@finactivos.com",
        telephone: ["+57 312 808 5632", "+57 313 453 7849"],
        foundingDate: "2020",
        taxID: "901.389.322-5",
        areaServed: { "@type": "Country", name: "Colombia" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Cll 28 No. 13a 24, Oficina 303, Parque Bavaria — Torre Museo",
          addressLocality: "Bogotá",
          addressCountry: "CO",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
        sameAs: socialLinks.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": siteUrl("/#website"),
        url: siteUrl("/"),
        name: "Finactivos Group",
        inLanguage: "es-CO",
        publisher: { "@id": ORG_ID() },
      },
    ],
  };
}

export function serviceLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: siteUrl(opts.path),
    serviceType: opts.name,
    provider: { "@id": ORG_ID() },
    areaServed: { "@type": "Country", name: "Colombia" },
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: siteUrl(it.path),
    })),
  };
}

export function faqLd(faq: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Páginas estáticas que van al sitemap. */
export const STATIC_PATHS = [
  "/",
  "/servicios",
  "/servicios/compra-de-sentencias",
  "/servicios/factoring",
  "/servicios/inversion",
  "/nosotros",
  "/blog",
  "/contacto",
  "/terminos-y-condiciones",
  "/politica-de-privacidad",
] as const;
