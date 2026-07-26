import { members } from '../data/members'
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { VoltageDivider } from '../components/ui/VoltageDivider'
import { MemberCard } from '../components/about/MemberCard'

export default function About() {
  return (
    <>
      {/* ============================== PAGE HEADER ============================== */}
      <section className="bg-stage-glow relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-voltage">
          <Reveal trigger="mount" variant="fade">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
              <span className="h-px w-6 bg-volt" aria-hidden="true" />
              About Us
            </span>
          </Reveal>
          <Reveal trigger="mount" index={1}>
            <h1 className="text-gradient-volt mt-4 text-[clamp(3rem,9vw,6rem)]">Our Story</h1>
          </Reveal>
        </div>
      </section>

      {/* ============================== STORY ============================== */}
      <section className="py-4 sm:py-8">
        <div className="container-voltage">
          <Reveal className="mx-auto flex max-w-3xl flex-col gap-6">
            <p className="font-body text-base leading-relaxed text-paper-dim sm:text-lg">
              Voltage is a high-energy rock band from Napa, California, bringing powerful performances,
              technical musicianship, and a genuine love of music to every stage. With driving bass
              lines, dynamic guitar solos, and an electrifying sound, the band performs a mix of rock
              favorites while adding its own style and personality to every song.
            </p>
            <p className="font-body text-base leading-relaxed text-paper-dim sm:text-lg">
              Built on friendship, dedication, and countless hours of practice, Voltage continues to
              grow with every performance. Whether playing at a local event, competing in a battle of
              the bands, or connecting with a new audience, we strive to bring you the best performance
              a band can offer.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-voltage py-4">
        <VoltageDivider />
      </div>

      {/* ============================== GROUP PHOTO ============================== */}
      <section className="py-16 sm:py-20">
        <div className="container-voltage">
          <Reveal variant="scale">
            <ImagePlaceholder
              src="/images/band/band-group-photo.jpg"
              alt="Voltage performing together live on stage"
              label="Band Group Photo (Large)"
              aspectClassName="aspect-[21/9]"
            />
          </Reveal>
        </div>
      </section>

      {/* ============================== MEMBERS ============================== */}
      <section className="border-t border-white/5 py-16 sm:py-20">
        <div className="container-voltage flex flex-col gap-12">
          <SectionHeading eyebrow="The Lineup" title="Meet the Band" align="left" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
