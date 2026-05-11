import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { CornerBrackets } from "@/components/CornerBrackets";
import { GridBackdrop } from "@/components/GridBackdrop";
import BackgroundVideo from "@/components/BackgroundVideo";

export const AboutPierce = () => {
  const { about } = siteConfig;
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="relative py-16 md:py-32 bg-background overflow-hidden">
      <BackgroundVideo
        src="/visualizers/dossier.mp4"
        poster="/visualizers/dossier-poster.jpg"
        overlayOpacity={0.75}
      />
      <GridBackdrop variant="lines" className="opacity-30 z-[2]" />
      <div className="container mx-auto px-6 relative z-10">
        <SystemLabel index="005" accent>DOSSIER</SystemLabel>

        <div className="mt-10 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Portrait — left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 md:order-1 relative"
          >
            <div className="relative aspect-[3/4] max-w-sm md:max-w-xs lg:max-w-sm mx-auto overflow-hidden bg-panel">
              <CornerBrackets size={18} />
              <img
                src={about.imageUrl}
                alt="PIERCE portrait"
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/80">
                // PIERCE — SCOTTSDALE.AZ
              </div>
            </div>
          </motion.div>

          {/* Bio + chips — right on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 md:order-2"
          >
            <h2 className="font-display text-4xl md:text-7xl text-ink leading-[0.9]">
              SIGNAL <span className="text-signal text-signal-glow">OPERATOR</span>
            </h2>

            <p className="mt-8 font-body text-lg text-ink/85 leading-relaxed">
              {about.bioShort}
            </p>

            <button
              onClick={() => setOpen(!open)}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-signal hover:text-ink transition"
            >
              {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {open ? "COLLAPSE DOSSIER" : "EXPAND DOSSIER"}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-4 font-body text-ink">
                    {about.paragraphs.map((p, i) => (
                      <p key={i} className="leading-relaxed">{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chips */}
            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-3">
                // LABELS
              </div>
              <div className="flex flex-wrap gap-2">
                {about.labels.map((l) => (
                  <span
                    key={l}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/80 px-3 py-1.5 border border-border hover:border-signal hover:text-signal transition"
                  >
                    [ {l} ]
                  </span>
                ))}
              </div>
            </div>

            {/* Stages */}
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-3">
                // STAGES
              </div>
              <div className="flex flex-wrap gap-2">
                {about.performances.map((r) => (
                  <span
                    key={r}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/80 px-3 py-1.5 border border-border hover:border-signal hover:text-signal transition"
                  >
                    [ {r} ]
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPierce;
