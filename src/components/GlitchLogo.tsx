import klusterFluxLogo from "@/assets/klusterflux-logo-white.png";

interface GlitchLogoProps {
  className?: string;
  maxWidth?: string;
}

const GlitchLogo = ({ className = "", maxWidth = "max-w-[280px] sm:max-w-[360px]" }: GlitchLogoProps) => {
  return (
    <div className={`glitch-logo relative inline-block w-full ${maxWidth} ${className}`}>
      {/* Base layer */}
      <img
        src={klusterFluxLogo}
        alt="KLUSTER FLUX"
        className="relative z-10 w-full object-contain select-none"
        style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
        draggable={false}
      />
      {/* Red shifted layer */}
      <img
        src={klusterFluxLogo}
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-layer-red absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />
      {/* Cyan shifted layer */}
      <img
        src={klusterFluxLogo}
        alt=""
        aria-hidden="true"
        className="glitch-layer glitch-layer-cyan absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
};

export default GlitchLogo;
