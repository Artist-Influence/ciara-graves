import klusterFluxLogo from "@/assets/klusterflux-logo-white.png";

interface BrandLogoProps {
  className?: string;
  maxWidth?: string;
}

const BrandLogo = ({ className = "", maxWidth = "max-w-2xl" }: BrandLogoProps) => (
  <img
    src={klusterFluxLogo}
    alt="KLUSTER FLUX"
    className={`w-full ${maxWidth} object-contain ${className}`}
    draggable={false}
  />
);

export default BrandLogo;
