## Root cause of the remaining pink
`--toxic` is defined in `src/index.css` as `340 95% 70%` (literally bright pink — the comment even says "cherry pink accent"). It powers `text-toxic`, `bg-toxic`, `border-toxic`, `glow-toxic`, and the equalizer bars (which default to `text-toxic`). Repointing the token fixes every "pink" instance across the site in one shot.

## Changes

### 1. `src/index.css` — repoint pink tokens to red
- `--toxic: 340 95% 70%` → `--toxic: 354 92% 55%` (matches cherry-bright red).
- `--toxic-glow: 335 100% 78%` → `--toxic-glow: 354 100% 65%` (red glow, no pink).
- Update inline comments from "cherry pink accent" to "red accent (was pink)".

This automatically fixes:
- Equalizer bars in the hero
- All `text-toxic` chips/labels (▍ BOOKING, ▍ HOTLINE, ▍ BIO, etc.)
- Tickets button (`bg-toxic`)
- Hover states on nav + footer links
- DVDBounceLogo `logo-toxic glow-toxic`
- Walkman counter chip `text-toxic/80`

No component edits needed — the token swap propagates.

### 2. Music section visualizer — swap to uploaded MP4
- Copy `user-uploads://IMG_7885.mp4` → `src/assets/viz-music.mp4` (overwrite).
- Update `src/config/siteConfig.ts`: change `import vizMusic from "@/assets/viz-music.mp4.asset.json"` to `import vizMusic from "@/assets/viz-music.mp4"`, and `music: vizMusic.url` → `music: vizMusic` (same pattern we just used for shows, since `.asset.json` pins to the original AI-generated upload).
- Delete `src/assets/viz-music.mp4.asset.json`.

## Out of scope
No layout changes, no other section edits, no backend.
