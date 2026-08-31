import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { navLinks, site } from '../../data/site'
import { InstagramIcon } from '../ui/InstagramIcon'
import { YouTubeIcon } from '../ui/YouTubeIcon'

type Props = {
  open: boolean
  onClose: () => void
}

/** Full-screen animated mobile navigation panel. */
export function MobileMenu({ open, onClose }: Props) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-stage-glow fixed inset-x-0 top-[100px] z-40 max-h-[calc(100svh-100px)] overflow-y-auto border-t border-white/10 bg-ink/98 px-6 pb-10 pt-6 backdrop-blur-lg md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.05 * i, duration: 0.3 }}
              >
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block border-b border-white/10 py-4 font-display text-3xl uppercase tracking-wide transition-colors ${
                      isActive ? 'text-volt' : 'text-paper hover:text-volt'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voltage on Instagram (opens in a new tab): ${site.instagramHandle}`}
              onClick={onClose}
              className="glow-volt inline-flex items-center gap-3 rounded-full bg-volt px-6 py-3.5 font-bold text-ink"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href={site.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voltage on YouTube (opens in a new tab)"
              onClick={onClose}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 font-bold text-paper transition-colors hover:border-volt hover:text-volt"
            >
              <YouTubeIcon />
              YouTube
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
