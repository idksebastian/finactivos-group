import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell, RequireAuth } from "@/components/admin/admin-shell";
import { formatPostDate } from "@/lib/blog-format";

export const Route = createFileRoute("/admin/")({
  component: () => (
    <RequireAuth>
      <PostsList />
    </RequireAuth>
  ),
});

function PostsList() {
  const qc = useQueryClient();
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, category, status, published_at, updated_at")
        .order("published_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });

  return (
    <AdminShell title="Publicaciones">
      <div className="flex justify-end">
        <Link
          to="/admin/posts/$id"
          params={{ id: "new" }}
          className="rounded-[3px] bg-fin-teal px-4 py-2 font-sans text-sm font-medium text-fin-cream hover:bg-fin-green"
        >
          Nueva publicación
        </Link>
      </div>

      <div className="mt-6 border border-fin-line bg-white">
        {isLoading ? (
          <p className="p-6 font-sans text-sm text-fin-ink/50">Cargando…</p>
        ) : isError ? (
          <p className="p-6 font-sans text-sm text-red-700">
            No se pudieron cargar las publicaciones: {error instanceof Error ? error.message : "error desconocido"}
          </p>
        ) : !posts?.length ? (
          <p className="p-6 font-sans text-sm text-fin-ink/50">Aún no hay publicaciones.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-fin-line text-left">
                {["Título", "Categoría", "Estado", "Fecha", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 font-sans text-[11px] uppercase tracking-[0.14em] text-fin-ink/50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-fin-line/60 last:border-0">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-fin-ink">
                    {p.title}
                    <span className="block font-sans text-xs text-fin-ink/40">/{p.slug}</span>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-fin-ink/70">{p.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        p.status === "published"
                          ? "rounded-[3px] bg-fin-green px-2 py-1 font-sans text-[11px] uppercase tracking-[0.12em] text-fin-cream"
                          : "rounded-[3px] border border-fin-line px-2 py-1 font-sans text-[11px] uppercase tracking-[0.12em] text-fin-ink/60"
                      }
                    >
                      {p.status === "published" ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-fin-ink/70">
                    {formatPostDate(p.published_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/admin/posts/$id"
                      params={{ id: p.id }}
                      className="font-sans text-xs uppercase tracking-[0.14em] text-fin-teal hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar «${p.title}»?`)) remove.mutate(p.id);
                      }}
                      className="ml-4 font-sans text-xs uppercase tracking-[0.14em] text-red-700 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
