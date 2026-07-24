import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSongById, songsByOrder } from '../data/songs'
import { usePlayer } from '../player/PlayerContext'
import { MicIcon, InstrumentalIcon, PauseIcon, PlayIcon } from '../player/icons'
import { SongCover } from '../components/originals/SongCover'
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { formatDuration } from '../lib/utils'
import NotFound from './NotFound'

type FieldProps = { label: string; value: string; placeholder?: string; multiline?: boolean }

function DetailField({ label, value, placeholder = 'To be added.', multiline = true }: FieldProps) {
  return (
    <Reveal className="flex flex-col gap-2">
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">{label}</h3>
      {value ? (
        <p className={`font-body text-base leading-relaxed text-paper-dim ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</p>
      ) : (
        <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 font-body text-sm italic text-paper-dim/60">
          {placeholder}
        </p>
      )}
    </Reveal>
  )
}

export default function SongDetail() {
  const { songId } = useParams<{ songId: string }>()
  const song = getSongById(songId)
  const player = usePlayer()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [songId])

  if (!song) return <NotFound />

  const isCurrent = player.currentSong?.id === song.id
  const isPlayingThis = isCurrent && player.isPlaying
  const instrumentalActive = isCurrent && player.version === 'instrumental'
  const vocalActive = isCurrent && player.version === 'vocal'

  function handlePlay(version: 'vocal' | 'instrumental') {
    if (!song) return
    if (isCurrent && player.version === version) {
      player.togglePlay()
    } else {
      player.playSong(song.id, version)
    }
  }

  const otherSongs = songsByOrder.filter((s) => s.id !== song.id)

  return (
    <>
      {/* ============================== HEADER ============================== */}
      <section className="bg-stage-glow relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-voltage">
          <Reveal trigger="mount" variant="fade">
            <Link
              to="/originals"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt hover:text-volt-pale"
            >
              ← Originals
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[20rem_1fr] lg:items-center lg:gap-14">
            <Reveal trigger="mount" index={1} variant="scale">
              <SongCover src={song.cover} title={song.title} priority className="mx-auto w-56 shadow-2xl lg:w-full" />
            </Reveal>

            <div className="flex flex-col items-start gap-5">
              <Reveal trigger="mount" index={1}>
                <h1 className="text-[clamp(2.75rem,7vw,5rem)] text-paper">{song.title}</h1>
              </Reveal>
              <Reveal trigger="mount" index={2} className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wide text-paper-dim">
                <span>{formatDuration(song.durationSeconds)}</span>
                {song.year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{song.year}</span>
                  </>
                )}
                {isCurrent && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-volt">{isPlayingThis ? 'Now Playing' : 'Loaded in Player'}</span>
                  </>
                )}
              </Reveal>

              <Reveal trigger="mount" index={3} className="flex flex-wrap gap-3">
                <div className="flex flex-wrap gap-3">
                  <Button variant={vocalActive ? 'primary' : 'secondary'} onClick={() => handlePlay('vocal')}>
                    <span className="inline-flex items-center gap-2">
                      {vocalActive && isPlayingThis ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                      <MicIcon size={14} />
                      Play Full Song
                    </span>
                  </Button>
                  <Button variant={instrumentalActive ? 'primary' : 'secondary'} onClick={() => handlePlay('instrumental')}>
                    <span className="inline-flex items-center gap-2">
                      {instrumentalActive && isPlayingThis ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                      <InstrumentalIcon size={14} />
                      Play Instrumental
                    </span>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== DETAILS ============================== */}
      <section className="py-16 sm:py-20">
        <div className="container-voltage grid gap-16 lg:grid-cols-[1fr_20rem]">
          <div className="flex flex-col gap-12">
            <DetailField label="Description" value={song.description} placeholder="Song description coming soon." />
            <DetailField label="Meaning & Inspiration" value={song.meaning} placeholder="The story behind this song hasn't been added yet." />
            <DetailField label="Lyrics" value={song.lyrics} placeholder="Lyrics haven't been added yet." />
            <DetailField label="Recording Details" value={song.recordingDetails} placeholder="Recording details coming soon." />
            <DetailField label="Performance History" value={song.performanceHistory} placeholder="No performance history added yet." />
            <DetailField label="Additional Notes" value={song.notes} placeholder="Nothing here yet." />
          </div>

          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-card p-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">Credits</h3>
              {song.credits ? (
                <p className="whitespace-pre-line font-body text-sm leading-relaxed text-paper-dim">{song.credits}</p>
              ) : (
                <p className="font-body text-sm italic text-paper-dim/60">Credits coming soon.</p>
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-card p-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">Release Info</h3>
              {song.releaseInfo ? (
                <p className="whitespace-pre-line font-body text-sm leading-relaxed text-paper-dim">{song.releaseInfo}</p>
              ) : (
                <p className="font-body text-sm italic text-paper-dim/60">
                  Release information coming soon.{song.year ? ` (Recorded ${song.year}.)` : ''}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">Related Images</h3>
              {song.relatedImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {song.relatedImages.map((src) => (
                    <ImagePlaceholder key={src} src={src} alt={`${song.title} related image`} label={song.title} aspectClassName="aspect-square" />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 font-body text-sm italic text-paper-dim/60">
                  No related images yet.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ============================== OTHER SONGS ============================== */}
      {otherSongs.length > 0 && (
        <section className="border-t border-white/5 py-16 sm:py-20">
          <div className="container-voltage flex flex-col gap-8">
            <SectionHeading eyebrow="Keep Listening" title="More Originals" />
            <div className="flex flex-wrap gap-4">
              {otherSongs.map((s) => (
                <Link
                  key={s.id}
                  to={`/originals/${s.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-card p-4 pr-6 transition-colors hover:border-volt/40"
                >
                  <SongCover src={s.cover} title={s.title} className="h-16 w-16" />
                  <div>
                    <p className="font-display text-xl tracking-wide">{s.title}</p>
                    <p className="font-mono text-xs uppercase tracking-wide text-paper-dim group-hover:text-volt">View song →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
