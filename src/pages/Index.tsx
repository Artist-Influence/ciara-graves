import StickyNavCiara from "@/components/ciara/StickyNavCiara";
import HeroCiara from "@/components/ciara/HeroCiara";
import MusicFeed from "@/components/ciara/MusicFeed";
import LayloPlaceholder from "@/components/ciara/LayloPlaceholder";
import BioSection from "@/components/ciara/BioSection";
import Shows from "@/components/ciara/Shows";
import BookingFooter from "@/components/ciara/BookingFooter";
import SectionVisualizer from "@/components/ciara/SectionVisualizer";
import { visualizers } from "@/config/siteConfig";

const Index = () => (
  <div className="min-h-screen bg-noir text-cream overflow-x-hidden">
    <StickyNavCiara />
    <main>
      <HeroCiara />
      <MusicFeed />
      <div className="relative">
        <SectionVisualizer src={visualizers.vertical} opacity="opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80 z-[1]" />
        <div className="relative z-[2]">
          <LayloPlaceholder />
          <BioSection />
        </div>
      </div>
      <Shows />
    </main>
    <BookingFooter />
  </div>
);

export default Index;
