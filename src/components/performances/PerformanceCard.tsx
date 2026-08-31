import type { Performance } from '../../data/performances'
import { formatDate } from '../../lib/utils'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Button } from '../ui/Button'

type Props = {
  performance: Performance
  status: 'upcoming' | 'past'
}

export function PerformanceCard({ performance, status }: Props) {
  const { weekday, month, day, year } = formatDate(performance.date)
  const isPast = status === 'past'

  return (
    <article
      id={performance.id}
      className={`group relative flex scroll-mt-[120px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-400 ${
        isPast ? 'opacity-75 hover:opacity-100' : 'hover:-translate-y-1.5 hover:border-volt/40 hover:shadow-[0_20px_50px_-20px_rgba(255,212,0,0.35)]'
      }`}
    >
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          src={performance.poster}
          alt={`Poster or photo for ${performance.title} at ${performance.venue}`}
          label={`Performance Poster — ${performance.id}`}
          aspectClassName="aspect-[3/4]"
          rounded="rounded-none"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute left-4 top-4 flex flex-col items-center rounded-xl border border-white/10 bg-ink/90 px-3 py-2 text-center leading-none backdrop-blur"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-volt">{month}</span>
          <span className="font-display text-2xl">{day}</span>
        </div>
        {isPast && (
          <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-ink/85 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-paper-dim backdrop-blur">
            Past show
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-volt">
          {weekday}, {month} {day} · {year}
          {performance.time && <> — {performance.time}</>}
        </p>
        <h3 className="font-display text-2xl leading-tight tracking-wide sm:text-[1.7rem]">{performance.title}</h3>
        <p className="font-body text-sm font-semibold text-paper/90">
          {performance.venue} <span className="text-paper-dim">— {performance.city}</span>
        </p>
        {performance.description && (
          <p className="whitespace-pre-line font-body text-sm leading-relaxed text-paper-dim">{performance.description}</p>
        )}

        {!isPast && performance.ticketUrl && (
          <Button href={performance.ticketUrl} external variant="secondary" className="mt-2 w-fit !px-5 !py-2.5 text-sm">
            Tickets &amp; Info
          </Button>
        )}
      </div>
    </article>
  )
}
