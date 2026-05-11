import { cn } from "@/lib/utils";

interface CornerBracketsProps {
  className?: string;
  size?: number;
  color?: string;
}

/** Decorative corner brackets framing a panel. */
export const CornerBrackets = ({
  className,
  size = 14,
  color = "hsl(var(--signal))",
}: CornerBracketsProps) => {
  const stroke = 1.5;
  const style = { stroke: color, strokeWidth: stroke, fill: "none" };
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      {/* Top-left */}
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <path d={`M 0 ${size} L 0 0 L ${size} 0`} style={style} />
      </svg>
      {/* Top-right */}
      <svg className="absolute top-0 right-0" width={size} height={size}>
        <path d={`M 0 0 L ${size} 0 L ${size} ${size}`} style={style} />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-0 left-0" width={size} height={size}>
        <path d={`M 0 0 L 0 ${size} L ${size} ${size}`} style={style} />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-0 right-0" width={size} height={size}>
        <path d={`M ${size} 0 L ${size} ${size} L 0 ${size}`} style={style} />
      </svg>
    </div>
  );
};

export default CornerBrackets;
