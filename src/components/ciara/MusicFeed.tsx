import { useSoundCloudFeed, type SoundCloudTrack } from "@/hooks/useSoundCloudFeed";
import { siteConfig, visualizers } from "@/config/siteConfig";
import EqualizerBars from "./EqualizerBars";
import SectionVisualizer from "./SectionVisualizer";
import Reveal from "@/components/Reveal";

const formatDate = (s: string) => {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  } catch {
    return "";
  }
};

const FeaturedRelease = ({ track }: { track: SoundCloudTrack }) => (
  <article className="relative overflow-hidden bg-card border border-cherry/40 vhs-hover scanlines p-5 sm:p-6 grid sm:grid-cols-[200px_1fr] gap-5 sm:gap-6">
    <div className="relative">
      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          loading="lazy"
          className="w-full aspect-square object-cover border-[3px] border-cream/80 shadow-[6px_6px_0_hsl(var(--cherry))]"
        />
      ) : (
        <div className="w-full aspect-square bg-noir border-[3px] border-cream/80" />
      )}
      <div className="absolute -top-3 -left-3 bg-toxic text-noir font-mono text-[10px] tracking-[0.25em] px-2 py-1 sticker" style={{ ["--rot" as never]: "-6deg" }}>
        ★ FEATURED
      </div>
    </div>
    <div className="flex flex-col">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-toxic mb-3">
        <span>● TAPE_{track.id.slice(-4).toUpperCase()}</span>
        <span className="text-cream-dim">{formatDate(track.pubDate)}</span>
      </div>
      <h3 className="font-display uppercase text-cream text-3xl sm:text-4xl leading-[0.95]">
        {track.title}
      </h3>
      <p className="mt-2 font-script text-cream text-xl rotate-[-1deg] inline-block w-fit">
        latest drop
      </p>
      <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
        <a
          href={track.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.25em] uppercase px-4 py-2.5 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch glow-cherry"
        >
          ▶ Play Now
        </a>
        <a
          href={track.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.25em] uppercase px-4 py-2.5 border border-cream/40 text-cream hover:border-toxic hover:text-toxic transition-colors clip-notch"
        >
          ↗ SoundCloud
        </a>
        <EqualizerBars className="ml-auto" />
      </div>
    </div>
  </article>
);

const CatalogCard = ({ track, index }: { track: SoundCloudTrack; index: number }) => (
  <a
    href={track.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group snap-start shrink-0 w-[220px] sm:w-[240px] bg-card border border-cherry/30 hover:border-toxic/60 transition-colors p-3 vhs-hover"
  >
    <div className="relative">
      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          loading="lazy"
          className="w-full aspect-square object-cover border-2 border-cream/30 saturate-110"
        />
      ) : (
        <div className="w-full aspect-square bg-noir border-2 border-cream/30" />
      )}
      <div className="absolute top-2 right-2 bg-cream text-noir font-mono text-[9px] tracking-[0.2em] px-1.5 py-0.5 sticker" style={{ ["--rot" as never]: "4deg" }}>
        CAT.{(index + 2).toString().padStart(3, "0")}
      </div>
    </div>
    <h4 className="mt-3 font-display uppercase text-cream text-base leading-tight line-clamp-2">
      {track.title}
    </h4>
    <div className="mt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-cream-dim">
      <span>{formatDate(track.pubDate)}</span>
      <span className="text-toxic group-hover:text-cherry transition-colors">PLAY ↗</span>
    </div>
  </a>
);

export const MusicFeed = () => {
  const { data: tracks, isLoading, isError } = useSoundCloudFeed();
  const featured = tracks?.[0];
  const rest = tracks?.slice(1) ?? [];

  return (
    <section id="music" className="relative py-24 sm:py-32 overflow-hidden border-t border-cherry/20">
      <SectionVisualizer src={visualizers.music} opacity="opacity-25" rate={2} />
      <div className="container relative z-10">
        <header className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ LATEST_DROPS / SIDE_A</p>
            <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">PRESS PLAY.</h2>
          </Reveal>
          <a
            href={siteConfig.soundcloud.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-cream-dim hover:text-toxic"
          >
            FULL CATALOG ↗
          </a>
        </header>

        {isLoading && (
          <div className="font-mono text-sm text-cream-dim animate-flicker">▸ Loading transmission…</div>
        )}
        {isError && (
          <div className="font-mono text-sm text-cherry">
            ✕ Signal lost. Try{" "}
            <a className="underline" href={siteConfig.soundcloud.profileUrl} target="_blank" rel="noopener noreferrer">
              SoundCloud directly
            </a>
            .
          </div>
        )}

        {featured && (
          <Reveal y={32} delay={0.05}>
            <FeaturedRelease track={featured} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-10">
            <div className="flex items-end justify-between mb-4">
              <p className="font-mono text-[10px] tracking-[0.4em] text-toxic">▍ CATALOG / SIDE_B</p>
              <p className="font-script text-cream-dim text-lg rotate-[-2deg]">scroll →</p>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory">
              {rest.map((t, i) => (
                <CatalogCard key={t.id} track={t} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Streaming row */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-cream-dim mr-2">ALSO ON →</span>
          <StreamPill href={siteConfig.socials.spotify} label="Spotify" />
          <StreamPill href={siteConfig.socials.soundcloud} label="SoundCloud" />
          <StreamPill href={siteConfig.socials.audius} label="Audius" />
          <StreamPill href={siteConfig.socials.instagram} label="Instagram" />
          <StreamPill href={siteConfig.socials.tiktok} label="TikTok" />
        </div>

      </div>
    </section>
  );
};

const StreamPill = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-[11px] tracking-[0.25em] uppercase px-3 py-2 border border-cream/40 text-cream hover:border-toxic hover:text-toxic hover:bg-toxic/10 transition-colors clip-notch"
  >
    {label}
  </a>
);

export default MusicFeed;
