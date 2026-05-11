import { cn } from "@/lib/utils";

interface GridBackdropProps {
  variant?: "lines" | "dots";
  className?: string;
}

export const GridBackdrop = ({ variant = "lines", className }: GridBackdropProps) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0",
      variant === "lines" ? "bg-grid-lines" : "bg-grid-dots",
      className
    )}
  />
);

export default GridBackdrop;
