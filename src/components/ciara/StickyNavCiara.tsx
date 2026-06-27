import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const links = [
  { href: "#music", label: "MUSIC" },
  { href: "#shows", label: "SHOWS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export const StickyNavCiara = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  // Scroll state + reading-progress line
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-noir/80 border-b border-cherry/30" : "bg-transparent"
      )}
    >
      {/* Reading-progress scan line */}
      <div
        className="absolute bottom-0 left-0 h-px bg-cherry-bright shadow-[0_0_8px_hsl(var(--cherry-bright))]"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <nav className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={siteConfig.artist.logoUrl} alt="Ciara Graves" className="h-7 w-auto logo-knockout" />
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative font-mono text-[11px] tracking-[0.25em] transition-colors",
                    isActive ? "text-cherry-bright" : "text-cream-dim hover:text-toxic"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-cherry-bright shadow-[0_0_6px_hsl(var(--cherry-bright))]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={`mailto:${siteConfig.booking.email}`}
          className="hidden md:inline-flex font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-2 border border-cherry text-cream hover:bg-cherry hover:text-cream transition-colors clip-notch"
        >
          ✦ Contact
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream font-mono text-xs border border-cream/40 px-3 py-1.5"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-cherry/30 bg-noir/95 backdrop-blur">
          <ul className="container flex flex-col py-3 gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block font-mono text-xs tracking-[0.25em] py-2 transition-colors",
                      isActive ? "text-cherry-bright" : "text-cream-dim hover:text-toxic"
                    )}
                  >
                    → {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default StickyNavCiara;
