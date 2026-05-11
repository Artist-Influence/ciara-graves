import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";
import { cn } from "@/lib/utils";

const COLLAPSE_DELAY = 2500;
const DRAG_COLLAPSE_DELAY = 4000;

const VolumeControl = () => {
  const { volume, isMuted, setVolume, toggleMute } = useBackgroundAudio();
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const collapseTimer = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const scheduleCollapse = (delay = COLLAPSE_DELAY) => {
    if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
    collapseTimer.current = window.setTimeout(() => {
      setExpanded(false);
    }, delay);
  };

  const keepOpen = () => {
    if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
  };

  useEffect(() => {
    return () => {
      if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
    };
  }, []);

  const handleIconClick = () => {
    if (!expanded) {
      setExpanded(true);
      scheduleCollapse();
      return;
    }
    toggleMute();
    scheduleCollapse();
  };

  const showPulse = !isMuted && !prefersReducedMotion;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 1.5, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => {
        setExpanded(true);
        keepOpen();
      }}
      onMouseLeave={() => scheduleCollapse()}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className={cn(
          "flex items-center bg-black/40 backdrop-blur-xl border border-white/10 transition-shadow duration-300 hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)]",
          expanded ? "rounded-2xl pl-4 pr-2 py-2 gap-3" : "rounded-full p-1 shadow-[0_0_12px_hsl(var(--primary)/0.15)]",
        )}
      >
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="slider-area"
              layout
              initial={{ opacity: 0, x: 8, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: 8, width: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-2 overflow-hidden"
              onPointerDown={() => {
                setIsDragging(true);
                keepOpen();
              }}
              onPointerUp={() => {
                setIsDragging(false);
                scheduleCollapse(DRAG_COLLAPSE_DELAY);
              }}
            >
              <div className="w-[140px]">
                <Slider
                  aria-label="Volume"
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(vals) => {
                    setVolume(vals[0] ?? 0);
                    keepOpen();
                  }}
                  onValueCommit={() => scheduleCollapse(isDragging ? DRAG_COLLAPSE_DELAY : COLLAPSE_DELAY)}
                />
              </div>
              <span className="text-[10px] text-white/60 font-mono tabular-nums w-7 text-right">
                {volume}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label="Background music volume"
          onClick={handleIconClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group/btn"
        >
          {/* Hover radial glow */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/30 blur-md opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
          />
          {/* Icon swap */}
          <span className="relative flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {isMuted ? (
                <motion.span
                  key="muted"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <VolumeX className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="unmuted"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={
                    showPulse
                      ? { opacity: [0.85, 1, 0.85], scale: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={
                    showPulse
                      ? { opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.15 } }
                      : { duration: 0.15 }
                  }
                  className="flex"
                >
                  <Volume2 className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default VolumeControl;
