import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Release {
  id: string;
  spotify_id: string | null;
  title: string;
  type: string;
  release_date: string | null;
  artwork_url: string | null;
  spotify_url: string | null;
  soundcloud_url: string | null;
  soundcloud_id: string | null;
  label: string | null;
  source: string;
}

export const useSpotifyReleases = () => {
  return useQuery({
    queryKey: ["spotify-releases"],
    queryFn: async (): Promise<Release[]> => {
      const { data, error } = await supabase
        .from("releases")
        .select("*")
        .order("release_date", { ascending: false })
        .limit(200);

      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 60,
  });
};

export const useSoundcloudReleases = () => {
  return useQuery({
    queryKey: ["soundcloud-releases"],
    queryFn: async (): Promise<Release[]> => {
      const { data, error } = await supabase
        .from("releases")
        .select("*")
        .not("soundcloud_url", "is", null)
        .is("spotify_url", null)
        .order("release_date", { ascending: false })
        .limit(200);

      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 60,
  });
};

export const useFeaturedRelease = () => {
  return useQuery({
    queryKey: ["featured-release"],
    queryFn: async (): Promise<Release | null> => {
      const { data, error } = await supabase
        .from("releases")
        .select("*")
        .order("release_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
