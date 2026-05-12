// Official Audius mark — rounded triangle with a small notched cutout on the lower-left.
const AudiusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinejoin="round"
    strokeLinecap="round"
    fillRule="evenodd"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M12 4 L20.5 19.5 L3.5 19.5 Z M6.5 16.6 L10.5 16.6 L8.5 19.5 Z" />
  </svg>
);
export default AudiusIcon;
