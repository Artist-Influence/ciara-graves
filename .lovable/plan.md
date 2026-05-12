## Logo swap (uploaded PNG)
- Copy `user-uploads://Ciara_Graves_Logo.png` → `src/assets/ciara-logo.png`.
- Update `src/config/siteConfig.ts`: change the import from `ciara-logo.svg` to `ciara-logo.png` so all logo usages (hero + sticky nav + footer) pick it up.
- Note: the PNG ships with a white square background. To make it read on the dark site without re-exporting the file, swap the existing `logo-cream` CSS class on the hero/nav `<img>` tags for a small inline treatment: `filter: invert(1)` + `mix-blend-mode: screen` (CSS), which drops the white background out and renders the oval+wordmark in white. Add a reusable utility `.logo-knockout` in `src/index.css` so both spots share the rule.

## EPK download
- Pull the file from Google Drive (`fileId 1wmBXbGzl3ClT2rieh8Ss3m2N-QupqnAI`) via the Drive connector and save it to `public/epk/Ciara-Graves-Biography-2026.pdf` (overwriting the existing placeholder). The current `siteConfig.booking.epkUrl` already points there, so the "Download EPK" button keeps working with no code change.

## Copy fix
- `siteConfig.artist.location`: `"WILMINGTON, DE / OUTSIDE PHILLY"` → `"WILMINGTON, DE"`. This updates the footer line that currently reads the long version.

## Hero gradient
- In `src/components/ciara/HeroCiara.tsx`, delete the tinted overlay div on line 24 (`bg-gradient-to-b from-noir/40 via-noir/30 to-noir`) so the hero video shows clean. Keep `vignette-cherry` and the bottom marquee for legibility around the CTAs.

## Files touched
- Add asset: `src/assets/ciara-logo.png`.
- Replace asset: `public/epk/Ciara-Graves-Biography-2026.pdf` (via Drive connector download).
- Edit: `src/config/siteConfig.ts`, `src/components/ciara/HeroCiara.tsx`, `src/components/ciara/StickyNavCiara.tsx`, `src/index.css`.
- No backend / schema changes.
