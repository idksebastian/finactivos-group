import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const NOTIFY_TO = "comercial@finactivos.com";
const NOTIFY_FROM = "Finactivos Web <notificaciones@notificaciones.finactivos.com>";

const requestTypeLabels: Record<string, string> = {
  sentencia: "Compra de sentencia o conciliación",
  factoring: "Factoring",
  inversion: "Inversión",
  otro: "Otro",
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function notifyNewSubmission(data: {
  name: string;
  email: string;
  phone: string;
  request_type: string;
  message: string;
}) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("[contact] Falta RESEND_API_KEY: no se envió notificación por correo.");
    return;
  }

  const subject = `Nueva solicitud de contacto — ${data.name}`;
  const html = `
    <h2>Nueva solicitud desde el sitio web</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Celular:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Asunto:</strong> ${escapeHtml(requestTypeLabels[data.request_type] ?? data.request_type)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend respondió con error:", res.status, await res.text());
  }
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { name: string; email: string; phone: string; request_type: string; message: string }) => data,
  )
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      request_type: data.request_type,
      message: data.message,
    });

    if (error) throw new Error(error.message);

    // La notificación por correo no debe tumbar la solicitud si falla
    // (el registro ya quedó guardado en la base de datos de todas formas).
    await notifyNewSubmission(data).catch((e) => console.error("[contact] Error notificando:", e));

    return { ok: true };
  });
