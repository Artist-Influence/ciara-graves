## Changes

### 1. `src/components/ciara/BookingFooter.tsx` — vinyl closer & larger
- Tighten gap on the flex row from `gap-10` to `gap-6 sm:gap-8` so the disc sits closer to the contact text.
- Bump disc size from `w-32 h-32 sm:w-36 sm:h-36` to `w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64`.
- Keep current spinning vinyl styling (grooves, sheen, cherry label, spindle, glow, `animate-spin-cd`).

### 2. `src/components/ciara/HeroCiara.tsx` — kill the moving dark overlay
- Remove the `vignette-cherry` class from the hero `<section>` (the dark radial-gradient ring darkening the edges over the video). Keep `grain` and `scanlines` for texture.
- If the user actually meant the animated grain, easy follow-up to drop `grain` too — but vignette is the dark gradient sitting on top of the video.

### 3. Shows section — swap in uploaded MP4
- Copy `user-uploads://CIARA_GRAVES02034220.mp4` → `src/assets/viz-shows.mp4` (overwrite existing).
- No code change needed — `siteConfig.ts` already imports `viz-shows.mp4.asset.json` and `Shows.tsx` renders it via `SectionVisualizer`. The asset pipeline will regenerate the JSON on copy.

## Out of scope
No backend, no design system, no other sections.
