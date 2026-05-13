## Use the uploaded SoundCloud logo asset directly

My SVG reproduction keeps drifting from the reference. The reliable fix is to use the user's uploaded PNG as the icon asset — guaranteed 1:1 match.

**Description of the reference**: A solid black silhouette. The left ~55% is a horizontal sequence of thin vertical lozenge bars (pointed top/bottom, like rice grains) ascending in height from a tiny sliver on the far left to nearly full height. The right ~45% is a single solid cloud shape: a tall flat-left edge, a rounded dome on top-left of the cloud, a smaller rounded bump on the upper-right, and a rounded right end — the bars and cloud both sit centered on the same horizontal midline. Crucially, the segmenting "lines" are only on the left half; the cloud body itself is one solid filled mass with no internal segmentation.

### Changes

1. Copy `user-uploads://image-7.png` → `src/assets/soundcloud-logo.png`.
2. Rewrite `src/components/icons/SoundCloudIcon.tsx` to render an `<img>` of that asset instead of inline SVG primitives:
   - `import logo from "@/assets/soundcloud-logo.png"`
   - Returns `<img src={logo} alt="" aria-hidden className={className} />` so existing sizing classes (`h-5 w-5`, etc.) keep working.
   - Add a CSS filter `style={{ filter: "brightness(0) invert(1)" }}` so the black PNG renders white to match the other footer icons; hover-glow purple drop-shadow already lives on the parent in `BookingFooter`, which still works on `<img>`.

### Out of scope

No changes to `BookingFooter`, layout, or other icons.