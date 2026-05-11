import { useEffect } from "react";

declare global {
  interface Window {
    __layloSdkInjected?: boolean;
    __layloSdkLoaded?: boolean;
  }
}

const LAYLO_SDK_ID = "laylo-sdk";
const LAYLO_SDK_SRC = "https://embed.laylo.com/laylo-sdk.js";
const LAYLO_IFRAME_SELECTOR = 'iframe[id^="laylo-drop-"]';
const LAYLO_EMBED_SRC = "embed.laylo.com";

const LayloSdkLoader = () => {
  useEffect(() => {
    let timeoutId: number | undefined;
    let cancelled = false;
    let observer: MutationObserver | null = null;

    const win = window;

    const markLoaded = () => {
      win.__layloSdkInjected = true;
      win.__layloSdkLoaded = true;
    };

    const hasLayloEmbed = () => {
      const embeds = Array.from(document.querySelectorAll("iframe"));

      return embeds.some((iframe) => {
        const id = iframe.getAttribute("id") || "";
        const src = iframe.getAttribute("src") || "";

        return id.startsWith("laylo-drop-") || src.includes(LAYLO_EMBED_SRC);
      });
    };

    const injectSdk = () => {
      if (win.__layloSdkInjected || win.__layloSdkLoaded) return;

      const existingScript = document.getElementById(LAYLO_SDK_ID) as HTMLScriptElement | null;
      if (existingScript) {
        win.__layloSdkInjected = true;

        if (existingScript.dataset.loaded === "true") {
          win.__layloSdkLoaded = true;
          return;
        }

        existingScript.addEventListener(
          "load",
          () => {
            existingScript.dataset.loaded = "true";
            markLoaded();
            observer?.disconnect();
          },
          { once: true },
        );

        return;
      }

      const script = document.createElement("script");
      script.id = LAYLO_SDK_ID;
      script.src = LAYLO_SDK_SRC;
      script.async = true;
      script.addEventListener(
        "load",
        () => {
          script.dataset.loaded = "true";
          markLoaded();
          observer?.disconnect();
        },
        { once: true },
      );
      script.addEventListener(
        "error",
        () => {
          win.__layloSdkInjected = false;
          win.__layloSdkLoaded = false;

          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }

          timeoutId = window.setTimeout(checkForEmbeds, 150);
        },
        { once: true },
      );

      win.__layloSdkInjected = true;
      document.body.appendChild(script);
    };

    const checkForEmbeds = () => {
      if (cancelled || win.__layloSdkLoaded) return;

      const hasLayloEmbeds = Boolean(document.querySelector(LAYLO_IFRAME_SELECTOR)) || hasLayloEmbed();

      if (hasLayloEmbeds) {
        injectSdk();
        return;
      }
    };

    observer = new MutationObserver(() => {
      checkForEmbeds();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    checkForEmbeds();

    timeoutId = window.setTimeout(checkForEmbeds, 250);

    return () => {
      cancelled = true;
      observer?.disconnect();

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
};

export default LayloSdkLoader;