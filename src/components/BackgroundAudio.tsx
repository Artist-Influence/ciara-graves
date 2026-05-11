import { useEffect, useRef } from "react";
import { backgroundAudio } from "@/hooks/useBackgroundAudio";

const SC_API_URL = "https://w.soundcloud.com/player/api.js";
const TRACK_URL =
  "https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A2239036952";

interface SCWidget {
  bind: (event: string, cb: () => void) => void;
  setVolume: (v: number) => void;
  play: () => void;
  pause: () => void;
}

interface SCWindow extends Window {
  SC?: {
    Widget: ((iframe: HTMLIFrameElement) => SCWidget) & {
      Events: { READY: string };
    };
  };
}

const BackgroundAudio = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);

  useEffect(() => {
    const ensureScript = () =>
      new Promise<void>((resolve) => {
        const w = window as SCWindow;
        if (w.SC?.Widget) return resolve();
        const existing = document.querySelector<HTMLScriptElement>(
          `script[src="${SC_API_URL}"]`
        );
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          return;
        }
        const s = document.createElement("script");
        s.src = SC_API_URL;
        s.async = true;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

    let cancelled = false;
    ensureScript().then(() => {
      if (cancelled || !iframeRef.current) return;
      const w = window as SCWindow;
      if (!w.SC?.Widget) return;
      const widget = w.SC.Widget(iframeRef.current);
      widgetRef.current = widget;
      widget.bind(w.SC.Widget.Events.READY, () => {
        try {
          backgroundAudio.registerWidget(widget);
          widget.setVolume(backgroundAudio.getVolume());
          widget.play();
        } catch {
          /* noop */
        }
      });

      const resumeOnInteract = () => {
        try {
          widget.setVolume(backgroundAudio.getVolume());
          widget.play();
        } catch {
          /* noop */
        }
      };
      document.addEventListener("click", resumeOnInteract, { once: true });
      document.addEventListener("touchstart", resumeOnInteract, { once: true });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Background audio"
      aria-hidden="true"
      tabIndex={-1}
      width="1"
      height="1"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
        TRACK_URL
      )}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "1px",
        height: "1px",
        opacity: 0,
        pointerEvents: "none",
        border: "none",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundAudio;
