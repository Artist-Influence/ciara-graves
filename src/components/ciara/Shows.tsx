import { useBandsintownEvents } from "@/hooks/useBandsintownEvents";
import { siteConfig, visualizers } from "@/config/siteConfig";
import SectionVisualizer from "./SectionVisualizer";

const formatDate = (s: string) => {
  if (!s) return { mo: "", day: "", yr: "" };
  const d = new Date(s);
  return {
    mo: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString().padStart(2, "0"),
    yr: d.getFullYear().toString().slice(-2),
  };
};

export const Shows = () => {
  const { data: events, isLoading } = useBandsintownEvents();

  return (
    <section id="shows" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
      <SectionVisualizer src={visualizers.shows} opacity="opacity-20" />
      <div className="container relative z-10">
        <header className="mb-10 sm:mb-14">
          <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ HOTLINE / TICKET_STACK</p>
          <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">Upcoming Shows</h2>
        </header>

        {isLoading && <p className="font-mono text-sm text-cream-dim">▸ pulling dates…</p>}

        {events && events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((e) => {
              const { mo, day, yr } = formatDate(e.date);
              return (
                <li
                  key={e.id}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 p-4 sm:p-5 bg-card border border-cherry/40 clip-ticket vhs-hover"
                >
                  <div className="text-center bg-cherry text-cream px-4 py-2 min-w-[72px]">
                    <div className="font-mono text-[10px] tracking-[0.3em]">{mo}</div>
                    <div className="font-display text-3xl leading-none">{day}</div>
                    <div className="font-mono text-[10px] tracking-[0.3em]">'{yr}</div>
                  </div>
                  <div>
                    <div className="font-display text-xl sm:text-2xl text-cream uppercase leading-tight">
                      {e.venue}
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.25em] text-cream-dim mt-1">
                      ◆ {e.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {e.soldOut ? (
                      <span className="font-mono text-[11px] tracking-[0.3em] uppercase px-3 py-2 border border-cherry text-cherry">
                        SOLD OUT
                      </span>
                    ) : (
                      <a
                        href={e.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] tracking-[0.3em] uppercase px-3 py-2 bg-toxic text-noir hover:bg-cream transition-colors clip-notch"
                      >
                        ▶ Tickets
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          !isLoading && (
            <div className="text-center max-w-xl mx-auto py-12">
              <p className="font-display text-3xl sm:text-4xl text-cream">
                No shows listed right now.
              </p>
              <p className="mt-3 font-script text-2xl text-cream">
                join the list for the next drop ✦
              </p>
              <a
                href="#signal"
                className="mt-6 inline-block font-mono text-[11px] tracking-[0.3em] uppercase px-5 py-3 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch glow-cherry"
              >
                ▶ Join Ciara&apos;s List
              </a>
            </div>
          )
        )}

        <div className="mt-8 text-right">
          <a
            href={siteConfig.bandsintown.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-cream-dim hover:text-toxic"
          >
            FULL TOUR ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Shows;
