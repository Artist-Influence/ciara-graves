
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.shows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bandsintown_id TEXT NOT NULL UNIQUE,
  datetime TIMESTAMPTZ NOT NULL,
  title TEXT,
  venue_name TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  ticket_url TEXT,
  event_url TEXT,
  sold_out BOOLEAN NOT NULL DEFAULT false,
  lineup TEXT[] NOT NULL DEFAULT '{}',
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.shows TO anon;
GRANT SELECT ON public.shows TO authenticated;
GRANT ALL ON public.shows TO service_role;

ALTER TABLE public.shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shows"
ON public.shows
FOR SELECT
USING (true);

CREATE INDEX idx_shows_datetime ON public.shows(datetime);

CREATE TRIGGER update_shows_updated_at
BEFORE UPDATE ON public.shows
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
