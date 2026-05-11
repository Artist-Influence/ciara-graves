import { siteConfig } from "@/config/siteConfig";

/**
 * Video / Performance section — DVD-menu / camcorder layout.
 * SWAP: replace each <VideoSlot /> `videoSrc` with a real performance file
 * (or a poster image + future YouTube embed).
 */

interface Slot {
  id: string;
  label: string;
  caption: string;
  videoSrc?: string;
  posterSrc?: string;
  big?: boolean;
}

const slots: Slot[] = [
  {
    id: "LIVE_FILE_001",
    label: "LIVE FILE_001",
    caption: "FEATURED · last set · TBA",
    big: true,
    videoSrc: siteConfig.artist.heroVideoUrl, // placeholder — swap to real performance video
  },
  {
    id: "BASS_TRANSMISSION",
    label: "BASS TRANSMISSION",
    caption: "studio · bass test",
    videoSrc: siteConfig.artist.dvdBounceUrl,
  },
  {
    id: "CLUB_FOOTAGE",
    label: "CLUB FOOTAGE",
    caption: "the floor · ch 07",
    videoSrc: siteConfig.artist.dvdBounceUrl,
  },
];

const VideoSlot = ({ slot }: { slot: Slot }) => (
  <figure className="relative group bg-noir border-[6px] border-[hsl(0_0%_12%)] overflow-hidden scanlines">
    {slot.videoSrc ? (
      <video
        className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        src={slot.videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={slot.posterSrc}
        aria-label={slot.label}
      />
    ) : (
      <div className="w-full aspect-video grid place-items-center text-cream-dim font-mono text-xs tracking-[0.3em]">
        ▸ NO SIGNAL
      </div>
    )}
    {/* DVD menu overlay */}
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3">
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-toxic">
        <span>● REC</span>
        <span>{slot.id}</span>
      </div>
      <div className="self-end font-mono text-[9px] tracking-[0.3em] text-cream/80">
        SP · 00:00:00
      </div>
    </div>
    <figcaption className="bg-noir/90 px-4 py-3 border-t border-cherry/30 flex items-center justify-between">
      <span className="font-display text-xl text-cream uppercase">{slot.label}</span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-cream-dim">{slot.caption}</span>
    </figcaption>
  </figure>
);

export const VideoSection = () => (
  <section id="video" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
    <div className="container">
      <header className="mb-10 sm:mb-14">
        <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ DVD_MENU / PLAYBACK</p>
        <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">PRESS PLAY ON FOOTAGE.</h2>
      </header>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><VideoSlot slot={slots[0]} /></div>
        <div className="lg:col-span-1 grid gap-5">
          <VideoSlot slot={slots[1]} />
          <VideoSlot slot={slots[2]} />
        </div>
      </div>
    </div>
  </section>
);

export default VideoSection;
