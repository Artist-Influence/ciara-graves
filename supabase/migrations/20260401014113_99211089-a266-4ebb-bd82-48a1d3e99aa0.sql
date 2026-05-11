ALTER TABLE public.releases ADD COLUMN soundcloud_url text;
ALTER TABLE public.releases ADD COLUMN soundcloud_id text;
ALTER TABLE public.releases ADD COLUMN source text NOT NULL DEFAULT 'spotify';
ALTER TABLE public.releases ALTER COLUMN spotify_id DROP NOT NULL;
CREATE UNIQUE INDEX releases_soundcloud_id_key ON public.releases (soundcloud_id) WHERE soundcloud_id IS NOT NULL;