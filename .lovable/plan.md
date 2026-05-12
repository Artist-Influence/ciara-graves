## Problem

The Laylo iframe is still rendering ~880px tall with a huge black void below the form. The postMessage listener isn't catching Laylo's resize events (their SDK either doesn't post height for this drop type, or uses a shape we don't recognize), so the iframe never shrinks.

## Fix

Stop trying to auto-size and just lock the iframe to a compact, content-correct height. The Laylo subscribe form is a fixed-size widget — the form, fine print, Laylo logo, and "Make a Drop like this" link fit comfortably in ~340px.

### `src/components/ciara/LayloPlaceholder.tsx`

1. Set the iframe to a fixed `height: 360px` (mobile may need slightly more for stacked phone country picker — use `height: 380px` on `<sm` via inline style + a small responsive tweak, or simply use `380px` everywhere as a safe constant). Drop `minHeight` entirely.
2. Remove the postMessage listener and resize logic — it's not firing reliably and is the source of the bloat when it does fire with bad numbers.
3. Keep the SDK single-load logic and "Open on Laylo →" fallback link.
4. Keep section padding `py-16 sm:py-24` and frame padding `p-3 sm:p-5`.

### Result

Section ends cleanly right below the "Make a Drop like this" row, matching the user's screenshot expectation. Identical height across devices/browsers — no dependency on cross-origin messages.

## Out of scope

- No changes to Laylo content (cross-origin).
- No other sections touched.
