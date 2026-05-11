import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  items: string[];
  className?: string;
  speed?: "slow" | "med" | "fast";
}

export const MarqueeTicker = ({ items, className, speed = "med" }: MarqueeTickerProps) => {
  const duration = speed === "slow" ? "60s" : speed === "fast" ? "25s" : "40s";
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-border bg-panel/40", className)}>
      <div
        className="flex w-max items-center gap-12 whitespace-nowrap py-3 animate-marquee"
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-mute"
          >
            <span className="text-signal mr-3">▍</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
