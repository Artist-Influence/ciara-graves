import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  fadeHeight?: number; // px
  className?: string;
}

/**
 * Full-bleed background video with force-play polling so playback
 * resumes within ~1s if the browser throttles or pauses the video
 * (common when scrolling between sections on mobile/Safari).
 *
 * Optional top/bottom gradient fades create a soft cross-dissolve
 * between adjacent visualizer sections.
 */
const BackgroundVideo = ({
  src,
  poster,
  overlayOpacity = 0.75,
  fadeTop = true,
  fadeBottom = true,
  fadeHeight = 120,
  className = "",
}: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => video.play().catch(() => {});

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const interval = setInterval(() => {
      if (video.paused || video.ended) tryPlay();
    }, 1000);

    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(interval);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className={`absolute inset-0 w-full h-full object-cover z-0 ${className}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-background z-[1] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      {fadeTop && (
        <div
          className="absolute inset-x-0 top-0 z-[2] pointer-events-none bg-gradient-to-b from-background to-transparent"
          style={{ height: fadeHeight }}
        />
      )}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none bg-gradient-to-t from-background to-transparent"
          style={{ height: fadeHeight }}
        />
      )}
    </>
  );
};

export default BackgroundVideo;
