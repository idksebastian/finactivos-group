# Sistema de diseño — Finactivos Group

Fuente de verdad en código: `src/lib/design-system.ts` (tokens de clase) y
`src/components/page-system.tsx` (componentes de composición).
Ninguna página debe definir tamaños, paddings o badges propios.

## 1. Encabezado de página

Patrón estándar (`PageHeader`, variante `cream`):
eyebrow en mayúsculas verde + H1 grande a la izquierda + párrafo de apoyo a la
derecha, sobre fondo crema, con `border-b`.
Aplicado en: Servicios, Proceso, Contacto y las tres páginas de detalle de servicio.

Variación intencional (`PageHeader`, variante `solid`): mismo esqueleto —
eyebrow, H1, párrafo de apoyo en la misma retícula 6/5 — pero sobre bloque
sólido teal. Se reserva a las páginas de voz institucional/editorial:
**Nosotros** y **Blog**. Al usarse en dos páginas es un patrón del sistema, no
una excepción.

Inicio conserva su hero propio (única portada del sitio).

## 2. Escala tipográfica

| Rol | Clase | Valor |
| --- | --- | --- |
| Eyebrow | `eyebrow` | 12px, mayúsculas, tracking .22em, verde |
| H1 | `h1` | 36 → 48px, extrabold, uppercase, leading .95 |
| H2 | `h2` | 30px, extrabold, uppercase |
| H3 | `h3` | 16px, bold, uppercase |
| Lead | `lead` | 16px, leading relaxed |
| Body | `body` | 14px, leading relaxed |
| Caption | `caption` | 12px |

## 3. Bloques sólidos vs. fondo crema

- **Crema (`bg-fin-cream`)**: fondo por defecto de todo contenido.
- **Papel (`bg-white/50`)**: alterna secciones contiguas para dar ritmo.
- **Teal sólido**: dos usos exclusivos — encabezado `solid` y **todo cierre de
  sección con CTA** (`CtaBlock`), en todas las páginas sin excepción.
- **Verde**: no se usa como fondo de sección; queda como color de acento
  tipográfico (eyebrow, viñetas).
- **Lima**: nunca como fondo de sección completa; solo badges, botones y
  acentos.

## 4. Numeración y badges

Todos comparten radio `3px`, grosor de línea `2px` y la familia lima/verde:

- `numberBox` — recuadro con borde lima 2px, número teal. Pasos y listas numeradas.
- `numberText` — número verde sin recuadro, para índices tipográficos grandes.
- `timeBadge` — pastilla lima sólida, texto teal. Duraciones ("Días 1 – 3").
- `dot` — marcador de línea de tiempo: cuadrado lima de 12px con radio 3px
  (mismo radio que el resto, no círculo).

## 5. Espaciado

- Secciones de contenido: `py-16 md:py-20`
- Encabezado de página: `py-20 md:py-24`
- Cierre con CTA: `py-20`
- Contenedor: `max-w-6xl px-6`
