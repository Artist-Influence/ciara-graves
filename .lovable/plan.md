# Ciara Graves Artist Site — Build Plan

## Vision
A bass-heavy artist site that feels like a haunted DVD menu meets cherry-red club flyer meets premium EPK. Cinematic, weird, fun, premium — not a generic EDM/EPK template. Fully responsive (collage-rich on desktop, clean and fast on mobile).

## Aesthetic system
- **Palette (HSL tokens in `index.css`)**: near-black base, deep cherry red, muted cream/off-white, toxic green (logo accent), occasional electric blue/teal glow.
- **Effects**: grain overlay, CRT scanlines, paper texture, soft red/green glow, subtle VHS chromatic-aberration on hover, light DVD-bounce float for the green logo.
- **Typography**: install the uploaded **Bootzy_TM** font as the display face (logo-style headings/marks), pair with a condensed all-caps sans (e.g. Barlow Condensed) for headings and a compact mono (e.g. JetBrains Mono) for cassette-label UI text. Optional handwritten accent (Caveat) used sparingly for stickers like "sweet with bite."
- **Motion**: tasteful — DVD bounce loop, slow cassette/CD spin, equalizer bars, hover scale/tilt, scanline flicker. Respect `prefers-reduced-motion`.

## Asset handling (copy from user-uploads)
- `Bootzy_TM.ttf` / `.otf` → `public/fonts/` and `@font-face` in `index.css`.
- `CIARA_GRAVES_LOGO_-Artboard_9.svg` → `src/assets/ciara-logo.svg` (white + cherry-red SVG).
- A green-tinted version of the logo (via CSS filter / SVG color override) used as the **DVD-bounce** floater.
- `Logo_DVD_Bounce.MP4` → `src/assets/dvd-bounce.mp4` (looping background motif in hero corner / footer / visual world).
- `CIARA_GRAVES_HERO_SECTION_VIDEO.mp4` → `src/assets/hero-bg.mp4` (hero background loop, muted/autoplay/playsinline + force-play polling for mobile).
- `Ciara_Graves_Bio_Pic.JPG` → `src/assets/ciara-portrait.jpg` (about/collage).
- `Ciara_Graves_Biography_2026.pdf` → `public/epk/Ciara-Graves-Biography-2026.pdf` (Read Full Bio + EPK download).

## Content config
Replace `src/config/siteConfig.ts` with a Ciara-focused config: artist name, tagline ("Bass-heavy. Sweet with bite."), location, socials (SoundCloud, Audius, Instagram, TikTok — Spotify left as a clearly-commented placeholder), Bandsintown (`artistId: "Ciara Graves"`, `appId: ba07a5e038e1fa576899f90a80cf24bf`), Laylo placeholder, booking email `info@ciaragraves.com`, marquee phrases, highlights/credibility list (NO ACRAZE credit).

## Page structure (`src/pages/Index.tsx`, route `/`)
Sticky nav (small wordmark + anchors) with smooth scroll. Sections, in order:

