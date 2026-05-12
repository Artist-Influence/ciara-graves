## Goal
In the Contact footer, replace the round CD/logo medallion with a compact **spinning vinyl record** anchored to the **right side** of the contact block at all breakpoints (no stacking underneath).

## Changes — `src/components/ciara/BookingFooter.tsx`

1. **Layout — keep it side-by-side, more compact**
   - Change the outer grid from `lg:grid-cols-3` (which stacks on mobile) to a flex row that holds together earlier:
     - `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8`
   - Left: contact copy (email, CTAs, nav list).
   - Right: the spinning record, sized down to ~`w-32 h-32 sm:w-36 sm:h-36` (was `w-48 h-48`) so it reads as an accent, not a feature block.
   - Drop the `BURN_001 · CIARA GRAVES` caption under the disc (it added vertical bulk); keep the disc clean.

2. **Spinning vinyl record** (replaces the current radial-gradient medallion)
   - Outer disc: black vinyl with concentric grooves rendered via `repeating-radial-gradient` of subtle `hsl(var(--cream)/0.05)` rings on a near-black base.
   - Light sheen: a soft conic-gradient highlight overlay at low opacity for that "rotating reflection" feel.
   - Center label: cherry-red circle (~38% of disc), with the FILTHY/Ciara logo (`siteConfig.artist.logoUrl`) centered using the existing `logo-knockout` filter, scaled small.
   - Spindle hole: tiny `bg-noir` dot in the dead center.
   - Animation: reuse the existing `animate-spin-cd` utility (already defined in `index.css` as an 8s linear infinite spin) on the whole disc. Center label spins with the disc (authentic record behavior).
   - Add a soft `glow-cherry` ring around the disc edge for brand cohesion.

3. **Responsive behavior**
   - At `<sm`: record sits to the right of stacked content via `flex-row` with the text taking remaining width — or, if too tight on narrow phones, allow it to drop to a right-aligned position above the nav list. Final call: keep `flex-col sm:flex-row` so on the smallest phones it stacks (record on top, right-aligned), but on ≥640px it sits compactly to the right of the contact text. This matches the user's "not under" intent for the desktop/tablet view they're previewing (898px).

## Out of scope
- No new assets, no animation library, no config changes.
- No edits to other sections or the design system (the `animate-spin-cd` keyframe already exists).
