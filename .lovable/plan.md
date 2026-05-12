## 1. Walkman → translucent red 90s cassette tape

Reskin the existing `Walkman` component in `src/components/ciara/BookingFooter.tsx` to read like the reference SONY FX cassette: clear-red translucent shell, two visible reels with red hubs and white spokes, dark tape window stripe across the middle, white "Title" label strip on the right, retro red palette + grain.

### Body
- Outer body switches from brushed-metal gradient to a **translucent red cassette shell**: layered radial + linear gradients of `hsl(354 90% 30%)` / `hsl(354 95% 18%)` with low-opacity highlights to fake plastic; subtle inner shadow for depth; rounded-md corners (cassette is squarer than walkman).
- Aspect ratio: shift from `aspect-[4/3]` to `aspect-[3/2]` so it reads as a tape, not a deck.
- Add a **grain overlay** using the existing `.grain` utility from `index.css` over the whole body.
- Faux **screw dots** in all four corners (4×4 px cream/30 circles) — classic cassette detail.

### Tape window
- Replace the inset rectangle with a **dark horizontal band** spanning ~55% of the body height, `bg-noir` with subtle `cherry/40` gradient at top/bottom edges to mimic the printed B-side label.
- Two reels remain (existing `Reel` component) but resized to take up the band's full height; spokes in `cream`, hubs in `cherry`, both still spin via `animate-spin-cd`.
- Between the reels: a vertical mono label rendered with `[writing-mode:vertical-rl]` reading `POSITION : NORMAL · TYPE I · CIARA GRAVES`, in `text-cream/60` `text-[7px]` — mimics the printed cassette text.
- A row of 5 small dots above and below the label (the IEC bias indicator dots in the reference) using `bg-cream/40` rounded-full.

### Right-side "Title" strip
- Add a vertical white label strip at the far right: `bg-cream w-6` running top-to-bottom with `[writing-mode:vertical-rl]` text `Title` in `text-noir/60 font-mono text-[8px]`. Mirrors the reference exactly.

### Top accents (kept from current Walkman, restyled)
- REC LED + `001` counter chip become smaller, sit only in the top-left corner (above the tape window), to leave room for the title strip on the right.
- Speaker grille accent removed (cassette doesn't have one).

### Controls
- Remove the play/stop control row entirely (a tape doesn't have controls — keeps the look honest and matches the reference). The cassette body becomes the whole visualizer.

## 2. Music section background — hyperrealistic red glass-cube grid

### Asset
- Generate a 1920×1080, ~6s seamless loop with `videogen--generate_video`, prompt: *"Hyper-realistic red glass mosaic tile wall, glossy translucent crimson cubes in a tight grid, slow drifting camera, dramatic specular highlights catching light, deep crimson reflections, cinematic, 90s music video aesthetic, slight film grain, ultra-detailed, looping"*. Save to `src/assets/viz-music.mp4` (overwrite current).
- If `videogen` isn't available, fallback: use `imagegen--generate_image` (premium) at 1920×1080 for a still image saved to `src/assets/viz-music.jpg`, and update the Music section to render an `<img>` instead of a `<video>` for that one slot.

### Wiring
- `siteConfig.ts` already imports `viz-music.mp4` directly — overwriting the file is enough; no code change needed.
- Bump opacity in `MusicFeed.tsx` from `opacity-25` to `opacity-40` so the red cubes register as a clear background, not just a wash.

## Out of scope
No layout changes elsewhere, no design system tokens, no other sections.
