import { cn } from "@/lib/utils";

interface EqualizerBarsProps {
  className?: string;
  bars?: number;
  color?: string; // tailwind text color class for currentColor bars
}

export const EqualizerBars = ({ className, bars = 5, color = "text-toxic" }: EqualizerBarsProps) => (
  <div className={cn("flex items-end gap-[3px] h-5", color, className)} aria-hidden>
    {Array.from({ length: bars }).map((_, i) => (
      <span
        key={i}
        className="w-[3px] h-full bg-current eq-bar"
        style={{ animationDelay: `${(i % bars) * 0.12}s`, animationDuration: `${0.7 + (i % 3) * 0.15}s` }}
      />
    ))}
  </div>
);

export default EqualizerBars;
