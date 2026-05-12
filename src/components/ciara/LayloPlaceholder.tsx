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

    const onMessage = (ev: MessageEvent) => {
      const origin = ev.origin || "";
      if (!/^https:\/\/([\w-]+\.)?laylo\.com$/i.test(origin)) return;
      const data = ev.data;
      if (!data) return;

      // Accept many shapes Laylo has used over time
      let height: number | undefined;
      let targetId: string | undefined;
      if (typeof data === "object") {
        const d = data as {
          type?: string;
          event?: string;
          height?: number;
          dropId?: string;
          id?: string;
          payload?: { height?: number; dropId?: string };
        };
        height =
          (typeof d.height === "number" ? d.height : undefined) ??
          (typeof d.payload?.height === "number" ? d.payload.height : undefined);
        targetId = d.id ?? d.dropId ?? d.payload?.dropId;
      }
      if (typeof height !== "number" || !height) return;

      const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
      if (!iframe) return;
      // If the message names a different drop, ignore it
      if (targetId && !`laylo-drop-${targetId}`.includes(iframeId) && targetId !== dropId) {
        return;
      }
      iframe.style.height = `${height}px`;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [iframeId, dropId]);

  return (
    <section
      id="signal"
      className="relative py-16 sm:py-24 border-t border-cherry/20 overflow-hidden"
    >
      <div className="container relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="w-full relative border border-cherry/60 bg-noir/80 backdrop-blur-sm clip-notch shadow-[0_0_40px_hsl(var(--cherry)/0.4)] p-3 sm:p-5">
          <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.3em] text-cream/60">
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
                minHeight: "220px",
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
