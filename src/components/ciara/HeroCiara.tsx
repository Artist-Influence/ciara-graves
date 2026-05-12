import { siteConfig } from "@/config/siteConfig";
import EqualizerBars from "./EqualizerBars";
import MarqueeTicker from "@/components/MarqueeTicker";

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
        poster={siteConfig.artist.portraitUrl}
        aria-hidden
      />
      {/* Gradient overlay removed for clean hero video */}

      {/* Channel label corner */}
      <div className="absolute top-20 right-4 z-10 font-mono text-[10px] tracking-[0.3em] text-cream/70">
        ◉ REC · CH 07 · {new Date().getFullYear()}
      </div>

      {/* Center content */}
      <div className="relative z-20 container flex flex-col items-center justify-center min-h-[100svh] text-center pt-24 pb-32">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-toxic mb-4 animate-flicker">
          ▍ WILMINGTON, DE ▍
        </p>

        <img
          src={siteConfig.artist.logoUrl}
          alt={siteConfig.artist.name}
          className="logo-knockout w-[78vw] max-w-[680px] drop-shadow-[0_0_30px_hsl(var(--cherry-bright)/0.5)] animate-fade-in"
        />

        <h1 className="sr-only">{siteConfig.artist.name} — bass-heavy DJ &amp; artist</h1>

        <p className="mt-6 font-script text-2xl sm:text-3xl text-cream rotate-[-2deg]">
          “{siteConfig.artist.tagline}”
        </p>

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
            href="#signal"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-cream/60 text-cream hover:border-toxic hover:text-toxic transition-all clip-notch"
          >
            ✦ Signal
          </a>
          <a
            href="#contact"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-toxic text-toxic hover:bg-toxic hover:text-noir transition-all clip-notch"
          >
            ✉ Contact
          </a>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <EqualizerBars />
          <span className="font-mono text-[10px] tracking-[0.3em] text-cream/70">
            SIGNAL LOCKED · 808 HZ
          </span>
          <EqualizerBars />
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-cherry/40 bg-noir/70 backdrop-blur-sm">
        <MarqueeTicker
          items={["DUBSTEP", "UK BASS", "TRAP", "RETRO CLUB CULTURE", "CHERRY NOIR"]}
          className="!border-0 !bg-transparent"
        />
      </div>
    </section>
  );
};

export default HeroCiara;
