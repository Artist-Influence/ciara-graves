import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
  /** tailwind opacity utility e.g. "opacity-20" */
  opacity?: string;
  /** blend mode utility e.g. "mix-blend-screen" */
  blend?: string;
  /** playback rate (1 = normal, 2 = double speed) */
  rate?: number;
}

/**
 * Full-bleed background visualizer loop.
 * Uses redundant force-play polling for mobile autoplay reliability.
 * Respects prefers-reduced-motion.
 */
const SectionVisualizer = ({
  src,
  className = "",
  opacity = "opacity-20",
  blend = "mix-blend-screen",
  rate = 1,
}: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      v.pause();
      return;
    }
    let cancelled = false;
    const tryPlay = () => {
      if (cancelled || !v) return;
      v.playbackRate = rate;
      v.play().catch(() => {});
    };
    tryPlay();
    const id = window.setInterval(tryPlay, 1500);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [rate]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 w-full h-full object-cover ${opacity} ${blend} ${className}`}
    />
  );
};

export default SectionVisualizer;
