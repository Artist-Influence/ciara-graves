import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

const GlowButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
}: GlowButtonProps) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider transition-all duration-300 rounded-md";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:box-glow-hover hover:shadow-[0_0_30px_hsl(var(--glow-purple)/0.4)]",
    outline:
      "border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--glow-purple)/0.2)]",
    ghost:
      "text-muted-foreground hover:text-foreground hover:bg-muted/30",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const MotionLink = motion.a;
  const MotionButton = motion.button;

  if (href) {
    return (
      <MotionLink
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </MotionButton>
  );
};

export default GlowButton;
