import { siteConfig } from "@/config/siteConfig";
import EqualizerBars from "./EqualizerBars";

export const HeroCiara = () => {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden grain scanlines isolate"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={siteConfig.artist.heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      {/* Gradient overlay removed for clean hero video */}

      {/* Channel label — right-aligned to the nav container edge so it lines up under CONTACT */}
      <div className="absolute top-16 sm:top-[4.5rem] inset-x-0 z-10 pointer-events-none">
        <div className="container flex justify-end">
          <span className="font-mono text-[10px] tracking-[0.3em] text-cream/70">
            ◉ REC · CH 07 · {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-20 container flex flex-col items-center justify-center min-h-[100svh] text-center pt-24 pb-32">

        <img
          src={siteConfig.artist.logoUrl}
          alt={siteConfig.artist.name}
          className="logo-knockout w-[78vw] max-w-[680px] drop-shadow-[0_0_30px_hsl(var(--cherry-bright)/0.5)] animate-fade-in"
        />

        <h1 className="sr-only">{siteConfig.artist.name} — bass-heavy DJ &amp; artist</h1>


        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#music"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 bg-cherry text-cream hover:bg-cherry-bright transition-all clip-notch glow-cherry"
          >
            ▶ Listen
          </a>
          <a
            href="#shows"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-cream/60 text-cream hover:border-toxic hover:text-toxic transition-all clip-notch"
          >
            ◆ Shows
          </a>
          <a
            href="#contact"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-toxic text-toxic hover:bg-toxic hover:text-noir transition-all clip-notch"
          >
            ✉ Contact
          </a>
        </div>

      </div>

    </section>
  );
};

export default HeroCiara;
