import { useSoundCloudFeed, type SoundCloudTrack } from "@/hooks/useSoundCloudFeed";
import { siteConfig } from "@/config/siteConfig";
import EqualizerBars from "./EqualizerBars";
import DVDBounceLogo from "./DVDBounceLogo";
import { cn } from "@/lib/utils";

const formatDate = (s: string) => {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

const CassetteCard = ({ track, featured = false }: { track: SoundCloudTrack; featured?: boolean }) => (
  <article
    className={cn(
      "group relative overflow-hidden bg-card border border-cherry/40 vhs-hover scanlines",
      featured ? "p-5 sm:p-6" : "p-4"
    )}
  >
    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-toxic mb-3">
      <span>● TAPE_{track.id.slice(-4).toUpperCase()}</span>
      <span className="text-cream-dim">{formatDate(track.pubDate)}</span>
    </div>

    {/* Cassette body */}
    <div className="relative cassette-window p-3 sm:p-4 border border-border">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0 w-10 h-10 rounded-full border border-cherry/60 bg-noir flex items-center justify-center animate-spin-reel">
          <div className="w-2 h-2 rounded-full bg-cherry-bright" />
          <div className="absolute inset-1 border border-cherry/30 rounded-full" />
        </div>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-cherry/60 via-cream/30 to-cherry/60" />
        <div className="relative shrink-0 w-10 h-10 rounded-full border border-cherry/60 bg-noir flex items-center justify-center animate-spin-reel" style={{ animationDelay: "-1s" }}>
          <div className="w-2 h-2 rounded-full bg-cherry-bright" />
          <div className="absolute inset-1 border border-cherry/30 rounded-full" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.3em] text-cream-dim">SIDE A · CIARA GRAVES</span>
        <EqualizerBars bars={4} className="h-3" />
      </div>
    </div>

    {/* Artwork strip + title */}
    <div className="mt-4 flex gap-3 items-start">
      {track.artworkUrl && (
        <img
          src={track.artworkUrl}
          alt=""
          loading="lazy"
          className="w-16 h-16 object-cover border border-cherry/40 saturate-110 contrast-110"
        />
      )}
      <div className="flex-1 min-w-0">
        <h3 className={cn("font-display uppercase text-cream leading-tight", featured ? "text-2xl" : "text-lg")}>
          {track.title}
        </h3>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-2">
      <a
        href={track.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] tracking-[0.25em] uppercase px-3 py-2 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch"
      >
        ▶ Play
      </a>
      <a
        href={track.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] tracking-[0.25em] uppercase px-3 py-2 border border-cream/40 text-cream hover:border-toxic hover:text-toxic transition-colors clip-notch"
      >
        ↗ SoundCloud
      </a>
    </div>
  </article>
);

export const MusicFeed = () => {
  const { data: tracks, isLoading, isError } = useSoundCloudFeed();
  const featured = tracks?.[0];
  const rest = tracks?.slice(1, 7) ?? [];

  return (
    <section id="music" className="relative py-24 sm:py-32 overflow-hidden border-t border-cherry/20">
      <div className="container relative z-10">
        <header className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ LATEST_DROPS / SIDE_A</p>
            <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">PRESS PLAY.</h2>
            <p className="mt-3 font-script text-2xl text-cherry-bright rotate-[-2deg] inline-block">
              bass from another room
            </p>
          </div>
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
          <div className="font-mono text-sm text-cherry-bright">
            ✕ Signal lost. Try{" "}
            <a className="underline" href={siteConfig.soundcloud.profileUrl} target="_blank" rel="noopener noreferrer">
              SoundCloud directly
            </a>
            .
          </div>
        )}

        {tracks && tracks.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured */}
            <div className="lg:col-span-2 relative">
              {featured && <CassetteCard track={featured} featured />}
              {/* Visualizer beside featured */}
              <div className="hidden lg:block absolute -right-4 -bottom-4 w-32 opacity-80">
                <DVDBounceLogo size={120} />
              </div>
            </div>
            <div className="lg:col-span-1 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {rest.slice(0, 3).map((t) => (
                <CassetteCard key={t.id} track={t} />
              ))}
            </div>

            {rest.slice(3).length > 0 && (
              <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.slice(3).map((t) => (
                  <CassetteCard key={t.id} track={t} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Streaming row */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-cream-dim mr-2">ALSO ON →</span>
          <StreamPill href={siteConfig.socials.soundcloud} label="SoundCloud" />
          <StreamPill href={siteConfig.socials.audius} label="Audius" />
          <StreamPill href={siteConfig.socials.instagram} label="Instagram" />
          <StreamPill href={siteConfig.socials.tiktok} label="TikTok" />
          {/* SPOTIFY PLACEHOLDER — set siteConfig.socials.spotify.enabled=true to surface */}
          {siteConfig.socials.spotify.enabled && siteConfig.socials.spotify.url && (
            <StreamPill href={siteConfig.socials.spotify.url} label="Spotify" />
          )}
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
