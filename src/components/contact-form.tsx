import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import * as ds from "@/lib/design-system";
import { supabase } from "@/integrations/supabase/client";

const requestTypes = [
  { value: "sentencia", label: "Compra de sentencia o conciliación" },
  { value: "factoring", label: "Factoring" },
  { value: "inversion", label: "Inversión" },
  { value: "otro", label: "Otro" },
] as const;

const label = "font-sans text-xs uppercase tracking-[0.16em] text-fin-ink/60";

const fieldClass =
  "w-full rounded-[3px] border border-fin-line bg-white px-4 py-3 font-sans text-sm text-fin-ink placeholder:text-fin-ink/40 focus:border-fin-teal focus:outline-none";

export function ContactForm({
  tone = "cream",
  className = "",
}: {
  /** Fondo de la tarjeta: "cream" (semitransparente, para secciones claras) o "solid" (sólido, para fondos de color). */
  tone?: "cream" | "solid";
  className?: string;
}) {
  const toneClass = tone === "solid" ? "bg-fin-cream" : "bg-white/50";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [accepted, setAccepted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    const { error } = await supabase.from("contact_submissions").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      request_type: String(data.get("request_type") ?? "sentencia"),
      message: String(data.get("message") ?? ""),
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
    setAccepted(false);
  }

  if (status === "success") {
    return (
      <div className={`border border-fin-line ${toneClass} p-7 sm:p-9 ${className}`}>
        <p className={ds.eyebrow}>Mensaje enviado</p>
        <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
          Gracias por escribirnos
        </h2>
        <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-fin-ink/70">
          Recibimos su solicitud. Un asesor de Finactivos Group se pondrá en contacto con usted en
          los próximos días hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`border border-fin-line ${toneClass} p-7 sm:p-9 ${className}`}>
      <p className={ds.eyebrow}>Escríbanos</p>
      <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal">
        Deje sus datos y le contactamos
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className={label}>
            Nombre
          </label>
          <input id="name" name="name" required className={`mt-2 ${fieldClass}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className={label}>
            Celular
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            title="Ingrese los 10 dígitos de su celular"
            required
            className={`mt-2 ${fieldClass}`}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className={label}>
            Correo
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${fieldClass}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="request_type" className={label}>
            Asunto
          </label>
          <select id="request_type" name="request_type" defaultValue="sentencia" className={`mt-2 ${fieldClass}`}>
            {requestTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Mensaje
          </label>
          <textarea id="message" name="message" rows={4} required className={`mt-2 ${fieldClass} resize-none`} />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 font-sans text-xs leading-relaxed text-fin-ink/70">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 rounded-[2px] border-fin-line text-fin-teal focus:ring-fin-teal"
        />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <Link to="/politica-de-privacidad" className="text-fin-green underline underline-offset-4">
            política de tratamiento de datos personales
          </Link>{" "}
          de Finactivos Group.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 font-sans text-xs text-red-600">
          No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !accepted}
        className="mt-6 w-full cursor-pointer rounded-[3px] bg-fin-teal px-6 py-4 font-sans text-sm font-semibold text-fin-cream transition-colors hover:bg-fin-green disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
