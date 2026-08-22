# Tech debt

Tracked items that are intentionally temporary or incomplete, to resolve before final client delivery.

## Open Graph / social preview image is a temporary placeholder

`public/og-image-temp.png` (1200×630) is used for `og:image` and `twitter:image` in [src/routes/__root.tsx](src/routes/__root.tsx). It was generated programmatically — solid brand-teal (`#006A6A`) background, the real Finactivos mark in a cream badge, and the title/subtitle as plain text — not a professionally designed piece.

**To do:** replace with a real designed OG image (still 1200×630px), swap the file (keep or update the path in `__root.tsx`), and remove this entry.

## `.github/workflows/supabase-keepalive.yml` is required infrastructure, not scaffolding

This workflow pings the Supabase project every ~5 days with a real `SELECT` against `site_settings` via the REST API, using the `SUPABASE_URL` and `SUPABASE_ANON_KEY` repository secrets. It exists solely to stop the free-tier project from auto-pausing after 7 days without database activity (a bare request to the project URL does not count — it has to be a real query). If this file looks unused because nothing else references it, that's expected: it's triggered by GitHub's own scheduler, not by application code. Don't delete it while the project is on the free tier.

## Resolved: image assets no longer depend on Lovable's asset proxy

Previously, every image import under `src/assets/` (the logo, the brand mark, and the six entity icons in `src/assets/entidades/`) was a `*.png.asset.json` pointer file resolving to a root-relative `/__l5e/assets-v1/...` path — only reachable via Lovable's dev-server proxy or `*.lovable.app` production hosting, and would have 404'd on Vercel.

Fixed: all 8 `.asset.json` pointers were replaced with the real PNG files (downloaded from the live Lovable site and verified byte-for-byte against the size recorded in each pointer), and the three importing files (`src/components/brand-logo.tsx`, `src/components/entities-strip.tsx`, `src/components/entities-grid.tsx`) now import the PNGs directly. Verified with a full production build (`nitro`'s `cloudflare-module` output) served locally via `wrangler dev` — all 7 images used in the UI returned `200` from local `/assets/*.png` paths, with zero `__l5e`/`assets-v1` references anywhere in the built output.

Note found in passing, investigated and closed: a plain local `bun run build` targets `cloudflare-module` (Lovable's own `defaultPreset` fallback in `@lovable.dev/vite-tanstack-config`, only used when Nitro can't auto-detect a deploy target from the environment). This is **not** a fixed requirement of the project — no app code touches any Cloudflare-specific API (no KV, Durable Objects, R2, `ExecutionContext`/`waitUntil`, etc. — confirmed by grep). Nitro auto-detects the deploy platform from environment variables at build time, and Vercel's own build sets `VERCEL=1`/`VERCEL_ENV` automatically, so no config change is needed for Fase 5. Verified by building locally with `VERCEL=1 VERCEL_ENV=production bun run build`: Nitro produced a fully valid Vercel Build Output API v3 structure (`.vercel/output/config.json`, a plain `nodejs24.x` serverless function, static assets) with zero config edits. Served it locally with the `srvx` command Nitro itself suggests for previewing that output — all 7 images and every route (home, servicios, nosotros, proceso, contacto, blog) returned `200`.
