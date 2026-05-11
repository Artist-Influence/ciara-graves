import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "div" | "span";
}

/** Renders text with subtle layered RGB-split glitch layers using ::before/::after via duplicated spans. */
export const GlitchText = ({ children, className, as: Tag = "h2" }: GlitchTextProps) => (
  <Tag className={cn("relative inline-block font-display leading-none", className)}>
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden
      className="glitch-r absolute inset-0 z-0"
      style={{ color: "hsl(var(--alert))" }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="glitch-c absolute inset-0 z-0"
      style={{ color: "hsl(var(--signal))" }}
    >
      {children}
    </span>
  </Tag>
);

export default GlitchText;
