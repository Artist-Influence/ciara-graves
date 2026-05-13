## Make SoundCloud icon inherit `currentColor` like the other socials

Other icons (`AudiusIcon`, `InstagramIcon`, `TikTokIcon`) are inline SVGs filled with `currentColor`, so the parent's `text-cream-dim` (and `hover:text-cherry`) classes color them. The current `<img>` + `brightness(0) invert(1)` filter forces pure white, breaking that contract.

### Fix

Rewrite `src/components/icons/SoundCloudIcon.tsx` to render the PNG as a **CSS mask** on a `<span>` whose `backgroundColor` is `currentColor`. This way the icon's color comes from the surrounding text color (same `text-cream-dim → hover:text-cherry` behavior as the others), perfectly matching the grey of the other social icons.

```tsx
import logo from "@/assets/soundcloud-logo.png";

const SoundCloudIcon = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={className}
    style={{
      display: "inline-block",
      backgroundColor: "currentColor",
      WebkitMaskImage: `url(${logo})`,
      maskImage: `url(${logo})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);
export default SoundCloudIcon;
```

No changes to `BookingFooter` — the existing `w-6 h-6` and `text-cream-dim hover:text-cherry` classes now drive the SoundCloud icon's color/sizing identically to the other icons.