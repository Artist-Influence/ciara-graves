import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * Laylo SIGNAL section — hardened embed.
 * - Inject SDK after the iframe is in the DOM, with cache-busting to force re-scan.
 * - Listen for Laylo's postMessage height events directly so sizing works even if
 *   the SDK never executes (ad blockers, strict CSPs, in-app webviews, etc.).
 * - Reserve vertical space so the section never collapses while loading or if the
 *   embed fails entirely.
 * - Provide a visible fallback link to Laylo for blocked iframes.
 */
export const LayloPlaceholder = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { dropId, color, theme } = siteConfig.laylo;
  const iframeId = `laylo-drop-${dropId}`;

  useEffect(() => {
    // Wait a tick so the iframe is mounted, then (re)inject the SDK.
    const SRC = "https://embed.laylo.com/laylo-sdk.js";
    const inject = () => {
      document
        .querySelectorAll('script[src^="https://embed.laylo.com/laylo-sdk.js"]')
        .forEach((n) => n.parentNode?.removeChild(n));
      const s = document.createElement("script");
      s.src = `${SRC}?v=${Date.now()}`;
      s.async = true;
      document.head.appendChild(s);
    };
    const t = window.setTimeout(inject, 50);

    // Belt + suspenders: handle Laylo's iframe-height postMessage directly.
    const onMessage = (ev: MessageEvent) => {
      try {
        const origin = ev.origin || "";
        if (!/laylo\.com$/i.test(new URL(origin).hostname)) return;
        const data = ev.data;
        if (!data || typeof data !== "object") return;
        // Laylo posts shapes like { type: "setHeight", height: 480, dropId }
        const height =
          (data.height as number | undefined) ??
          (data.payload && (data.payload.height as number | undefined));
        if (!height || typeof height !== "number") return;
        const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
        if (iframe) {
          iframe.style.height = `${height}px`;
          iframe.style.minHeight = `${height}px`;
        }
      } catch {
        /* ignore cross-origin URL parse errors */
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("message", onMessage);
    };
  }, [iframeId]);

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
            ref={wrapperRef}
            className="w-full min-h-[520px] sm:min-h-[460px]"
            dangerouslySetInnerHTML={{
              __html: `<iframe id="${iframeId}" frameborder="0" scrolling="no" allow="web-share" allowtransparency="true" style="width:1px;min-width:100%;max-width:1000px;min-height:460px;background:transparent;display:block" src="https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=false&theme=${theme}"></iframe>`,
            }}
          />
        </div>
        <a
          href={`https://laylo.com/ciaragraves`}
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
