import type { Performance } from '../../data/performances'
import { PastShowCard } from './PastShowCard'
import { Reveal } from '../ui/Reveal'

type Props = { shows: Performance[] }

/**
 * Deliberately staggered, poster-collage layout for past shows: the most
 * recent show gets a full-width "featured" card, and the rest fall into a
 * 2-column grid with a fixed alternating vertical offset. Every value here
 * (rotation, offset) is a fixed lookup by position — not randomized — so
 * the arrangement is identical on every render and scales predictably as
 * more past shows are added, instead of stacking into one very tall column.
 */
export function PastShowsCollage({ shows }: Props) {
  if (shows.length === 0) return null

  const [featured, ...rest] = shows

  return (
    <div className="flex h-full flex-col justify-center gap-4 py-2">
      {featured && (
        <Reveal variant="up">
          <PastShowCard show={featured} index={0} />
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {rest.map((show, i) => (
            <Reveal key={show.id} index={(i + 1) % 4} variant="up" className={i % 2 === 1 ? 'mt-6' : ''}>
              <PastShowCard show={show} index={i + 1} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
