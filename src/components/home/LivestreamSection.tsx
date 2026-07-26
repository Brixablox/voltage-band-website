import { livestream } from '../../data/livestream'
import { Button } from '../ui/Button'
import { YouTubeIcon } from '../ui/YouTubeIcon'
import { Reveal } from '../ui/Reveal'

/**
 * Temporary homepage livestream banner. Driven entirely by
 * `src/data/livestream.ts` — set `enabled: false` there to take this
 * down cleanly (renders nothing, no leftover spacing) once the stream
 * has ended.
 */
export function LivestreamSection() {
  if (!livestream.enabled) return null

  return (
    <section className="bg-stage-glow relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div className="container-voltage relative flex flex-col gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt/75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
              </span>
              Live
            </span>
          </Reveal>
          <Reveal index={1}>
            <h2 className="text-gradient-volt text-[clamp(2.5rem,7vw,5rem)]">{livestream.heading}</h2>
          </Reveal>
        </div>

        <Reveal index={2} variant="scale" className="mx-auto w-full max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-volt/20 via-transparent to-transparent blur-2xl" aria-hidden="true" />
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${livestream.videoId}`}
              title="Voltage live performance"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal index={3} className="flex justify-center">
          <Button
            href={livestream.youtubeUrl}
            external
            variant="secondary"
            icon={<YouTubeIcon size={18} />}
            aria-label="Watch Voltage's livestream on YouTube (opens in a new tab)"
          >
            Watch on YouTube
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
