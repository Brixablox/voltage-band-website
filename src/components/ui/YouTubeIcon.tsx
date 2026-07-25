type Props = {
  className?: string
  size?: number
}

/** Standalone YouTube "play button" glyph — matches InstagramIcon's sizing/styling conventions. */
export function YouTubeIcon({ className = '', size = 20 }: Props) {
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
      <rect x="2.5" y="5" width="19" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.3 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" />
    </svg>
  )
}
