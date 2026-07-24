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
        <div className="container-voltage grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            {/*
              EDITABLE: This is placeholder biography copy. Replace the
              paragraphs below with your band's real story — how you
              formed, your sound, and what drives your live shows.
            */}
            <p className="font-body text-base leading-relaxed text-paper-dim sm:text-lg">
              [Placeholder] This is where the story of {"Voltage"} begins. Write about how the band came
              together — the first rehearsal, the chemistry that clicked, and the sound you set out to
              create. Replace this paragraph with your own words.
            </p>
            <p className="font-body text-base leading-relaxed text-paper-dim sm:text-lg">
              [Placeholder] Talk about your influences, your live show, and what makes Voltage different
              from any other band on the bill. This is your space to set the tone for who you are.
            </p>
            <p className="font-body text-base leading-relaxed text-paper-dim sm:text-lg">
              [Placeholder] Close with where the band is headed next — upcoming releases, tour plans, or
              the mission driving the music forward.
            </p>
          </Reveal>

          <Reveal variant="scale">
            <blockquote className="relative flex h-full flex-col justify-center gap-4 rounded-2xl border border-white/10 bg-ink-card p-8">
              <span className="font-display text-6xl leading-none text-volt/40" aria-hidden="true">
                &ldquo;
              </span>
              {/* EDITABLE: pull-quote placeholder */}
              <p className="font-display text-2xl leading-snug tracking-wide sm:text-3xl">
                Replace this with a short, memorable quote from the band.
              </p>
              <cite className="font-body text-sm not-italic text-paper-dim">— Member Name, Voltage</cite>
            </blockquote>
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
