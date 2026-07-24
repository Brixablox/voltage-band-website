import { usePlayer } from './PlayerContext'
import { MuteIcon, VolumeIcon } from './icons'

type Props = { className?: string }

export function VolumeControl({ className = '' }: Props) {
  const { volume, muted, changeVolume, toggleMute } = usePlayer()
  const isMuted = muted || volume === 0

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        aria-pressed={isMuted}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-volt"
      >
        {isMuted ? <MuteIcon size={18} /> : <VolumeIcon size={18} />}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        aria-label="Volume"
        className="voltage-range h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-white/15"
        style={{
          background: `linear-gradient(to right, var(--color-volt) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(isMuted ? 0 : volume) * 100}%)`,
        }}
      />
    </div>
  )
}
