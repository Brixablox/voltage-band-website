import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSongById, songsByOrder } from '../data/songs'
import { usePlayer } from '../player/PlayerContext'
import { MicIcon, InstrumentalIcon, PauseIcon, PlayIcon } from '../player/icons'
import { SongCover } from '../components/originals/SongCover'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { formatDuration } from '../lib/utils'
import NotFound from './NotFound'

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
      {(song.description || song.credits || song.year) && (
        <section className="py-16 sm:py-20">
          <div className={`container-voltage grid gap-16 ${song.credits || song.year ? 'lg:grid-cols-[1fr_20rem]' : ''}`}>
            {song.description && (
              <div className="flex flex-col gap-12">
                <Reveal className="flex flex-col gap-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">Description</h3>
                  <p className="font-body text-base leading-relaxed text-paper-dim">{song.description}</p>
                </Reveal>
              </div>
            )}

            {(song.credits || song.year) && (
              <aside>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-card p-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">Credits</h3>
                  {song.credits && <p className="whitespace-pre-line font-body text-sm leading-relaxed text-paper-dim">{song.credits}</p>}
                  {song.year && <p className="font-body text-sm leading-relaxed text-paper-dim">Recorded in {song.year}.</p>}
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

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
