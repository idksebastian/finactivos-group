# Finactivos Group

Sitio web de Finactivos Group S.A.S. — compañía colombiana que compra sentencias y conciliaciones judiciales de reparación directa contra el Estado, y ofrece factoring e inversión en activos judiciales.

## Stack

- [TanStack Start](https://tanstack.com/start) (React, SSR) + [TanStack Router](https://tanstack.com/router)
- [Vite](https://vitejs.dev) + [Nitro](https://nitro.build) (build/deploy target — auto-detecta el preset de Vercel en producción)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Supabase](https://supabase.com) — base de datos (Postgres + RLS), autenticación del panel admin, y almacenamiento de imágenes de blog
- [Bun](https://bun.sh) como package manager y runtime de desarrollo

## Desarrollo local

Requiere [Bun](https://bun.sh).

```sh
bun install
cp .env.example .env   # completar con las credenciales reales de Supabase
bun run dev
```

Otros comandos: `bun run build` (build de producción), `bun run lint`, `bun run format`.

## Variables de entorno

Ver [.env.example](.env.example) para la lista completa y su documentación. Resumen:

- `VITE_SITE_URL` — dominio público del sitio, usado en URLs canónicas y Open Graph.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` — cliente de Supabase en el navegador (claves públicas, seguras de exponer).
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` — mismas credenciales para funciones de servidor.
- `SUPABASE_SERVICE_ROLE_KEY` — solo servidor, nunca exponer al cliente. Bypasea Row Level Security.

## Estructura

- `src/routes/` — páginas (file-based routing de TanStack Router). Incluye el panel `/admin` (protegido por sesión de Supabase Auth + rol `admin`, no indexable).
- `src/components/` — componentes de UI y de composición de página.
- `src/lib/design-system.ts` + [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — tokens y patrones del sistema de diseño; ninguna página debe definir tamaños o espaciados propios fuera de ahí.
- `src/integrations/supabase/` — clientes de Supabase (browser, servidor, y middleware de autenticación).
- `supabase/migrations/` — schema de la base de datos. `supabase/seed.sql` — datos iniciales.
- `.github/workflows/supabase-keepalive.yml` — ping semanal a Supabase para evitar que el proyecto se pause por inactividad (plan gratuito).

## Identidad de marca

- Primario Teal `#006A6A` · Secundario Verde `#037A47` · Acento Verde lima `#8CBE43` · Fondo Crema `#FFFCF6`
- Tipografía: Montserrat (títulos), IBM Plex Sans (cuerpo)
- Detalle completo de patrones de UI en [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)

## Deploy

Desplegado en [Vercel](https://vercel.com), conectado a este repositorio — cada push a `main` dispara un deploy automático. Variables de entorno configuradas directamente en el proyecto de Vercel (Production/Preview/Development), nunca en el código.

Pendientes conocidos y decisiones documentadas: ver [TECH-DEBT.md](TECH-DEBT.md).
