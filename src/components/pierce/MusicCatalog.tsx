import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useSpotifyReleases, type Release } from "@/hooks/useSpotifyReleases";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { CornerBrackets } from "@/components/CornerBrackets";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SignalLink } from "@/components/SignalButton";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import BackgroundVideo from "@/components/BackgroundVideo";

type Filter = "all" | "originals" | "remixes" | "mixes";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "originals", label: "ORIGINALS" },
  { id: "remixes", label: "BOOTLEGS / REMIXES" },
  { id: "mixes", label: "MIXES" },
];

const isMix = (r: Release) => /live set|guest mix|\bmix\b|set @|liveset|#banguers/i.test(r.title);
const isRemix = (r: Release) => /remix|edit|flip|vip|bootleg/i.test(r.title);

const formatDate = (d: string | null) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).toUpperCase();
  } catch {
    return d;
  }
};

const ReleaseCard = ({ release }: { release: Release }) => {
  const link = release.spotify_url || release.soundcloud_url || "#";
  const cleanTitle = decodeHtmlEntities(release.title);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-panel/60 hover:bg-panel transition overflow-hidden h-full"
    >
      <CornerBrackets size={10} color="hsl(var(--ink) / 0.4)" />
      <div className="relative aspect-square overflow-hidden bg-panel-2">
        {release.artwork_url ? (
          <img
            src={release.artwork_url}
            alt={cleanTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-mute text-xs">
            // NO ARTWORK
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="card-sweep absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ink/20 group-hover:bg-signal transition" />
        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/80 px-2 py-1 bg-background/60 backdrop-blur-sm">
          {release.type}
        </div>
        {release.spotify_url && release.soundcloud_url && (
          <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.25em] text-signal px-2 py-1 bg-background/60 backdrop-blur-sm">
            SPOT · SC
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display text-xl text-ink leading-tight line-clamp-2">
          {cleanTitle}
        </h3>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute flex items-center justify-between">
          <span>{formatDate(release.release_date)}</span>
          {release.label && <span className="text-ink/60 truncate ml-2">{release.label}</span>}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {release.spotify_url && (
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-mute group-hover:text-signal transition flex items-center gap-1">
              SPOTIFY <ExternalLink className="h-3 w-3" />
            </span>
          )}
          {release.soundcloud_url && (
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-mute group-hover:text-signal transition flex items-center gap-1">
              SOUNDCLOUD <ExternalLink className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

const FeaturedSpotlight = ({ release }: { release: Release }) => {
  const embedUrl = release.spotify_id
    ? `https://open.spotify.com/embed/album/${release.spotify_id}?utm_source=generator&theme=0`
    : null;
  const cleanTitle = decodeHtmlEntities(release.title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-panel/60 mb-16 group"
    >
      <CornerBrackets size={18} />
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          {release.artwork_url && (
            <img
              src={release.artwork_url}
              alt={cleanTitle}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
        </div>
        <div className="p-5 md:p-12 flex flex-col justify-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal mb-4">
            // LATEST DROP — SPOTLIGHT
          </div>
          <h3 className="font-display text-3xl md:text-6xl text-ink leading-none">
            {cleanTitle}
          </h3>
          <div className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-mute flex flex-wrap gap-x-6 gap-y-2">
            <span>{release.type}</span>
            <span>· {formatDate(release.release_date)}</span>
            {release.label && <span>· {release.label}</span>}
          </div>

          {embedUrl && (
            <div className="mt-6 bg-background/40">
              <iframe
                src={embedUrl}
                width="100%"
                height="80"
                frameBorder={0}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={cleanTitle}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {release.spotify_url && (
              <SignalLink href={release.spotify_url} variant="primary" size="sm">
                OPEN IN SPOTIFY
              </SignalLink>
            )}
            {release.soundcloud_url && (
              <SignalLink href={release.soundcloud_url} variant="signal" size="sm">
                OPEN IN SOUNDCLOUD
              </SignalLink>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MusicCatalog = () => {
  const { data: releases = [], isLoading } = useSpotifyReleases();
  const [filter, setFilter] = useState<Filter>("all");
  const railRef = useRef<HTMLDivElement | null>(null);

  const featured = releases[0];
  const rest = releases.slice(1);

  const filtered = useMemo(() => {
    return rest.filter((r) => {
      const mix = isMix(r);
      const remix = !mix && isRemix(r);
      switch (filter) {
        case "originals": return !mix && !remix;
        case "remixes":   return remix;
        case "mixes":     return mix;
        default:          return true;
      }
    });
  }, [rest, filter]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 280;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="music" className="relative py-16 md:py-32 bg-background overflow-hidden">
      <BackgroundVideo
        src="/visualizers/transmission.mp4"
        poster="/visualizers/transmission-poster.jpg"
        overlayOpacity={0.82}
      />
      <GridBackdrop variant="lines" className="opacity-30 z-[2]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <SystemLabel index="003" accent>CATALOG</SystemLabel>
            <h2 className="mt-4 font-display text-4xl md:text-7xl text-ink leading-none">
              THE <span className="text-signal text-signal-glow">VAULT</span>
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-mute max-w-md">
              Official releases · remixes · world-building from the SoundCloud underground.
            </p>
          </div>
          <SignalLink href={siteConfig.socials.spotify} variant="signal" size="sm">
            FOLLOW ON SPOTIFY
          </SignalLink>
        </motion.div>

        {featured && <FeaturedSpotlight release={featured} />}

        {/* Filters + scroll controls */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 border-b border-border pb-2">
          <div className="flex flex-wrap gap-2 md:gap-1 overflow-x-auto scrollbar-hide">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition border-b-2 whitespace-nowrap",
                  filter === f.id
                    ? "text-signal border-signal"
                    : "text-mute border-transparent hover:text-ink"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll catalog left"
              className="p-2 border border-border text-mute hover:text-signal hover:border-signal transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Scroll catalog right"
              className="p-2 border border-border text-mute hover:text-signal hover:border-signal transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal rail */}
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[220px] md:w-[calc((100%-3rem)/4)] aspect-square bg-panel/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              ref={railRef}
              layout
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pr-12 md:pr-16"
            >
              {filtered.map((r) => (
                <motion.div
                  key={r.id}
                  data-rail-card
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 snap-start w-[220px] md:w-[calc((100%-3rem)/4)]"
                >
                  <ReleaseCard release={r} />
                </motion.div>
              ))}
              {/* trailing spacer for clean right-edge gutter */}
              <div className="flex-shrink-0 w-2 md:w-4" aria-hidden />
              {filtered.length === 0 && (
                <div className="w-full text-center py-16 font-mono text-xs uppercase tracking-[0.25em] text-mute">
                  // NO ENTRIES IN THIS BAND
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {filtered.length > 4 && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mute text-center md:text-right">
            // SCROLL TO EXPLORE THE VAULT →
          </p>
        )}
      </div>
    </section>
  );
};

export default MusicCatalog;
