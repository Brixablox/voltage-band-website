import { useNavigate } from 'react-router-dom'
import { usePlayer } from './PlayerContext'
import { Scrubber } from './Scrubber'
import { VolumeControl } from './VolumeControl'
import { SongCover } from '../components/originals/SongCover'
import {
  ChevronDownIcon,
  InstrumentalIcon,
  MicIcon,
  MusicNoteIcon,
  PauseIcon,
  PlayIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from './icons'

/** Floating bottom-right player panel for desktop/tablet. Collapses to a small restore button. */
export function DesktopPlayer() {
  const player = usePlayer()
  const navigate = useNavigate()
  const { currentSong, version, isPlaying, isLoading, hasError, currentTime, duration, desktopMinimized } = player

  if (!currentSong) return null

  if (desktopMinimized) {
    return (
      <button
        type="button"
        onClick={() => player.setDesktopMinimized(false)}
        aria-label={`Restore music player — ${currentSong.title} (${version})`}
        className="glow-volt fixed bottom-6 right-6 z-40 hidden h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-ink-card shadow-2xl transition-transform duration-300 hover:scale-105 md:flex"
      >
        <SongCover src={currentSong.cover} title={currentSong.title} rounded="rounded-full" className="h-full" />
        {isPlaying && (
          <span className="absolute inset-0 rounded-full ring-2 ring-volt/70 motion-safe:animate-pulse" aria-hidden="true" />
        )}
      </button>
    )
  }

  return (
    <div
      role="region"
      aria-label="Music player"
      className="fixed bottom-6 right-6 z-40 hidden w-[22rem] max-w-[calc(100vw-3rem)] flex-col gap-3 rounded-2xl border border-white/10 bg-ink-card/95 p-4 shadow-2xl backdrop-blur-lg md:flex"
    >
      <div className="flex items-start gap-3">
        <SongCover src={currentSong.cover} title={currentSong.title} className="h-14 w-14 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-tight tracking-wide">{currentSong.title}</p>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-volt">
            {version === 'vocal' ? <MicIcon size={11} /> : <InstrumentalIcon size={11} />}
            {version === 'vocal' ? 'Full Song' : 'Instrumental'}
          </span>
          {hasError && <p className="mt-1 font-mono text-[10px] text-paper-dim">Audio unavailable</p>}
        </div>
        <button
          type="button"
          onClick={() => player.setDesktopMinimized(true)}
          aria-label="Minimize player"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-volt"
        >
          <ChevronDownIcon size={18} />
        </button>
      </div>

      <Scrubber currentTime={currentTime} duration={duration} onSeek={player.seek} disabled={hasError} label={`Seek ${currentSong.title}`} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={player.previous}
            aria-label="Previous song"
            className="flex h-9 w-9 items-center justify-center rounded-full text-paper transition-colors hover:text-volt"
          >
            <SkipPreviousIcon size={18} />
          </button>
          <button
            type="button"
            onClick={player.togglePlay}
            disabled={hasError}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="glow-volt flex h-11 w-11 items-center justify-center rounded-full bg-volt text-ink transition-transform duration-200 hover:scale-105 disabled:opacity-40"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
            ) : isPlaying ? (
              <PauseIcon size={20} />
            ) : (
              <PlayIcon size={20} className="translate-x-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={player.next}
            aria-label="Next song"
            className="flex h-9 w-9 items-center justify-center rounded-full text-paper transition-colors hover:text-volt"
          >
            <SkipNextIcon size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={player.toggleVersion}
          className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-paper-dim transition-colors hover:border-volt hover:text-volt"
        >
          {version === 'vocal' ? 'Switch to Instrumental' : 'Switch to Full Song'}
        </button>

        <VolumeControl className="hidden lg:flex" />
      </div>

      <button
        type="button"
        onClick={() => navigate(`/originals/${currentSong.id}`)}
        className="flex items-center justify-center gap-1.5 rounded-full py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-volt transition-colors hover:text-volt-pale"
      >
        <MusicNoteIcon size={13} />
        Learn More
      </button>
    </div>
  )
}
