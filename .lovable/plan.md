## Issue
The new MP4 is on disk at `src/assets/viz-shows.mp4` but `viz-shows.mp4.asset.json` still points to the old AI-generated upload URL (`/__l5e/assets-v1/24884f57-.../viz-shows.mp4`), so `Shows.tsx` keeps rendering the old clip.

## Changes

### 1. `src/config/siteConfig.ts` — import the local MP4 directly
- Replace `import vizShows from "@/assets/viz-shows.mp4.asset.json"` with `import vizShows from "@/assets/viz-shows.mp4"`.
- Update the `visualizers.shows` entry from `vizShows.url` to `vizShows` (Vite returns the bundled URL string).

### 2. `src/components/ciara/Shows.tsx` — copy update
- Change the H2 from `CATCH HER LIVE.` to `CATCH ME LIVE.`

### 3. Cleanup
- Delete `src/assets/viz-shows.mp4.asset.json` (no longer referenced).

## Out of scope
No changes to other visualizers, layout, or backend.
