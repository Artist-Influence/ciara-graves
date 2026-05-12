## Cleanup pass

**Hero (`HeroCiara.tsx`)**
- Remove the corner `<DVDBounceLogo />` in the hero (the floating top-left bouncing visualizer).
- Change location chip copy from `▍ WILMINGTON, DE / OUTSIDE PHILLY` → `▍ WILMINGTON, DE`.
- Remove the second cherry/toxic radial-gradient overlay layered on top of the hero video so the bg reads cleaner.

**Global gradients on top of visuals**
- Remove the spinning conic-gradient ring overlaid on the CD in `BookingFooter` (the rotating multicolor ring sitting on top of the disc).
- Remove the rainbow horizontal gradient bar at the very top of `BookingFooter`.
- Remove the cassette inner gradient strip + spinning reels' duplicate gradient strip on cassette cards (`MusicFeed`) — keep static cassette window only.
- Drop the DVDBounce overlay sitting on top of the featured release card in `MusicFeed`.

## Color retune: green → cherry pink

- Update `--toxic` and `--toxic-glow` tokens in `src/index.css` from green (`88 92% 55%`) to a cherry pink (e.g. `--toxic: 340 95% 70%`, `--toxic-glow: 335 100% 78%`). Keep the token name `toxic` so we don't have to rename everywhere — it now reads as a hot cherry pink accent.
- Update `.logo-toxic` filter in `index.css` to map black → cherry pink (new hue-rotate values) so the DVD-bounce green logo reads pink.
- Hero animate-flicker label, mono labels, hover states, sticker accents, etc. all inherit through `text-toxic` / `bg-toxic` / `border-toxic` so no per-component edits required.

## Releases section (`MusicFeed.tsx`) — 90s catalog rework

- Top: one large featured release card (latest SoundCloud track) styled like a CD jewel-case insert (artwork left, title + play CTA right, scanlines, cassette window strip).
- Below: a single horizontally scrollable strip of remaining releases as 90s catalog cards (square artwork, sticker price-tag, mono catalog code `CAT.NO 00X`, "PLAY ↗" pill). Use `snap-x` + `scrollbar-hide` (already in css) and a "scroll →" hint in cherry-pink script.
- Keep the "ALSO ON →" streaming pill row.
- Remove the DVD bounce overlay on the featured card.

## Co-signs / Highlights → tuck into Bio

- Delete `Highlights.tsx` rendering as its own section in `Index.tsx`.
- Inside `BioSection.tsx`, add a compact "CO-SIGNED" strip beneath the bio copy: small mono label + a horizontal flex row of tiny pill/ticket chips generated from `siteConfig.highlights` (text-xs, no big cards, no rotation). Reads as a credit ribbon, not a section.

## Section removals

- Remove `<VisualWorld />` (Ciara's World) from `Index.tsx`. Delete component file.
- Remove `<VideoSection />` (footage at bottom) from `Index.tsx`. Delete component file.
- Update `StickyNavCiara` links + `BookingFooter` link list to drop `WORLD` and `VIDEO`.

## Laylo integration (`LayloPlaceholder.tsx` → `LayloSection.tsx`)

- Use the supplied Laylo client subscribe token. Token is a client-scoped publishable key (`hasClientAccess: true`) — safe to ship in code, but still loaded from `siteConfig.laylo.token` so it's swappable.
- Inside the existing phone-screen mock, mount Laylo's official subscribe embed:
  - Inject `<script src="https://embed.laylo.com/laylo.js">` once on mount.
  - Render `<laylo-drop data-token="…" data-username="ciaragraves" data-background-color="transparent" />` inside the screen.
  - Iframe is forced transparent + `allowTransparency` per project rule so it blends with the cherry-noir screen.
- Set `siteConfig.laylo.enabled = true`, store token + username; remove the dashed placeholder block and the mailto fallback.
- Replace the static `dvd-bounce.mp4` reference: use the supplied DVD mp4 (`siteConfig.artist.dvdBounceUrl`) as a subtle looping background **inside** the Laylo phone screen behind the embed (low opacity, mix-blend-screen) so the section now uses Ciara's DVD video here instead of the hero.

## Socials section (`SocialLinks.tsx`)

- Replace the emoji glyphs with real brand logos:
  - SoundCloud: existing `src/components/icons/SoundCloudIcon.tsx`.
  - Add small inline SVG icon components for Audius, Instagram, TikTok in `src/components/icons/` (monochrome white, color via `currentColor`).
- Each social tile becomes: square card, brand SVG centered (cream → cherry-pink on hover), label below in mono, keeps the cherry drop-shadow stamp aesthetic.

## Booking footer (`BookingFooter.tsx`)

- Heading copy `Book Ciara Graves.` → `Contact.`
- Remove the `<DVDBounceLogo />` block beneath the burned-CD graphic.
- Remove the spinning conic-gradient + the top rainbow bar (covered above).
- Trim footer nav list to remove WORLD + VIDEO.

## Files touched (summary)

- Edit: `src/index.css` (token retune, logo filter), `src/config/siteConfig.ts` (laylo token + enabled), `src/pages/Index.tsx`, `src/components/ciara/HeroCiara.tsx`, `src/components/ciara/MusicFeed.tsx`, `src/components/ciara/BioSection.tsx`, `src/components/ciara/LayloPlaceholder.tsx` (rename internals), `src/components/ciara/SocialLinks.tsx`, `src/components/ciara/BookingFooter.tsx`, `src/components/ciara/StickyNavCiara.tsx`.
- Delete: `src/components/ciara/VisualWorld.tsx`, `src/components/ciara/VideoSection.tsx`, `src/components/ciara/Highlights.tsx`.
- Add: `src/components/icons/AudiusIcon.tsx`, `InstagramIcon.tsx`, `TikTokIcon.tsx`.

No backend, no schema, no edge-function changes.
