## Recreate SoundCloud icon to match reference

Replace the simplified `SoundCloudIcon` SVG in `src/components/icons/SoundCloudIcon.tsx` with a faithful 1:1 reproduction of the reference logo: ~15 thin vertical bars of varying heights (smallest on far left, gradually taller toward center) ascending into a solid filled cloud silhouette on the right.

**Implementation in `src/components/icons/SoundCloudIcon.tsx`**:
- Keep the component API: `({ className })`, `fill="currentColor"`, `aria-hidden`.
- New `viewBox="0 0 512 320"` to match the reference's roughly 16:10 footprint.
- Replace the rounded rectangles with ~15 thin lozenge/capsule-shaped bars (very narrow width, rounded caps) using `<rect rx>` or path lozenges, with heights ramping up smoothly from far left to where the cloud begins.
- Cloud silhouette as a single filled path: large rounded body on the left of the cloud blob, with a smaller rounded "puff" rising up on the upper-right (matching the reference's two-bump cloud shape), bottom edge flat-ish, sitting flush with the bar baseline.
- Bars and cloud share `currentColor` so existing white/hover-glow styling continues to work in `BookingFooter`.

**Out of scope**: changing where the icon is used, hover styles, layout, or any other component.