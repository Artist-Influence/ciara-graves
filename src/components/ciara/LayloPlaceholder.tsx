import { siteConfig } from "@/config/siteConfig";

/**
 * LAYLO EMBED PLACEHOLDER
 *
 * Drop the live Laylo iframe (or SDK markup) inside the bordered phone screen.
 * When ready, set siteConfig.laylo.enabled = true and either:
 *   - replace the placeholder block below with <iframe src=... />
 *   - or render the Laylo widget script per the Laylo install docs.
 *
 * Iframes must use background:transparent + allowTransparency to blend with
 * the cherry-noir aesthetic.
 */
export const LayloPlaceholder = () => {
  return (
    <section id="signal" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
      <div className="container relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ DIRECT_LINE / TXT_INBOX</p>
          <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry leading-[0.9]">
            Get the next<br />drop first.
          </h2>
          <p className="mt-6 max-w-md text-lg text-cream-dim leading-snug">
            New music, shows, secret links, and weird little updates before everyone else.
          </p>
          <p className="mt-3 font-script text-2xl text-cherry-bright rotate-[-2deg] inline-block">
            text me before the next one drops ✦
          </p>
        </div>

        {/* Phone / pager mockup containing the placeholder */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="relative bg-[hsl(0_0%_8%)] border-[10px] border-[hsl(0_0%_14%)] rounded-[36px] shadow-[0_30px_60px_hsl(0_0%_0%/0.6)] overflow-hidden"
            style={{ ["--rot" as never]: "-2deg" }}
          >
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[hsl(0_0%_14%)] rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="relative aspect-[9/16] bg-noir scanlines grain p-5 flex flex-col">
              <div className="font-mono text-[9px] tracking-[0.3em] text-cream-dim flex items-center justify-between">
                <span>◉ CIARA.OS</span>
                <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-3">
                <div className="font-display text-toxic text-glow-toxic text-3xl">SIGNAL</div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-cream/80">
                  → INSERT LAYLO EMBED HERE
                </div>
                {/* === LAYLO EMBED PLACEHOLDER START === */}
                <div className="w-full border border-dashed border-toxic/60 bg-noir/60 p-4 text-cream-dim font-mono text-[10px] tracking-[0.2em]">
                  // LAYLO_EMBED
                  <br />
                  // dropId: {siteConfig.laylo.dropId || "TBD"}
                  <br />
                  // user: {siteConfig.laylo.username}
                </div>
                {/* === LAYLO EMBED PLACEHOLDER END === */}
                <a
                  href={`mailto:${siteConfig.booking.email}?subject=Add%20me%20to%20the%20list`}
                  className="font-mono text-[11px] tracking-[0.3em] uppercase px-4 py-2.5 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch glow-cherry"
                >
                  ▶ Join Ciara&apos;s List
                </a>
                <p className="font-script text-cream/80 text-lg">no spam. just bass.</p>
              </div>
              <div className="font-mono text-[9px] tracking-[0.3em] text-cream-dim text-center mt-2">
                ▍ ▍ ▍ ▍ ▍ ▍ ▍ ▍ ▍
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayloPlaceholder;
