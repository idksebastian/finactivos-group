export function formatPostDate(value: string) {
  const d = new Date(value);
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function readingTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Extrae pares pregunta/respuesta de un HTML de artículo: cada <h2> que
 *  termina en "?" con el texto de los párrafos que le siguen. */
export function extractFaq(html: string): Array<{ question: string; answer: string }> {
  const strip = (s: string) =>
    s
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();

  const out: Array<{ question: string; answer: string }> = [];
  const blocks = html.split(/(?=<h2\b)/i);
  for (const block of blocks) {
    const h2 = /<h2\b[^>]*>([\s\S]*?)<\/h2>/i.exec(block);
    if (!h2) continue;
    const question = strip(h2[1] ?? "");
    if (!question.endsWith("?")) continue;
    const rest = block.slice(h2.index + h2[0].length);
    const answer = strip(
      (rest.match(/<(p|ul|ol)\b[\s\S]*?<\/\1>/gi) ?? []).slice(0, 3).join(" "),
    );
    if (question && answer) out.push({ question, answer });
  }
  return out;
}
