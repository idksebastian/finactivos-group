import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { listPublishedPosts } from "@/lib/blog.functions";
import { formatPostDate } from "@/lib/blog-format";
import { PageHeader, Section } from "@/components/page-system";
import * as ds from "@/lib/design-system";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/blog/")({
  loader: () => listPublishedPosts(),
  staleTime: 0,
  shouldReload: true,
  head: () => ({
    meta: [
      { title: "Blog | Sentencias, factoring y liquidez — Finactivos Group" },
      {
        name: "description",
        content:
          "Análisis sobre reparación directa, cesión de derechos económicos, factoring e inversión en activos judiciales en Colombia.",
      },
      { property: "og:title", content: "Blog | Finactivos Group" },
      {
        property: "og:description",
        content: "Notas jurídicas y financieras sobre el cobro de sentencias contra el Estado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/blog") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/blog") }],
  }),
  component: Page,
  errorComponent: () => <BlogShell>No fue posible cargar las publicaciones.</BlogShell>,
  notFoundComponent: () => <BlogShell>No encontramos esta sección.</BlogShell>,
});

function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <p className={`${ds.body} text-fin-ink/70`}>{children}</p>
      </main>
      <SiteFooter />
    </div>
  );
}

function Page() {
  const posts = Route.useLoaderData();
  const lead = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <PageHeader
          variant="solid"
          eyebrow="El Boletín"
          title="Notas jurídicas y financieras"
          support="Análisis sobre reparación directa, cesión de derechos económicos, factoring e inversión en activos judiciales en Colombia."
        />

        {!lead ? (
          <Section>
            <p className={`${ds.body} text-fin-ink/60`}>Aún no hay publicaciones disponibles.</p>
          </Section>
        ) : (
          <>
            <Section>
              <div className="grid gap-10 md:grid-cols-[7fr_5fr]">
                <article>
                  <p className={ds.eyebrow}>
                    {lead.category} · {formatPostDate(lead.published_at)}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight text-fin-ink sm:text-4xl">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: lead.slug }}
                      className="transition-colors hover:text-fin-teal"
                    >
                      {lead.title}
                    </Link>
                  </h2>
                  <p className={`mt-5 max-w-2xl ${ds.lead} text-fin-ink/75`}>{lead.excerpt}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: lead.slug }}
                    className={`mt-6 ${ds.linkUnderline}`}
                  >
                    Leer la nota completa
                  </Link>
                </article>
                <aside className="border-t border-fin-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className={`${ds.h3} text-fin-teal`}>En esta edición</p>
                  <ul className="mt-4 space-y-3">
                    {rest.map((p) => (
                      <li key={p.id} className={`${ds.body} text-fin-ink/75`}>
                        <span className="text-fin-lime">—</span>{" "}
                        <Link
                          to="/blog/$slug"
                          params={{ slug: p.slug }}
                          className="hover:text-fin-teal"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </Section>

            {rest.length > 0 ? (
              <Section tone="paper">
                <div className="grid gap-px bg-fin-line sm:grid-cols-2">
                  {rest.map((p, i) => (
                    <article key={p.id} className="group bg-fin-cream p-8">
                      <div className="flex items-center gap-3">
                        <span className={ds.numberBox}>{String(i + 1).padStart(2, "0")}</span>
                        <p className={ds.eyebrow}>
                          {p.category} · {formatPostDate(p.published_at)}
                        </p>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-tight text-fin-ink transition-colors group-hover:text-fin-teal">
                        <Link to="/blog/$slug" params={{ slug: p.slug }}>
                          {p.title}
                        </Link>
                      </h3>
                      <p className={`mt-3 ${ds.body} text-fin-ink/70`}>{p.excerpt}</p>
                    </article>
                  ))}
                </div>
              </Section>
            ) : null}
          </>
        )}

        <section className="bg-fin-teal">
          <div className={`${ds.container} ${ds.sectionPadCta}`}>
            <p className={`max-w-2xl ${ds.body} text-fin-cream/80`}>
              ¿Desea recibir las próximas entregas? Escríbanos a{" "}
              <a href="mailto:comercial@finactivos.com" className="text-fin-lime hover:underline">
                comercial@finactivos.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
