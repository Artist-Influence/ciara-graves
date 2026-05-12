import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
  /** tailwind opacity utility e.g. "opacity-20" */
  opacity?: string;
  /** blend mode utility e.g. "mix-blend-screen" */
  blend?: string;
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
      v.play().catch(() => {});
    };
    tryPlay();
    const id = window.setInterval(tryPlay, 1500);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

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
