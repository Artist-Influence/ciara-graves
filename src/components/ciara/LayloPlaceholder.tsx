import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

const SDK_SRC = "https://embed.laylo.com/laylo-sdk.js";

export const LayloPlaceholder = () => {
  const { dropId, color, theme } = siteConfig.laylo;
  const iframeId = `laylo-drop-${dropId}`;

  useEffect(() => {
    const existing = document.querySelector(
      `script[src*="embed.laylo.com/laylo-sdk.js"]`
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = SDK_SRC;
      s.async = true;
      document.body.appendChild(s);
    } else {
      const w = window as unknown as { laylo?: { init?: () => void } };
      try {
        w.laylo?.init?.();
      } catch {
        /* no-op */
      }
    }
  }, [iframeId, dropId]);

  return (
    <section
      id="signal"
      className="relative py-10 sm:py-14 border-t border-cherry/20 overflow-hidden"
    >
      <div className="container relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="w-full relative border border-cherry/60 bg-noir/80 backdrop-blur-sm clip-notch shadow-[0_0_40px_hsl(var(--cherry)/0.4)] px-3 pt-3 pb-2 sm:px-5 sm:pt-4 sm:pb-3">
          <div className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-[0.3em] text-cream/60">
            <span>▍ LAYLO_FEED</span>
            <span>// SUBSCRIBE</span>
          </div>
          <div className="w-full">
            <iframe
              id={iframeId}
              title="Laylo subscribe"
              frameBorder={0}
              scrolling="no"
              allow="web-share"
              allowTransparency
              style={{
                width: "1px",
                minWidth: "100%",
                maxWidth: "1000px",
                height: "240px",
                background: "transparent",
                display: "block",
              }}
              src={`https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=false&theme=${theme}`}
            />
          </div>
        </div>
        <a
          href="https://laylo.com/ciaragraves"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/60 hover:text-toxic transition-colors"
        >
          Open on Laylo →
        </a>
      </div>
    </section>
  );
};

export default LayloPlaceholder;
