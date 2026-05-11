import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPOTIFY_ARTIST_ID = "1sg7LKlpfKmZSvI0xxqNWC";
const SOUNDCLOUD_RSS_URL = "https://feeds.soundcloud.com/users/soundcloud:users:639237/sounds.rss";

async function getSpotifyToken(): Promise<string> {
  const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
  const clientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials");
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  external_urls: { spotify: string };
  images: { url: string; width: number; height: number }[];
  copyrights?: { text: string; type: string }[];
}

/** Decode common HTML entities (named + numeric) — for SoundCloud RSS titles. */
function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/** Normalize titles for cross-platform matching.
 *  Strips a leading "PIERCE" (with optional & / x collab clause) before the first
 *  hyphen, parenthetical qualifiers like "(Free Download)", "(Original Mix)", and
 *  all non-alphanumerics. Preserves "remix"/"vip"/"bootleg"/"edit"/"flip" so
 *  remixes never collapse into their originals. */
function normalizeTitle(title: string): string {
  let t = decodeEntities(title).toLowerCase();
  // Strip leading "PIERCE - " or "PIERCE & X - " / "PIERCE x X - " collab prefix
  t = t.replace(/^pierce(\s*[&x]\s*[^-]+?)?\s*-\s*/i, "");
  // Strip any other leading "ARTIST - " prefix unless it indicates remix/vip/etc.
  t = t.replace(/^[^-\(]*?-\s*/, (m) => (/(remix|vip|bootleg|edit|flip)/.test(m) ? m : ""));
  t = t.replace(/\(([^)]*)\)/g, (full, inner) => {
    if (/(remix|vip|bootleg|edit|flip|version|mix)/i.test(inner) && !/original/i.test(inner)) {
      return full;
    }
    return "";
  });
  t = t.replace(/\b(free download|out now|master|original mix)\b/g, "");
  return t.replace(/[^a-z0-9]/g, "").trim();
}

function extractLabel(copyrights: { text: string; type: string }[] | undefined): string | null {
  if (!copyrights) return null;
  const pLine = copyrights.find((c) => c.type === "P");
  if (!pLine) return null;
  const match = pLine.text.replace(/^℗\s*/, "").replace(/^\d{4}\s*/, "").trim();
  return match || null;
}

function extractXmlTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : "";
}

