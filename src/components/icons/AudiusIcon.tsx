// Official Audius mark — three stacked chevrons forming an "A".
const AudiusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    {/* Top chevron */}
    <path d="M12 3 8.6 8.8h6.8L12 3z" />
    {/* Middle chevron */}
    <path d="M7.5 10.6 4 16.5h7l1.7-2.95H8.85l1.7-2.95H7.5z M16.5 10.6h-2.35l1.7 2.95H12.7L14.4 16.5h6.6l-4.5-5.9z" />
    {/* Bottom chevron */}
    <path d="M6.4 18.4 4.7 21.3h14.6l-1.7-2.9H6.4z" />
  </svg>
);
export default AudiusIcon;
