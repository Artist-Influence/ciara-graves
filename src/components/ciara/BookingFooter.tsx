import { siteConfig } from "@/config/siteConfig";

export const BookingFooter = () => (
  <footer id="contact" className="relative pt-24 pb-12 border-t-2 border-cherry overflow-hidden bg-noir">
    <div className="container relative z-10 grid lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-2">
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

      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 rounded-full border-4 border-cream/20 bg-[radial-gradient(circle,hsl(0_0%_8%)_30%,hsl(var(--cherry))_60%,hsl(0_0%_4%)_100%)] flex items-center justify-center overflow-hidden">
          <img src={siteConfig.artist.logoUrl} alt="" className="logo-knockout w-24 relative z-10" />
          <div className="absolute w-4 h-4 rounded-full bg-noir border-2 border-cream/40 z-20" />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-cream-dim text-center">
          BURN_001 · CIARA GRAVES
        </p>
      </div>
    </div>

    <div className="container mt-16 pt-6 border-t border-cherry/20 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cream-dim">
      <span>© {new Date().getFullYear()} CIARA GRAVES · ALL RIGHTS RESERVED</span>
      <span>{siteConfig.artist.location}</span>
    </div>
  </footer>
);

export default BookingFooter;
