// Official SoundCloud "waveform + cloud" mark.
// Simplified single-path silhouette derived from SoundCloud brand assets.
const SoundCloudIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    {/* ascending waveform bars (left side) */}
    <rect x="0"   y="11" width="1.4" height="6"  rx="0.7" />
    <rect x="2.4" y="9"  width="1.4" height="9"  rx="0.7" />
    <rect x="4.8" y="6"  width="1.4" height="13" rx="0.7" />
    <rect x="7.2" y="4"  width="1.4" height="15" rx="0.7" />
    <rect x="9.6" y="5"  width="1.4" height="14" rx="0.7" />
    {/* tallest bar feeding into the cloud */}
    <rect x="12"  y="2"  width="1.4" height="17" rx="0.7" />
    {/* cloud body — pill silhouette extending right */}
    <path d="M14.4 4.2c.6-.4 1.4-.7 2.2-.7 2.6 0 4.7 2 5 4.5.5-.2 1-.3 1.6-.3 2.7 0 4.8 2.1 4.8 4.7 0 2.6-2.1 4.7-4.8 4.7H14.4V4.2z" />
  </svg>
);
export default SoundCloudIcon;
