## Hero (`HeroCiara.tsx`)
- Location chip → `▍ WILMINGTON, DE ▍` (add closing bar to mirror the leading one).
- Replace CTAs with: `▶ Listen` (#music), `◆ Shows` (#shows), `✦ Signal` (#signal), `✉ Contact` (#contact). Keep existing button styles; route the new Signal button to the Laylo section and rename "Book Ciara" → "Contact" pointing at the booking footer anchor.

## Logo
- Copy `user-uploads://CIARA_GRAVES_LOGO_-Artboard_2.svg` → `src/assets/ciara-logo.svg` (overwrite). Existing `siteConfig.artist.logoUrl` import already points there, so the hero + nav update automatically.

## Laylo section (`LayloPlaceholder.tsx`)
- Drop the entire phone-mockup column. Layout becomes a single centered column inside the existing section.
- Keep only: the `SIGNAL` headline, the Laylo iframe embed, and the `no spam. just bass.` script line beneath it. Remove DIRECT_LINE label, secondary copy, "text me…" line, status bar, notch, equalizer dashes.
- Re-skin the embed to fit the cherry-noir aesthetic:
  - Switch Laylo URL params to `theme=dark` and `color=F12C42` (cherry-bright hex). Update `siteConfig.laylo.color` + `theme` accordingly.
  - Wrap the iframe in a cherry-bordered cassette-style frame: `border border-cherry/60 bg-noir clip-notch shadow-[0_0_40px_hsl(var(--cherry)/0.4)]`, padded, with corner brackets + a top mono label `▍ LAYLO_FEED // SUBSCRIBE`.
  - Iframe stays `allowtransparency` + transparent bg per project rule, max-width ~520px, centered.
- Background visualizer: copy `user-uploads://Logo_DVD_Bounce-2.MP4` → `src/assets/laylo-bg.mp4`. Add a fixed full-bleed `<video>` inside the section as a low-opacity (~25%), `mix-blend-screen` background behind the content (autoplay/muted/loop/playsInline). Replace the current DVD bg that lived inside the phone screen.
- Section keeps `id="signal"` so the new hero CTA scrolls correctly.

## Files touched
- Edit: `src/components/ciara/HeroCiara.tsx`, `src/components/ciara/LayloPlaceholder.tsx`, `src/config/siteConfig.ts`.
- Replace asset: `src/assets/ciara-logo.svg`.
- Add asset: `src/assets/laylo-bg.mp4` (+ import in `siteConfig` as `laylo.bgVideoUrl`).
- No backend or schema changes.
