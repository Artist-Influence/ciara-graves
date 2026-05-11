import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { CornerBrackets } from "@/components/CornerBrackets";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SignalLink } from "@/components/SignalButton";
import LayloEmbed from "@/components/LayloEmbed";
import BackgroundVideo from "@/components/BackgroundVideo";

export const EPKPress = () => {
  const { epk, about, laylo } = siteConfig;

  return (
    <section id="epk" className="relative py-16 md:py-32 overflow-hidden">
      <BackgroundVideo
        src="/visualizers/booking.mp4"
        poster="/visualizers/booking-poster.jpg"
        overlayOpacity={0.75}
      />
      <GridBackdrop variant="lines" className="opacity-30 z-[2]" />
      <div className="container mx-auto px-6 relative z-10">
        <SystemLabel index="007" accent>PRESS / EPK</SystemLabel>
        <h2 className="mt-4 font-display text-4xl md:text-7xl text-ink leading-none">
          BOOKING <span className="text-signal text-signal-glow">FILES</span>
        </h2>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* LEFT: EPK card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-panel/80 p-6 md:p-8"
          >
            <CornerBrackets size={16} />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal mb-4">
              // EPK.PACKAGE
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              FULL ELECTRONIC PRESS KIT
            </h3>

            <div className="mt-8">
              <SignalLink href={epk.epkUrl || "#"} variant="primary" size="md">
                <Download className="h-3 w-3" /> DOWNLOAD EPK
              </SignalLink>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-2">
                // BOOKING
              </div>
              <a
                href={`mailto:${epk.bookingEmail}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-signal transition"
              >
                <Mail className="h-4 w-4" />
                {epk.bookingEmail}
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Playable IDs via Laylo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative bg-panel/80 p-6 md:p-8"
          >
            <CornerBrackets size={16} />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal mb-4">
              // PLAYABLE IDS — SELECT CUTS
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
              DJ-SUPPORT READY
            </h3>
            <p className="font-body text-mute leading-relaxed mb-6">
              Unreleased IDs and select cuts available on request — opt in below for instant access.
            </p>

            <div className="relative border border-border/70 bg-background/60 p-4 md:p-5">
              <CornerBrackets size={12} color="hsl(var(--signal) / 0.5)" />
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
                <span>// IDS.PROTOCOL</span>
                <span className="text-signal">[ READY ]</span>
              </div>
              {laylo.idsDropId ? (
                <div className="flex min-h-[180px] justify-center items-start">
                  <LayloEmbed
                    dropId={laylo.idsDropId}
                    embedUrl="https://embed.laylo.com?dropId=184a2a11-48d4-418c-8f34-870af84dfc8b&color=d3113a&minimal=false&theme=dark&background=solid&customTitle=Download%20My%20IDs"
                    height={200}
                    maxWidth={560}
                    title="Request PIERCE IDs"
                    customTitle="Download My IDs"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
                    // EMBED PENDING — IDS_DROP_ID NOT CONFIGURED
                  </p>
                  <SignalLink
                    href={`https://laylo.com/${laylo.username || "pierce"}`}
                    variant="primary"
                    size="sm"
                  >
                    REQUEST IDS
                  </SignalLink>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EPKPress;
