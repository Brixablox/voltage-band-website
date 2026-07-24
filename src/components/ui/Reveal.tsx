import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay index — multiplied by 0.1s, used for sequenced groups. */
  index?: number
  /** Animation style. 'up' fades + slides, 'scale' fades + scales, 'fade' is opacity-only. */
  variant?: 'up' | 'scale' | 'fade'
  as?: 'div' | 'li'
  /**
   * 'viewport' (default) animates in when scrolled into view — use for
   * below-the-fold content. 'mount' animates immediately on render — use
   * for content that's already in the initial viewport (e.g. the hero),
   * so it doesn't wait on scroll/IntersectionObserver timing.
   */
  trigger?: 'viewport' | 'mount'
}

const variantsByType: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

/**
 * Entrance animation for scroll-revealed or freshly-mounted content.
 * Automatically renders content statically (no motion) when the user
 * prefers reduced motion, so no content is ever hidden or delayed for
 * those users.
 */
export function Reveal({ children, className, index = 0, variant = 'up', as = 'div', trigger = 'viewport' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as]

  if (shouldReduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  const viewportProps =
    trigger === 'viewport' ? { whileInView: 'visible', viewport: { once: true, amount: 0.25 } } : { animate: 'visible' }

  return (
    <Component
      className={className}
      initial="hidden"
      {...viewportProps}
      variants={variantsByType[variant]}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
