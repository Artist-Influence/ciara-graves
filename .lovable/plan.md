## 1. Music section visualizer — darker, conveyor-belt cube wall

**Asset (`src/assets/viz-music.mp4`)**: Regenerate via `videogen--generate_video`, 1080p, 10s, `camera_fixed: true`, 21:9. Prompt rewritten to lock in the conveyor look:

> "A dense seamless wall of hyper-realistic dark crimson glass cubes, tightly tiled like a mosaic, sliding steadily from right to left in a continuous horizontal conveyor-belt motion. Very dark deep blood-red, almost black, with subtle specular highlights catching low rim light. No camera movement, no zoom, only the cube wall translating sideways at constant speed. Cinematic, moody, 90s music-video grain, ultra-detailed, looping."

**Wiring (`MusicFeed.tsx`)**: Drop `SectionVisualizer` opacity from `opacity-40` back down to `opacity-25` so the inkier video reads as atmosphere, not foreground. No other code changes — `siteConfig.ts` already points at the asset.

## 2. Walkman — centered in contact section

**`src/components/ciara/BookingFooter.tsx`**: Restructure the footer's flex layout so the walkman sits centered below the contact block instead of floating to the right.

- Change the outer container from `flex flex-col sm:flex-row sm:items-center` to a vertical stack: `flex flex-col items-center text-center gap-12`.
- Wrap the contact text/socials/nav in a `max-w-2xl w-full` block (keep current internal layout, but center-align the inline rows: socials and CTA buttons get `justify-center`, nav `ul` gets `justify-center`).
- Walkman wrapper becomes `mx-auto` (drop `sm:self-end sm:ml-auto`).

No changes to the walkman component itself.

## 3. Audius icon — pending

You chose to re-upload the logo. Holding off on `AudiusIcon.tsx` until the new image comes through; once attached I'll trace the actual mark (stylized A with the offset slash/bars) and replace the path.

## Out of scope
No other sections, no design tokens, no backend changes.
