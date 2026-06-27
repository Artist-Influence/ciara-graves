import ciaraPortrait from "@/assets/ciara-portrait-boombox.jpg";
import ciaraLogo from "@/assets/ciara-logo.png";
import heroVideo from "@/assets/hero-bg.mp4";
import dvdBounceVideo from "@/assets/dvd-bounce.mp4";
import vizMusic from "@/assets/viz-music.mp4";
import vizShows from "@/assets/viz-shows.mp4";
import vizVertical from "@/assets/viz-vertical.mp4";

export const visualizers = {
  music: vizMusic,
  bio: vizVertical,
  shows: vizShows,
  findme: vizVertical,
  vertical: vizVertical,
};

export const siteConfig = {
  artist: {
    name: "CIARA GRAVES",
    tagline: "About",
    location: "WILMINGTON, DE",
    description:
      "Bass-heavy DJ + artist blending dubstep, UK bass, and trap with retro aesthetics and modern club culture.",
    logoUrl: ciaraLogo,
    portraitUrl: ciaraPortrait,
    heroVideoUrl: heroVideo,
    dvdBounceUrl: dvdBounceVideo,
  },

  socials: {
    soundcloud: "https://soundcloud.com/ciaragraves",
    audius: "https://audius.co/ciaragraves",
    instagram: "https://www.instagram.com/ciaragraves_",
    tiktok: "https://www.tiktok.com/@ciaragravesxo",
    spotify: "https://open.spotify.com/artist/2wYCS3DnZgyxDzfwDEj9Rm?si=v6Ye4o03Qiy_HNDKWNAXqA",
  },


  bandsintown: {
    artistId: "Ciara Graves",
    appId: "ba07a5e038e1fa576899f90a80cf24bf",
    profileUrl: "https://www.bandsintown.com/a/Ciara%20Graves",
  },

  // SoundCloud RSS — fetched server-side via edge function fetch-soundcloud-feed
  soundcloud: {
    rssUrl:
      "https://feeds.soundcloud.com/users/soundcloud:users:141298274/sounds.rss",
    profileUrl: "https://soundcloud.com/ciaragraves",
  },

  laylo: {
    enabled: true,
    dropId: "evpf7",
    color: "F12C42",
    theme: "dark",
    bgVideoUrl: vizVertical,
  },

  about: {
    bioShort:
      "Ciara Graves is a bass-heavy DJ and artist based just outside Philly in Wilmington, Delaware. She blends dubstep, UK bass, and trap into high-energy sets that balance retro aesthetics with modern club culture. Shaped by nostalgic TV reruns, internet culture, gaming, and a lifelong obsession with sweet treats, her creative world is rooted in contrast: sweetness with edge, nostalgia with bite.",
    bioLong: [
      "Ciara Graves is a bass-heavy artist based just outside of Philly in Wilmington, Delaware. She blends dubstep, UK bass, and trap into a high-energy style that balances retro aesthetics with a modern club feel.",
      "Ciara developed a sharp sense of contrast, mood, and detail through a mix of scenes and influences. Internet memes, nostalgic TV reruns, gaming, and a lifelong obsession with sweet treats all inform her visual world and identity. Her cherry motif sits at the center of her branding as a symbol of contrast: sweetness with edge, nostalgia with bite, and a balance of playful and polished.",
      "That duality carries through her music and performances. Her productions move between heavy and light, precise and loose, familiar and forward-facing, while staying cohesive. Her sets are fast-moving and intentional, built from bass-heavy selections, UK influences, and flips that keep energy shifting without losing flow. She has supported artists including T-Pain, CAM GIRL, BENZI, and QUIX, and performed at clubs across the U.S., including Avalon Hollywood in Los Angeles and SILO in Brooklyn.",
      "With new music and performances on the horizon, Ciara is stepping into her next chapter, building a project designed to feel fun, immersive, and made for connection.",
    ],
  },

  highlights: [
    { label: "SUPPORTED", value: "T-PAIN · BENZI · CAM GIRL · QUIX", kind: "card" },
    { label: "STAGES", value: "AVALON HOLLYWOOD · SILO BROOKLYN · MEOW WOLF", kind: "ticket" },
    { label: "CHARTS", value: "TOP 5 — AUDIUS GLOBAL TRENDING", kind: "sticker" },
    { label: "PARTNERS", value: "DYSON BEAUTY · SUPERGOOP! · NARS", kind: "label" },
    { label: "PRESS", value: "RUN THE TRAP · SUPPORT WOMEN DJs · DELIRIUM", kind: "card" },
  ],

  marqueePhrases: [
    "DUBSTEP",
    "UK BASS",
    "TRAP",
    "RETRO CLUB CULTURE",
    "SWEET WITH BITE",
    "CHERRY NOIR",
    "WILMINGTON / DE",
    "BASS FROM ANOTHER ROOM",
  ],

  booking: {
    email: "info@ciaragraves.com",
    epkUrl: "/epk/Ciara-Graves-Biography-2026.pdf",
  },
};

export type SiteConfig = typeof siteConfig;
