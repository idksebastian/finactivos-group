import { useRouterState } from "@tanstack/react-router";

const WHATSAPP_URL =
  "https://wa.me/573128085632?text=" +
  encodeURIComponent("Hola, quiero más información sobre los servicios de Finactivos.");

/** Botón flotante de WhatsApp, visible en todo el sitio público (no en /admin). */
export function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden>
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.64 4.47 1.75 6.31L4 29l7.86-1.71A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.66 1.02 1-4.55-.25-.4A9.7 9.7 0 0 1 5.25 15c0-5.93 4.82-10.75 10.754-10.75S26.75 9.07 26.75 15 21.938 24.75 16.004 24.75Zm5.94-8.06c-.325-.163-1.92-.947-2.218-1.055-.297-.109-.514-.163-.73.163-.216.325-.838 1.055-1.028 1.271-.19.217-.379.244-.703.082-.325-.163-1.373-.505-2.615-1.611-.967-.862-1.62-1.926-1.81-2.251-.19-.325-.02-.5.143-.663.146-.146.325-.38.487-.57.163-.19.217-.325.325-.542.108-.217.054-.407-.027-.57-.082-.163-.73-1.76-1-2.41-.263-.632-.53-.547-.73-.557l-.622-.011c-.217 0-.57.081-.868.407-.298.325-1.137 1.112-1.137 2.71 0 1.6 1.164 3.146 1.326 3.363.163.217 2.291 3.5 5.552 4.909.776.335 1.381.535 1.853.685.778.247 1.487.212 2.048.129.625-.093 1.92-.784 2.19-1.542.271-.759.271-1.409.19-1.542-.081-.135-.298-.217-.622-.38Z" />
      </svg>
    </a>
  );
}
