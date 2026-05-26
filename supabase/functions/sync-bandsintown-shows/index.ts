import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ARTIST_ID = "Ciara Graves";
const APP_ID = "ba07a5e038e1fa576899f90a80cf24bf";

interface BITEvent {
  id: string;
  datetime: string;
  title?: string;
  url: string;
  venue: {
    name?: string;
    location?: string;
    city?: string;
    region?: string;
    country?: string;
  };
  offers?: { type: string; url: string; status: string }[];
  lineup?: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const res = await fetch(
      `https://rest.bandsintown.com/artists/${encodeURIComponent(ARTIST_ID)}/events?app_id=${encodeURIComponent(APP_ID)}`
    );
    if (!res.ok) throw new Error(`Bandsintown ${res.status}`);
    const events: BITEvent[] = await res.json();

    const now = new Date();
    const upcoming = events.filter((e) => new Date(e.datetime) >= now);

    const rows = upcoming.map((e) => {
      const ticketOffer = e.offers?.find((o) => o.type === "Tickets");
      const soldOut = e.offers?.some((o) => o.status === "sold_out") ?? false;
      // Bandsintown quirk: venue.name often holds the promoter/event title.
      // Use e.title as the headline; keep venue.name only if distinct.
      const title = e.title || e.venue.name || "TBA";
      const venueName =
        e.venue.name && e.venue.name !== title ? e.venue.name : null;
      return {
        bandsintown_id: String(e.id),
        datetime: e.datetime,
        title,
        venue_name: venueName,
        city: e.venue.city ?? null,
        region: e.venue.region ?? null,
        country: e.venue.country ?? null,
        ticket_url: ticketOffer?.url ?? e.url,
        event_url: e.url,
        sold_out: soldOut,
        lineup: e.lineup ?? [],
        last_synced_at: new Date().toISOString(),
      };
    });

    if (rows.length > 0) {
      const { error: upErr } = await supabase
        .from("shows")
        .upsert(rows, { onConflict: "bandsintown_id" });
      if (upErr) throw upErr;
    }

    // Remove shows no longer present in Bandsintown payload
    const keepIds = rows.map((r) => r.bandsintown_id);
    const delQuery = supabase.from("shows").delete();
    const { error: delErr } =
      keepIds.length > 0
        ? await delQuery.not("bandsintown_id", "in", `(${keepIds.map((i) => `"${i}"`).join(",")})`)
        : await delQuery.neq("bandsintown_id", "__never__");
    if (delErr) throw delErr;

    return new Response(
      JSON.stringify({ ok: true, synced: rows.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("sync-bandsintown-shows error", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
