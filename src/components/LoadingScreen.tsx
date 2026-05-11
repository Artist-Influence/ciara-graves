import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background"
  >
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="px-8"
    >
      <BrandLogo maxWidth="max-w-sm" />
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
