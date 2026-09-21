import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { siteUrl } from "../lib/site-url";
import { FloatingWhatsApp } from "../components/floating-whatsapp";
import finactivosMark from "../assets/finactivos-mark.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Finactivos Group | Compra de sentencias judiciales en Colombia" },
      { name: "description", content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin." },
      { name: "author", content: "Finactivos Group" },
      { property: "og:title", content: "Finactivos Group | Compra de sentencias judiciales en Colombia" },
      { property: "og:description", content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Finactivos Group | Compra de sentencias judiciales en Colombia" },
      { name: "twitter:description", content: "Compramos sentencias y conciliaciones de reparación directa contra el Estado. Liquidez en semanas, con acompañamiento jurídico de principio a fin." },
      { property: "og:image", content: siteUrl("/og-image-temp.png") },
      { name: "twitter:image", content: siteUrl("/og-image-temp.png") },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Debe cubrir toda la pantalla antes de navegar: la duración cubre la animación
// CSS de entrada (.page-flash-mark-in, 0.4s) más un pequeño margen.
const COVER_MS = 420;
const REVEAL_MS = 420;

function PageTransitionFlash() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const isFirstRender = useRef(true);
  const previousPathname = useRef(pathname);
  const pendingHref = useRef<string | null>(null);
  const intercepted = useRef(false);

  // Intercepta los clics en enlaces internos: primero cubre la pantalla con el
  // destello y el logo, y solo cuando termina esa animación navega a la nueva
  // página -- así la transición se ve completa antes de que cargue el destino.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      // stopPropagation es clave: evita que el propio onClick de <Link> (que
      // navega de inmediato) también reciba este clic y adelante la navegación.
      e.preventDefault();
      e.stopPropagation();
      if (phase !== "idle") return;
      intercepted.current = true;
      pendingHref.current = url.pathname + url.search + url.hash;
      setPhase("covering");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [phase]);

  useEffect(() => {
    if (phase === "covering") {
      const t = setTimeout(() => {
        const href = pendingHref.current;
        pendingHref.current = null;
        const go = href ? router.navigate({ href }) : Promise.resolve();
        go.catch(() => {}).finally(() => setPhase("revealing"));
      }, COVER_MS);
      return () => clearTimeout(t);
    }
    if (phase === "revealing") {
      const t = setTimeout(() => {
        setPhase("idle");
        intercepted.current = false;
      }, REVEAL_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, router]);

  // Respaldo para navegación no interceptada (botón "Volver", atrás/adelante
  // del navegador): sigue mostrando el destello aunque no podamos retrasar la carga.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (intercepted.current) return;

    setPhase("covering");
    const toReveal = setTimeout(() => setPhase("revealing"), COVER_MS);
    const toIdle = setTimeout(() => setPhase("idle"), COVER_MS + REVEAL_MS);
    return () => {
      clearTimeout(toReveal);
      clearTimeout(toIdle);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-999 flex items-center justify-center bg-fin-teal motion-reduce:hidden ${
        phase === "covering" ? "page-flash-in" : "page-flash-out"
      }`}
    >
      <img
        src={finactivosMark}
        alt=""
        className={`h-12 w-auto brightness-0 invert ${
          phase === "covering" ? "page-flash-mark-in" : "page-flash-mark-out"
        }`}
      />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransitionFlash />
      {/* key={pathname} fuerza a que cada página vuelva a montar y dispare la animación de título/gráfico. */}
      <div key={pathname}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
      <FloatingWhatsApp />
      {/* Sin cookies ni banner de consentimiento -- ver conversación con el cliente. */}
      <Analytics />
    </QueryClientProvider>
  );
}
