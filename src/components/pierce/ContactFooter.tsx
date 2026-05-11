import { Instagram, Youtube, Twitch } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { SystemLabel } from "@/components/SystemLabel";
import { GridBackdrop } from "@/components/GridBackdrop";
import SoundCloudIcon from "@/components/icons/SoundCloudIcon";
import BackgroundVideo from "@/components/BackgroundVideo";

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.323a.748.748 0 0 1-1.029.246c-2.818-1.722-6.364-2.111-10.541-1.157a.748.748 0 1 1-.331-1.46c4.572-1.044 8.494-.595 11.655 1.342a.748.748 0 0 1 .246 1.029zm1.467-3.265a.935.935 0 0 1-1.286.308c-3.226-1.983-8.146-2.557-11.961-1.397a.935.935 0 1 1-.542-1.79c4.357-1.322 9.776-.682 13.481 1.593a.935.935 0 0 1 .308 1.286zm.126-3.4c-3.872-2.299-10.252-2.51-13.946-1.39a1.122 1.122 0 1 1-.65-2.148c4.243-1.286 11.298-1.038 15.756 1.61a1.122 1.122 0 0 1-1.16 1.928z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ICONS = (s: typeof siteConfig.socials) =>
  [
    { label: "Spotify", url: s.spotify, Icon: SpotifyIcon },
    { label: "SoundCloud", url: s.soundcloud, Icon: SoundCloudIcon },
    { label: "Instagram", url: s.instagram, Icon: Instagram },
    { label: "YouTube", url: s.youtube, Icon: Youtube },
    { label: "Twitch", url: (s as any).twitch ?? "", Icon: Twitch },
    { label: "X", url: (s as any).twitter ?? "", Icon: XIcon },
  ].filter((l) => l.url);

export const ContactFooter = () => {
  const { artist, contact, socials } = siteConfig;
  const links = SOCIAL_ICONS(socials);

  return (
    <footer
      id="contact"
      className="relative bg-background border-t border-border overflow-hidden"
    >
      <BackgroundVideo
        src="/visualizers/contact.mp4"
        poster="/visualizers/contact-poster.jpg"
        overlayOpacity={0.8}
        fadeBottom={false}
      />
      <GridBackdrop variant="lines" className="opacity-25 z-[2]" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex justify-center">
          <SystemLabel index="009" accent>CONTACT</SystemLabel>
        </div>

        <div className="mt-10 flex flex-col items-center text-center gap-10">
          <div className="flex flex-col items-center">
            <img
              src={artist.logoUrl}
              alt={artist.name}
              className="w-[min(70vw,360px)] h-auto opacity-90"
            />
          </div>

          <div className="w-full max-w-md">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-2">
              // BOOKING / MANAGEMENT
            </div>
            <a
              href={`mailto:${contact.booking}`}
              className="font-mono text-base md:text-lg text-ink hover:text-signal transition"
            >
              {contact.booking}
            </a>
          </div>

          <div className="w-full max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute mb-4">
              // SOCIALS
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {links.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 border border-border text-mute hover:border-signal hover:text-signal transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border font-mono text-[10px] uppercase tracking-[0.3em] text-mute text-center">
          <span>© {new Date().getFullYear()} PIERCE. ALL TRANSMISSIONS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
