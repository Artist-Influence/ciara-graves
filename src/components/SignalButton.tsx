import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "signal" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-background hover:bg-signal hover:text-ink hover:shadow-[0_0_30px_hsl(var(--signal)/0.6)] border border-ink hover:border-signal",
  signal:
    "bg-transparent text-ink border border-ink/40 hover:border-signal hover:text-signal hover:shadow-[0_0_24px_hsl(var(--signal)/0.35)]",
  ghost:
    "bg-transparent text-mute hover:text-ink border border-transparent",
};

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.2em] font-medium transition-all duration-200 notch-corners group overflow-hidden disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";

function Inner({ children, variant = "primary" }: { children: React.ReactNode; variant: Variant }) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">[</span>
        <span>{children}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">]</span>
      </span>
      {variant === "signal" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
      )}
    </>
  );
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {}
interface AnchorProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string;
  external?: boolean;
}

export const SignalButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...rest}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  )
);
SignalButton.displayName = "SignalButton";

export const SignalLink = ({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external = true,
  ...rest
}: AnchorProps) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
    {...rest}
  >
    <Inner variant={variant}>{children}</Inner>
  </a>
);
