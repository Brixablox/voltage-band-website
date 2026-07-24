import { useState } from 'react'

type Props = {
  src: string
  title: string
  className?: string
  rounded?: string
  priority?: boolean
}

const gradients = [
  'linear-gradient(150deg, #1c1c1e 0%, #2b2408 55%, #141414 100%)',
  'linear-gradient(150deg, #17171a 0%, #221c07 55%, #101012 100%)',
]

function hashIndex(input: string, mod: number) {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0
  return h % mod
}

/**
 * Square album-art slot for a song. Shows the real cover once one exists
 * at `src`; until then, renders a branded placeholder built from the
 * song title so the site never shows a broken image or a generic photo.
 * Replace the placeholder by adding a real file at the exact `src` path
 * — no code changes needed.
 */
export function SongCover({ src, title, className = '', rounded = 'rounded-xl', priority = false }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${title} — cover artwork placeholder, not yet uploaded`}
        className={`relative flex aspect-square items-center justify-center overflow-hidden border border-white/10 ${rounded} ${className}`}
        style={{ background: gradients[hashIndex(src, gradients.length)] }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(45deg,#FFD400_0,#FFD400_2px,transparent_2px,transparent_14px)]" />
        <svg
          className="pointer-events-none absolute -bottom-3 -right-3 text-volt/10"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
        <p className="relative px-4 text-center font-display text-lg leading-tight tracking-wide text-paper sm:text-2xl">
          {title}
        </p>
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-volt/70 to-transparent" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${title} cover artwork`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`aspect-square w-full border border-white/10 object-cover ${rounded} ${className}`}
    />
  )
}
