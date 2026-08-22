const rawSiteUrl = import.meta.env["VITE_SITE_URL"];

if (!rawSiteUrl) {
  console.error(
    "[site-url] Missing VITE_SITE_URL environment variable. Set it in .env (see .env.example).",
  );
}

export const SITE_URL = (rawSiteUrl ?? "").replace(/\/+$/, "");

export function siteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
