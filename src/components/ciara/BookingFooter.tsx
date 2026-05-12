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

const Reel = () => (
  <div
    className="relative rounded-full animate-spin-cd"
    style={{
      width: "100%",
      aspectRatio: "1 / 1",
      background: `
        radial-gradient(circle at center, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 60%, hsl(0 0% 2%) 100%),
        repeating-radial-gradient(circle at center, hsl(var(--cream) / 0.08) 0 1px, transparent 1px 4px)
      `,
      backgroundBlendMode: "screen",
      boxShadow: "inset 0 0 8px hsl(0 0% 0% / 0.8), 0 0 0 1px hsl(var(--cream) / 0.1)",
    }}
  >
    {/* spokes */}
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <div
        key={deg}
        className="absolute top-1/2 left-1/2 origin-left bg-cream/20"
        style={{
          width: "42%",
          height: "2px",
          transform: `translateY(-50%) rotate(${deg}deg)`,
        }}
      />
    ))}
    {/* hub */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] h-[28%] rounded-full bg-cherry border border-cream/40" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8%] h-[8%] rounded-full bg-noir" />
  </div>
);

const Walkman = () => (
  <div
    className="relative w-56 sm:w-64 lg:w-72 aspect-[4/3] rounded-2xl border border-cream/15 glow-cherry hover:rotate-[-1deg] transition-transform duration-500 p-3 sm:p-4"
    style={{
      background: "linear-gradient(135deg, hsl(0 0% 10%) 0%, hsl(0 0% 5%) 100%)",
      boxShadow:
        "0 20px 40px -10px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(var(--cream) / 0.08)",
    }}
  >
    {/* top bar */}
    <div className="flex items-center justify-between mb-2 px-1">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cherry-bright animate-pulse shadow-[0_0_6px_hsl(var(--cherry-bright))]" />
        <span className="font-mono text-[8px] tracking-[0.3em] text-cream-dim">REC</span>
      </div>
      <span className="font-mono text-[8px] tracking-[0.25em] text-toxic/80 bg-noir px-1.5 py-0.5 border border-cream/10 rounded-sm">
        001
      </span>
    </div>

    {/* tape window */}
    <div
      className="relative rounded-md p-3 sm:p-4 mb-3"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 6%) 100%)",
        boxShadow: "inset 0 2px 6px hsl(0 0% 0% / 0.9), inset 0 -1px 0 hsl(var(--cream) / 0.05)",
      }}
    >
      <div className="relative flex items-center justify-between gap-3">
        <div className="w-[34%]">
          <Reel />
        </div>
        {/* tape ribbon */}
        <div className="absolute left-[34%] right-[34%] top-1/2 -translate-y-1/2 h-px bg-cream/30" />
        <div className="absolute left-[36%] right-[36%] top-1/2 h-2 border-b border-cream/15 rounded-b-full" />
        {/* logo watermark */}
        <img
          src={siteConfig.artist.logoUrl}
          alt=""
          className="logo-knockout absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] opacity-25"
        />
        <div className="w-[34%]">
          <Reel />
        </div>
      </div>
    </div>

    {/* controls */}
    <div className="flex items-center justify-between gap-1.5 px-1">
      {[
        { l: "◀◀", play: false },
        { l: "▶", play: true },
        { l: "❚❚", play: false },
        { l: "■", play: false },
        { l: "▶▶", play: false },
      ].map((b, i) => (
        <span
          key={i}
          className={`flex-1 text-center font-mono text-[9px] py-1 rounded-sm border ${
            b.play
              ? "bg-cherry text-cream border-cherry-bright glow-cherry"
              : "bg-noir text-cream-dim border-cream/15"
          }`}
        >
          {b.l}
        </span>
      ))}
    </div>

    {/* speaker grille accent */}
    <div
      className="absolute right-2 top-2 bottom-2 w-1 rounded-full opacity-40"
      style={{
        background:
          "repeating-linear-gradient(0deg, hsl(var(--cream) / 0.2) 0 2px, transparent 2px 4px)",
      }}
    />
  </div>
);

export const BookingFooter = () => (
  <footer id="contact" className="relative pt-24 pb-12 border-t-2 border-cherry overflow-hidden bg-noir">
    <div className="container relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex-1 min-w-0">
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

        <div id="socials" className="mt-8 flex items-center gap-5">
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

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.25em] text-cream-dim">
          <li><a href="#music" className="hover:text-toxic">MUSIC</a></li>
          <li><a href="#signal" className="hover:text-toxic">SIGNAL</a></li>
          <li><a href="#shows" className="hover:text-toxic">SHOWS</a></li>
          <li><a href="#about" className="hover:text-toxic">ABOUT</a></li>
        </ul>
      </div>

      <div className="shrink-0 self-center sm:self-end sm:ml-auto">
        <Walkman />
      </div>
    </div>

    <div className="container mt-16 pt-6 border-t border-cherry/20 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cream-dim">
      <span>© {new Date().getFullYear()} CIARA GRAVES · ALL RIGHTS RESERVED</span>
      <span>{siteConfig.artist.location}</span>
    </div>
  </footer>
);

export default BookingFooter;
