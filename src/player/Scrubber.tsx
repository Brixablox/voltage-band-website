import { formatDuration } from '../lib/utils'

type Props = {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
  disabled?: boolean
  label: string
  compact?: boolean
}

/** Accessible seek bar with a filled-progress track, plus current/total time readout. */
export function Scrubber({ currentTime, duration, onSeek, disabled, label, compact = false }: Props) {
  const safeDuration = duration > 0 ? duration : 0
  const progress = safeDuration > 0 ? (currentTime / safeDuration) * 100 : 0

  return (
    <div className="flex w-full items-center gap-2">
      {!compact && (
        <span className="w-10 shrink-0 text-right font-mono text-[11px] text-paper-dim tabular-nums">
          {formatDuration(currentTime)}
        </span>
      )}
      <input
        type="range"
        min={0}
        max={safeDuration || 1}
        step={0.1}
        value={Math.min(currentTime, safeDuration || 1)}
        disabled={disabled || safeDuration === 0}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={`${formatDuration(currentTime)} of ${formatDuration(safeDuration)}`}
        className="voltage-range h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          background: `linear-gradient(to right, var(--color-volt) ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
        }}
      />
      {!compact && (
        <span className="w-10 shrink-0 font-mono text-[11px] text-paper-dim tabular-nums">
          {formatDuration(safeDuration)}
        </span>
      )}
    </div>
  )
}
