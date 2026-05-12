import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

const SDK_SRC = "https://embed.laylo.com/laylo-sdk.js";

export const LayloPlaceholder = () => {
  const { dropId, color, theme } = siteConfig.laylo;
  const iframeId = `laylo-drop-${dropId}`;

  useEffect(() => {
    // Load Laylo SDK once globally (official snippet pattern, no churn)
    const existing = document.querySelector(
      `script[src*="embed.laylo.com/laylo-sdk.js"]`
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = SDK_SRC;
      s.async = true;
      document.body.appendChild(s);
    } else {
      // If SDK already loaded on a prior mount, ask it to re-scan if it exposes init
      const w = window as unknown as { laylo?: { init?: () => void } };
      try {
        w.laylo?.init?.();
      } catch {
        /* no-op */
      }
    }

    const onMessage = (ev: MessageEvent) => {
      if (ev.origin !== "https://embed.laylo.com") return;
      const data = ev.data as { height?: number; payload?: { height?: number } };
      if (!data || typeof data !== "object") return;
      const height = data.height ?? data.payload?.height;
      if (typeof height !== "number" || !height) return;
      const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
      if (iframe) {
        iframe.style.height = `${height}px`;
        iframe.style.minHeight = `${height}px`;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [iframeId]);

  return (
    <section
      id="signal"
      className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden"
    >
      <div className="container relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="w-full relative border border-cherry/60 bg-noir/80 backdrop-blur-sm clip-notch shadow-[0_0_40px_hsl(var(--cherry)/0.4)] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.3em] text-cream/60">
            <span>▍ LAYLO_FEED</span>
            <span>// SUBSCRIBE</span>
          </div>
          <div className="w-full min-h-[460px] sm:min-h-[520px]">
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
                minHeight: "460px",
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
          className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/60 hover:text-toxic transition-colors"
        >
          Open on Laylo →
        </a>
      </div>
    </section>
  );
};

export default LayloPlaceholder;
