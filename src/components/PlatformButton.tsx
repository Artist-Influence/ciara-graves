import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

import SoundCloudIcon from "./icons/SoundCloudIcon";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const AppleMusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.28C18.82.083 17.937.004 17.05 0H6.95c-.89.004-1.78.08-2.65.28a5.022 5.022 0 00-1.87.61C1.31 1.644.567 2.644.25 3.934a9.23 9.23 0 00-.24 2.19C.004 6.714 0 7.304 0 7.894v8.212c0 .59.004 1.18.01 1.77.017.74.085 1.47.24 2.19.317 1.29 1.06 2.29 2.18 3.04a5.1 5.1 0 001.87.61c.87.2 1.76.28 2.65.28H17.05c.89 0 1.78-.08 2.65-.28a5.1 5.1 0 001.87-.61c1.12-.75 1.86-1.75 2.18-3.04.155-.72.223-1.45.24-2.19.006-.59.01-1.18.01-1.77V7.894c0-.59-.004-1.18-.01-1.77zM16.633 17.34c0 .49-.07.96-.21 1.39-.19.59-.55 1.04-1.08 1.35-.48.28-1.02.42-1.58.44-.2.01-.4 0-.59-.03a1.79 1.79 0 01-1.28-.8 1.87 1.87 0 01-.29-1.04c0-.43.1-.84.31-1.2a1.86 1.86 0 011.14-.87c.29-.08.59-.13.88-.17.42-.05.84-.1 1.26-.18.13-.02.26-.06.37-.14.11-.08.16-.19.16-.34V9.21c0-.18-.05-.34-.16-.45a.7.7 0 00-.44-.18c-.12-.01-.25.01-.36.04l-5.73 1.3c-.14.03-.26.1-.35.2-.09.11-.13.24-.14.38v7.74c0 .49-.06.97-.19 1.43-.17.58-.51 1.04-1.02 1.37-.46.3-.98.47-1.54.51-.2.01-.4.01-.6-.01a1.82 1.82 0 01-1.32-.79c-.2-.3-.32-.64-.34-1.01-.03-.42.06-.83.25-1.2.24-.49.63-.84 1.13-1.04.29-.12.6-.18.91-.22.36-.04.72-.1 1.08-.17.16-.03.31-.08.42-.19.1-.1.14-.24.14-.39V7.08c0-.35.08-.67.27-.95.2-.3.47-.5.81-.6.12-.04.25-.07.38-.1L16.1 4.1c.12-.03.24-.04.36-.04.2 0 .38.06.52.19.15.14.22.32.23.53V17.34z"/>
  </svg>
);

const platformIcons: Record<string, React.ReactNode> = {
  spotify: <SpotifyIcon className="w-5 h-5" />,
  soundcloud: <SoundCloudIcon className="w-7 h-5" />,
  instagram: <InstagramIcon className="w-5 h-5" />,
  tiktok: <TikTokIcon className="w-5 h-5" />,
  youtube: <YouTubeIcon className="w-5 h-5" />,
  facebook: <FacebookIcon className="w-5 h-5" />,
  applemusic: <AppleMusicIcon className="w-5 h-5" />,
};

const platformLabels: Record<string, string> = {
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  applemusic: "Apple Music",
};

interface PlatformButtonProps {
  platform: string;
  url: string;
  variant?: "icon" | "pill" | "card";
  className?: string;
}

const PlatformButton = ({ platform, url, variant = "pill", className }: PlatformButtonProps) => {
  const icon = platformIcons[platform] || <ExternalLink className="w-5 h-5" />;
  const label = platformLabels[platform] || platform;

  if (variant === "icon") {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--glow-purple)/0.3)] transition-all duration-300",
          className
        )}
        aria-label={label}
      >
        {icon}
      </motion.a>
    );
  }

  if (variant === "card") {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-primary/10 bg-card hover:border-primary/30 hover:shadow-[0_0_25px_hsl(var(--glow-purple)/0.15)] transition-all duration-300 group",
          className
        )}
      >
        <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {icon}
        </span>
        <span className="text-sm font-display font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {label}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--glow-purple)/0.2)] transition-all duration-300",
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  );
};

export default PlatformButton;
