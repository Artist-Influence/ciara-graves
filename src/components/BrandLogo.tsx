import ciaraLogo from "@/assets/ciara-logo.png";

interface BrandLogoProps {
  className?: string;
  maxWidth?: string;
}

const BrandLogo = ({ className = "", maxWidth = "max-w-2xl" }: BrandLogoProps) => (
  <img
    src={ciaraLogo}
    alt="CIARA GRAVES"
    className={`logo-knockout w-full ${maxWidth} object-contain ${className}`}
    draggable={false}
  />
);

export default BrandLogo;
