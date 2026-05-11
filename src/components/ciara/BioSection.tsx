import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const stickers = [
  { label: "🍒", text: "sweet with bite", rot: "-8deg", pos: "top-2 -left-3 sm:-left-6" },
  { label: "♠", text: "lucky 7", rot: "5deg", pos: "top-1/3 -right-3 sm:-right-6" },
  { label: "📼", text: "side B", rot: "-4deg", pos: "bottom-2 -left-2 sm:left-2" },
  { label: "📺", text: "ch 07", rot: "8deg", pos: "bottom-12 -right-4 sm:-right-8" },
];

export const BioSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
      <div className="container grid md:grid-cols-5 gap-10 items-start">
        {/* Collage portrait */}
        <div className="md:col-span-2 relative">
          <div className="relative scanlines grain border-[6px] border-cream/80 shadow-[0_30px_60px_hsl(0_0%_0%/0.6)] rotate-[-2deg]">
            <img
              src={siteConfig.artist.portraitUrl}
              alt="Ciara Graves portrait"
              loading="lazy"
              className="w-full aspect-[3/4] object-cover saturate-110 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cherry/30 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.3em] text-cream/90">
              ◉ FILE_001 · WILMINGTON, DE
            </div>
          </div>

          {/* Floating stickers */}
          {stickers.map((s) => (
            <div
              key={s.label}
              className={`absolute ${s.pos} sticker bg-cream text-noir px-2 py-1 font-script text-lg shadow-[3px_3px_0_hsl(var(--cherry))]`}
              style={{ ["--rot" as never]: s.rot }}
            >
              <span className="mr-1">{s.label}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>

        {/* Bio copy */}
        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ BIO / DOSSIER</p>
          <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry leading-[0.9]">
            Sweet with bite.
          </h2>
          <p className="mt-6 text-lg text-cream-dim leading-relaxed max-w-2xl">
            {siteConfig.about.bioShort}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="font-mono text-[11px] tracking-[0.3em] uppercase px-4 py-2.5 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch">
                  ▶ Read Full Bio
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-noir border border-cherry/40 text-cream">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl text-cream">CIARA GRAVES — FULL DOSSIER</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-cream-dim leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
                  {siteConfig.about.bioLong.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <a
              href={siteConfig.booking.epkUrl}
              download
              className="font-mono text-[11px] tracking-[0.3em] uppercase px-4 py-2.5 border border-cream/60 text-cream hover:border-toxic hover:text-toxic transition-colors clip-notch"
            >
              ↓ Download EPK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
