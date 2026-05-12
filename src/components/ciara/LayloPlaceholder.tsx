import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const SDK_SRC = "https://embed.laylo.com/laylo-sdk.js";

export const LayloPlaceholder = () => {
  const { dropId, color, theme } = siteConfig.laylo;
  const iframeId = `laylo-drop-${dropId}`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [failed, setFailed] = useState(false);

  // Load Laylo SDK once, optionally — iframe works without it.
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src*="embed.laylo.com/laylo-sdk.js"]`
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = SDK_SRC;
      s.async = true;
      s.crossOrigin = "anonymous";
      s.onerror = () => {
        /* SDK blocked (ad blocker / CSP) — iframe still renders */
      };
      document.body.appendChild(s);
    } else {
      const w = window as unknown as { laylo?: { init?: () => void } };
      try {
        w.laylo?.init?.();
      } catch {
        /* no-op */
      }
    }
  }, []);

  // Fallback if iframe never fires `load` (network blocked, CSP, etc.)
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!iframeRef.current?.dataset.loaded) setFailed(true);
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  const embedSrc = `https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=false&theme=${theme}`;

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
          <div className="w-full" style={{ minHeight: 240 }}>
            {!failed ? (
              <iframe
                ref={iframeRef}
                id={iframeId}
                title="Laylo subscribe"
                frameBorder={0}
                scrolling="no"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                allow="web-share; clipboard-write"
                allowTransparency
                onLoad={(e) => {
                  (e.currentTarget as HTMLIFrameElement).dataset.loaded = "1";
                }}
                onError={() => setFailed(true)}
                style={{
                  width: "1px",
                  minWidth: "100%",
                  maxWidth: "1000px",
                  height: "240px",
                  background: "transparent",
                  display: "block",
                  border: 0,
                  colorScheme: "normal",
                }}
                src={embedSrc}
              />
            ) : (
              <a
                href="https://laylo.com/ciaragraves"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full font-mono text-xs tracking-[0.3em] uppercase px-5 py-6 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch glow-cherry"
                style={{ minHeight: 240 }}
              >
                Subscribe on Laylo →
              </a>
            )}
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
