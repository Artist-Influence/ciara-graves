import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SignalLink } from "@/components/SignalButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { id: "music", label: "MUSIC" },
  { id: "shows", label: "SHOWS" },
  { id: "about", label: "ABOUT" },
  { id: "epk", label: "EPK" },
  { id: "contact", label: "CONTACT" },
];

export const StickyNavPierce = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-background/70 border-b border-border shadow-[0_1px_0_0_hsl(var(--signal)/0.2)]"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
            aria-label="PIERCE — home"
          >
            <img
              src={siteConfig.artist.logoUrl}
              alt="PIERCE"
              className="h-5 w-auto opacity-90 group-hover:opacity-100 transition"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="relative font-mono text-[11px] uppercase tracking-[0.25em] text-mute hover:text-ink transition group"
              >
                <span className="group-hover:translate-x-[1px] inline-block transition-transform">
                  {l.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <SignalLink href={siteConfig.socials.spotify} variant="primary" size="sm">
              LISTEN NOW
            </SignalLink>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 pt-16">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(l.id)}
                  className="font-display text-5xl tracking-wider text-ink hover:text-signal transition"
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="mt-6">
                <SignalLink href={siteConfig.socials.spotify} variant="primary" size="md">
                  LISTEN NOW
                </SignalLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyNavPierce;
