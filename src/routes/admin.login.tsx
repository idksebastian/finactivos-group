import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Acceso al panel | Finactivos Group" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (err) {
      setError("Credenciales incorrectas. Verifique el correo y la contraseña.");
      return;
    }
    void navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-fin-teal px-6">
      <div className="w-full max-w-sm bg-fin-cream p-10">
        <p className="font-display text-lg font-extrabold tracking-tight text-fin-teal">
          FINACTIVOS<span className="text-fin-lime">.</span>
        </p>
        <h1 className="mt-6 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-ink">
          Acceso al panel
        </h1>
        <p className="mt-2 font-sans text-xs text-fin-ink/60">
          Uso exclusivo del equipo de Finactivos Group.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/60">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-[3px] border border-fin-line bg-white px-3 py-2 font-sans text-sm text-fin-ink outline-none focus:border-fin-teal"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/60">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-[3px] border border-fin-line bg-white px-3 py-2 font-sans text-sm text-fin-ink outline-none focus:border-fin-teal"
            />
          </div>

          {error ? <p className="font-sans text-xs text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-[3px] bg-fin-teal px-4 py-2.5 font-sans text-sm font-medium text-fin-cream transition-colors hover:bg-fin-green disabled:opacity-60"
          >
            {busy ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
