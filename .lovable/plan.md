## 1. Remove the walkman from contact section

`src/components/ciara/BookingFooter.tsx`: Delete the `Reel` and `Walkman` components and the `<Walkman />` render block. Simplify the footer container back to a single centered column (`flex flex-col items-center text-center`) holding only contact text, CTAs, socials, and nav.

## 2. Use the new vertical visualizer for About + Laylo backgrounds

Copy uploaded `Logo_DVD_Bounce-3.MP4` into `src/assets/viz-vertical.mp4` and wire it into both sections.

- `src/config/siteConfig.ts`: Import `vizVertical from "@/assets/viz-vertical.mp4"`. Add `visualizers.vertical = vizVertical`. Also point `siteConfig.laylo.bgVideoUrl` at the same import (replacing `layloBgVideo`).
- `src/components/ciara/BioSection.tsx`: Swap `src={visualizers.bio}` → `src={visualizers.vertical}`. Bump opacity from `opacity-15` to `opacity-25` so the tall visualizer reads.
- `src/components/ciara/LayloPlaceholder.tsx`: Already reads `siteConfig.laylo.bgVideoUrl`, so it auto-picks up the new asset. Keep current `opacity-25 mix-blend-screen`.

The video is portrait so `object-cover` will fill the tall sections naturally without distortion.

## 3. Audius icon — new path

`src/components/icons/AudiusIcon.tsx`: Replace the path with the official Audius mark — a rounded-corner triangle with a small inverted-triangle "doorway" cutout at the bottom-center (the negative space that gives the A its silhouette). Single SVG path, `currentColor` fill, `evenodd` fill-rule, `viewBox="0 0 24 24"`, no stroke (the current stroke is what makes it look like a plain triangle).

Approximate path: outer rounded triangle `M12 3 C 12.6 3 13.1 3.3 13.5 3.9 L21.6 18.6 C 22 19.3 22 20.1 21.6 20.7 C 21.2 21.4 20.5 21.7 19.8 21.7 L4.2 21.7 C 3.5 21.7 2.8 21.4 2.4 20.7 C 2 20.1 2 19.3 2.4 18.6 L10.5 3.9 C 10.9 3.3 11.4 3 12 3 Z` + inner cutout (small upward-pointing notch) `M9.5 18.5 L14.5 18.5 L12 14 Z`. Tuned so the cutout reads as the A's "leg gap".

## Out of scope
No other section changes, no design tokens, no backend.
