import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * Laylo SIGNAL section.
 * Single centered column over a low-opacity DVD-bounce background video,
 * with the Laylo iframe wrapped in a cherry-noir frame.
 */
export const LayloPlaceholder = () => {
  useEffect(() => {
    const SRC = "https://embed.laylo.com/laylo-sdk.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  const { dropId, color, theme } = siteConfig.laylo;

  return (
    <section
      id="signal"
      className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden"
    >
      <div className="container relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Laylo embed frame */}
        <div className="w-full relative border border-cherry/60 bg-noir/80 backdrop-blur-sm clip-notch shadow-[0_0_40px_hsl(var(--cherry)/0.4)] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.3em] text-cream/60">
            <span>▍ LAYLO_FEED</span>
            <span>// SUBSCRIBE</span>
          </div>
          <div
            className="w-full"
            dangerouslySetInnerHTML={{
              __html: `<iframe id="laylo-drop-${dropId}" frameborder="0" scrolling="no" allow="web-share" allowtransparency="true" style="width:1px;min-width:100%;max-width:1000px;background:transparent" src="https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=false&theme=${theme}"></iframe>`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default LayloPlaceholder;
