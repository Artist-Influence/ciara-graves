import { useEffect, useRef, useState } from "react";

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
 * Lazy-loads when its section nears the viewport, so the initial page weight is
 * just the hero video. Force-play polling for mobile autoplay reliability.
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
  const [load, setLoad] = useState(false);

  // Only fetch the video once its section is within ~half a screen of view.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Force-play (mobile autoplay reliability) once the video has a source.
  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
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
  }, [load, rate]);

  return (
    <video
      ref={ref}
      {...(load ? { src } : {})}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 w-full h-full object-cover ${opacity} ${blend} ${className}`}
    />
  );
};

export default SectionVisualizer;
