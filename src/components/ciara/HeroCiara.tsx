import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import EqualizerBars from "./EqualizerBars";

/** Ticking VHS timecode (M:SS:FF) for the camcorder HUD. Pauses for reduced-motion. */
const Timecode = () => {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrames((n) => n + 1), 80);
    return () => window.clearInterval(id);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const ff = frames % 25;
  const totalSec = Math.floor(frames / 25);
  const ss = totalSec % 60;
  const mm = Math.floor(totalSec / 60) % 60;
  return <span className="tabular-nums">{mm}:{pad(ss)}:{pad(ff)}</span>;
};

export const HeroCiara = () => {
  const year = new Date().getFullYear();

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

      {/* Depth — radial vignette + bottom fade into noir so content pops and the
          section melts into Music below. (Replaces the old flat "clean video".) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, transparent 30%, hsl(var(--noir) / 0.55) 72%, hsl(var(--noir) / 0.95) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 z-[1] pointer-events-none bg-gradient-to-b from-transparent to-noir"
      />
      <div aria-hidden className="absolute inset-0 z-[2] vignette-cherry pointer-events-none" />

      {/* Corner brackets — camcorder framing */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-6 z-10">
        <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cream/30" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cream/30" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cream/30" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cream/30" />
      </div>

      {/* HUD — top-left: REC + timecode */}
      <div className="absolute top-16 sm:top-20 left-5 sm:left-8 z-20 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cream/80">
        <span className="w-2 h-2 rounded-full bg-cherry-bright glow-cherry animate-flicker" />
        <span className="text-cherry-bright">REC</span>
        <span className="text-cream/50">·</span>
        <Timecode />
      </div>

      {/* HUD — top-right: channel / tape speed */}
      <div className="absolute top-16 sm:top-20 right-5 sm:right-8 z-20 text-right font-mono text-[10px] tracking-[0.3em] text-cream/70">
        <div>◉ CH 07 · SP</div>
        <div className="text-cream/40 mt-1">{year} · BASS_TV</div>
      </div>

      {/* SEO heading (visual logo is baked into the hero video) */}
      <h1 className="sr-only">{siteConfig.artist.name} — bass-heavy DJ &amp; artist</h1>

      {/* Tagline + CTAs — anchored in the lower third, clear of the video logo */}
      <div className="absolute inset-x-0 bottom-24 sm:bottom-28 z-20 flex flex-col items-center gap-6 px-4 text-center">
        {/* Tagline strip with live equalizers */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 animate-fade-in">
          <EqualizerBars bars={4} className="h-4" />
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-cream/80">
            Bass-Heavy DJ <span className="text-cherry-bright">·</span> Wilmington, DE
          </p>
          <EqualizerBars bars={4} className="h-4 scale-x-[-1]" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#music"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 bg-cherry text-cream hover:bg-cherry-bright transition-all hover:-translate-y-0.5 clip-notch glow-cherry"
          >
            ▶ Listen
          </a>
          <a
            href="#shows"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-cream/60 text-cream hover:border-toxic hover:text-toxic transition-all hover:-translate-y-0.5 clip-notch"
          >
            ◆ Shows
          </a>
          <a
            href="#contact"
            className="group relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase px-6 py-3 border border-toxic text-toxic hover:bg-toxic hover:text-noir transition-all hover:-translate-y-0.5 clip-notch"
          >
            ✉ Contact
          </a>
        </div>
      </div>

      {/* Bottom — scroll cue + marquee of brand phrases */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <a
          href="#music"
          aria-label="Scroll to music"
          className="mx-auto mb-3 flex w-fit flex-col items-center gap-1 font-mono text-[9px] tracking-[0.35em] text-cream/50 hover:text-toxic transition-colors"
        >
          <span>SCROLL</span>
          <span className="animate-float-soft text-cherry-bright">▼</span>
        </a>
        <div className="relative overflow-hidden border-t border-cherry/25 bg-noir/70 backdrop-blur-sm py-2.5">
          <div className="flex w-max items-center gap-10 whitespace-nowrap animate-marquee">
            {[...siteConfig.marqueePhrases, ...siteConfig.marqueePhrases].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60"
              >
                <span className="text-cherry-bright mr-3">▍</span>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCiara;
