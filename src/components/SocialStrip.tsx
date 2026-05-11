import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import PlatformButton from "./PlatformButton";
import { siteConfig } from "@/config/siteConfig";

const SocialStrip = () => {
  const { socials } = siteConfig;

  const platforms = [
    { key: "spotify", url: socials.spotify },
    { key: "soundcloud", url: socials.soundcloud },
    { key: "instagram", url: socials.instagram },
    { key: "tiktok", url: socials.tiktok },
  ].filter((p) => p.url);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden" id="socials">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <SectionHeader title="Connect" subtitle="Find Kluster Flux everywhere" className="text-center" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto"
        >
          {platforms.map(({ key, url }) => (
            <PlatformButton key={key} platform={key} url={url} variant="card" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialStrip;
