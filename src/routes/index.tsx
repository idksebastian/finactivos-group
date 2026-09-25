import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EntitiesGrid } from "@/components/entities-grid";
import { PhotoFrame } from "@/components/photo-frame";
import { ColombiaMap } from "@/components/colombia-map";
import { ContactForm } from "@/components/contact-form";
import { listPublishedPosts } from "@/lib/blog.functions";
import { formatPostDate } from "@/lib/blog-format";
import { siteUrl } from "@/lib/site-url";
import fotoMujerCasa from "@/assets/fotos/presencia-1.jpg";
import fotoFamilia from "@/assets/fotos/familia-feliz.jpg";
import heroCubosFinal from "@/assets/fotos/hero-cubos-final.jpg";


export const Route = createFileRoute("/")({
  // No debe tumbar la home si el blog falla (ej. base de datos pausada) -- se
  // degrada a "sin publicaciones" en vez de un error de página completa.
  loader: () => listPublishedPosts().catch(() => []),
  head: () => ({
    meta: [
      { title: "Compra de sentencias judiciales en Colombia | Finactivos Group" },
      {
        name: "description",
        content:
          "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Reciba sus derechos económicos anticipadamente y con acompañamiento jurídico. Bogotá.",
      },
      {
        property: "og:title",
        content: "Compra de sentencias judiciales en Colombia | Finactivos Group",
      },
      {
        property: "og:description",
        content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Reciba sus derechos económicos anticipadamente y con acompañamiento jurídico. Bogotá.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],

  }),
  component: Index,
});

/* ---------- hero ---------- */

const HERO_HEADLINE = "Somos su aliado estratégico en el cumplimiento de sus objetivos";

/** Eslogan del hero con efecto de escritura tipo teclado. */
function TypingHeadline({ text, className }: { text: string; className: string }) {
  const [chars, setChars] = useState(0);
  const reduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced.current) {
      setChars(text.length);
      return;
    }
    if (chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [chars, text.length]);

  return (
    <h1 className={`relative ${className}`}>
      {/* Reserva el tamaño final desde el primer fotograma para que no haya
          reflow del resto del layout con cada letra (eso era lo que se
          sentía "a tropezones", no el tamaño del texto). */}
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {text.slice(0, chars)}
        {chars < text.length && <span className="animate-pulse text-fin-lime">▍</span>}
      </span>
      <span className="sr-only">{text}</span>
    </h1>
  );
}

function Hero() {
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:py-28">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Reparación directa contra el Estado
          </p>
          <TypingHeadline
            text={HERO_HEADLINE}
            className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-fin-teal sm:text-5xl md:text-6xl"
          />
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-fin-ink/75">
            Si ya tiene una sentencia o conciliación en firme, no tiene que seguir esperando el pago
            de la entidad. Nosotros asumimos la espera.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contacto"
              className="rounded-[3px] bg-fin-lime px-6 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-green hover:text-fin-cream"
            >
              Solicite una valoración
            </Link>
            <Link
              to="/servicios/compra-de-sentencias"
              hash="proceso"
              className="rounded-[3px] border border-fin-teal px-6 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
            >
              Conozca el proceso
            </Link>
          </div>
        </div>
        <HeroJourneyPhoto />
      </div>
    </section>
  );
}

/** Foto final (editada con IA): cubos en hilera con un ícono por fase y el logo
 *  en el que la mano coloca. El texto va en un pie de foto en código, fuera de
 *  la imagen, para explicar qué representa sin tapar la foto. */
function HeroJourneyPhoto() {
  return (
    <figure className="graphic-enter overflow-hidden rounded-[6px] border border-fin-line bg-white">
      <img
        src={heroCubosFinal}
        width={1024}
        height={682}
        fetchPriority="high"
        alt="Cubos en fila con un ícono por fase (Análisis, Negociación, Formalización) y el logo de Finactivos en el que la mano coloca"
        className="block w-full"
      />
      <figcaption className="border-t border-fin-line px-5 py-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-fin-green">
          Información · Acuerdos · Espera del pago
        </p>
        <p className="mt-1.5 font-sans text-sm leading-relaxed text-fin-ink/75">
          Con Finactivos se evita todo ese camino: nosotros lo asumimos, le pagamos y esperamos a que
          la entidad reembolse.
        </p>
      </figcaption>
    </figure>
  );
}

/* ---------- empatía: personas reales, mismo tratamiento que Nosotros ---------- */

