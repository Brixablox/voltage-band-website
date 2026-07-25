import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { SlideshowImage } from '../../data/slideshow'
import { ImagePlaceholder } from './ImagePlaceholder'

type Props = {
  slides: SlideshowImage[]
  aspectClassName?: string
  className?: string
  rounded?: string
  /** Milliseconds between automatic transitions. */
  intervalMs?: number
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Auto-advancing hero image slideshow with crossfade transitions, prev/next
 * controls, dot indicators, swipe support, and keyboard navigation.
 * Pauses on hover/focus and respects prefers-reduced-motion (autoplay and
 * transition animation are both disabled; manual controls still work).
 */
export function HeroSlideshow({ slides, aspectClassName = 'aspect-[16/9]', className = '', rounded = 'rounded-2xl', intervalMs = 6000 }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)

  const count = slides.length
  const goTo = (i: number) => setIndex((i + count) % count)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    if (paused || shouldReduceMotion || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs)
    return () => clearInterval(id)
  }, [paused, shouldReduceMotion, count, intervalMs])

  if (count === 0) return null

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Voltage photo slideshow"
      className={`group relative overflow-hidden ${rounded} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prev()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          next()
        }
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
        if (Math.abs(delta) > 40) {
          if (delta < 0) next()
          else prev()
        }
        touchStartX.current = null
      }}
    >
      <div className={`relative w-full ${aspectClassName}`}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 ${shouldReduceMotion ? '' : 'transition-opacity duration-1000 ease-in-out'} ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ImagePlaceholder
              src={slide.src}
              alt={slide.alt}
              label={`Hero Slideshow — ${slide.id}`}
              aspectClassName="h-full"
              rounded="rounded-none"
              priority={i === 0}
              objectPosition={slide.objectPosition}
              className="h-full border-0"
            />
          </div>
        ))}

        {/* Bottom scrim so dots/arrows stay readable over any photo. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper opacity-0 backdrop-blur transition-opacity duration-300 hover:bg-ink/75 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper opacity-0 backdrop-blur transition-opacity duration-300 hover:bg-ink/75 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRightIcon />
          </button>

          <div role="tablist" aria-label="Choose slide" className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1} of ${count}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-volt' : 'w-2 bg-paper/50 hover:bg-paper/80'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}: {slides[index]?.alt}
      </p>
    </div>
  )
}
