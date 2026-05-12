import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * Laylo subscribe embed mounted inside a phone-screen mock.
 * Token is the public client-access SUBSCRIBE token from siteConfig.laylo.
 */
export const LayloPlaceholder = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SRC = "https://embed.laylo.com/laylo-sdk.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

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

        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="relative bg-[hsl(0_0%_8%)] border-[10px] border-[hsl(0_0%_14%)] rounded-[36px] shadow-[0_30px_60px_hsl(0_0%_0%/0.6)] overflow-hidden"
            style={{ ["--rot" as never]: "-2deg" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[hsl(0_0%_14%)] rounded-b-2xl z-20" />
            <div className="relative aspect-[9/16] bg-noir scanlines p-5 flex flex-col">
              {/* DVD video bg */}
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
                src={siteConfig.artist.dvdBounceUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
              <div className="relative z-10 font-mono text-[9px] tracking-[0.3em] text-cream-dim flex items-center justify-between">
                <span>◉ CIARA.OS</span>
                <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4 px-3">
                <div className="font-display text-toxic text-glow-toxic text-3xl">SIGNAL</div>
                <div
                  ref={mountRef}
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: `<laylo-drop data-token="${siteConfig.laylo.token}" data-username="${siteConfig.laylo.username}" data-background-color="transparent"></laylo-drop>`,
                  }}
                />
                <p className="font-script text-cream/80 text-lg">no spam. just bass.</p>
              </div>
              <div className="relative z-10 font-mono text-[9px] tracking-[0.3em] text-cream-dim text-center mt-2">
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
