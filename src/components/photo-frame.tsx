/**
 * Fotografía con tratamiento de "collage": bloque de color sólido asomando
 * detrás y un marco desfasado que cruza sobre la esquina de la foto.
 * Referencia visual: komsen.com.co / conactivos.com.co.
 */
export function PhotoFrame({
  src,
  alt,
  block = "lime",
  className = "",
}: {
  src: string;
  alt: string;
  block?: "lime" | "green";
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute -bottom-4 -right-4 h-full w-full rounded-2xl ${
          block === "lime" ? "bg-fin-lime" : "bg-fin-green"
        }`}
        aria-hidden
      />
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div
        className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-fin-teal"
        aria-hidden
      />
    </div>
  );
}
