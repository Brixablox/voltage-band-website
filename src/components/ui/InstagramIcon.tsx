type Props = {
  className?: string
  size?: number
}

/** Standalone Instagram glyph — used instead of a raster logo so it scales crisply and inherits color. */
export function InstagramIcon({ className = '', size = 20 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
    </svg>
  )
}
