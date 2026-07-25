type Props = {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

/**
 * Jagged "voltage line" divider separating past shows from upcoming shows
 * on the homepage. Vertical on desktop, swap to `orientation="horizontal"`
 * for the stacked mobile/tablet layout. Purely decorative (role="separator"
 * on the wrapper carries the semantics); the pulse glow is skipped for
 * prefers-reduced-motion, leaving the static bolt in place.
 */
export function ElectricDivider({ orientation = 'vertical', className = '' }: Props) {
  const isVertical = orientation === 'vertical'

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`relative flex items-center justify-center ${isVertical ? 'w-full' : 'h-full w-full'} ${className}`}
    >
      <div
        className={`pointer-events-none absolute rounded-full bg-volt/25 blur-2xl animate-pulse motion-reduce:animate-none ${
          isVertical ? 'inset-y-6 w-3' : 'inset-x-6 h-3'
        }`}
        aria-hidden="true"
      />
      <svg
        viewBox={isVertical ? '0 0 24 400' : '0 0 400 24'}
        preserveAspectRatio="none"
        className={`relative text-volt drop-shadow-[0_0_6px_rgba(255,212,0,0.65)] ${isVertical ? 'h-full w-6' : 'h-6 w-full'}`}
        aria-hidden="true"
      >
        <polyline
          points={
            isVertical
              ? '12,0 12,70 3,92 21,116 12,140 12,230 3,252 21,276 12,300 12,400'
              : '0,12 70,12 92,21 116,3 140,12 230,12 252,21 276,3 300,12 400,12'
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
