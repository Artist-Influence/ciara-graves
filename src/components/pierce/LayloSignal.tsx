import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { CornerBrackets } from "@/components/CornerBrackets";
import { GridBackdrop } from "@/components/GridBackdrop";
import LayloEmbed from "@/components/LayloEmbed";
import { SignalLink } from "@/components/SignalButton";
import BackgroundVideo from "@/components/BackgroundVideo";

export const LayloSignal = () => {
  const { laylo } = siteConfig;

  return (
    <section id="signal" className="relative py-16 md:py-32 bg-background overflow-hidden">
      {/* Layer 0 — background visualizer */}
      <BackgroundVideo
        src="/visualizers/transmission.mp4"
        poster="/visualizers/transmission-poster.jpg"
        overlayOpacity={0.7}
      />
      <GridBackdrop variant="dots" className="opacity-50 z-[2]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <SystemLabel index="002" accent className="justify-center">
            TRANSMISSION
          </SystemLabel>
          <h2 className="mt-6 font-display text-4xl md:text-7xl text-ink leading-none">
            JOIN THE <span className="text-signal text-signal-glow">SIGNAL</span>
          </h2>
          <p className="mt-6 font-body text-base md:text-lg text-mute max-w-xl mx-auto">
            First access to drops, presaves, show announcements, and signal-only
            updates. No noise. Just transmissions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className="relative bg-panel/60 p-3 md:p-4 backdrop-blur-sm group hover:bg-panel/80 transition">
            <CornerBrackets size={16} />
            <div className="absolute inset-0 border border-signal/0 group-hover:border-signal/30 transition pointer-events-none" />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-2 flex items-center justify-between">
              <span>// SIGNAL.PROTOCOL</span>
              <span className="text-signal">[ READY ]</span>
            </div>

            {laylo.dropId ? (
              <LayloEmbed
                dropId={laylo.dropId}
                height={200}
                maxWidth={520}
                title="Join PIERCE on Laylo"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
                  // EMBED PENDING — DROP_ID NOT CONFIGURED
                </p>
                <SignalLink
                  href={`https://laylo.com/${laylo.username || "pierce"}`}
                  variant="primary"
                  size="md"
                >
                  JOIN ON LAYLO
                </SignalLink>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LayloSignal;
