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
        radial-gradient(circle at center, hsl(var(--cream)) 0%, hsl(var(--cream)) 55%, hsl(var(--cherry)) 56%, hsl(var(--cherry-bright)) 100%),
        repeating-radial-gradient(circle at center, hsl(0 0% 100% / 0.15) 0 1px, transparent 1px 3px)
      `,
      backgroundBlendMode: "multiply",
      boxShadow: "inset 0 0 6px hsl(0 0% 0% / 0.5), 0 1px 0 hsl(0 0% 100% / 0.4)",
    }}
  >
    {/* spokes (gear teeth on the white reel) */}
    {Array.from({ length: 12 }).map((_, i) => {
      const deg = (i * 360) / 12;
      return (
        <div
          key={deg}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            width: "46%",
            height: "3px",
            background: "hsl(var(--noir) / 0.85)",
            transform: `translateY(-50%) rotate(${deg}deg)`,
          }}
        />
      );
    })}
    {/* red center hub */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] h-[34%] rounded-full bg-cherry-bright" />
    {/* spindle teeth notch */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14%] h-[14%] rounded-sm bg-noir" />
  </div>
);

const Walkman = () => (
  <div
    className="relative w-56 sm:w-64 lg:w-72 aspect-[3/2] rounded-md overflow-hidden grain hover:rotate-[-1deg] transition-transform duration-500"
    style={{
      background: `
        linear-gradient(135deg, hsl(354 95% 22%) 0%, hsl(354 80% 12%) 60%, hsl(354 90% 18%) 100%),
        repeating-linear-gradient(45deg, hsl(0 0% 100% / 0.04) 0 2px, transparent 2px 5px)
      `,
      backgroundBlendMode: "screen",
      boxShadow:
        "0 24px 50px -12px hsl(0 0% 0% / 0.7), inset 0 1px 0 hsl(0 0% 100% / 0.18), inset 0 -1px 0 hsl(0 0% 0% / 0.5)",
      border: "1px solid hsl(354 60% 35% / 0.6)",
    }}
  >
    {/* corner screws */}
    {[
      "top-1.5 left-1.5",
      "top-1.5 right-1.5",
      "bottom-1.5 left-1.5",
      "bottom-1.5 right-1.5",
    ].map((pos) => (
      <div
        key={pos}
        className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-noir/40 border border-cream/30`}
      />
    ))}

    {/* white "Title" strip on right */}
    <div className="absolute right-2 top-2 bottom-2 w-5 bg-cream rounded-sm flex items-start justify-center pt-2 shadow-[inset_0_0_4px_hsl(0_0%_0%/0.15)]">
      <span
        className="font-mono text-[8px] tracking-[0.2em] text-cherry/80"
        style={{ writingMode: "vertical-rl" }}
      >
        Title
      </span>
    </div>

    {/* REC + counter top-left */}
    <div className="absolute top-2 left-2 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-cherry-bright animate-pulse shadow-[0_0_6px_hsl(var(--cherry-bright))]" />
      <span className="font-mono text-[7px] tracking-[0.3em] text-cream/70">REC · 001</span>
    </div>

    {/* dark printed label band across the middle */}
    <div
      className="absolute left-3 right-9 top-1/2 -translate-y-1/2 h-[58%] rounded-[2px]"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 8%) 50%, hsl(0 0% 4%) 100%)",
        boxShadow: "inset 0 0 8px hsl(0 0% 0% / 0.9), 0 0 0 1px hsl(354 60% 25%)",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-between px-2">
        {/* left reel */}
        <div className="w-[36%] aspect-square">
          <Reel />
        </div>

        {/* center printed text + IEC dots */}
        <div className="flex flex-col items-center justify-center gap-1 select-none">
          <div className="flex flex-col gap-[2px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-cream/40" />
            ))}
          </div>
          <span
            className="font-mono text-[6px] tracking-[0.25em] text-cherry-bright/90 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            POSITION:NORMAL · TYPE I · CIARA GRAVES
          </span>
          <div className="flex flex-col gap-[2px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-cream/40" />
            ))}
          </div>
        </div>

        {/* right reel */}
        <div className="w-[36%] aspect-square">
          <Reel />
        </div>
      </div>
    </div>
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
