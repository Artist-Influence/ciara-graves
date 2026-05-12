// Audius mark — rounded triangle "A" with an inverted-triangle notch at the bottom-center.
const AudiusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M13.5 3.9 C 13.1 3.3 12.6 3 12 3 C 11.4 3 10.9 3.3 10.5 3.9 L2.4 18.6 C 2 19.3 2 20.1 2.4 20.7 C 2.8 21.4 3.5 21.7 4.2 21.7 L19.8 21.7 C 20.5 21.7 21.2 21.4 21.6 20.7 C 22 20.1 22 19.3 21.6 18.6 L13.5 3.9 Z M9.3 18.5 L14.7 18.5 L12 13.7 Z" />
  </svg>
);
export default AudiusIcon;
