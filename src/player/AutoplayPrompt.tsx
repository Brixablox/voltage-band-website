import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePlayer } from './PlayerContext'
import { CloseIcon, PlayIcon } from './icons'

/** Tasteful prompt shown once when the browser blocks autoplay of the background instrumental. */
export function AutoplayPrompt() {
  const player = usePlayer()
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {player.showAutoplayPrompt && player.currentSong && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-[4.5rem] z-40 flex justify-center px-4"
        >
          <div className="glow-volt flex items-center gap-3 rounded-full border border-volt/40 bg-ink-card/95 py-2 pl-2 pr-3 shadow-2xl backdrop-blur-lg">
            <button
              type="button"
              onClick={player.togglePlay}
              className="flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-body text-sm font-bold text-ink transition-transform hover:scale-[1.03]"
            >
              <PlayIcon size={16} className="translate-x-0.5" />
              Play Voltage Music
            </button>
            <button
              type="button"
              onClick={player.dismissAutoplayPrompt}
              aria-label="Dismiss"
              className="flex h-7 w-7 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-paper"
            >
              <CloseIcon size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
