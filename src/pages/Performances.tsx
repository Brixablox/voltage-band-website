import { performances } from '../data/performances'
import { splitPerformances } from '../lib/utils'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { PerformanceCard } from '../components/performances/PerformanceCard'
import { EmptyState } from '../components/performances/EmptyState'

export default function Performances() {
  const { upcoming, past } = splitPerformances(performances)

  return (
    <>
      {/* ============================== PAGE HEADER ============================== */}
      <section className="bg-stage-glow relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-voltage">
          <Reveal trigger="mount" variant="fade">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
              <span className="h-px w-6 bg-volt" aria-hidden="true" />
              Live Dates
            </span>
          </Reveal>
          <Reveal trigger="mount" index={1}>
            <h1 className="text-gradient-volt mt-4 text-[clamp(3rem,9vw,6rem)]">Performances</h1>
          </Reveal>
          <Reveal trigger="mount" index={2}>
            <p className="mt-4 max-w-xl font-body text-base text-paper-dim sm:text-lg">
              {/* EDITABLE: edit shows in src/data/performances.ts — this page sorts them automatically */}
              Catch Voltage live. Every upcoming and past show, in one place.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== UPCOMING ============================== */}
      <section className="py-12 sm:py-16">
        <div className="container-voltage flex flex-col gap-10">
          <SectionHeading eyebrow="Don't Miss Out" title="Upcoming Shows" />
          {upcoming.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((p, i) => (
                <Reveal key={p.id} index={i % 3}>
                  <PerformanceCard performance={p} status="upcoming" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <EmptyState />
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================== PAST ============================== */}
      {past.length > 0 && (
        <section className="border-t border-white/5 py-16 sm:py-20">
          <div className="container-voltage flex flex-col gap-10">
            <SectionHeading eyebrow="Look Back" title="Past Shows" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((p, i) => (
                <Reveal key={p.id} index={i % 3}>
                  <PerformanceCard performance={p} status="past" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
