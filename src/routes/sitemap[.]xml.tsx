import { createFileRoute } from "@tanstack/react-router";
import { listPublishedPosts } from "@/lib/blog.functions";
import { STATIC_PATHS } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await listPublishedPosts().catch(() => []);
        const urls = [
          ...STATIC_PATHS.map((p) => ({ loc: siteUrl(p), lastmod: undefined as string | undefined })),
          ...posts.map((p) => ({
            loc: siteUrl(`/blog/${p.slug}`),
            lastmod: p.published_at ? new Date(p.published_at).toISOString().slice(0, 10) : undefined,
          })),
        ];
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls
            .map(
              (u) =>
                `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
            )
            .join("\n") +
          `\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
