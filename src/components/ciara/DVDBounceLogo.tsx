import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

interface DVDBounceLogoProps {
  className?: string;
  /** Use a video loop (the supplied DVD bounce mp4) or a CSS-animated PNG */
  variant?: "video" | "css";
  size?: number;
}

/**
 * DVD-style bouncing green logo. Defaults to the supplied `dvd-bounce.mp4`
 * for that authentic VHS / screensaver feel.
 */
export const DVDBounceLogo = ({ className, variant = "video", size = 130 }: DVDBounceLogoProps) => {
  if (variant === "video") {
    return (
      <video
        className={cn("pointer-events-none mix-blend-screen opacity-90", className)}
        style={{ width: size }}
        src={siteConfig.artist.dvdBounceUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      style={{ ["--dvd-w" as never]: `${size}px`, ["--dvd-h" as never]: `${size * 0.5}px` }}
    >
      <div className="absolute animate-dvd-x">
        <div className="absolute animate-dvd-y">
          <img
            src={siteConfig.artist.logoUrl}
            alt=""
            aria-hidden
            className="logo-toxic glow-toxic"
            style={{ width: size }}
          />
        </div>
      </div>
    </div>
  );
};

export default DVDBounceLogo;
