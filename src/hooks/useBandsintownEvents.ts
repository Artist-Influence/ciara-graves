import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "@/config/siteConfig";

export interface BandsintownEvent {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: boolean;
}

interface BandsintownApiEvent {
  id: string;
  datetime: string;
  venue: {
    name: string;
    city: string;
    region: string;
    country: string;
  };
  url: string;
  offers: { type: string; url: string; status: string }[];
}

const fetchEvents = async (
  artistId: string,
  appId: string
): Promise<BandsintownEvent[]> => {
  if (!artistId || !appId) return [];
  const res = await fetch(
    `https://rest.bandsintown.com/artists/${encodeURIComponent(artistId)}/events?app_id=${encodeURIComponent(appId)}`
  );
  if (!res.ok) throw new Error("Failed to fetch tour dates");
  const data: BandsintownApiEvent[] = await res.json();

  return data.map((e) => ({
    id: String(e.id),
    date: e.datetime.split("T")[0],
    city: e.venue.region
      ? `${e.venue.city}, ${e.venue.region}`
      : e.venue.city,
    venue: e.venue.name,
    ticketUrl: e.url,
    soldOut: e.offers?.some((o) => o.status === "sold_out") ?? false,
  }));
};

export const useBandsintownEvents = () => {
  const artistId = siteConfig.bandsintown?.artistId || "";
  const appId = siteConfig.bandsintown?.appId || "";
  return useQuery({
    queryKey: ["bandsintown-events", artistId, appId],
    queryFn: () => fetchEvents(artistId, appId),
    enabled: Boolean(artistId && appId),
    staleTime: 1000 * 60 * 30,
  });
};