function extractXmlAttr(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*/?>`, "i"));
  return match ? match[1] : "";
}

interface SoundCloudItem {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  artworkUrl: string;
}

function parseSoundCloudRss(xml: string): SoundCloudItem[] {
  const items: SoundCloudItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = decodeEntities(extractXmlTag(itemXml, "title"));
    const link = extractXmlTag(itemXml, "link");
    const pubDate = extractXmlTag(itemXml, "pubDate");
    const guid = extractXmlTag(itemXml, "guid");
    const artworkUrl = extractXmlAttr(itemXml, "itunes:image", "href");
    
    if (title && link) {
      items.push({ title, link, pubDate, guid, artworkUrl });
    }
  }
  return items;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- Spotify sync ---
    const token = await getSpotifyToken();
    const spotifyRes = await fetch(
      `https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}/albums?include_groups=single,album&limit=50&market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!spotifyRes.ok) {
      const text = await spotifyRes.text();
      throw new Error(`Spotify API error: ${spotifyRes.status} ${text}`);
    }

    const spotifyData = await spotifyRes.json();
    const albumSummaries: SpotifyAlbum[] = spotifyData.items || [];

    // Fetch full album details in batches of 20 to get copyrights/P-line
    const albumIds = albumSummaries.map((a) => a.id);
    let fullAlbums: SpotifyAlbum[] = [];

    for (let i = 0; i < albumIds.length; i += 20) {
      const batch = albumIds.slice(i, i + 20);
      const detailRes = await fetch(
        `https://api.spotify.com/v1/albums?ids=${batch.join(",")}&market=US`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (detailRes.ok) {
        const detailData = await detailRes.json();
        fullAlbums = fullAlbums.concat(detailData.albums || []);
      }
    }

    const albumMap = new Map<string, SpotifyAlbum>();
    for (const album of fullAlbums) {
      if (album) albumMap.set(album.id, album);
    }

    const spotifyUpserts = albumSummaries.map((album) => {
      const full = albumMap.get(album.id);
      return {
        spotify_id: album.id,
        title: album.name,
        type: album.album_type === "single" ? "Single" : album.album_type === "album" ? "Album" : "EP",
        release_date: album.release_date,
        artwork_url: album.images?.[0]?.url || null,
        spotify_url: album.external_urls?.spotify || null,
        source: "spotify",
        label: extractLabel(full?.copyrights),
      };
    });

    if (spotifyUpserts.length > 0) {
      const { error } = await supabase
        .from("releases")
        .upsert(spotifyUpserts, { onConflict: "spotify_id" });
      if (error) throw error;
    }

    // Build normalized title map from Spotify releases for SC matching
    const { data: allReleases } = await supabase
      .from("releases")
      .select("id, title, source, soundcloud_url, soundcloud_id, spotify_url")
      .order("created_at", { ascending: false });

    // --- Reconciliation pass: merge any pre-existing SC-only rows into matching Spotify rows ---
    if (allReleases) {
      const spotifyByNorm = new Map<string, { id: string; soundcloud_url: string | null }>();
      for (const r of allReleases) {
        if (r.spotify_url) spotifyByNorm.set(normalizeTitle(r.title), { id: r.id, soundcloud_url: r.soundcloud_url });
      }
      for (const r of allReleases) {
        if (r.source === "soundcloud" && !r.spotify_url && r.soundcloud_url) {
          const match = spotifyByNorm.get(normalizeTitle(r.title));
          if (match && !match.soundcloud_url) {
            // Delete the SC-only row first to free the unique soundcloud_id, then merge URL onto Spotify row
            await supabase.from("releases").delete().eq("id", r.id);
            const { error: mergeErr } = await supabase
              .from("releases")
              .update({ soundcloud_url: r.soundcloud_url, soundcloud_id: r.soundcloud_id })
              .eq("id", match.id);
            if (mergeErr) console.error("Reconciliation merge error:", mergeErr);
            else match.soundcloud_url = r.soundcloud_url;
          }
        }
      }
    }

    // Re-fetch after reconciliation for the SC sync pass below
    const { data: refreshed } = await supabase
      .from("releases")
      .select("id, title, soundcloud_url, spotify_url");

    const existingByNormalizedTitle = new Map<string, { id: string; soundcloud_url: string | null; spotify_url: string | null }>();
    if (refreshed) {
      for (const r of refreshed) {
        existingByNormalizedTitle.set(normalizeTitle(r.title), {
          id: r.id,
          soundcloud_url: r.soundcloud_url,
          spotify_url: r.spotify_url,
        });
      }
    }

    // --- SoundCloud sync ---
    let scSynced = 0;
    try {
      const rssRes = await fetch(SOUNDCLOUD_RSS_URL);
      if (rssRes.ok) {
        const rssXml = await rssRes.text();
        const scItems = parseSoundCloudRss(rssXml);

        for (const item of scItems) {
          const scId = item.guid || item.link;
          const normalized = normalizeTitle(item.title);
          const existing = existingByNormalizedTitle.get(normalized);

          if (existing && !existing.soundcloud_url) {
            // Merge SC URL onto existing Spotify release
            const { error } = await supabase
              .from("releases")
              .update({ soundcloud_url: item.link, soundcloud_id: scId })
              .eq("id", existing.id);
            if (error) console.error("Error merging SC release:", error);
            else scSynced++;
          } else if (!existing) {
            // Insert as SC-only release
            const releaseDate = item.pubDate ? new Date(item.pubDate).toISOString().split("T")[0] : null;
            const { error } = await supabase
              .from("releases")
              .upsert({
                soundcloud_id: scId,
                title: item.title,
                type: "Single",
                release_date: releaseDate,
                artwork_url: item.artworkUrl || null,
                soundcloud_url: item.link,
                source: "soundcloud",
              }, { onConflict: "soundcloud_id" });
            if (error) console.error("Error inserting SC release:", error);
            else scSynced++;
          }
        }
      }
    } catch (scError) {
      console.error("SoundCloud sync error (non-fatal):", scError);
    }

    return new Response(
      JSON.stringify({ success: true, spotify_synced: spotifyUpserts.length, soundcloud_synced: scSynced }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error syncing releases:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
