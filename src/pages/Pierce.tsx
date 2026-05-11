import { siteConfig } from "@/config/siteConfig";
import StickyNavPierce from "@/components/pierce/StickyNavPierce";
import HeroPierce from "@/components/pierce/HeroPierce";
import LayloSignal from "@/components/pierce/LayloSignal";
import MusicCatalog from "@/components/pierce/MusicCatalog";
import ToursShows from "@/components/pierce/ToursShows";
import AboutPierce from "@/components/pierce/AboutPierce";
import EPKPress from "@/components/pierce/EPKPress";
import ContactFooter from "@/components/pierce/ContactFooter";
import MarqueeTicker from "@/components/MarqueeTicker";
import LayloSdkLoader from "@/components/LayloSdkLoader";

const Pierce = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <LayloSdkLoader />
    <StickyNavPierce />
    <main>
      <HeroPierce />
      <MarqueeTicker items={siteConfig.marqueePhrases} />
      <LayloSignal />
      <MusicCatalog />
      <ToursShows />
      <AboutPierce />
      <EPKPress />
    </main>
    <ContactFooter />
  </div>
);

export default Pierce;
