import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SignalLink } from "@/components/SignalButton";
import { ScanlineOverlay } from "@/components/ScanlineOverlay";
import { GridBackdrop } from "@/components/GridBackdrop";

export const HeroPierce = () => {
  const { artist } = siteConfig;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-end bg-background"
    >
      {/* Layer 0: visualizer video */}
      <video
        src="/visualizers/hero.mp4"
        poster="/visualizers/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
      />
      {/* Layer 1: dark base + grid */}
      <div className="absolute inset-0 bg-background/55 z-[1]" />
      <GridBackdrop variant="lines" className="opacity-40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background z-[1]" />

      {/* Layer 2: ambient centered machine halo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none z-[1]">
        <div className="relative w-[680px] h-[680px] opacity-30">
          <div className="absolute inset-0 rounded-full border border-signal/15 animate-spin-slow" />
          <div className="absolute inset-10 rounded-full border border-signal/10 animate-spin-reverse" />
          <div className="absolute inset-24 rounded-full border border-ink/10 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full bg-signal/5 blur-3xl animate-pulse-halo" />
        </div>
      </div>

      {/* Layer 3: content */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-12 pt-[55vh] pb-16 md:pt-[60vh] md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-0 font-display text-xl md:text-4xl text-ink leading-tight"
          >
            {artist.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-3 font-mono text-xs md:text-sm text-mute uppercase tracking-[0.2em] max-w-md mx-auto"
          >
            {artist.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <SignalLink href={siteConfig.socials.spotify} variant="primary" size="md">
              LISTEN NOW
            </SignalLink>
            <SignalLink href="#shows" external={false} variant="signal" size="md">
              TOUR DATES
            </SignalLink>
            <SignalLink href="#signal" external={false} variant="signal" size="md">
              JOIN THE LIST
            </SignalLink>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[10px] uppercase tracking-[0.3em] text-mute flex items-center gap-3">
          <span className="h-px w-8 bg-current" />
          [ SCROLL // 001 ]
        </div>
        <div className="absolute bottom-8 right-6 md:right-12 font-mono text-[10px] uppercase tracking-[0.3em] text-signal flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-signal animate-pulse" />
          SIGNAL LIVE
        </div>
      </div>

      <ScanlineOverlay intensity="med" />
    </section>
  );
};

export default HeroPierce;
