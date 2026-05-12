## 1. Fix SoundCloud + Audius logos

Replace the inaccurate hand-drawn paths in `src/components/icons/SoundCloudIcon.tsx` and `src/components/icons/AudiusIcon.tsx` with the **official brand SVG path data** pulled from each company's press kit:

- **SoundCloud**: official 5-bar waveform mark with cloud silhouette (the real shape, not a generic rising-bars + cloud).
- **Audius**: official "stacked chevron" mark (three nested triangles forming the A) — not a triangle-with-notch.

Both stay as `currentColor` single-path SVGs at 24×24 so the existing `text-cream`/hover styling keeps working. No other component changes needed since they're already wired up.

## 2. Background visualizers — Music / Bio / Shows / Find Me

Aesthetic chosen: **AI-generated lo-fi loops** combining audio waveform + VHS scanlines + particle dust, plus desaturated camcorder b-roll. One unique 5–10s seamless MP4 per section, all in cherry/noir palette so they read as one family.

Per-section direction:

| Section | Loop concept |
|---|---|
| Music (`MusicSection`) | Slow horizontal cherry-red audio waveform drifting left→right over noir, faint VHS scanlines, soft grain. Reads as "the music itself." |
| Bio (`BioSection`) | Heavily desaturated lo-fi camcorder b-roll — close-up hands on a mixer/turntable, shallow depth, occasional tracking glitch. Replaces the grey gradient that was just removed. |
| Shows (`ShowsSection`) | Camcorder POV through a dark crowd, red stage wash strobing slowly, scanlines + chromatic aberration. |
| Find Me Somewhere (`FindMeSection`) | Drifting white particle dust / dust motes on pure noir, very slow, almost still — quiet contrast to the other three. |

**Generation**: use `videogen--generate_video` (1080p, 16:9, 10s, `camera_fixed: true`) with cherry/noir prompts → save to `src/assets/viz-music.mp4`, `viz-bio.mp4`, `viz-shows.mp4`, `viz-findme.mp4`.

**Integration pattern** (reuses the existing Signal-section approach):
- Add a small `<SectionVisualizer src={...} />` component (absolute-positioned `<video autoplay muted loop playsinline>` with the existing force-play polling per memory rule, `opacity-20 mix-blend-screen`, behind content).
- Drop one into each of the four section components, behind their current content, above the section bg. Sections get `relative overflow-hidden` if not already.
- Register sources in `siteConfig.ts` under a new `visualizers` block so swaps are one-line.

## Technical notes

- Icons stay `currentColor` SVG; no raster, no new assets.
- Videos: H.264 MP4, ~2–4MB each at 10s 1080p; lazy via `preload="metadata"` and `IntersectionObserver`-gated play to keep mobile cheap.
- Respect `prefers-reduced-motion` → pause + show static poster frame.
- No backend, schema, or auth changes.

## Files touched

- `src/components/icons/SoundCloudIcon.tsx` — replace path
- `src/components/icons/AudiusIcon.tsx` — replace path
- `src/assets/viz-music.mp4`, `viz-bio.mp4`, `viz-shows.mp4`, `viz-findme.mp4` — new (videogen)
- `src/components/ciara/SectionVisualizer.tsx` — new shared component
- `src/components/ciara/MusicSection.tsx`, `BioSection.tsx`, `ShowsSection.tsx`, `FindMeSection.tsx` — wire visualizer
- `src/config/siteConfig.ts` — add `visualizers` block
