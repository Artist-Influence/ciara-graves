## Goal
Replace the spinning vinyl in the Contact footer with an animated **Walkman cassette player** sitting tight against the right side of the contact text.

## Changes — `src/components/ciara/BookingFooter.tsx`

### 1. Layout — pull it closer, keep it right-aligned
- Outer flex stays `flex-col sm:flex-row sm:items-center` but tighten gap further: `gap-4 sm:gap-6`.
- Right block: `shrink-0 self-center sm:self-end sm:ml-auto` so the Walkman hugs the right edge while the contact column keeps its natural width.

### 2. Walkman component (inline, pure CSS/Tailwind, no new files/libs)
A stylized 80s/90s portable cassette deck rendered with divs:
- **Body**: rounded rectangle ~`w-56 sm:w-64 lg:w-72`, `aspect-[4/3]`, dark brushed-metal feel via `bg-gradient-to-br from-noir to-[hsl(0_0%_12%)]`, `border border-cream/15`, `rounded-xl`, soft outer shadow + faint `glow-cherry`.
- **Top bar**: thin strip with cherry LED dot (pulsing via `animate-pulse`), small "REC" mono label, and a tape-counter window showing `001` in cream-dim mono.
- **Tape window**: inset rounded rect (`bg-noir/80`, inner shadow) holding two reels.
  - Two **reels** side-by-side: circles (~22% body width) with concentric groove gradients (`repeating-radial-gradient`) and 6 spoke notches; both reels spin via the existing `animate-spin-cd` (8s linear infinite).
  - **Tape ribbon**: thin cream/40 horizontal line connecting reel hubs, with a subtle dip (CSS `border-radius` trick or two stacked divs) to imply slack.
  - Tiny FILTHY logo watermark (`siteConfig.artist.logoUrl` with `logo-knockout`, `opacity-30`) centered between reels.
- **Control row** (below window): five small pill buttons in mono caps — `◀◀  ▶  ❚❚  ■  ▶▶`. The play button (`▶`) is `bg-cherry text-cream`, others `bg-noir border border-cream/20 text-cream-dim`.
- **Side accent**: faux speaker grille on the right of the body using a small repeating-linear-gradient column.

### 3. Animation polish
- Reels: `animate-spin-cd` (already in `index.css`).
- LED: `animate-pulse` on the cherry dot.
- Body: very subtle `hover:rotate-[-1deg] transition-transform duration-500` for tactile feel.
- Respects `prefers-reduced-motion` automatically because we rely on existing utilities.

### 4. Cleanup
- Remove the entire vinyl disc block (`w-48 h-48 ... rounded-full animate-spin-cd ...`) and replace with the Walkman markup above.

## Out of scope
- No new dependencies, no asset files, no other sections, no design system changes.
