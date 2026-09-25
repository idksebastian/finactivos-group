import { createFileRoute, redirect } from "@tanstack/react-router";

/** "Proceso" se integró dentro de Compra de sentencias; esta ruta solo redirige
 * para no romper enlaces o resultados de búsqueda ya indexados. */
export const Route = createFileRoute("/proceso")({
  beforeLoad: () => {
    throw redirect({ to: "/servicios/compra-de-sentencias", hash: "proceso" });
  },
});
