import { Link } from 'react-router-dom'
import type { Performance } from '../../data/performances'
import { formatDate } from '../../lib/utils'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

type Props = { show: Performance; index: number; className?: string }

// Fixed, deterministic rotation set — indexed by position so the same
// show always gets the same tilt (no per-render randomness, no layout
// shift). Small enough that nothing clips or overlaps unreadably.
const ROTATIONS = ['-rotate-[2deg]', 'rotate-[2deg]', '-rotate-[1deg]', 'rotate-[2.5deg]', '-rotate-[1.5deg]']

/** Small, tilted collage card for a past show — image, name, and date only. */
export function PastShowCard({ show, index, className = '' }: Props) {
  const { month, day, year } = formatDate(show.date)
  const rotate = ROTATIONS[index % ROTATIONS.length]

  return (
    <Link
      to="/performances"
      aria-label={`${show.title} — ${month} ${day}, ${year}. View on the Performances page.`}
      className={`group relative block w-full ${rotate} overflow-hidden rounded-xl border border-white/10 bg-ink-card shadow-lg transition-transform duration-300 hover:z-10 hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none ${className}`}
    >
      <ImagePlaceholder
        src={show.poster}
        alt={`Poster for ${show.title}`}
        label={`Past Show — ${show.id}`}
        aspectClassName="aspect-[3/4]"
        rounded="rounded-none"
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-3 pt-8">
        <p className="font-mono text-[9px] font-bold uppercase tracking-wide text-volt">
          {month} {day}, {year}
        </p>
        <p className="truncate font-display text-sm tracking-wide text-paper">{show.title}</p>
      </div>
    </Link>
  )
}
