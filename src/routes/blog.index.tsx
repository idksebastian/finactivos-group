import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { listPublishedPosts } from "@/lib/blog.functions";
import { formatPostDate } from "@/lib/blog-format";
import { PageHeader, Section } from "@/components/page-system";
import { BackButton } from "@/components/back-button";
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

type Post = Awaited<ReturnType<typeof listPublishedPosts>>[number];

const accents = ["bg-fin-teal", "bg-fin-green", "bg-fin-lime"] as const;

/** Cada nota es una tarjeta completa y clicable, con su propio color de acento. */
function PostCard({ post, index = 0, featured = false }: { post: Post; index?: number; featured?: boolean }) {
  const accent = accents[index % accents.length];
  return (
    <article
      className={`group relative flex overflow-hidden rounded-[6px] border border-fin-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 z-10 h-1.5 ${accent}`} />

      {post.cover_image_url ? (
        <div
          className={`overflow-hidden ${featured ? "aspect-16/9 md:aspect-auto md:w-5/12" : "aspect-16/9"}`}
        >
          <img
            src={post.cover_image_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className={`flex flex-1 flex-col p-7 pt-9 ${featured ? "sm:p-10 sm:pt-12" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-[3px] bg-fin-lime/25 px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-fin-teal">
            {post.category}
          </span>
          <span className="font-sans text-xs text-fin-ink/50">{formatPostDate(post.published_at)}</span>
        </div>

        <h2
          className={`mt-4 font-display font-extrabold uppercase leading-[1.05] tracking-tight text-fin-teal transition-colors group-hover:text-fin-green ${
            featured ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>

        <p
          className={`mt-4 font-sans leading-relaxed text-fin-ink/70 ${
            featured ? "max-w-2xl text-base" : "line-clamp-4 text-sm"
          }`}
        >
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-sm font-semibold text-fin-teal">
          <span className="border-b-2 border-fin-lime pb-0.5">Leer la nota</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}

function Page() {
  const posts = Route.useLoaderData();
  const [lead, ...rest] = posts;

  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton />
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
              <PostCard post={lead} featured />
            </Section>

            {rest.length > 0 ? (
              <Section tone="green">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-fin-lime">
                  Más notas
                </p>
                <div
                  className={`mt-8 grid gap-6 sm:grid-cols-2 ${rest.length === 4 ? "" : "lg:grid-cols-3"}`}
                >
                  {rest.map((p, i) => (
                    <PostCard key={p.id} post={p} index={i + 1} />
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
