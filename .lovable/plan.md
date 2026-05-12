1. Refine the Laylo section sizing
- Reduce the embedded frame to a tighter responsive height instead of the current fixed 380px.
- Keep the frame width behavior intact so the embed still renders reliably across browsers.
- Trim any unnecessary vertical padding inside the Laylo card so the bottom edge lands much closer to the Laylo logo/buttons area shown in your reference.

2. Tighten the surrounding section spacing
- Reduce top/bottom section padding and the gap before the “Open on Laylo” link so the whole block feels compact.
- Preserve the existing visual style, border treatment, and alignment.

3. Validate against the live preview
- Check the updated section on desktop and a smaller mobile-sized viewport.
- Confirm the embed still appears correctly and that the excess empty space below the form is gone.

Technical details
- Update `src/components/ciara/LayloPlaceholder.tsx` only.
- Focus on the iframe height, wrapper spacing, and section spacing without changing unrelated layout or behavior.