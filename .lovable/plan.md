## Problem

The Laylo embed area renders the cherry-noir frame and `LAYLO_FEED // SUBSCRIBE` header, but the iframe body is empty/collapsed. The Laylo SDK script (`embed.laylo.com/laylo-sdk.js`) is responsible for posting a height message to the iframe; without it the iframe stays at its tiny default size and looks blank.

Root cause: the SDK is loaded once and attaches its `message`/iframe listeners at script execute time. When `LoadingScreen` was added, the `LayloPlaceholder` mounts later (after loader hides). On subsequent renders / fast nav the cached SDK doesn't re-scan and the new `laylo-drop-evpf7` iframe is never wired up, so it never receives its sizing/content payload.

## Fix

**`src/components/ciara/LayloPlaceholder.tsx`** — make the SDK re-initialize whenever this component mounts:
- Always remove any existing `embed.laylo.com/laylo-sdk.js` script tag on mount, then re-append a fresh one. This forces the SDK to re-scan the DOM and bind to the current `laylo-drop-${dropId}` iframe.
- Add a sensible minimum height to the iframe wrapper (e.g. `min-h-[420px]`) so even before the SDK posts its size, the embed area is visibly reserved (no more "disappeared" look on slow loads).
- Keep the existing markup, frame, and styling. No siteConfig changes.

## Behavior after change

- Loader hides → Laylo section mounts → SDK script is (re)injected → iframe receives its content + height → embed renders normally inside the cherry-noir frame.
- Even on a slow Laylo response, the framed area holds its space instead of collapsing.
