import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

const GradientBorderCard = ({ children, className, hoverGlow = true }: GradientBorderCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={cn(
      "relative rounded-lg p-px bg-gradient-to-br from-primary/30 via-primary/5 to-transparent",
      hoverGlow && "transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(var(--glow-purple)/0.15)]",
      className
    )}
  >
    <div className="rounded-lg bg-card p-6 h-full flex flex-col">{children}</div>
  </motion.div>
);

export default GradientBorderCard;
