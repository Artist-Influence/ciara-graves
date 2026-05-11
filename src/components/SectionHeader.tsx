import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={`mb-12 md:mb-16 ${className}`}
  >
    <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground text-glow text-readable">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-sm md:text-base uppercase tracking-widest text-muted-foreground text-readable">
        {subtitle}
      </p>
    )}
    <div className="mt-4 h-px w-20 bg-gradient-to-r from-primary to-transparent" />
  </motion.div>
);

export default SectionHeader;
