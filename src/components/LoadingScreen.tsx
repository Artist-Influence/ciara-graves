import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-noir"
  >
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="px-8"
    >
      <img
        src={siteConfig.artist.logoUrl}
        alt={siteConfig.artist.name}
        className="invert w-[70vw] max-w-sm drop-shadow-[0_0_30px_hsl(var(--cherry-bright)/0.5)]"
      />
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
