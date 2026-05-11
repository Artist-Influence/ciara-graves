import piercePressPhoto from "@/assets/pierce-press-photo.jpg";
import pierceLogo from "@/assets/pierce-logo-white.png";

export const siteConfig = {
  artist: {
    name: "PIERCE",
    tagline: "DARK BASS. CINEMATIC PRESSURE.",
    location: "SCOTTSDALE, AZ",
    description: "Modern bass music from the edge of impact.",
    logoUrl: pierceLogo,
  },

  socials: {
    spotify: "https://open.spotify.com/artist/1sg7LKlpfKmZSvI0xxqNWC",
    soundcloud: "https://soundcloud.com/piercesounds",
    instagram: "https://www.instagram.com/piercesounds/",
    tiktok: "",
    youtube: "https://www.youtube.com/channel/UCWFCph1sKXOil52D4Ne3szw",
    twitch: "https://www.twitch.tv/piercesounds",
    twitter: "https://x.com/piercesounds",
    bandsintown: "https://www.bandsintown.com/a/PIERCE",
  },

  bandsintown: {
    artistId: "PIERCE",
    appId: "f61f468b6396e370af134f76e547c94c",
    profileUrl: "https://www.bandsintown.com/a/PIERCE",
  },

  laylo: {
    dropId: "FR8u5",
    username: "pierce",
    profileEmbedUrl: "",
    idsDropId: "184a2a11-48d4-418c-8f34-870af84dfc8b",
  },

  spotifyEmbed: {
    artistId: "1sg7LKlpfKmZSvI0xxqNWC",
    playlistId: "",
  },

  about: {
    bioShort:
      "Hailing from Scottsdale, AZ, PIERCE crafts dark sound design and explosive, cinematic energy. Modern bass music engineered for impact.",
    paragraphs: [
      "Hailing from Scottsdale, Arizona, PIERCE is a producer obsessed with dark sound design, explosive energy, and cinematic storytelling — a precision-built operator in the modern bass music space.",
      "His catalog spans WAKAAN, Bassrush Records, Trippy Bee / LSDREAM, Mad Decent, and Dim Mak, with signature records including Rockin, How Low, Pursuit (Remix), and B.A.S.S. with SNAILS.",
      "Live, PIERCE has detonated stages from Mission Ballroom alongside Deathpact to Lost Lands and the Alleycvt Tour — connecting deeper every cycle with his fanbase, the Archers.",
    ],
    pullQuote: "PRECISION-BUILT CHAOS FROM SCOTTSDALE.",
    labels: ["WAKAAN", "BASSRUSH", "MAD DECENT", "DIM MAK", "TRIPPY BEE / LSDREAM"],
    signatureRecords: ["ROCKIN", "HOW LOW", "PURSUIT (REMIX)", "B.A.S.S. w/ SNAILS"],
    performances: ["MISSION BALLROOM w/ DEATHPACT", "LOST LANDS", "ALLEYCVT TOUR"],
    fanbase: "THE ARCHERS",
    imageUrl: piercePressPhoto,
  },

  epk: {
    epkUrl: "https://www.dropbox.com/scl/fi/rynym40srxma3uqytvetw/EPK-PIERCE-2k26.pdf?rlkey=zt6cxbnaeibk9mn4wffba5vf5&st=ff9uvfkv&dl=1",
    bookingEmail: "pierce@piercesounds.com",
    managementEmail: "pierce@piercesounds.com",
  },

  marqueePhrases: [
    "WAKAAN",
    "BASSRUSH",
    "MAD DECENT",
    "DIM MAK",
    "LSDREAM / TRIPPY BEE",
    "LOST LANDS",
    "MISSION BALLROOM",
    "ARCHERS // SIGNAL LOCKED",
    "PRECISION-BUILT CHAOS",
    "SCOTTSDALE // AZ",
  ],

  contact: {
    booking: "pierce@piercesounds.com",
    management: "pierce@piercesounds.com",
  },

  backgroundMedia: {
    hero: { videoUrl: "", posterUrl: "" },
    laylo: { videoUrl: "", posterUrl: "" },
    music: { videoUrl: "", posterUrl: "" },
    tour: { videoUrl: "", posterUrl: "" },
    about: { videoUrl: "", posterUrl: "" },
    archers: { videoUrl: "", posterUrl: "" },
  },
};

export type SiteConfig = typeof siteConfig;
