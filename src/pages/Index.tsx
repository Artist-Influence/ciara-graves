import StickyNavCiara from "@/components/ciara/StickyNavCiara";
import HeroCiara from "@/components/ciara/HeroCiara";
import MusicFeed from "@/components/ciara/MusicFeed";
import LayloPlaceholder from "@/components/ciara/LayloPlaceholder";
import BioSection from "@/components/ciara/BioSection";
import Shows from "@/components/ciara/Shows";
import BookingFooter from "@/components/ciara/BookingFooter";

const Index = () => (
  <div className="min-h-screen bg-noir text-cream overflow-x-hidden">
    <StickyNavCiara />
    <main>
      <HeroCiara />
      <MusicFeed />
      <LayloPlaceholder />
      <BioSection />
      <Shows />
    </main>
    <BookingFooter />
  </div>
);

export default Index;
