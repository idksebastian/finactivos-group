import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /admin",
          "",
          `Sitemap: ${siteUrl("/sitemap.xml")}`,
          "",
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
