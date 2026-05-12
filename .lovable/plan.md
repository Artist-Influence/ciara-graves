## Fix
Replace the current `AudiusIcon.tsx` (three stacked chevrons — wrong shape) with the actual Audius mark: a **single rounded-corner triangle pointing up, with a small inverted-triangle notch cut out of the bottom-left edge** (forming the "A" foot).

## Changes — `src/components/icons/AudiusIcon.tsx`
- Rewrite the SVG as one path on a `0 0 24 24` viewBox using `currentColor` fill so it inherits the parent text color (keeps Walkman/footer recoloring intact).
- Outer shape: equilateral-ish triangle with apex near `(12, 2.5)`, base from `(2.5, 21)` to `(21.5, 21)`, all three corners softened with arc segments (~`r=2`).
- Cutout: a small inverted triangle notched out of the lower-left side around the `(7.5, 18)` region, also with rounded corners (~`r=0.8`), authored with the `evenodd` fill rule so the inner triangle subtracts from the outer.
- Keep the component API identical (`{ className }` prop, default export) so no other files need changes.

## Out of scope
No other icons, no design tokens, no layout.
