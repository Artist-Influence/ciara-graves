import { useRef, useEffect } from "react";

interface SectionBackgroundMediaProps {
  videoUrl?: string;
  posterUrl?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
  fadeTopPercent?: number;
  fadeBottomPercent?: number;
}

const SectionBackgroundMedia = ({
  videoUrl,
  posterUrl,
  overlayOpacity = 0.7,
  children,
  className = "",
  id,
  fadeTopPercent = 15,
  fadeBottomPercent = 15,
}: SectionBackgroundMediaProps) => {
  const hasMedia = videoUrl || posterUrl;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => {});

    tryPlay();

    video.addEventListener("loadeddata", tryPlay, { once: true });

    const interval = setInterval(() => {
      if (video.paused) tryPlay();
    }, 1000);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      clearInterval(interval);
    };
  }, [videoUrl]);

  const t = fadeTopPercent;
  const b = fadeBottomPercent;
  const maskGradient = `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) ${t * 0.25}%, rgba(0,0,0,0.5) ${t * 0.5}%, rgba(0,0,0,0.8) ${t * 0.75}%, black ${t}%, black ${100 - b}%, rgba(0,0,0,0.8) ${100 - b * 0.75}%, rgba(0,0,0,0.5) ${100 - b * 0.5}%, rgba(0,0,0,0.2) ${100 - b * 0.25}%, transparent 100%)`;

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
      >
        {hasMedia && (
          <div className="absolute inset-0">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : posterUrl ? (
              <img
                src={posterUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}
          </div>
        )}

        <div
          className="absolute inset-0 bg-background"
          style={{ opacity: hasMedia ? overlayOpacity : 1 }}
        />

        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />
      </div>

      <div className="relative z-[3]">{children}</div>
    </section>
  );
};

export default SectionBackgroundMedia;
