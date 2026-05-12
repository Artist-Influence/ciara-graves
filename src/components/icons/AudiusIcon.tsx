const AudiusIcon = ({ className }: { className?: string }) => (
  // Audius "A" mark — solid triangle with a triangular notch cut out near the bottom.
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2 1.5 20.5h21L12 2zm0 9.2-3.7 6.4h7.4L12 11.2z"
    />
  </svg>
);
export default AudiusIcon;
