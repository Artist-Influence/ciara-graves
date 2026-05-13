import logo from "@/assets/audius-logo.png";

// Renders the Audius PNG as a CSS mask so it inherits currentColor
// (matches the grey/hover behavior of the other social icons).
const AudiusIcon = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={className}
    style={{
      display: "inline-block",
      backgroundColor: "currentColor",
      WebkitMaskImage: `url(${logo})`,
      maskImage: `url(${logo})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);
export default AudiusIcon;
