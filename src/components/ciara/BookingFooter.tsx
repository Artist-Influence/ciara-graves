import { siteConfig } from "@/config/siteConfig";
import SoundCloudIcon from "@/components/icons/SoundCloudIcon";
import AudiusIcon from "@/components/icons/AudiusIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";

const socialItems = [
  { href: "soundcloud", label: "SoundCloud", Icon: SoundCloudIcon },
  { href: "audius", label: "Audius", Icon: AudiusIcon },
  { href: "instagram", label: "Instagram", Icon: InstagramIcon },
  { href: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

export const BookingFooter = () => (
  <footer id="contact" className="relative pt-24 pb-12 border-t-2 border-cherry overflow-hidden bg-noir">
    <div className="container relative z-10 flex flex-col items-center text-center gap-12">
      <div className="max-w-2xl w-full">
        <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ BOOKING / DIRECT_LINE</p>
        <h2 className="font-display text-6xl sm:text-8xl text-cream text-glow-cherry leading-[0.85]">
          Contact.
        </h2>
        <a
          href={`mailto:${siteConfig.booking.email}`}
          className="mt-6 inline-block font-display text-3xl sm:text-4xl text-cherry hover:text-toxic transition-colors underline decoration-cherry/40 underline-offset-8"
        >
          {siteConfig.booking.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

        <div id="socials" className="mt-8 flex items-center justify-center gap-5">
          {socialItems.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={siteConfig.socials[href] as string}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-cream-dim hover:text-cherry transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.25em] text-cream-dim">
          <li><a href="#music" className="hover:text-toxic">MUSIC</a></li>
          <li><a href="#signal" className="hover:text-toxic">JOIN ME</a></li>
          <li><a href="#shows" className="hover:text-toxic">SHOWS</a></li>
          <li><a href="#about" className="hover:text-toxic">ABOUT</a></li>
        </ul>
      </div>

    </div>

    <div className="container mt-16 pt-6 border-t border-cherry/20 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cream-dim">
      <span>© {new Date().getFullYear()} CIARA GRAVES · ALL RIGHTS RESERVED</span>
      <span>{siteConfig.artist.location}</span>
    </div>
  </footer>
);

export default BookingFooter;
