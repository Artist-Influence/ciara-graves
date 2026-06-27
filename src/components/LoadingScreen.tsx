import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-noir scanlines grain"
  >
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      className="px-8"
    >
      <img
        src={siteConfig.artist.logoUrl}
        alt={siteConfig.artist.name}
        className="logo-knockout w-[70vw] max-w-sm drop-shadow-[0_0_30px_hsl(var(--cherry-bright)/0.5)]"
      />
    </motion.div>

    <div className="mt-8 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-cream/55 uppercase">
      <span className="w-2 h-2 rounded-full bg-cherry-bright animate-flicker" />
      <span>Tuning Signal · CH 07</span>
    </div>
  </motion.div>
);

export default LoadingScreen;
