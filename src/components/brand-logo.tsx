import mark from "@/assets/finactivos-mark.png";

export function BrandLogo({
  className = "",
  tone = "teal",
}: {
  className?: string;
  tone?: "teal" | "cream";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={mark}
        alt="Finactivos Group"
        className={`h-8 w-auto ${tone === "cream" ? "brightness-0 invert" : ""}`}
        width={32}
        height={37}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-extrabold tracking-[0.06em] ${
            tone === "cream" ? "text-fin-cream" : "text-fin-teal"
          }`}
        >
          FINACTIVOS
        </span>
        <span
          className={`font-sans text-[10px] uppercase tracking-[0.42em] ${
            tone === "cream" ? "text-fin-cream/60" : "text-fin-teal/60"
          }`}
        >
          Group
        </span>
      </span>
    </span>
  );
}
