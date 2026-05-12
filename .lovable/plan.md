## Problem

The current `LayloPlaceholder` aggressively removes and re-injects the Laylo SDK on every mount with a cache-busting query string. In React 18 StrictMode (and on route re-renders), this fires twice and the second injection can race with the SDK's internal state, leaving the iframe empty. The iframe wrapper still reserves space, so the section shows as a hollow box — exactly what the screenshot shows.

## Fix (`src/components/ciara/LayloPlaceholder.tsx`)

Rewrite using the official Laylo embed pattern, hardened minimally:

1. **Load SDK once, globally.** On mount, check if a `script[src*="embed.laylo.com/laylo-sdk.js"]` already exists. If yes, do nothing. If no, append it once (no cache-buster, no removal). This matches Laylo's documented snippet and avoids re-init races.
2. **Render iframe via JSX** (not `dangerouslySetInnerHTML`) with a stable `id`, `src`, and inline styles matching Laylo's official snippet (`width:1px; min-width:100%; max-width:1000px; min-height:460px`).
3. **Keep the postMessage height fallback** but tighten origin check (`https://embed.laylo.com`) and only handle numeric `height` values.
4. **Keep wrapper `min-h-[520px] sm:min-h-[460px]`** so layout never collapses.
5. **Keep "Open on Laylo →" fallback link.**
6. **Trigger SDK re-scan if already loaded.** If the script tag exists and `window.laylo` is defined, call `window.laylo?.init?.()` (no-op if undefined) so a client-side route change still binds the new iframe.

## Out of scope

- No changes to `siteConfig.laylo` (dropId, color, theme).
- No layout/styling changes beyond what's above.
- No changes to other components.
