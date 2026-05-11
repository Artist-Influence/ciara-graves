# Memory: index.md
Updated: just now

# Project Memory

## Core
- Project is **PIERCE Official** artist site (rebranded from Kluster Flux base).
- Config in `src/config/siteConfig.ts`; music stored in Supabase `releases` table; synced via `fetch-spotify-releases` edge function.
- Brand: PIERCE white logo at `src/assets/pierce-logo-white.png`. Press photo at `src/assets/pierce-press-photo.jpg`.
- Design tokens: near-black bg, electric signal blue accent, Anton display + Inter body + JetBrains Mono. All HSL.
- Buttons: use `SignalButton` / `SignalLink` (variants: primary, signal, ghost). No rounded corners, mono uppercase.
- Visual primitives: `ScanlineOverlay`, `GridBackdrop`, `CornerBrackets`, `SystemLabel`, `GlitchText`, `MarqueeTicker`.
- Bandsintown: artistId `PIERCE`, app_id `PIERCE_OFFICIAL`. Spotify artist `1sg7LKlpfKmZSvI0xxqNWC`. SC RSS user 639237.
- Sole booking contact: `booking@pierce.official` (placeholder until user updates).
- Forbidden: developer credits/watermarks in footer.
- Laylo iframes: must have transparent background & allowTransparency.
- Page sections live in `src/components/pierce/`. Root route renders `src/pages/Pierce.tsx`.

## Memories
- [Branding](mem://style/branding) — Kluster Flux (legacy). Superseded by core rules above.
- [Contact](mem://contact/management) — legacy; PIERCE booking is `booking@pierce.official`.
- [Integrations](mem://features/external-integrations) — Bandsintown + Laylo configuration patterns.
