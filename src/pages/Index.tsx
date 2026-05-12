import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import StickyNavCiara from "@/components/ciara/StickyNavCiara";
import HeroCiara from "@/components/ciara/HeroCiara";
import MusicFeed from "@/components/ciara/MusicFeed";
import LayloPlaceholder from "@/components/ciara/LayloPlaceholder";
import BioSection from "@/components/ciara/BioSection";
import Shows from "@/components/ciara/Shows";
import BookingFooter from "@/components/ciara/BookingFooter";
import SectionVisualizer from "@/components/ciara/SectionVisualizer";
import LoadingScreen from "@/components/LoadingScreen";
import { visualizers } from "@/config/siteConfig";

const MIN_LOADER_MS = 600;
const MAX_LOADER_MS = 1200;

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();
    let timeoutId: number | undefined;

    const hide = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_LOADER_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      timeoutId = window.setTimeout(hide, MAX_LOADER_MS);
    }

    return () => {
      window.removeEventListener("load", hide);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-noir text-cream overflow-x-hidden">
      <AnimatePresence>{isLoading && <LoadingScreen key="loader" />}</AnimatePresence>
      <StickyNavCiara />
      <main>
        <HeroCiara />
        <MusicFeed />
        <div className="relative">
          <SectionVisualizer src={visualizers.vertical} opacity="opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80 z-[1]" />
          <div className="relative z-[2]">
            <LayloPlaceholder />
            <BioSection />
          </div>
        </div>
        <Shows />
      </main>
      <BookingFooter />
    </div>
  );
};

export default Index;
