Goal: keep the current tightened spacing and make the Laylo embed reliably load on every device/browser (iOS Safari, Android Chrome, desktop Safari/Chrome/Firefox, in-app webviews).

1. Harden the iframe so it always renders
- Always render the iframe directly with the full embed URL (already the case) — never depend on the SDK to inject it.
- Use a stable `src` (no key remounts) and add `loading="eager"` so it begins fetching immediately on mount, plus `referrerPolicy="no-referrer-when-downgrade"` for reCAPTCHA compatibility.
- Keep `allowTransparency`, transparent background, and the locked 240px height (preserves current spacing).
- Add `sandbox` permissions broad enough for Laylo + reCAPTCHA (`allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox`) so strict browsers don't block submission.
- Add `allow="web-share; clipboard-write"` to satisfy newer permission policies.

2. Make the SDK loader resilient
- Load `https://embed.laylo.com/laylo-sdk.js` once, but treat it as optional — the iframe must work even if the SDK fails (ad blockers, offline, CSP).
- Use `crossOrigin="anonymous"` and an `onerror` handler that silently no-ops (no console noise, no broken UI).
- Re-call `window.laylo.init()` on mount if the SDK is already present (covers SPA navigation back to the section).

3. Provide a graceful fallback if the iframe fails
- Detect iframe load failure with an `onLoad` timeout (e.g., if no load event fires within ~6s) and reveal an inline fallback CTA that links to `https://laylo.com/ciaragraves` styled to match the card.
- Keep the existing "Open on Laylo →" link below the card for users who prefer the native page.

4. Cross-browser/device validation
- Test in the preview at desktop (current viewport) and a phone viewport (390x844) to confirm the embed loads, the form is interactive, and spacing stays tight.
- Confirm no horizontal scroll is introduced on narrow screens.
- Spot-check console/network for blocked requests to `embed.laylo.com` or Google reCAPTCHA.

Out of scope: changing Laylo content, theme, or dropId; touching other sections; adding postMessage-based auto-resize (we keep the fixed 240px height to preserve the agreed spacing).

Files to change: `src/components/ciara/LayloPlaceholder.tsx` only.