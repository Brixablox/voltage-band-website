type Props = { className?: string }

/** Decorative jagged "voltage line" used as a section divider. Purely visual. */
export function VoltageDivider({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className={`h-4 w-full text-volt/40 ${className}`}
      aria-hidden="true"
    >
      <polyline
        points="0,12 40,12 52,2 64,22 76,12 400,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
