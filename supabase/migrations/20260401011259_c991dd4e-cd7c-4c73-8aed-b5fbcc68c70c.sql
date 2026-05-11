
-- Create releases table for Spotify-synced releases
CREATE TABLE public.releases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spotify_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'single',
  release_date DATE,
  artwork_url TEXT,
  spotify_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for sorting by release date
CREATE INDEX idx_releases_release_date ON public.releases (release_date DESC);

-- Enable RLS
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view releases"
  ON public.releases FOR SELECT
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_releases_updated_at
  BEFORE UPDATE ON public.releases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
