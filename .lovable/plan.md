## Goal
Stretch the vertical CD-bounce visualizer as ONE continuous background covering both the Laylo (`#signal`) and About (`#about`) sections, instead of playing two separate copies.

## Approach
Wrap both sections in a shared positioned container in `src/pages/Index.tsx` that owns the single `<video>` background, and strip the per-section visualizer/background from each child.

### `src/pages/Index.tsx`
Replace the bare `<LayloPlaceholder />` + `<BioSection />` with a wrapper:

```tsx
<div className="relative">
  <SectionVisualizer
    src={visualizers.vertical}
    opacity="opacity-25"
    className="!fixed-none"
  />
  {/* dark overlay for readability across the combined area */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80 z-[1]" />
  <div className="relative z-[2]">
    <LayloPlaceholder />
    <BioSection />
  </div>
</div>
```

`SectionVisualizer` already uses `absolute inset-0 w-full h-full object-cover`, so when its parent spans both sections it stretches across the full combined height as one element.

### `src/components/ciara/LayloPlaceholder.tsx`
Remove the local `<video>` background and the `bg-gradient-to-b … noir` overlay (lines ~28–38). Section keeps its `relative` positioning and inner content; background now comes from the wrapper.

### `src/components/ciara/BioSection.tsx`
Remove the `<SectionVisualizer src={visualizers.vertical} … />` line. Section keeps `relative … overflow-hidden` so its z-indexed content still layers above the shared background.

### Borders
Keep `border-t border-cherry/20` on each section so the visual seam between them stays.

## Out of scope
No changes to other sections, design tokens, or backend.