1. **Hero** — full-viewport video bg (Ciara + stereo), dark overlay with red/green glow, big logo, tagline, CTAs (Listen / Shows / Book Ciara), small marquee "DUBSTEP / UK BASS / TRAP / RETRO CLUB CULTURE", floating DVD-bounce green-logo loop in a corner.
2. **Music / Latest Drops** — fetched from SoundCloud RSS via a new edge function `fetch-soundcloud-feed` (RSS isn't CORS-friendly client-side). Cards styled as cassette tapes / boombox screens with spinning reel, equalizer bars, title, date, Play/SoundCloud links. One looping audio-reactive style visualizer beside the latest track. Streaming row: SoundCloud, Audius, Instagram, TikTok. Spotify placeholder commented for easy enable.
3. **Laylo / Fan Capture** — phone-screen / desktop pop-up styling, headline "Get the next drop first", body copy, CTA "Join Ciara's List". Clearly commented `{/* LAYLO EMBED PLACEHOLDER */}` slot.
4. **About / Bio** — collage layout (cherries, poker card, TV, cassette, lucky 7 stickers around a portrait tile). On-page short bio + "Read full bio" drawer with the long bio (ACRAZE line removed per instructions). Handwritten accent stickers.
5. **Highlights / Credibility** — punchy ticket-stub / poker-card / VHS-label cards with hover motion. Items: supported T-Pain, BENZI, CAM GIRL, QUIX; venues Avalon Hollywood, SILO Brooklyn, Meow Wolf; Top 5 Audius Global Trending; brand partners Dyson Beauty, Supergoop!, NARS; press Run The Trap, Support Women DJs, Delirium.
6. **Shows** — Bandsintown via existing `useBandsintownEvents` hook with new app id. Styled as ticket-stub stack / club-flyer wall. Empty state: "No shows listed right now. Join the list for the next drop." + Laylo CTA.
7. **Visual World / Moodboard** — horizontal scroll collage inside a CRT frame; tiles for cassette, boombox, red velvet, poker/lucky 7, cherries, flip phone, mirrors, cats, magazine collage, club imagery. Three labeled video slots: `VISUALIZER_VIDEO_01`, `VISUALIZER_VIDEO_02` (uses `dvd-bounce.mp4`), `VISUALIZER_VIDEO_03`, with clear comments for swapping.
8. **Video / Performance** — DVD-menu / camcorder layout: one large featured slot + two small slots. Placeholders labeled "LIVE FILE_001 / BASS TRANSMISSION / CLUB FOOTAGE", commented for swap.
9. **Socials** — "Find me somewhere weird." Custom buttons styled as desktop icons / cassette labels / poker chips for SoundCloud, Audius, Instagram/Threads, TikTok.
10. **Booking / Footer** — back-of-burned-CD aesthetic. Booking email `info@ciaragraves.com`, Download EPK button (links to PDF), socials, mini logo + DVD-bounce loop, minimal nav.

## Components to create (`src/components/ciara/`)
`StickyNavCiara`, `HeroCiara`, `MarqueeTicker` (reuse), `MusicFeed`, `LayloPlaceholder`, `BioSection`, `Highlights`, `Shows`, `VisualWorld`, `VideoSection`, `SocialLinks`, `BookingFooter`. Plus shared atoms: `CassetteCard`, `TicketStub`, `CRTFrame`, `DVDBounceLogo`, `EqualizerBars`, `ScanlineOverlay` (reuse), `GrainOverlay` (reuse Noise), `StickerText`.

## Backend / data
- **Edge function `fetch-soundcloud-feed`**: server-side fetch of `https://feeds.soundcloud.com/users/soundcloud:users:141298274/sounds.rss`, parse to `{ title, link, pubDate, artworkUrl }[]`, return JSON with CORS headers. Frontend hook `useSoundCloudFeed` calls it via `supabase.functions.invoke`.
- **Bandsintown**: reuse existing `useBandsintownEvents` with new artist id and the provided app id.
- **No DB schema changes** — the SoundCloud feed is fetched live (cached in React Query for 10 min).

## Routing & cleanup
- `App.tsx`: route `/` → new `Index` page. Keep `NotFound`.
- Remove the `Pierce` page and `src/components/pierce/*` (replaced by `ciara/*`).
- Update `index.html` `<title>`, meta description, OG tags, favicon to Ciara Graves; single H1 in hero; semantic landmarks; alt text on every image.

## Performance & a11y
- Lazy-load below-the-fold sections, `loading="lazy"` on images, `preload="metadata"` on videos, `poster` images for video tiles.
- Respect `prefers-reduced-motion` (disable DVD bounce, scanline flicker, autoplay loops where appropriate).
- Color contrast checked for both bright cherry on near-black and cream body on near-black.
- Mobile: collage simplifies to stacked rhythm; horizontal-scroll sections become swipeable; nav becomes compact.

## Out of scope / explicit nots
- No ACRAZE / gold / platinum credit anywhere.
- No Spotify section enabled (clearly commented placeholder only).
- No developer credit / watermark in footer.
