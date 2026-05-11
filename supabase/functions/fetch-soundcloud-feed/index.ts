// Edge function: fetch-soundcloud-feed
// Server-side fetch of the SoundCloud RSS feed (avoids browser CORS).
// Returns a JSON list of recent tracks for the Ciara Graves Music section.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function tag(xml: string, t: string): string {
  const m = xml.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`));
  return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
}

function attr(xml: string, t: string, a: string): string {
  const m = xml.match(new RegExp(`<${t}[^>]*${a}="([^"]*)"[^>]*/?>`, "i"));
  return m ? m[1] : "";
}

const DEFAULT_RSS =
  "https://feeds.soundcloud.com/users/soundcloud:users:141298274/sounds.rss";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const url = new URL(req.url);
    const rssUrl = url.searchParams.get("rss") || DEFAULT_RSS;

    const res = await fetch(rssUrl);
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
    const xml = await res.text();

    const items: Array<{
      id: string;
      title: string;
      link: string;
      pubDate: string;
      artworkUrl: string;
      description: string;
    }> = [];

    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = itemRe.exec(xml)) !== null) {
      const it = m[1];
      const title = decodeEntities(tag(it, "title"));
      const link = tag(it, "link");
      const pubDate = tag(it, "pubDate");
      const guid = tag(it, "guid") || link;
      const artworkUrl = attr(it, "itunes:image", "href");
      const description = decodeEntities(tag(it, "description")).slice(0, 240);
      if (title && link) {
        items.push({ id: guid, title, link, pubDate, artworkUrl, description });
      }
    }

    return new Response(JSON.stringify({ items }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
