DROP INDEX IF EXISTS releases_soundcloud_id_key;
ALTER TABLE public.releases ADD CONSTRAINT releases_soundcloud_id_unique UNIQUE (soundcloud_id);