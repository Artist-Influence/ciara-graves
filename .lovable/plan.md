# Bandsintown Daily Sync

The site currently fetches Bandsintown directly from the browser on every page load and maps fields that don't always match Bandsintown's actual response shape (venue/title confusion, no filter for past shows). We'll move to a server-side daily sync stored in the database.

## What changes

1. **New `shows` table** in the database — stores upcoming events with clean fields (date, venue, city, region, ticket URL, sold-out, lineup, title, source id).
2. **Edge function `sync-bandsintown-shows`** — fetches from `rest.bandsintown.com`, normalizes the payload (correctly mapping venue name vs. event title, filtering past dates, marking removed shows), and upserts into `shows`. Removes shows that no longer appear on Bandsintown.
3. **Daily cron** (pg_cron + pg_net) — runs the edge function once per day at ~6am UTC. Also runnable on demand.
4. **Frontend swap** — `useBandsintownEvents` hook reads from the `shows` table instead of hitting Bandsintown directly. Public read-only RLS.
5. **Initial backfill** — invoke the function once after deploy so data appears immediately.

## Field mapping fix

Bandsintown sometimes puts the event title in `venue.name` (as seen in the current network response: `"Sound Selectas Presents: smith. x MontyCler"` is the event title, not the venue). The sync function will:
- Prefer the event `title` field for the show headline
- Use `venue.location` / `venue.city` + `venue.region` for the location line
- Fall back gracefully when fields are missing

## Technical details

- Table: `public.shows` with columns `id`, `bandsintown_id` (unique), `datetime`, `title`, `venue_name`, `city`, `region`, `country`, `ticket_url`, `event_url`, `sold_out`, `lineup` (text[]), `last_synced_at`, `created_at`, `updated_at`. Public SELECT only; writes via service role.
- Edge function uses `SUPABASE_SERVICE_ROLE_KEY` to upsert and to delete rows whose `bandsintown_id` isn't in the latest payload.
- Cron: `select cron.schedule('sync-bandsintown-daily', '0 6 * * *', $$ select net.http_post(...) $$);` — scheduled via the insert tool (not migration) since it contains project-specific URL + anon key.
- Hook renames to `useShows` (or keep name, change implementation) and queries `supabase.from('shows').select().gte('datetime', now).order('datetime')`.
