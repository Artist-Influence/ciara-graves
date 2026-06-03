Switch the Spotify release sync to Ciara's artist profile and schedule it to run every 7 days.

## Changes

1. **`supabase/functions/fetch-spotify-releases/index.ts`**
   - Update `SPOTIFY_ARTIST_ID` from `1sg7LKlpfKmZSvI0xxqNWC` to `2wYCS3DnZgyxDzfwDEj9Rm` (Ciara Graves).
   - Update `SOUNDCLOUD_RSS_URL` to Ciara's feed (`https://feeds.soundcloud.com/users/soundcloud:users:141298274/sounds.rss`) so the in-function SC reconciliation matches her catalog rather than the previous artist's.

2. **Schedule weekly cron via `supabase--insert`** (not a migration, since URL + anon key are project-specific):
   - Unschedule any prior `sync-spotify-releases-weekly` job if present.
   - `cron.schedule('sync-spotify-releases-weekly', '0 7 * * 0', ...)` — Sundays at 07:00 UTC — calling `https://hepyzwsrjysfwkyftwke.supabase.co/functions/v1/fetch-spotify-releases` via `net.http_post` with the anon key.

3. **Initial backfill**
   - Invoke `fetch-spotify-releases` once after the artist ID swap so the `releases` table is populated with Ciara's catalog immediately.

## Notes

- `pg_cron` and `pg_net` are already enabled (used by the Bandsintown sync).
- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` secrets are already configured.
- No frontend changes — the existing `releases` table consumers will pick up the new rows automatically.
- Old rows from the prior artist will remain in `releases` until cleaned up. Let me know if you'd like me to wipe those as part of this change.
