import { siteConfig } from "@/config/siteConfig";
import DVDBounceLogo from "./DVDBounceLogo";

/**
 * Visual World — horizontal channel-surfing collage inside a CRT frame.
 * Tile types: emoji-stickers (lightweight, no extra image deps), labeled video
 * slots (VISUALIZER_VIDEO_01 / 02 / 03) ready to be swapped to real media.
 */

interface Tile {
  kind: "sticker" | "card" | "video";
  bg?: string;
  emoji?: string;
  label: string;
  sublabel?: string;
  videoSrc?: string;
  rot?: string;
}

const tiles: Tile[] = [
  { kind: "sticker", emoji: "🍒", label: "CHERRY NOIR", sublabel: "sweet w/ bite", bg: "bg-cherry text-cream", rot: "-3deg" },
  { kind: "video", label: "VISUALIZER_VIDEO_02", sublabel: "DVD bounce / green logo loop" },
  { kind: "sticker", emoji: "📼", label: "TAPE_DECK", sublabel: "side b unspooled", bg: "bg-cream text-noir", rot: "2deg" },
  { kind: "card", emoji: "♠ 7 ♥", label: "LUCKY 7", sublabel: "house wins", bg: "bg-noir text-toxic border border-toxic", rot: "-1deg" },
  { kind: "sticker", emoji: "📺", label: "CH 07", sublabel: "static + bass", bg: "bg-toxic text-noir", rot: "4deg" },
  { kind: "card", emoji: "📞", label: "FLIP_PHONE", sublabel: "1 missed call", bg: "bg-cream text-noir border border-cherry", rot: "-2deg" },
  { kind: "video", label: "VISUALIZER_VIDEO_01", sublabel: "cherry noir audio-reactive loop" },
  { kind: "sticker", emoji: "🐈‍⬛", label: "CAT.EYE", sublabel: "cool hours only", bg: "bg-noir text-cream border border-cream", rot: "3deg" },
  { kind: "sticker", emoji: "🪞", label: "MIRROR_FX", sublabel: "doubled image", bg: "bg-cream text-noir", rot: "-4deg" },
  { kind: "card", emoji: "🎰", label: "BOOMBOX", sublabel: "bass from another room", bg: "bg-cherry text-cream", rot: "1deg" },
  { kind: "video", label: "VISUALIZER_VIDEO_03", sublabel: "VHS club texture / cassette loop" },
  { kind: "sticker", emoji: "💿", label: "BURN_001", sublabel: "do not bend", bg: "bg-noir text-cream border border-toxic", rot: "-3deg" },
];

export const VisualWorld = () => {
  return (
    <section id="world" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
      <div className="container">
        <header className="mb-10 sm:mb-14 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ CHANNEL_SURFING / VISUAL_WORLD</p>
            <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">CIARA&apos;S WORLD.</h2>
          </div>
          <p className="font-script text-cream-dim text-xl rotate-[-2deg]">scroll horizontally →</p>
        </header>

        {/* CRT frame around scroll strip */}
        <div className="relative crt-frame p-4 sm:p-6 scanlines scanlines-strong">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
            {tiles.map((t, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-[180px] sm:w-[220px] aspect-[3/4] sticker"
                style={{ ["--rot" as never]: t.rot ?? "0deg" }}
              >
                {t.kind === "video" ? (
                  <div className="relative w-full h-full bg-noir border border-toxic/60 overflow-hidden flex flex-col">
                    {/* === SWAP: drop a real <video src=... loop muted playsInline /> here === */}
                    {t.label === "VISUALIZER_VIDEO_02" ? (
                      <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        src={siteConfig.artist.dvdBounceUrl}
                        autoPlay muted loop playsInline preload="metadata" aria-hidden
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <DVDBounceLogo size={90} />
                      </div>
                    )}
                    <div className="relative z-10 mt-auto p-3 bg-noir/80 backdrop-blur-sm">
                      <div className="font-mono text-[9px] tracking-[0.25em] text-toxic">◉ {t.label}</div>
                      <div className="font-mono text-[10px] text-cream-dim mt-1 line-clamp-2">{t.sublabel}</div>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full h-full p-4 flex flex-col justify-between ${t.bg}`}>
                    <div className="text-5xl">{t.emoji}</div>
                    <div>
                      <div className="font-display text-xl uppercase leading-tight">{t.label}</div>
                      <div className="font-mono text-[10px] tracking-[0.25em] opacity-70 mt-1">{t.sublabel}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualWorld;
