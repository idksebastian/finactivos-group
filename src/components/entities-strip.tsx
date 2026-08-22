import mindefensa from "@/assets/entidades/mindefensa.png";
import policia from "@/assets/entidades/policia.png";
import invias from "@/assets/entidades/invias.png";
import inpec from "@/assets/entidades/inpec.png";
import fiscalia from "@/assets/entidades/fiscalia.png";
import ramaJudicial from "@/assets/entidades/rama-judicial.png";

const logos = [
  { name: "Ministerio de Defensa Nacional", src: mindefensa },
  { name: "Policía Nacional", src: policia },
  { name: "INVÍAS", src: invias },
  { name: "INPEC", src: inpec },
  { name: "Fiscalía General de la Nación", src: fiscalia },
  { name: "Rama Judicial", src: ramaJudicial },
];

/** Franja de confianza: apoyo discreto, sin peso de sección. */
export function EntitiesStrip() {
  return (
    <div className="border-b border-fin-line bg-fin-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-sans text-[11px] uppercase tracking-[0.18em] text-fin-ink/45">
          Trabajamos casos contra estas entidades
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 md:flex-1 md:justify-between">
          {logos.map((l) => (
            <li key={l.name}>
              <img
                src={l.src}
                alt={l.name}
                title={l.name}
                loading="lazy"
                className="h-7 w-auto max-w-[110px] object-contain opacity-45 grayscale transition-opacity hover:opacity-70 sm:h-8"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
