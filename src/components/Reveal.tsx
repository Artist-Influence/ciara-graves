import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  /** vertical travel in px (default 24) */
  y?: number;
  /** stagger delay in seconds */
  delay?: number;
}

/**
 * Tasteful scroll-in reveal: fade + rise the first time an element enters view.
 * No-ops to a plain div under prefers-reduced-motion.
 */
export const Reveal = ({ children, y = 24, delay = 0, ...rest }: RevealProps) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div {...(rest as HTMLMotionProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
