Reschedule the Spotify release sync to every Friday at 12:30 AM EST.

## Change

Re-run `cron.schedule('sync-spotify-releases-weekly', ...)` with cron expression `30 5 * * 5` (Fridays 05:30 UTC = 00:30 EST / UTC-5). `cron.schedule` upserts by name, so this replaces the previous Sunday 07:00 UTC schedule. Function body unchanged.

## Note

EST (UTC-5) is fixed year-round. If you'd rather track Eastern wall-clock time and shift with daylight saving (EDT, UTC-4) — making it 11:30 PM EDT in summer — let me know and I'll use America/New_York via a different approach.
