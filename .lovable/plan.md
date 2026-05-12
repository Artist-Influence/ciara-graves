## Problem

On first load, the hero shows Ciara's portrait (used as the `<video poster>`) before the background video starts playing, making it look like the site loaded to a static photo. The existing `LoadingScreen` component is never mounted.

## Plan

**1. `src/pages/Index.tsx`** — Wire up the loading screen.
- Add local `isLoading` state (default `true`).
- Wrap the page in `<AnimatePresence>` from framer-motion.
- Render `<LoadingScreen />` while `isLoading`, then the main content.
- Hide loader as soon as the site is interactive: dismiss on `window` `load` event, with a hard fallback timeout (~1.2s) so slow video assets never block reveal. Minimum visible time ~600ms so the brand logo doesn't just flash.
- Once hidden, the full site is shown immediately (don't wait on hero video).

**2. `src/components/ciara/HeroCiara.tsx`** — Stop the portrait flash.
- Remove the `poster={siteConfig.artist.portraitUrl}` from the hero `<video>` so the portrait never appears as the first paint behind the loader or as a fallback.
- Keep `preload="metadata"`, autoplay, muted, loop, playsInline as-is. Background falls back to the dark `bg-noir` body color until the video frame paints.

**3. `src/components/LoadingScreen.tsx`** — No structural change needed; it already uses the FILTHY `BrandLogo` with a pulse animation and dark background. Confirm it sits at `z-50` above all content (already does).

## Behavior after change

- Page mounts → dark background + centered pulsing FILTHY logo.
- Within ~600ms–1.2s, loader fades out (framer-motion `exit`), revealing the full site with hero video already loading in the background.
- No more portrait-photo flash.
