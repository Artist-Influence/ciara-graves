import { cn } from "@/lib/utils";

interface ScanlineOverlayProps {
  className?: string;
  intensity?: "low" | "med" | "high";
}

export const ScanlineOverlay = ({ className, intensity = "low" }: ScanlineOverlayProps) => {
  const opacity = intensity === "high" ? 0.08 : intensity === "med" ? 0.05 : 0.03;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[2] mix-blend-overlay", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(to bottom, hsl(var(--ink) / ${opacity}) 0px, hsl(var(--ink) / ${opacity}) 1px, transparent 1px, transparent 3px)`,
      }}
    />
  );
};

export default ScanlineOverlay;
