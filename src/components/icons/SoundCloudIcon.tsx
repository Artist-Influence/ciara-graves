// SoundCloud "waveform + cloud" mark — recreated to match the official silhouette:
// ascending lozenge-shaped waveform bars feeding into a chunky two-bump cloud.
const SoundCloudIcon = ({ className }: { className?: string }) => {
  // Bars: x position, vertical center y, half-height (ry). viewBox 0..512 x 0..320.
  // Baseline at y=270; bars are vertically centered around y=210 with growing ry.
  const baseY = 215;
  const bars: Array<{ x: number; ry: number }> = [
    { x: 8,   ry: 18 },
    { x: 24,  ry: 28 },
    { x: 40,  ry: 42 },
    { x: 56,  ry: 56 },
    { x: 72,  ry: 70 },
    { x: 88,  ry: 80 },
    { x: 104, ry: 92 },
    { x: 120, ry: 100 },
    { x: 136, ry: 108 },
    { x: 152, ry: 114 },
    { x: 168, ry: 118 },
    { x: 184, ry: 120 },
    { x: 200, ry: 122 },
    { x: 216, ry: 124 },
    { x: 232, ry: 126 },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 512 320"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {bars.map((b) => (
        <ellipse key={b.x} cx={b.x} cy={baseY} rx={4} ry={b.ry} />
      ))}
      {/* Cloud body: tall left lobe + smaller upper-right puff, flat baseline */}
      <path d="M256 80
        C 256 71, 263 64, 272 64
        C 281 64, 288 71, 288 80
        L 288 305
        C 288 313, 281 320, 272 320
        L 460 320
        C 488.7 320, 512 296.7, 512 268
        C 512 239.3, 488.7 216, 460 216
        C 451 216, 442.6 218.3, 435.3 222.3
        C 430.5 168.7, 385.5 126, 330.5 126
        C 312 126, 294.7 130.9, 280 139.4
        L 280 305
        C 280 313, 273 320, 264 320
        L 272 320
        C 263 320, 256 313, 256 305 Z" />
    </svg>
  );
};
export default SoundCloudIcon;
