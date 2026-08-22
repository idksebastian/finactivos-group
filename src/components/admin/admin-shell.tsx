import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdminSession() {
  const [state, setState] = useState<{ loading: boolean; email: string | null }>({
    loading: true,
    email: null,
  });

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setState({ loading: false, email: data.session?.user.email ?? null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ loading: false, email: session?.user.email ?? null });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, email } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !email) void navigate({ to: "/admin/login" });
  }, [loading, email, navigate]);

  if (loading || !email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-fin-cream">
        <p className="font-sans text-sm text-fin-ink/50">Verificando sesión…</p>
      </div>
    );
  }
  return <>{children}</>;
}

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const { email } = useAdminSession();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fin-cream">
      <header className="border-b border-fin-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/admin" className="font-display text-base font-extrabold tracking-tight text-fin-teal">
              FINACTIVOS<span className="text-fin-lime">.</span>{" "}
              <span className="font-sans text-xs font-normal uppercase tracking-[0.18em] text-fin-ink/50">
                Panel
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link
                to="/admin"
                activeOptions={{ exact: true }}
                className="font-sans text-sm text-fin-ink/60 hover:text-fin-teal"
                activeProps={{ className: "text-fin-teal font-medium" }}
              >
                Publicaciones
              </Link>
              <Link to="/" className="font-sans text-sm text-fin-ink/60 hover:text-fin-teal">

                Ver sitio
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-fin-ink/50">{email}</span>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                void navigate({ to: "/admin/login" });
              }}
              className="rounded-[3px] border border-fin-line px-3 py-1.5 font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/60 hover:border-fin-teal hover:text-fin-teal"
            >
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-fin-teal">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
