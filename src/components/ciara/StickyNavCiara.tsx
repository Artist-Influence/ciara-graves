import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const links = [
  { href: "#music", label: "MUSIC" },
  { href: "#signal", label: "SIGNAL" },
  { href: "#shows", label: "SHOWS" },
  { href: "#about", label: "ABOUT" },
  { href: "#book", label: "CONTACT" },
];

export const StickyNavCiara = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-noir/80 border-b border-cherry/30"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={siteConfig.artist.logoUrl} alt="Ciara Graves" className="h-7 w-auto logo-cream" />
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[11px] tracking-[0.25em] text-cream-dim hover:text-toxic transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
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
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-mono text-xs tracking-[0.25em] text-cream-dim hover:text-toxic py-2"
                >
                  → {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.booking.email}`}
                className="block font-mono text-xs tracking-[0.25em] text-toxic py-2"
              >
                → CONTACT
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default StickyNavCiara;
