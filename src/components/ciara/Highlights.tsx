import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const styleByKind: Record<string, string> = {
  card: "bg-cream text-noir border-noir clip-notch",
  ticket: "bg-cherry text-cream border-cream/30 clip-ticket",
  sticker: "bg-toxic text-noir border-noir rotate-[-3deg] hover:rotate-0",
  label: "bg-noir text-cream border-cherry clip-notch",
};

export const Highlights = () => (
  <section id="highlights" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
    <div className="container">
      <header className="mb-10 sm:mb-14">
        <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ RECEIPTS / GUEST_CHECK</p>
        <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">CO-SIGNED.</h2>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {siteConfig.highlights.map((h, i) => (
          <article
            key={h.label}
            className={cn(
              "relative p-5 sm:p-6 border-2 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_hsl(var(--cherry))]",
              styleByKind[h.kind] ?? styleByKind.card
            )}
            style={{ ["--rot" as never]: `${(i % 2 === 0 ? -1.5 : 1.2)}deg` }}
          >
            <div className="font-mono text-[10px] tracking-[0.35em] opacity-80 mb-3">
              ◆ {h.label}
            </div>
            <div className="font-display text-2xl sm:text-3xl uppercase leading-tight">
              {h.value}
            </div>
            <div className="mt-4 font-mono text-[9px] tracking-[0.3em] opacity-70">
              ✦ NO. {(i + 1).toString().padStart(3, "0")} / {siteConfig.highlights.length.toString().padStart(3, "0")}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;
