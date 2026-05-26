import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BandsintownEvent {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: boolean;
}

const fetchEvents = async (): Promise<BandsintownEvent[]> => {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .gte("datetime", nowIso)
    .order("datetime", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((s) => ({
    id: s.bandsintown_id,
    date: s.datetime.split("T")[0],
    city: s.region ? `${s.city ?? ""}, ${s.region}` : (s.city ?? ""),
    venue: s.title ?? s.venue_name ?? "TBA",
    ticketUrl: s.ticket_url ?? s.event_url ?? "#",
    soldOut: !!s.sold_out,
  }));
};

export const useBandsintownEvents = () => {
  return useQuery({
    queryKey: ["shows"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 30,
  });
};
