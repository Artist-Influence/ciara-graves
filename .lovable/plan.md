## Problem

The Laylo iframe is rendering its content (form + Laylo footer) in the top ~240px, but the iframe itself is locked to ~880px tall because:

1. `min-height: 460px` is hard-coded inline on the iframe.
2. The wrapper div has `min-h-[460px] sm:min-h-[520px]`.
3. Laylo's SDK isn't posting a `setHeight` message that our listener recognizes (origin or shape mismatch), so the iframe never shrinks to fit content.

Result: huge empty black space below the "Make a Drop like this" row.

## Fix (`src/components/ciara/LayloPlaceholder.tsx`)

1. **Drop the wrapper `min-h-*` classes** — let the iframe define its own height.
2. **Lower iframe `minHeight` to a small placeholder** (e.g. `220px`) so the section reserves a little space while loading but doesn't bloat once the SDK reports actual height.
3. **Broaden the postMessage listener** to accept both `https://embed.laylo.com` and `https://laylo.com` origins, and to handle Laylo's actual message shapes (`{ type: 'setHeight'|'resize', height }`, `{ event: 'resize', height }`, or numeric `data.height` / `data.payload.height`). Apply the height by setting `iframe.style.height` only (not `minHeight`), so subsequent shrink messages work.
4. **Also handle the case where Laylo posts the iframe element id**: only resize the iframe whose id matches `iframeId` when the message includes one; otherwise resize ours unconditionally (single embed on page).
5. Keep the SDK single-load logic and the "Open on Laylo →" fallback link unchanged.

## Spacing pass on the surrounding section

- Reduce `<section>` padding from `py-24 sm:py-32` to `py-16 sm:py-24` so the SIGNAL block doesn't feel oversized relative to the now-correct iframe height.
- Tighten internal frame padding from `p-4 sm:p-6` to `p-3 sm:p-5`.
- Tighten the `mt-4` on the fallback link to `mt-3`.

## Out of scope

- No styling/copy changes inside the Laylo iframe itself (we can't — cross-origin).
- No changes to other sections or `siteConfig`.
