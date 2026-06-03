Add a Spotify social icon across the site, linking to the provided artist profile.

## Changes

1. **Create `src/components/icons/SpotifyIcon.tsx`**
   - New reusable SVG icon component (extract from the inline `SpotifyIcon` in `PlatformButton.tsx`).

2. **Update `src/config/siteConfig.ts`**
   - Change `spotify: { enabled: false, url: "" }` to a plain string URL: `spotify: "https://open.spotify.com/artist/2wYCS3DnZgyxDzfwDEj9Rm?si=v6Ye4o03Qiy_HNDKWNAXqA"`.

3. **Update `src/components/ciara/BookingFooter.tsx`**
   - Import `SpotifyIcon` from `@/components/icons/SpotifyIcon`.
   - Add `{ href: "spotify", label: "Spotify", Icon: SpotifyIcon }` to the `socialItems` array so it appears in the footer social links.

4. **Update `src/components/ciara/MusicFeed.tsx`**
   - Replace the conditional `siteConfig.socials.spotify.enabled && siteConfig.socials.spotify.url` check with a direct `siteConfig.socials.spotify` reference (now a string), adding a `StreamPill` for Spotify.

5. **Update `src/components/PlatformButton.tsx`**
   - Replace the inline `SpotifyIcon` with an import from the new `SpotifyIcon` component.