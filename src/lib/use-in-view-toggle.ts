import { useEffect, useRef, useState } from "react";

/**
 * A diferencia de un "reveal" de una sola vez, este hook alterna: true al
 * entrar en el viewport, false al salir (en cualquier dirección de scroll).
 */
export function useInViewToggle<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
