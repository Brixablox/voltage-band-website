import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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

/** Compact bottom bar on mobile; taps expand into a full-height player sheet. */
export function MobilePlayer() {
  const player = usePlayer()
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const { currentSong, version, isPlaying, isLoading, hasError, currentTime, duration } = player

  if (!currentSong) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      {/* Collapsed bar */}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={`Now playing: ${currentSong.title}, ${version}. Tap to expand player.`}
          className="flex w-full items-center gap-3 border-t border-white/10 bg-ink-card/98 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-left backdrop-blur-lg"
        >
          <SongCover src={currentSong.cover} title={currentSong.title} className="h-11 w-11 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-sm font-bold text-paper">{currentSong.title}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-wide text-volt">
              {version === 'vocal' ? 'Full Song' : 'Instrumental'}
            </p>
          </div>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              player.togglePlay()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                player.togglePlay()
              }
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="glow-volt flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-volt text-ink"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
            ) : isPlaying ? (
              <PauseIcon size={20} />
            ) : (
              <PlayIcon size={20} className="translate-x-0.5" />
            )}
          </span>
        </button>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            role="region"
            aria-label="Music player, expanded"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-stage-glow flex max-h-[88svh] flex-col gap-5 overflow-y-auto rounded-t-3xl border-t border-white/10 bg-ink px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse player"
              className="mx-auto flex h-8 w-16 items-center justify-center text-paper-dim"
            >
              <ChevronDownIcon size={22} />
            </button>

            <SongCover src={currentSong.cover} title={currentSong.title} className="mx-auto w-48 shadow-2xl" priority />

            <div className="text-center">
              <p className="font-display text-2xl tracking-wide">{currentSong.title}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-volt">
                {version === 'vocal' ? <MicIcon size={11} /> : <InstrumentalIcon size={11} />}
                {version === 'vocal' ? 'Full Song' : 'Instrumental'}
              </span>
              {hasError && <p className="mt-2 font-mono text-[10px] text-paper-dim">Audio unavailable</p>}
            </div>

            <Scrubber currentTime={currentTime} duration={duration} onSeek={player.seek} disabled={hasError} label={`Seek ${currentSong.title}`} />

            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={player.previous}
                aria-label="Previous song"
                className="flex h-12 w-12 items-center justify-center rounded-full text-paper transition-colors hover:text-volt"
              >
                <SkipPreviousIcon size={24} />
              </button>
              <button
                type="button"
                onClick={player.togglePlay}
                disabled={hasError}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="glow-volt flex h-16 w-16 items-center justify-center rounded-full bg-volt text-ink transition-transform active:scale-95 disabled:opacity-40"
              >
                {isLoading ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
                ) : isPlaying ? (
                  <PauseIcon size={28} />
                ) : (
                  <PlayIcon size={28} className="translate-x-1" />
                )}
              </button>
              <button
                type="button"
                onClick={player.next}
                aria-label="Next song"
                className="flex h-12 w-12 items-center justify-center rounded-full text-paper transition-colors hover:text-volt"
              >
                <SkipNextIcon size={24} />
              </button>
            </div>

            <button
              type="button"
              onClick={player.toggleVersion}
              className="mx-auto rounded-full border border-white/15 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-paper-dim transition-colors hover:border-volt hover:text-volt"
            >
              {version === 'vocal' ? 'Switch to Instrumental' : 'Switch to Full Song'}
            </button>

            <VolumeControl className="mx-auto w-full max-w-xs [&>input]:flex-1" />

            <button
              type="button"
              onClick={() => {
                setExpanded(false)
                navigate(`/originals/${currentSong.id}`)
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 font-mono text-xs font-bold uppercase tracking-wide text-volt transition-colors hover:border-volt"
            >
              <MusicNoteIcon size={14} />
              Learn More
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
