## Changes

### 1. New bio/about photo
- Copy `user-uploads://10-DSC05962.jpeg` → `src/assets/ciara-portrait-boombox.jpg`
- In `src/config/siteConfig.ts`, switch `ciaraPortrait` import to the new file so `BioSection` picks it up automatically. (Keep old file in repo, just unreferenced.)

### 2. Harden Laylo embed (`src/components/ciara/LayloPlaceholder.tsx`)

Current issue: a single SDK script injection races with iframe mount and silently fails on some devices/browsers (mobile Safari, in-app webviews, or when the SDK was cached from a prior route). When the SDK doesn't bind, the iframe stays at its 1px collapsed default and the section looks empty.

Fixes:
- **Mount order:** inject the SDK script *after* the iframe is in the DOM (run effect after render, query for `#laylo-drop-${dropId}` first).
- **Force fresh SDK each mount:** remove any existing `embed.laylo.com/laylo-sdk.js` tag, then append a new one with a cache-busting query param so the SDK re-scans and binds.
- **Reserved space fallback:** give the iframe wrapper a real `min-height` (≈ 460px desktop, 520px mobile) so the section never collapses while the SDK is loading or if it fails entirely. Iframe itself keeps `width:100%` and `min-height` inline so even pre-SDK it's visible.
- **postMessage height listener (belt + suspenders):** add a `window.addEventListener('message', ...)` that listens for Laylo's height messages and applies them to the iframe directly. This makes sizing work even when the official SDK never executes (ad blockers, strict CSP, slow networks).
- **Visible fallback link:** under the iframe, add a small "Open on Laylo →" link to `https://laylo.com/ciaragraves` (or the drop URL) so users on browsers where the iframe is blocked still have a path to subscribe.
- **Cleanup:** remove the message listener on unmount.

No changes to siteConfig Laylo entries.

### 3. Remove SIGNAL from top header (`src/components/ciara/StickyNavCiara.tsx`)
- Delete the `{ href: "#signal", label: "SIGNAL" }` entry from the `links` array. Section + footer "UPDATES" link still work; only the nav item is gone (desktop and mobile menu both update from the same array).

## Out of scope
- No backend/data changes.
- No restyle of the embed frame itself beyond the min-height.
