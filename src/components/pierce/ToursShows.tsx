import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBandsintownEvents } from "@/hooks/useBandsintownEvents";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { GridBackdrop } from "@/components/GridBackdrop";
import { SignalLink } from "@/components/SignalButton";
import BackgroundVideo from "@/components/BackgroundVideo";

const formatMonth = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
const formatDay = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { day: "2-digit" });
const formatYear = (d: string) =>
  new Date(d).getFullYear().toString();

export const ToursShows = () => {
  const { data: events = [], isLoading } = useBandsintownEvents();

  return (
    <section id="shows" className="relative py-16 md:py-32 bg-background overflow-hidden">
      <BackgroundVideo
        src="/visualizers/shows.mp4"
        poster="/visualizers/shows-poster.jpg"
        overlayOpacity={0.75}
      />
      <GridBackdrop variant="dots" className="opacity-40 z-[2]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <SystemLabel index="004" accent>TRANSMISSIONS LIVE</SystemLabel>
            <h2 className="mt-4 font-display text-4xl md:text-7xl text-ink leading-none">
              ON THE <span className="text-signal text-signal-glow">ROAD</span>
            </h2>
          </div>
          <SignalLink href={siteConfig.bandsintown.profileUrl} variant="signal" size="sm">
            ALL DATES — BANDSINTOWN
          </SignalLink>
        </motion.div>

        <div className="border-t border-border">
          {isLoading && (
            <div className="py-16 text-center font-mono text-xs uppercase tracking-[0.25em] text-mute">
              // SCANNING TRANSMISSIONS...
            </div>
          )}

          {!isLoading && events.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-3xl md:text-5xl text-ink/80 mb-4">
                // NO TRANSMISSIONS SCHEDULED
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute mb-8">
                More signals incoming. Join the list for first access.
              </p>
              <SignalLink href="#signal" external={false} variant="primary" size="md">
                JOIN THE LIST
              </SignalLink>
            </div>
          )}

          {events.map((e, i) => (
            <motion.a
              key={e.id}
              href={e.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-border hover:border-signal/60 transition-colors items-center"
            >
              <div className="col-span-3 md:col-span-2 font-mono text-mute group-hover:text-signal transition">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl md:text-5xl text-ink leading-none">
                    {formatDay(e.date)}
                  </span>
                  <div className="flex flex-col text-[10px] uppercase tracking-[0.25em]">
                    <span>{formatMonth(e.date)}</span>
                    <span className="opacity-60">{formatYear(e.date)}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-9 md:col-span-6">
                <div className="font-display text-xl md:text-2xl text-ink leading-tight">
                  {e.venue}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute mt-1">
                  {e.city}
                </div>
              </div>

              <div className="hidden md:flex col-span-2 justify-start">
                <span
                  className={
                    e.soldOut
                      ? "font-mono text-[10px] uppercase tracking-[0.25em] text-alert px-2 py-1 border border-alert/40"
                      : "font-mono text-[10px] uppercase tracking-[0.25em] text-signal px-2 py-1 border border-signal/40"
                  }
                >
                  {e.soldOut ? "SOLD OUT" : "ON SALE"}
                </span>
              </div>

              <div className="col-span-12 md:col-span-2 flex justify-end">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink flex items-center gap-2 group-hover:text-signal transition">
                  {e.soldOut ? "INFO" : "TICKETS"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursShows;
