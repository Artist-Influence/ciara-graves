## Same treatment for the Audius icon

1. Copy `user-uploads://image-8.png` → `src/assets/audius-logo.png`.
2. Rewrite `src/components/icons/AudiusIcon.tsx` to render the PNG as a CSS mask on a `<span>` with `backgroundColor: currentColor`, identical pattern to the new `SoundCloudIcon` — so the icon inherits `text-cream-dim` / `hover:text-cherry` from `BookingFooter` and matches the other social icons' grey.

No changes to `BookingFooter` or any other file.