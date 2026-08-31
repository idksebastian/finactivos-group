import { useRouter } from "@tanstack/react-router";

/** Barra con botón "Volver" — se ubica justo debajo del navbar en páginas internas. */
export function BackButton({ fallbackTo = "/" }: { fallbackTo?: "/" | "/servicios" }) {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: fallbackTo });
    }
  }

  return (
    <div className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-fin-teal transition-colors hover:text-fin-green"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M12.7 3.3a1 1 0 0 1 0 1.4L7.42 10l5.3 5.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 0Z" />
          </svg>
          Volver
        </button>
      </div>
    </div>
  );
}
