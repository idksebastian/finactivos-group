import mark from "@/assets/finactivos-mark.png";

export function BrandLogo({
  className = "",
  tone = "teal",
  markSize = "default",
}: {
  className?: string;
  tone?: "teal" | "cream";
  markSize?: "default" | "large";
}) {
  const large = markSize === "large";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={mark}
        alt="Finactivos Group"
        className={`w-auto ${large ? "h-11" : "h-8"} ${tone === "cream" ? "brightness-0 invert" : ""}`}
        width={large ? 44 : 32}
        height={large ? 51 : 37}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[0.06em] ${large ? "text-sm" : "text-base"} ${
            tone === "cream" ? "text-fin-cream" : "text-fin-teal"
          }`}
        >
          FINACTIVOS
        </span>
        <span
          className={`font-sans uppercase tracking-[0.42em] ${large ? "text-[9px]" : "text-[10px]"} ${
            tone === "cream" ? "text-fin-cream/60" : "text-fin-teal/60"
          }`}
        >
          Group
        </span>
      </span>
    </span>
  );
}
