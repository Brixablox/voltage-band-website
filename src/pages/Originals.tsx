import { songsByOrder } from '../data/songs'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SongCard } from '../components/originals/SongCard'

export default function Originals() {
  return (
    <>
      {/* ============================== PAGE HEADER ============================== */}
      <section className="bg-stage-glow relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-voltage">
          <Reveal trigger="mount" variant="fade">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
              <span className="h-px w-6 bg-volt" aria-hidden="true" />
              Original Music
            </span>
          </Reveal>
          <Reveal trigger="mount" index={1}>
            <h1 className="text-gradient-volt mt-4 text-[clamp(3rem,9vw,6rem)]">Originals</h1>
          </Reveal>
          <Reveal trigger="mount" index={2}>
            <p className="mt-4 max-w-xl font-body text-base text-paper-dim sm:text-lg">
              Voltage's original songs, in both full-band and instrumental form. Hit play below — it
              keeps going as you browse the rest of the site.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== SONGS ============================== */}
      <section className="pb-24 sm:pb-32">
        <div className="container-voltage flex flex-col gap-12">
          <SectionHeading eyebrow="Discography" title="The Songs" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {songsByOrder.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
