## Bio section background
- In `BioSection.tsx`, remove the animated `grain` class from the portrait frame (this is the moving greyish noise overlay that reads as a shifting grey gradient behind the bio area). Keep `scanlines` for static CRT texture.
- If the effect persists from a parent, also drop any `grain` usage inside the section wrapper. No changes to the global `.grain` keyframes (still used elsewhere).

## Laylo embed (use the provided iframe)
- Update `LayloPlaceholder.tsx`:
  - Swap the script src from `embed.laylo.com/laylo.js` to `https://embed.laylo.com/laylo-sdk.js`.
  - Replace the `<laylo-drop>` custom element with the official iframe:
    ```html
    <iframe id="laylo-drop-evpf7" frameborder="0" scrolling="no" allow="web-share"
      allowtransparency="true"
      style="width:1px;min-width:100%;max-width:1000px;background:transparent"
      src="https://embed.laylo.com?dropId={dropId}&color={color}&minimal=false&theme=light"></iframe>
    ```
  - Pull `dropId` from `siteConfig.laylo.dropId` so it stays swappable.
- Update `siteConfig.laylo` to: `{ enabled: true, dropId: "evpf7", color: "F74B27", theme: "light" }`. Remove the now-unused JWT `token` and `username` fields.

## Social icons (Audius + SoundCloud)
- Rewrite `src/components/icons/AudiusIcon.tsx` to match the uploaded reference: solid triangular "A" with a smaller triangular notch cut out near the bottom-center (single white shape on transparent bg, `fill="currentColor"`, `viewBox="0 0 24 24"`).
- Rewrite `src/components/icons/SoundCloudIcon.tsx` to match the uploaded reference: the classic SoundCloud waveform-bars-into-cloud silhouette (single-color path, `fill="currentColor"`, `viewBox="0 0 24 24"`), replacing the current inaccurate path.
- No changes to `SocialLinks.tsx` — the new icons drop in via `currentColor`.

## Files touched
- Edit: `src/components/ciara/BioSection.tsx`, `src/components/ciara/LayloPlaceholder.tsx`, `src/config/siteConfig.ts`, `src/components/icons/AudiusIcon.tsx`, `src/components/icons/SoundCloudIcon.tsx`.
- No backend, schema, or routing changes.
