import { useState } from 'react'

type Props = {
  /** Path the real image should live at, e.g. "/images/hero-band-photo.jpg" */
  src: string
  alt: string
  /** Short human label shown on the placeholder, e.g. "Hero Band Photo" */
  label: string
  className?: string
  aspectClassName?: string
  /** Load eagerly for above-the-fold images (hero). Defaults to lazy. */
  priority?: boolean
  rounded?: string
  /** CSS object-position, for recentering the crop on a specific photo. Defaults to 'center'. */
  objectPosition?: string
}

const gradients = [
  'linear-gradient(135deg, #1c1c1e 0%, #262208 55%, #1c1c1e 100%)',
  'linear-gradient(135deg, #16161a 0%, #1f1f22 50%, #201a05 100%)',
  'linear-gradient(160deg, #1a1a1a 0%, #24211a 60%, #14140f 100%)',
]

function hashIndex(input: string, mod: number) {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0
  return h % mod
}

/**
 * Drop-in image slot. Renders the real photo once it exists at `src`;
 * until then it shows a branded placeholder card labeled with the
 * expected filename, so it's obvious where each image belongs.
 *
 * To add a real photo: export/save it with the exact filename shown on
 * the placeholder into the matching folder under `public/images/`.
 * No code changes needed — the image appears automatically.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  className = '',
  aspectClassName = 'aspect-[4/5]',
  priority = false,
  rounded = 'rounded-2xl',
  objectPosition = 'center',
}: Props) {
  const [failed, setFailed] = useState(false)
  const gradient = gradients[hashIndex(src, gradients.length)]

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${label} — placeholder image, not yet uploaded`}
        className={`relative flex ${aspectClassName} ${rounded} overflow-hidden border border-white/10 ${className}`}
        style={{ background: gradient }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(45deg,#FFD400_0,#FFD400_2px,transparent_2px,transparent_14px)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-volt/70">
            <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.3" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3.5 16.5L8.5 12.5L12 15.5L16 11L20.5 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-paper/85">{label}</p>
          <p className="font-mono text-[10px] leading-tight text-paper-dim/70 break-all">{src}</p>
        </div>
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-volt/70 to-transparent" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ objectPosition }}
      className={`${aspectClassName} ${rounded} w-full border border-white/10 object-cover ${className}`}
    />
  )
}