function Empathy() {
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Cobertura nacional
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
            Personas, no expedientes
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-fin-ink/75">
            Detrás de cada sentencia hay alguien que ya esperó suficiente. Trabajamos para que esa
            espera termine antes.
          </p>
        </div>
        <div className="order-1 grid grid-cols-2 gap-10 pt-6 md:order-2">
          <PhotoFrame
            src={fotoMujerCasa}
            alt="Colombiana en su hogar, representando a las familias que acompañamos"
            block="green"
            className="aspect-4/5"
          />
          <PhotoFrame
            src={fotoFamilia}
            alt="Familia sonriendo, representando a los hogares que acompañamos"
            block="lime"
            className="aspect-4/5 mt-8"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- experiencia y conocimiento: 3 pilares ---------- */

const pillars = [
  {
    t: "Confianza",
    d: "Transparencia en el manejo de la información y en cada paso del proceso, de principio a fin.",
  },
  {
    t: "Compromiso",
    d: "Trabajamos bajo principios éticos y profesionales, con compromiso real con los resultados pactados.",
  },
  {
    t: "Cercanía",
    d: "Trato cercano pero respetuoso, buscando aportar valor real en la vida de cada titular.",
  },
];

function Values() {
  return (
    <section className="bg-fin-green">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-lime">
            Experiencia y conocimiento
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
            Un equipo con más de 17 años de trayectoria
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-fin-cream/75">
            Ponemos a su disposición un equipo jurídico y financiero dedicado a la gestión de
            sentencias, conciliaciones y activos judiciales.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-fin-cream/15 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.t} className="bg-fin-cream p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-fin-lime font-display text-sm font-bold text-fin-teal">
                {p.t.charAt(0)}
              </span>
              <p className="mt-4 font-display text-lg font-bold uppercase text-fin-teal">{p.t}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-fin-ink/70">{p.d}</p>
            </div>
          ))}
        </div>

        <Link
          to="/nosotros"
          className="mt-8 inline-block border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-cream transition-colors hover:border-fin-cream"
        >
          Conozca más acerca de Finactivos
        </Link>
      </div>
    </section>
  );
}

/* ---------- noticias y actualidad: teaser del blog ---------- */

type PostTeaser = Awaited<ReturnType<typeof listPublishedPosts>>[number];

function LatestNews({ posts }: { posts: PostTeaser[] }) {
  const post = posts[0];
  if (!post) return null;

  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
              Blog
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
              Noticias y actualidad
            </h2>
          </div>
          <Link
            to="/blog"
            className="border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal transition-colors hover:border-fin-teal"
          >
            Ver todo el blog
          </Link>
        </div>

        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className={`group mt-10 grid gap-8 border border-fin-line bg-white ${post.cover_image_url ? "md:grid-cols-[5fr_7fr]" : ""}`}
        >
          {post.cover_image_url ? (
            <div className="aspect-4/3 overflow-hidden md:aspect-auto">
              <img
                src={post.cover_image_url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : null}
          <div className="p-7 sm:p-9">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-fin-ink/45">
              {post.category} · {formatPostDate(post.published_at)}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-fin-teal transition-colors group-hover:text-fin-green">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-fin-ink/70">
                {post.excerpt}
              </p>
            )}
            <span className="mt-6 inline-block border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal">
              Leer más
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ---------- cobertura: mapa interactivo ---------- */

function Coverage() {
  return (
    <section className="border-b border-fin-line bg-white/50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:py-14 lg:grid-cols-[4fr_5fr]">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Cobertura nacional
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal sm:text-3xl">
            Trabajamos en los 32 departamentos
          </h2>
          <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-fin-ink/75">
            Seleccione un departamento en el mapa para verlo.
          </p>
        </div>
        <ColombiaMap />
      </div>
    </section>
  );
}

/* ---------- cierre: formulario directo, no solo un enlace ---------- */

function CTA() {
  return (
    <section className="bg-fin-teal">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[5fr_6fr] md:items-center">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-lime">
            Hablemos
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-cream">
            Tiene una sentencia en firme. Nosotros tenemos el capital y la experiencia.
          </h2>
          <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-fin-cream/75">
            Complete sus datos y un asesor de Finactivos Group se pondrá en contacto con usted. El
            estudio de su caso no tiene costo.
          </p>
        </div>
        <ContactForm tone="solid" />
      </div>
    </section>
  );
}


function Index() {
  const posts = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-fin-cream">
      <SiteNav />
      <main>
        <Hero />
        <EntitiesGrid tone="white" />
        <Empathy />
        <Values />
        <Coverage />
        <LatestNews posts={posts} />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
