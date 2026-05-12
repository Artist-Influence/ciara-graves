import { siteConfig } from "@/config/siteConfig";
import SoundCloudIcon from "@/components/icons/SoundCloudIcon";
import AudiusIcon from "@/components/icons/AudiusIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";

const items = [
  { href: siteConfig.socials.soundcloud, label: "SoundCloud", Icon: SoundCloudIcon, bg: "bg-cherry text-cream", rot: "-3deg" },
  { href: siteConfig.socials.audius, label: "Audius", Icon: AudiusIcon, bg: "bg-toxic text-noir", rot: "2deg" },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon, bg: "bg-cream text-noir", rot: "-2deg" },
  { href: siteConfig.socials.tiktok, label: "TikTok", Icon: TikTokIcon, bg: "bg-noir text-cream border border-cream", rot: "3deg" },
];

export const SocialLinks = () => (
  <section id="socials" className="relative py-24 sm:py-32 border-t border-cherry/20 overflow-hidden">
    <div className="container text-center">
      <p className="font-mono text-[10px] tracking-[0.4em] text-toxic mb-3">▍ DESKTOP / DOCK</p>
      <h2 className="font-display text-5xl sm:text-7xl text-cream text-glow-cherry">FIND ME SOMEWHERE WEIRD.</h2>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {items.map((it, i) => {
          const { Icon } = it;
          return (
            <a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-32 sm:w-36 sticker"
              style={{ ["--rot" as never]: it.rot }}
            >
              <div className={`aspect-square ${it.bg} flex flex-col items-center justify-center clip-notch shadow-[6px_6px_0_hsl(var(--cherry))] group-hover:shadow-[8px_8px_0_hsl(var(--toxic))] transition-shadow`}>
                <Icon className="w-12 h-12" />
                <div className="mt-2 font-mono text-[10px] tracking-[0.25em]">{it.label.toUpperCase()}</div>
              </div>
              <div className="mt-2 font-script text-cream/70 text-base">no. {(i + 1).toString().padStart(2, "0")}</div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export default SocialLinks;
