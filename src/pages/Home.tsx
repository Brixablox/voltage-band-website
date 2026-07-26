import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../data/site'
import { members } from '../data/members'
import { galleryImages } from '../data/gallery'
import { performances } from '../data/performances'
import { heroSlides } from '../data/slideshow'
import { splitPerformances, pastShowsToDisplay } from '../lib/utils'
import { Button } from '../components/ui/Button'
import { InstagramIcon } from '../components/ui/InstagramIcon'
import { YouTubeIcon } from '../components/ui/YouTubeIcon'
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder'
import { HeroSlideshow } from '../components/ui/HeroSlideshow'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { VoltageDivider } from '../components/ui/VoltageDivider'
import { PerformanceCard } from '../components/performances/PerformanceCard'
import { EmptyState } from '../components/performances/EmptyState'
import { ElectricDivider } from '../components/home/ElectricDivider'
import { PastShowsCollage } from '../components/home/PastShowsCollage'
import logo from '../assets/logo/voltage-logo.png'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120])

  // Homepage shows derive from the same performances data as /performances —
  // no separate/conflicting copy. Upcoming shows always display in full;
  // past shows are trimmed based on how many upcoming shows there are.
  const { upcoming, past } = splitPerformances(performances)
  const pastPreviewCount = pastShowsToDisplay(upcoming.length)
  const pastPreview = past.slice(0, pastPreviewCount)
  const previewGallery = galleryImages.slice(0, 4)

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section ref={heroRef} className="bg-stage-glow relative flex min-h-[92svh] items-center overflow-hidden pt-24 pb-16">
        <motion.div
          style={{ y: parallaxY }}
          className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          aria-hidden="true"
        >
          <div className="h-full w-full" style={{ background: 'radial-gradient(closest-side, #FFD400, transparent)' }} />
        </motion.div>

        <div className="container-voltage relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <Reveal trigger="mount" variant="scale">
              <img src={logo} alt="Voltage" className="h-16 w-auto sm:h-20 md:h-24" />
            </Reveal>

            <Reveal trigger="mount" index={1}>
              <h1 className="text-[clamp(3rem,10vw,7rem)] text-paper">
                We are{' '}
                <span className="text-gradient-volt block sm:inline">{site.bandName}</span>
              </h1>
            </Reveal>

            <Reveal trigger="mount" index={2}>
              {/* EDITABLE: tagline lives in src/data/site.ts */}
              <p className="max-w-lg font-body text-lg text-paper-dim sm:text-xl">{site.tagline}</p>
            </Reveal>

            <Reveal trigger="mount" index={3} className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button to="/performances">See Our Performances</Button>
              {/* Instagram + YouTube grouped as a pair, in that order, so they wrap together as a unit */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href={site.instagramUrl}
                  external
                  variant="secondary"
                  icon={<InstagramIcon size={16} />}
                  className="!px-5 !py-2.5 !text-sm"
                  aria-label={`Follow Voltage on Instagram (opens in a new tab): ${site.instagramHandle}`}
                >
                  Follow on Instagram
                </Button>
                <Button
                  href={site.youtubeUrl}
                  external
                  variant="secondary"
                  icon={<YouTubeIcon size={16} />}
                  className="!px-5 !py-2.5 !text-sm"
                  aria-label="Watch Voltage on YouTube (opens in a new tab)"
                >
                  Watch on YouTube
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal trigger="mount" index={2} variant="scale" className="relative lg:h-full">
            <div className="relative lg:h-full">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-volt/20 via-transparent to-transparent blur-2xl" aria-hidden="true" />
              <HeroSlideshow
                slides={heroSlides}
                aspectClassName="aspect-[4/5] sm:aspect-[16/9] lg:aspect-auto lg:h-full"
                className="max-h-[64svh] shadow-2xl lg:h-full"
              />
            </div>
          </Reveal>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center" aria-hidden="true">
          <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-paper/30 p-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-volt motion-reduce:animate-none" />
          </span>
        </div>
      </section>

      {/* ============================== ABOUT PREVIEW ============================== */}
      <section className="border-t border-white/5 py-24 sm:py-32">
        <div className="container-voltage grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="scale" className="order-2 lg:order-1">
            <ImagePlaceholder
              src="/images/band/band-group-photo.jpg"
              alt="Voltage performing together live on stage"
              label="Band Group Photo"
              aspectClassName="aspect-[3/2]"
            />
          </Reveal>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionHeading eyebrow="The Band" title="Who We Are" />
            {/* EDITABLE: preview text lives in src/data/site.ts (aboutPreview) */}
            <Reveal index={1}>
              <p className="max-w-lg font-body text-base leading-relaxed text-paper-dim sm:text-lg">{site.aboutPreview}</p>
            </Reveal>
            <Reveal index={2} className="flex flex-wrap gap-3 pt-1">
              <div className="flex -space-x-3">
                {members.map((m) => (
                  <div key={m.id} className="h-12 w-12 overflow-hidden rounded-full border-2 border-ink">
                    <ImagePlaceholder
                      src={m.photo}
                      alt=""
                      label={m.name}
                      aspectClassName="aspect-square"
                      rounded="rounded-none"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal index={3}>
              <Button to="/about" variant="secondary">
                Meet the Band
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container-voltage">
        <VoltageDivider />
      </div>

      {/* ============================== SHOWS ============================== */}
      <section className="py-24 sm:py-32">
        <div className="container-voltage flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Live Dates" title="Shows" />
            <Reveal index={1}>
              <Button to="/performances" variant="ghost">
                All Performances
              </Button>
            </Reveal>
          </div>

          {/*
            Desktop: upcoming (left, ~65%, dominant) — electric divider — past (right, ~35%).
            Mobile/tablet: upcoming first, horizontal divider, smaller past preview below.
            `order-*` handles the reflow; `lg:grid-cols-[...]` only kicks in at lg+.
          */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-6">
            {/* UPCOMING SHOWS — dominant, always first/left */}
            <div className="order-1 flex flex-col lg:h-full">
              {upcoming.length > 0 && (
                <Reveal variant="fade" className="mb-5 shrink-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper-dim">
                    {upcoming.length} Upcoming Show{upcoming.length === 1 ? '' : 's'}
                  </p>
                </Reveal>
              )}
              <div className="flex flex-1 flex-col justify-center">
                {upcoming.length > 0 ? (
                  <div className={`grid gap-6 ${upcoming.length > 1 ? 'sm:grid-cols-2' : 'max-w-md lg:ml-auto'}`}>
                    {upcoming.map((p, i) => (
                      <Reveal key={p.id} index={i}>
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
            </div>

            {/* DIVIDER — vertical on desktop */}
            <div className="order-2 hidden lg:block">
              <ElectricDivider orientation="vertical" className="h-full" />
            </div>
            {/* DIVIDER — horizontal on mobile/tablet, only when there's a past preview to separate */}
            {pastPreview.length > 0 && (
              <div className="order-2 lg:hidden">
                <ElectricDivider orientation="horizontal" className="py-2" />
              </div>
            )}

            {/* PAST SHOWS — always last/right */}
            <div className="order-3 flex flex-col lg:h-full">
              {pastPreview.length > 0 && (
                <>
                  <Reveal variant="fade" className="mb-5 shrink-0">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper-dim">
                      {past.length} Past Show{past.length === 1 ? '' : 's'}
                    </p>
                  </Reveal>
                  <div className="flex-1">
                    <PastShowsCollage shows={pastPreview} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== GALLERY PREVIEW ============================== */}
      <section className="border-t border-white/5 py-24 sm:py-32">
        <div className="container-voltage flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Snapshots" title="From the Gallery" />
            <Reveal index={1}>
              <Button to="/gallery" variant="ghost">
                View Full Gallery
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {previewGallery.map((img, i) => (
              <Reveal key={img.id} index={i % 4} variant="scale">
                <Link to="/gallery" className="group block overflow-hidden rounded-xl border border-white/10" aria-label={`View full gallery — ${img.caption || img.alt}`}>
                  <ImagePlaceholder
                    src={img.src}
                    alt={img.alt}
                    label={img.id}
                    aspectClassName="aspect-square"
                    rounded="rounded-none"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CTA BAND ============================== */}
      <section className="bg-stage-glow relative overflow-hidden border-t border-white/5 py-24 text-center sm:py-28">
        <div className="container-voltage relative flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="text-gradient-volt text-[clamp(2.5rem,7vw,5rem)]">Catch Us Live</h2>
          </Reveal>
          <Reveal index={1}>
            <p className="max-w-xl font-body text-base text-paper-dim sm:text-lg">
              Follow Voltage on Instagram and YouTube for tour announcements, behind-the-scenes content, and ticket drops.
            </p>
          </Reveal>
          <Reveal index={2} className="flex flex-wrap justify-center gap-4 pt-2">
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={site.instagramUrl} external icon={<InstagramIcon size={18} />}>
                @{site.instagramHandle.replace('@', '')}
              </Button>
              <Button href={site.youtubeUrl} external variant="secondary" icon={<YouTubeIcon size={18} />}>
                YouTube
              </Button>
              <Button to="/performances" variant="secondary">
                See Performances
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
