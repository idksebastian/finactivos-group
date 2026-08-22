import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell, RequireAuth } from "@/components/admin/admin-shell";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { uploadBlogImage } from "@/lib/blog-storage";
import { slugify } from "@/lib/blog-format";

export const Route = createFileRoute("/admin/posts/$id")({
  component: () => (
    <RequireAuth>
      <PostEditor />
    </RequireAuth>
  ),
});

type Form = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  status: "draft" | "published";
  published_at: string;
};

const empty: Form = {
  title: "",
  slug: "",
  category: "Reparación directa",
  excerpt: "",
  content: "<p></p>",
  cover_image_url: "",
  status: "draft",
  published_at: new Date().toISOString().slice(0, 10),
};

function PostEditor() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState<Form>(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);

  const { data, isLoading, isError, error: fetchError } = useQuery({
    queryKey: ["admin-post", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data: row, error: err } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (err) throw new Error(err.message);
      return row;
    },
  });

  useEffect(() => {
    if (!data) return;
    setSlugTouched(true);
    setForm({
      title: data.title ?? "",
      slug: data.slug ?? "",
      category: data.category ?? "",
      excerpt: data.excerpt ?? "",
      content: data.content ?? "<p></p>",
      cover_image_url: data.cover_image_url ?? "",
      status: (data.status as Form["status"]) ?? "draft",
      published_at: (data.published_at ?? new Date().toISOString()).slice(0, 10),
    });
  }, [data]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (status?: Form["status"]) => {
    setError(null);
    setMessage(null);
    const next = { ...form, status: status ?? form.status };
    if (!next.title.trim()) return setError("El título es obligatorio.");
    const slug = (next.slug.trim() || slugify(next.title)).slice(0, 120);

    setSaving(true);
    const payload = {
      title: next.title.trim().slice(0, 180),
      slug,
      category: next.category.trim().slice(0, 60) || "General",
      excerpt: next.excerpt.trim().slice(0, 320),
      content: next.content,
      cover_image_url: next.cover_image_url.trim() || null,
      status: next.status,
      published_at: new Date(`${next.published_at}T12:00:00Z`).toISOString(),
    };

    const res = isNew
      ? await supabase.from("blog_posts").insert(payload).select("id").single()
      : await supabase.from("blog_posts").update(payload).eq("id", id).select("id").single();

    setSaving(false);
    if (res.error) {
      setError(
        res.error.message.includes("duplicate")
          ? "Ya existe una publicación con ese enlace (slug)."
          : res.error.message,
      );
      return;
    }
    setForm(next);
    void qc.invalidateQueries({ queryKey: ["admin-posts"] });
    setMessage("Cambios guardados.");
    if (isNew && res.data?.id) {
      void navigate({ to: "/admin" });
    }
  };

  if (!isNew && isLoading) {
    return (
      <AdminShell title="Editar publicación">
        <p className="font-sans text-sm text-fin-ink/50">Cargando…</p>
      </AdminShell>
    );
  }

  if (!isNew && isError) {
    return (
      <AdminShell title="Editar publicación">
        <p className="font-sans text-sm text-red-700">
          No se pudo cargar la publicación: {fetchError instanceof Error ? fetchError.message : "error desconocido"}
        </p>
      </AdminShell>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-[3px] border border-fin-line bg-white px-3 py-2 font-sans text-sm text-fin-ink outline-none focus:border-fin-teal";
  const labelCls = "font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/60";

  return (
    <AdminShell title={isNew ? "Nueva publicación" : "Editar publicación"}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <label className={labelCls} htmlFor="title">
            Título
          </label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
            maxLength={180}
            className={`${inputCls} font-display text-lg font-bold`}
          />

          <div className="mt-4">
            <label className={labelCls} htmlFor="excerpt">
              Resumen (aparece en el listado)
            </label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              maxLength={320}
              rows={3}
              className={inputCls}
            />
          </div>

          <div className="mt-6">
            <p className={labelCls}>Contenido</p>
            <div className="mt-1">
              <RichTextEditor value={form.content} onChange={(html) => set("content", html)} />
            </div>
          </div>
        </div>

        <aside className="space-y-5 self-start border border-fin-line bg-white p-5">
          <div>
            <label className={labelCls} htmlFor="status">
              Estado
            </label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => set("status", e.target.value as Form["status"])}
              className={inputCls}
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="category">
              Categoría
            </label>
            <input
              id="category"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              maxLength={60}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="slug">
              Enlace (slug)
            </label>
            <input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={inputCls}
            />
            <p className="mt-1 font-sans text-[11px] text-fin-ink/40">/blog/{form.slug || "…"}</p>
          </div>

          <div>
            <label className={labelCls} htmlFor="date">
              Fecha de publicación
            </label>
            <input
              id="date"
              type="date"
              value={form.published_at}
              onChange={(e) => set("published_at", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <p className={labelCls}>Imagen de portada</p>
            {form.cover_image_url ? (
              <img
                src={form.cover_image_url}
                alt="Portada"
                className="mt-2 w-full rounded-[3px] object-cover"
              />
            ) : null}
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full font-sans text-xs text-fin-ink/60"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setUploadingCover(true);
                try {
                  set("cover_image_url", await uploadBlogImage(file));
                } catch (err) {
                  setError(`No se pudo subir la portada: ${(err as Error).message}`);
                } finally {
                  setUploadingCover(false);
                }
              }}
            />
            {uploadingCover ? (
              <p className="mt-1 font-sans text-[11px] text-fin-ink/50">Subiendo…</p>
            ) : null}
            {form.cover_image_url ? (
              <button
                type="button"
                onClick={() => set("cover_image_url", "")}
                className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-red-700 hover:underline"
              >
                Quitar portada
              </button>
            ) : null}
          </div>

          {error ? <p className="font-sans text-xs text-red-700">{error}</p> : null}
          {message ? <p className="font-sans text-xs text-fin-green">{message}</p> : null}

          <div className="space-y-2 border-t border-fin-line pt-4">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="w-full rounded-[3px] bg-fin-teal px-4 py-2.5 font-sans text-sm font-medium text-fin-cream hover:bg-fin-green disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(form.status === "published" ? "draft" : "published")}
              className="w-full rounded-[3px] border border-fin-line px-4 py-2.5 font-sans text-sm text-fin-ink/70 hover:border-fin-teal hover:text-fin-teal disabled:opacity-60"
            >
              {form.status === "published" ? "Pasar a borrador" : "Publicar ahora"}
            </button>
            <button
              type="button"
              onClick={() => void navigate({ to: "/admin" })}
              className="w-full font-sans text-xs uppercase tracking-[0.14em] text-fin-ink/50 hover:text-fin-teal"
            >
              Volver al listado
            </button>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
