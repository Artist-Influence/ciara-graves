import logo from "@/assets/soundcloud-logo.png";

// Uses the official SoundCloud mark as a PNG asset, recolored to white via CSS
// filter so it inherits the surrounding white-icon styling and hover-glow.
const SoundCloudIcon = ({ className }: { className?: string }) => (
  <img
    src={logo}
    alt=""
    aria-hidden
    className={className}
    style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }}
  />
);
export default SoundCloudIcon;
