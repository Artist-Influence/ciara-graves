// SoundCloud "waveform + cloud" mark — recreated to match the official silhouette:
// ascending lozenge-shaped waveform bars feeding into a two-bump cloud, flat baseline.
const SoundCloudIcon = ({ className }: { className?: string }) => {
  // ViewBox 0..512 x 0..320; bars are vertically centered around midline y=160.
  const cy = 160;
  const bars: Array<{ x: number; ry: number }> = [
    { x: 8,   ry: 18 },
    { x: 24,  ry: 28 },
    { x: 40,  ry: 42 },
    { x: 56,  ry: 56 },
    { x: 72,  ry: 70 },
    { x: 88,  ry: 82 },
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
        <ellipse key={b.x} cx={b.x} cy={cy} rx={4} ry={b.ry} />
      ))}
      {/* Cloud silhouette built from overlapping primitives, all currentColor */}
      <rect x="252" y="170" width="240" height="116" rx="6" />
      <circle cx="320" cy="170" r="70" />
      <circle cx="412" cy="150" r="58" />
      <circle cx="470" cy="220" r="66" />
    </svg>
  );
};
export default SoundCloudIcon;
