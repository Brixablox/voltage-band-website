import { members } from '../data/members'
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
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
            <h1 className="text-gradient-volt mt-4 text-[clamp(3rem,9vw,6rem)]">The Band</h1>
          </Reveal>
        </div>
      </section>

      {/*
        EDITABLE: The "Our Story" section (band bio + pull-quote) has been
        removed for now so the page goes straight from the header into the
        group photo and lineup below. To bring it back, restore it from
        git history (see the commit that removed it) and re-add the
        VoltageDivider import/usage.
      */}

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
      <section className="py-16 sm:py-20">
        <div className="container-voltage flex flex-col gap-12">
          <SectionHeading eyebrow="The Lineup" title="Meet the Band" align="left" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== SUPPORTING IMAGES ============================== */}
      <section className="border-t border-white/5 py-16 sm:py-20">
        <div className="container-voltage flex flex-col gap-12">
          <SectionHeading eyebrow="More" title="Behind the Music" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Reveal index={0} variant="scale">
              <ImagePlaceholder
                src="/images/band/supporting-1.jpg"
                alt="Placeholder: supporting band photo"
                label="Supporting Photo 1"
                aspectClassName="aspect-[4/5]"
              />
            </Reveal>
            <Reveal index={1} variant="scale">
              <ImagePlaceholder
                src="/images/band/supporting-2.jpg"
                alt="Placeholder: supporting band photo"
                label="Supporting Photo 2"
                aspectClassName="aspect-[4/5]"
              />
            </Reveal>
            <Reveal index={2} variant="scale">
              <ImagePlaceholder
                src="/images/band/supporting-3.jpg"
                alt="Placeholder: supporting band photo"
                label="Supporting Photo 3"
                aspectClassName="aspect-[4/5]"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
