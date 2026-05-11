import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SoundCloudTrack {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  artworkUrl: string;
  description: string;
}

export const useSoundCloudFeed = () => {
  return useQuery({
    queryKey: ["soundcloud-feed"],
    queryFn: async (): Promise<SoundCloudTrack[]> => {
      const { data, error } = await supabase.functions.invoke("fetch-soundcloud-feed");
      if (error) throw error;
      return (data?.items as SoundCloudTrack[]) ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
};
