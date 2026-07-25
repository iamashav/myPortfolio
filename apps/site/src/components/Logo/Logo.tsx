interface LogoProps {
  className?: string;
}

// Inline SVG (not <img>) so it inherits `currentColor` and recolors per context.
export function Logo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 70 72" fill="currentColor" aria-hidden="true">
      <rect x="2" y="6" width="10" height="60" />
      <rect x="22" y="6" width="10" height="60" />
      <rect x="2" y="6" width="30" height="10" />
      <rect x="2" y="30" width="30" height="10" />
      <rect x="42" y="6" width="10" height="60" />
      <rect x="42" y="6" width="26" height="10" />
      <rect x="58" y="6" width="10" height="34" />
      <rect x="42" y="30" width="26" height="10" />
    </svg>
  );
}
