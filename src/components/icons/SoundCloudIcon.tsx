const SoundCloudIcon = ({ className }: { className?: string }) => (
  // SoundCloud — waveform bars on the left feeding into a cloud silhouette on the right.
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    {/* Waveform bars (ascending) */}
    <rect x="1"   y="13" width="0.9" height="4"  rx="0.45" />
    <rect x="2.6" y="11.5" width="0.9" height="6"  rx="0.45" />
    <rect x="4.2" y="10" width="0.9" height="8"  rx="0.45" />
    <rect x="5.8" y="8.5" width="0.9" height="10" rx="0.45" />
    <rect x="7.4" y="7.5" width="0.9" height="11" rx="0.45" />
    <rect x="9"   y="7"   width="0.9" height="12" rx="0.45" />
    {/* Cloud body */}
    <path d="M11 6.6c.5-.3 1.1-.5 1.7-.5 1.9 0 3.5 1.4 3.8 3.2.4-.2.9-.3 1.4-.3 1.7 0 3.1 1.4 3.1 3.1S19.6 15.2 17.9 15.2H11V6.6z" />
  </svg>
);

export default SoundCloudIcon;
