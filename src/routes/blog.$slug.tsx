import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getPublishedPost } from "@/lib/blog.functions";
import { formatPostDate, readingTime, extractFaq } from "@/lib/blog-format";
import { BackButton } from "@/components/back-button";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedPost({ data: { slug: params.slug } });
    if (!result.post) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {
        meta: [{ title: "Publicación no disponible | Finactivos Group" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    const meta: Array<Record<string, string>> = [
      { title: `${p.title} | Finactivos Group` },
      { name: "description", content: p.excerpt },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.excerpt },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (p.cover_image_url?.startsWith("https://")) {
      meta.push({ property: "og:image", content: p.cover_image_url });
      meta.push({ name: "twitter:image", content: p.cover_image_url });
    }

    const url = siteUrl(`/blog/${p.slug}`);
    const graph: Array<Record<string, unknown>> = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.published_at,
        dateModified: p.updated_at ?? p.published_at,
        articleSection: p.category,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Finactivos Group" },
        publisher: { "@type": "Organization", name: "Finactivos Group" },
        ...(p.cover_image_url?.startsWith("https://") ? { image: p.cover_image_url } : {}),
      },
    ];
    const faq = extractFaq(p.content);
    if (faq.length > 0) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: graph.map((g) => ({
        type: "application/ld+json",
        children: JSON.stringify(g),
      })),
    };
  },
  component: Page,
  errorComponent: () => <Shell msg="No fue posible cargar esta publicación." />,
  notFoundComponent: () => <Shell msg="Esta publicación no existe o aún no ha sido publicada." />,
});

function Shell({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-28">
        <h1 className="font-display text-3xl font-extrabold uppercase text-fin-teal">
          Publicación no disponible
        </h1>
        <p className="mt-4 font-sans text-sm text-fin-ink/70">{msg}</p>
        <Link
          to="/blog"
          className="mt-8 inline-block border-b-2 border-fin-lime pb-1 font-sans text-xs uppercase tracking-[0.18em] text-fin-teal"
        >
          Volver al boletín
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function Page() {
  const { post, related } = Route.useLoaderData();
  if (!post) return <Shell msg="Esta publicación no está disponible." />;

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : siteUrl(`/blog/${post.slug}`);
  const shares = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    },
  ];

  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <BackButton fallbackTo="/" />
      <main>
        <article>
          <header className="border-b-2 border-fin-teal">
            <div className="mx-auto max-w-3xl px-6 pb-10 pt-14">
              <Link
                to="/blog"
                className="font-sans text-xs uppercase tracking-[0.18em] text-fin-ink/50 hover:text-fin-teal"
              >
                ← El Boletín
              </Link>
              <p className="mt-8 font-sans text-xs uppercase tracking-[0.18em] text-fin-green">
                {post.category}
              </p>
              <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-fin-teal sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 font-sans text-base leading-relaxed text-fin-ink/70">
                {post.excerpt}
              </p>
              <p className="mt-8 font-sans text-xs uppercase tracking-[0.18em] text-fin-ink/50">
                {formatPostDate(post.published_at)} · {readingTime(post.content)} min de lectura
              </p>
            </div>
          </header>

          {post.cover_image_url ? (
            <figure className="mx-auto max-w-4xl px-6 pt-12">
              <div className="rounded-xl border border-fin-lime/60 bg-fin-teal/5 p-1.5">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="aspect-video w-full rounded-lg object-cover object-center"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-center font-sans text-xs italic text-fin-ink/55">
                {post.title}
              </figcaption>
            </figure>
          ) : null}


          <div className="mx-auto max-w-3xl px-6 py-14">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-14 border-t border-fin-line pt-6">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-fin-teal">
                Compartir
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {shares.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-[3px] border border-fin-line px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/70 transition-colors hover:border-fin-teal hover:text-fin-teal"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="border-t border-fin-line">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-fin-teal">
                Siga leyendo
              </p>
              <div className="mt-6 grid gap-px bg-fin-line sm:grid-cols-3">
                {related.map((r) => (
                  <article key={r.id} className="group bg-fin-cream p-6">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-fin-green">
                      {r.category} · {formatPostDate(r.published_at)}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight text-fin-teal transition-colors group-hover:text-fin-green">
                      <Link to="/blog/$slug" params={{ slug: r.slug }}>
                        {r.title}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-fin-teal">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-16">
            <h2 className="max-w-xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-fin-cream">
              ¿Tiene una sentencia en firme y necesita liquidez?
            </h2>
            <Link
              to="/contacto"
              className="rounded-[3px] bg-fin-cream px-6 py-3 font-sans text-sm font-medium text-fin-teal transition-colors hover:bg-fin-lime hover:text-fin-cream"
            >
              Evalúe su caso
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
