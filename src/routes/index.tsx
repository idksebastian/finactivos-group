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
import fotoCampesinoCafe from "@/assets/fotos/campesino-cafe.jpg";
import { siteUrl } from "@/lib/site-url";
import fotoMujerCasa from "@/assets/fotos/presencia-1.jpg";
import fotoFamilia from "@/assets/fotos/familia-feliz.jpg";
import heroBloques from "@/assets/fotos/hero-bloques.jpg";


export const Route = createFileRoute("/")({
  // No debe tumbar la home si el blog falla (ej. base de datos pausada) -- se
  // degrada a "sin publicaciones" en vez de un error de página completa.
  loader: () => listPublishedPosts().catch(() => []),
  head: () => ({
    meta: [
      { title: "Finactivos Group | Compra de sentencias judiciales en Colombia" },
      {
        name: "description",
        content:
          "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin.",
      },
      {
        property: "og:title",
        content: "Finactivos Group | Compra de sentencias judiciales en Colombia",
      },
      {
        property: "og:description",
        content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],

  }),
  component: Index,
});

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setSeen(true);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

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
    const t = setTimeout(() => setChars((c) => c + 1), 28);
    return () => clearTimeout(t);
  }, [chars, text.length]);

  return (
    <h1 className={className}>
      <span aria-hidden>{text.slice(0, chars)}</span>
      {chars < text.length && (
        <span aria-hidden className="animate-pulse text-fin-lime">
          ▍
        </span>
      )}
      <span className="sr-only">{text}</span>
    </h1>
  );
}

/** Foto real en vez de gráficas abstractas, con leve zoom continuo para dar movimiento. */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={heroBloques}
        alt=""
        className="hero-kenburns absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-fin-cream via-fin-cream/85 to-fin-cream/30" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-fin-line bg-fin-cream">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:py-28">
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
              to="/proceso"
              className="rounded-[3px] border border-fin-teal px-6 py-3 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
            >
              Conozca el proceso
            </Link>
          </div>
        </div>
        <TimeRelief />
      </div>
    </section>

  );
}


/** Contraste de tiempos como recorrido, no como gráfico de datos. */
function TimeRelief() {
  const { ref, seen } = useInView<HTMLDivElement>(0.35);

  return (
    <div
      ref={ref}
      className="graphic-enter rounded-[6px] border border-fin-line bg-white/60 p-7 sm:p-9"
      aria-label="Comparación del tiempo de espera"
    >
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-fin-ink/45">
        El camino hasta recibir su dinero
      </p>

      {/* camino largo */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-sm text-fin-ink/70">Esperando a la entidad</span>
          <span className="font-display text-sm font-bold text-fin-ink/60">
            90% de los casos: más de 6 años
          </span>
        </div>
        <div className="relative mt-4 h-10">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-fin-ink/25" />
          <div className="relative flex h-full items-center justify-between">
            {["Hoy", "", "", "", "Pago"].map((label, i) => (
              <span key={i} className="flex flex-col items-center gap-2">
                <span
                  className={`block h-2 w-2 rounded-full ${
                    i === 0 ? "bg-fin-ink/60" : "bg-fin-ink/20"
                  }`}
                />
                {label && (
                  <span className="absolute top-7 font-sans text-[11px] text-fin-ink/45">
                    {label}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* camino corto */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-sm font-medium text-fin-teal">Con Finactivos</span>
          <span className="font-display text-sm font-bold text-fin-green">Máximo 3 meses</span>
        </div>
        <div className="relative mt-4 h-10">
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-fin-line" />
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-fin-lime transition-[width] duration-[1600ms] ease-out"
            style={{ width: seen ? "100%" : "0%" }}
          />
          <div
            className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fin-green text-fin-cream transition-[left] duration-[1600ms] ease-out"
            style={{ left: seen ? "100%" : "0%" }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p className="mt-6 font-sans text-sm leading-relaxed text-fin-ink/70">
          En un máximo de tres meses usted recibe sus derechos económicos. La espera de hasta 6 años
          ante la entidad corre por nuestra cuenta.
        </p>
      </div>
    </div>
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

/* ---------- servicios: split asimétrico ---------- */

function Services() {
  const items = [
    {
      t: "Compra de sentencias",
      to: "/servicios/compra-de-sentencias" as const,
      d: "Adquirimos sentencias y conciliaciones ejecutoriadas de reparación directa contra entidades del Estado, con pago al titular antes de que la entidad gire.",
    },
    {
      t: "Factoring",
      to: "/servicios/factoring" as const,
      d: "Anticipamos el pago de sus facturas de sus clientes, sin afectar el flujo de su operación.",
    },
    {
      t: "Inversión",
      to: "/servicios/inversion" as const,
      d: "Estructuramos vehículos respaldados en activos judiciales, con estudio jurídico previo y retorno definido.",
    },
  ];
  return (
    <section className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
              Qué hacemos
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-fin-ink/70">
              Tres líneas de negocio con un mismo principio: convertir derechos ciertos en liquidez
              real.
            </p>
          </div>
          <Link
            to="/servicios"
            className="border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal transition-colors hover:border-fin-teal"
          >
            Ver todos los servicios
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((i, idx) => (
            <div key={i.t} className="flex flex-col border border-fin-line bg-white p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-fin-lime font-display text-sm font-bold text-fin-teal">
                0{idx + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-fin-teal">{i.t}</h3>
              <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-fin-ink/70">{i.d}</p>
              <Link
                to={i.to}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-fin-teal px-5 py-2.5 font-sans text-sm font-semibold text-fin-teal transition-colors hover:bg-fin-teal hover:text-fin-cream"
              >
                Conocer más
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
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
    <section className="border-b border-fin-line bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
            Experiencia y conocimiento
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
            Un equipo con más de 17 años de trayectoria
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-fin-ink/70">
            Ponemos a su disposición un equipo jurídico y financiero dedicado a la gestión de
            sentencias, conciliaciones y activos judiciales.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-fin-line sm:grid-cols-3">
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
          className="mt-8 inline-block border-b-2 border-fin-lime pb-1 font-sans text-sm font-semibold text-fin-teal transition-colors hover:border-fin-teal"
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
          className="group mt-10 grid gap-8 border border-fin-line bg-white md:grid-cols-[5fr_7fr]"
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
          ) : (
            <div className="hidden bg-fin-teal md:block" aria-hidden />
          )}
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
        <EntitiesGrid tone="cream" />
        <Empathy />
        <Services />
        <Values />
        <Coverage />
        <LatestNews posts={posts} />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
