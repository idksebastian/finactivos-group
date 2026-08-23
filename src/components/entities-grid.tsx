import mindefensa from "@/assets/entidades/mindefensa.png";
import policia from "@/assets/entidades/policia.png";
import invias from "@/assets/entidades/invias.png";
import inpec from "@/assets/entidades/inpec.png";
import fiscalia from "@/assets/entidades/fiscalia.png";
import ramaJudicial from "@/assets/entidades/rama-judicial.png";

type Entity = {
  name: string;
  detail?: string;
  logo: string;
};

const entities: Entity[] = [
  {
    name: "Ministerio de Defensa Nacional",
    detail: "Ejército, Armada y Fuerza Aeroespacial",
    logo: mindefensa,
  },
  { name: "Policía Nacional", logo: policia },
  { name: "Instituto Nacional de Vías (INVÍAS)", logo: invias },
  { name: "Instituto Nacional Penitenciario y Carcelario (INPEC)", logo: inpec },
  { name: "Fiscalía General de la Nación", logo: fiscalia },
  { name: "Rama Judicial", logo: ramaJudicial },
];

export function EntitiesGrid({ tone = "cream" }: { tone?: "cream" | "white" }) {
  return (
    <section
      className={`border-b border-fin-line ${tone === "white" ? "bg-white/50" : "bg-fin-cream"}`}
      aria-labelledby="entidades-title"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-[5fr_4fr] md:items-end">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.22em] text-fin-green">
              Elegibilidad
            </p>
            <h2
              id="entidades-title"
              className="mt-4 max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-fin-teal"
            >
              ¿Su sentencia es contra alguna de estas entidades?
            </h2>
          </div>
          <p className="font-sans text-sm leading-relaxed text-fin-ink/70">
            Trabajamos casos del orden nacional en los que estas entidades figuran como parte
            demandada y condenada. Si la suya aparece aquí, su caso probablemente aplica.
          </p>
        </div>

        <ul className="mt-12 grid gap-px border border-fin-line bg-fin-line sm:grid-cols-2 lg:grid-cols-3">
          {entities.map((e) => (
            <li
              key={e.name}
              className={`flex flex-col items-center gap-5 p-7 text-center sm:items-start sm:text-left ${
                tone === "white" ? "bg-white" : "bg-fin-cream"
              }`}
            >
              <span className="flex h-20 w-full items-center justify-center sm:justify-start">
                <img
                  src={e.logo}
                  alt={`Logo de ${e.name}`}
                  loading="lazy"
                  className="max-h-20 w-auto max-w-[190px] object-contain opacity-60 grayscale"
                />
              </span>
              <span>
                <span className="block font-display text-sm font-bold uppercase leading-tight text-fin-ink/80">
                  {e.name}
                </span>
                {e.detail && (
                  <span className="mt-1 block font-sans text-xs leading-relaxed text-fin-ink/55">
                    {e.detail}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl font-sans text-xs leading-relaxed text-fin-ink/50">
          Finactivos Group no está afiliado, vinculado ni patrocinado por ninguna de estas
          entidades. Sus logos se muestran únicamente como referencia informativa, porque son la
          parte demandada en los procesos de reparación directa que analizamos.
        </p>
      </div>
    </section>
  );
}
