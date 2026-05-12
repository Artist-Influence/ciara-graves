## Copy deletions

### `src/components/ciara/HeroCiara.tsx`
- Remove the tagline `<p>"{siteConfig.artist.tagline}"</p>` block.
- Remove the entire **bottom marquee** `<div>` (with DUBSTEP / UK BASS / RETRO CLUB CULTURE / CHERRY NOIR items) and its `MarqueeTicker` import.

### `src/components/ciara/MusicFeed.tsx`
- Remove the `<p>bass from another room</p>` script caption under PRESS PLAY.
- Remove the duplicate "bass from another room" / similar lower script caption (line ~111) — keep only structural text.

### `src/components/ciara/LayloPlaceholder.tsx`
- Remove the `<h2>SIGNAL</h2>` title.
- Remove the `<p>no spam. just bass.</p>` line.

### `src/components/ciara/BioSection.tsx`
- Remove all four sticker entries from the `stickers` array (`🍒 sweet with bite`, `♠ lucky 7`, `📼 side B`, `📺 ch 07`) so the array is empty (the map renders nothing).

### `src/components/ciara/Shows.tsx`
- Change H2 from `CATCH ME LIVE.` to `Upcoming Shows`.

## Pink → red/white sweep
The "pink" reads come from `text-cherry-bright`. Convert text-only uses (keep all backgrounds, glows, borders, drop-shadows — they read as red):
- `BookingFooter.tsx` email link: `text-cherry-bright` → `text-cherry`.
- `Shows.tsx` SOLD OUT badge: `border-cherry-bright text-cherry-bright` → `border-cherry text-cherry`.
- `Shows.tsx` "join the list…" script line: `text-cherry-bright` → `text-cream`.
- `MusicFeed.tsx` "PLAY ↗" hover: `group-hover:text-cherry-bright` → `group-hover:text-cherry`.
- `MusicFeed.tsx` error line: `text-cherry-bright` → `text-cherry`.
- `LayloPlaceholder.tsx` `LAYLO_FEED // SUBSCRIBE` mono row: `text-cherry-bright` → `text-cream/60`.
- (Any other `text-cherry-bright` discovered during edit gets the same treatment: dark bg → `text-cream`, light/empty bg → `text-cherry`.)

Buttons/backgrounds using `bg-cherry-bright`, `border-cherry-bright`, `glow-cherry`, `shadow-[...cherry-bright...]` stay — they're brand red glows, not pink text.

## Move socials into the Contact footer

### `src/pages/Index.tsx`
- Remove `<SocialLinks />` and its import.

### `src/components/ciara/BookingFooter.tsx`
- Add a horizontal icon row above the bottom copyright bar (or alongside the EPK/Inquire CTAs — chosen placement: a compact row inside the left contact column, after the EPK/Inquire buttons and before the nav `<ul>`):
  - `SoundCloudIcon`, `AudiusIcon`, `InstagramIcon`, `TikTokIcon` from `@/components/icons/*`.
  - Each wrapped in an `<a target="_blank" rel="noopener noreferrer">` pulling URLs from `siteConfig.socials`.
  - Style: `w-6 h-6 text-cream-dim hover:text-cherry transition-colors`, gap-5, `aria-label` for each.

### Cleanup
- Delete `src/components/ciara/SocialLinks.tsx` (no longer referenced).
- Leave the `#socials` nav link in `BookingFooter` and `StickyNavCiara` pointing to `#contact` instead — update the two `href="#socials"` refs to `href="#contact"` so the nav still works.

## Out of scope
- No design system changes, no removal of brand cherry color tokens, no backend.
