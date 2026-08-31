import { Link } from 'react-router-dom'
import type { Song } from '../../data/songs'
import { usePlayer } from '../../player/PlayerContext'
import { PauseIcon, PlayIcon, InstrumentalIcon, MicIcon } from '../../player/icons'
import { SongCover } from './SongCover'
import { Reveal } from '../ui/Reveal'
import { formatDuration } from '../../lib/utils'

type Props = { song: Song; index: number }

export function SongCard({ song, index }: Props) {
  const player = usePlayer()
  const isCurrent = player.currentSong?.id === song.id
  const isPlayingThis = isCurrent && player.isPlaying

  function handlePlay(version: 'vocal' | 'instrumental') {
    if (isCurrent && player.version === version) {
      player.togglePlay()
    } else {
      player.playSong(song.id, version)
    }
  }

  const instrumentalActive = isCurrent && player.version === 'instrumental'
  const vocalActive = isCurrent && player.version === 'vocal'

  return (
    <Reveal index={index % 3} variant="up">
      <article
        className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-ink-card transition-all duration-400 hover:-translate-y-1.5 ${
          isCurrent ? 'border-volt/50 shadow-[0_20px_60px_-24px_rgba(255,212,0,0.4)]' : 'border-white/10 hover:border-volt/30'
        }`}
      >
        <div className="relative">
          <SongCover
            src={song.cover}
            title={song.title}
            rounded="rounded-none"
            className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
          />
          {isCurrent && (
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-volt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink">
              <span className="relative flex h-1.5 w-1.5">
                {isPlayingThis && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60 motion-reduce:animate-none" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              {isPlayingThis ? 'Now Playing' : 'Loaded'}
            </span>
          )}
          <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 font-mono text-[10px] text-paper-dim backdrop-blur">
            {formatDuration(song.durationSeconds)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="font-display text-3xl tracking-wide">{song.title}</h3>
            {song.year && <p className="mt-1 font-mono text-xs uppercase tracking-wide text-paper-dim">{song.year}</p>}
          </div>

          {/* EDITABLE — set description in src/data/songs.ts */}
          {song.description && <p className="font-body text-sm leading-relaxed text-paper-dim">{song.description}</p>}

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handlePlay('instrumental')}
              aria-pressed={instrumentalActive}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-bold transition-all duration-300 ${
                instrumentalActive
                  ? 'bg-volt text-ink shadow-[0_0_24px_-6px_rgba(255,212,0,0.7)]'
                  : 'border border-white/15 text-paper hover:border-volt hover:text-volt'
              }`}
            >
              {instrumentalActive && isPlayingThis ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
              <InstrumentalIcon size={13} />
              Instrumental
            </button>
            <button
              type="button"
              onClick={() => handlePlay('vocal')}
              aria-pressed={vocalActive}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-bold transition-all duration-300 ${
                vocalActive
                  ? 'bg-volt text-ink shadow-[0_0_24px_-6px_rgba(255,212,0,0.7)]'
                  : 'border border-white/15 text-paper hover:border-volt hover:text-volt'
              }`}
            >
              {vocalActive && isPlayingThis ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
              <MicIcon size={13} />
              Full Song
            </button>
          </div>

          <Link
            to={`/originals/${song.id}`}
            className="mt-auto inline-flex w-fit items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide text-volt transition-colors hover:text-volt-pale"
          >
            Learn More →
          </Link>
        </div>
      </article>
    </Reveal>
  )
}
