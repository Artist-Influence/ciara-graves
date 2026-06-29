import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Normalize a track/release title for matching across sources. */
export const normalizeTitle = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Authoritative release dates from the curated `releases` table (synced from
 * Spotify/DSPs), keyed by normalized title.
 *
 * The SoundCloud RSS pubDate is the *upload* date, which can land a day before
 * the official DSP release (e.g. "Pump": SoundCloud says Jun 4, Spotify Jun 5).
 * We prefer the DSP date when a release matches a feed track by title.
 */
export const useReleaseDates = () => {
  return useQuery({
    queryKey: ["release-dates"],
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase
        .from("releases")
        .select("title, release_date, source")
        .not("release_date", "is", null);
      if (error) throw error;

      // Spotify (DSP) dates are authoritative — let them win over SoundCloud
      // on any title clash by applying them last.
      const ordered = [...(data ?? [])].sort((a, b) => {
        const rank = (s: string) => (s === "spotify" ? 1 : 0);
        return rank(a.source) - rank(b.source);
      });

      const map: Record<string, string> = {};
      for (const r of ordered) {
        if (r.title && r.release_date) map[normalizeTitle(r.title)] = r.release_date;
      }
      return map;
    },
    staleTime: 1000 * 60 * 30,
  });
};
