import { siteConfig } from "@/config/siteConfig";

export const BookingFooter = () => (
  <footer id="contact" className="relative pt-24 pb-12 border-t-2 border-cherry overflow-hidden bg-noir">
    <div className="container relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ BOOKING / DIRECT_LINE</p>
        <h2 className="font-display text-6xl sm:text-8xl text-cream text-glow-cherry leading-[0.85]">
          Contact.
        </h2>
        <a
          href={`mailto:${siteConfig.booking.email}`}
          className="mt-6 inline-block font-display text-3xl sm:text-4xl text-cherry-bright hover:text-toxic transition-colors underline decoration-cherry/40 underline-offset-8"
        >
          {siteConfig.booking.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${siteConfig.booking.email}`}
            className="font-mono text-[11px] tracking-[0.3em] uppercase px-5 py-3 bg-cherry text-cream hover:bg-cherry-bright transition-colors clip-notch glow-cherry"
          >
            ✦ Inquire Now
          </a>
          <a
            href={siteConfig.booking.epkUrl}
            download
            className="font-mono text-[11px] tracking-[0.3em] uppercase px-5 py-3 border border-toxic text-toxic hover:bg-toxic hover:text-noir transition-colors clip-notch"
          >
            ↓ Download EPK
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.25em] text-cream-dim">
          <li><a href="#music" className="hover:text-toxic">MUSIC</a></li>
          <li><a href="#signal" className="hover:text-toxic">SIGNAL</a></li>
          <li><a href="#shows" className="hover:text-toxic">SHOWS</a></li>
          <li><a href="#about" className="hover:text-toxic">ABOUT</a></li>
          <li><a href="#socials" className="hover:text-toxic">SOCIALS</a></li>
        </ul>
      </div>

      <div className="shrink-0 self-center sm:self-auto">
        <div
          className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full animate-spin-cd glow-cherry"
          style={{
            background: `
              radial-gradient(circle at center, hsl(0 0% 4%) 0%, hsl(0 0% 6%) 100%),
              repeating-radial-gradient(circle at center, hsl(var(--cream) / 0.06) 0 1px, transparent 1px 4px)
            `,
            backgroundBlendMode: "screen",
          }}
        >
          {/* sheen */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, hsl(var(--cream) / 0.08) 30deg, transparent 70deg, transparent 180deg, hsl(var(--cream) / 0.05) 210deg, transparent 250deg)",
            }}
          />
          {/* center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[38%] h-[38%] rounded-full bg-cherry flex items-center justify-center">
              <img
                src={siteConfig.artist.logoUrl}
                alt=""
                className="logo-knockout w-3/4 relative z-10"
              />
              {/* spindle hole */}
              <div className="absolute w-2 h-2 rounded-full bg-noir border border-cream/30 z-20" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container mt-16 pt-6 border-t border-cherry/20 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cream-dim">
      <span>© {new Date().getFullYear()} CIARA GRAVES · ALL RIGHTS RESERVED</span>
      <span>{siteConfig.artist.location}</span>
    </div>
  </footer>
);

export default BookingFooter;
