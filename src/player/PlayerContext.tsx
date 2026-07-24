import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { songsByOrder, getSongById, type Song } from '../data/songs'

export type AudioVersion = 'vocal' | 'instrumental'

type StoredState = {
  songId: string
  version: AudioVersion
  volume: number
  muted: boolean
  desktopMinimized: boolean
  userPaused: boolean
  currentTime: number
}

const STORAGE_KEY = 'voltage-player-v1'

function readStored(): StoredState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredState) : null
  } catch {
    return null
  }
}

function writeStored(state: StoredState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — session memory
    // just won't survive a reload. Not fatal.
  }
}

function srcFor(song: Song, version: AudioVersion): string {
  return version === 'vocal' ? song.vocalSrc : song.instrumentalSrc
}

type LoadIntent = 'continue' | 'play'

type PlayerContextValue = {
  currentSong: Song | undefined
  version: AudioVersion
  isPlaying: boolean
  isLoading: boolean
  hasError: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  desktopMinimized: boolean
  autoplayBlocked: boolean
  showAutoplayPrompt: boolean
  playSong: (songId: string, version?: AudioVersion) => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  changeVolume: (v: number) => void
  toggleMute: () => void
  setDesktopMinimized: (v: boolean) => void
  toggleVersion: () => void
  dismissAutoplayPrompt: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within <PlayerProvider>')
  return ctx
}

const DEFAULT_SONG = songsByOrder[0] as Song | undefined

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pendingSeekRef = useRef<number | null>(null)
  const wasPlayingRef = useRef(false)
  const isFirstSrcSyncRef = useRef(true)
  const autoplayAttemptedRef = useRef(false)
  const pendingLoadOptsRef = useRef<{ resetTime: boolean; intent: LoadIntent }>({ resetTime: false, intent: 'continue' })

  const [stored] = useState<StoredState | null>(() => readStored())

  const [currentSongId, setCurrentSongId] = useState<string>(() => stored?.songId ?? DEFAULT_SONG?.id ?? '')
  // Every fresh page launch starts on the instrumental version — the vocal
  // ("full song") version only ever loads from an explicit user action
  // (the Originals page's "Play Full Song" button, or the in-player
  // version toggle). We intentionally ignore `stored.version` here so a
  // reload never silently resumes vocal playback on its own.
  const [version, setVersionState] = useState<AudioVersion>('instrumental')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => stored?.currentTime ?? 0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(() => stored?.volume ?? 0.7)
  const [muted, setMuted] = useState(() => stored?.muted ?? false)
  const [desktopMinimized, setDesktopMinimized] = useState(() => stored?.desktopMinimized ?? false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)

  const currentSong = useMemo(() => getSongById(currentSongId), [currentSongId])

  // Keep a ref to the latest `next` for the 'ended' listener (registered once).
  const nextRef = useRef<(intent?: LoadIntent) => void>(() => {})

  function next(intent: LoadIntent = 'continue') {
    if (!currentSong) return
    const idx = songsByOrder.findIndex((s) => s.id === currentSong.id)
    const target = songsByOrder[(idx + 1) % songsByOrder.length]
    if (!target) return
    pendingLoadOptsRef.current = { resetTime: true, intent }
    setCurrentSongId(target.id)
  }

  function previous() {
    if (!currentSong) return
    const idx = songsByOrder.findIndex((s) => s.id === currentSong.id)
    const target = songsByOrder[(idx - 1 + songsByOrder.length) % songsByOrder.length]
    if (!target) return
    pendingLoadOptsRef.current = { resetTime: true, intent: 'continue' }
    setCurrentSongId(target.id)
  }

  useEffect(() => {
    nextRef.current = next
  })

  function playSong(songId: string, requestedVersion?: AudioVersion) {
    const song = getSongById(songId)
    if (!song) return
    const nextVersion = requestedVersion ?? version
    if (songId === currentSongId && nextVersion === version) {
      audioRef.current?.play().catch(() => setAutoplayBlocked(true))
      return
    }
    pendingLoadOptsRef.current = { resetTime: true, intent: 'play' }
    setCurrentSongId(songId)
    setVersionState(nextVersion)
  }

  function toggleVersion() {
    if (!currentSong) return
    pendingLoadOptsRef.current = { resetTime: false, intent: 'continue' }
    setVersionState((v) => (v === 'vocal' ? 'instrumental' : 'vocal'))
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio || hasError) return
    if (audio.paused) {
      audio
        .play()
        .then(() => setAutoplayBlocked(false))
        .catch(() => setAutoplayBlocked(true))
    } else {
      audio.pause()
    }
  }

  function seek(time: number) {
    const audio = audioRef.current
    if (!audio || hasError) return
    audio.currentTime = time
    setCurrentTime(time)
  }

  function changeVolume(v: number) {
    const clamped = Math.min(1, Math.max(0, v))
    setVolumeState(clamped)
    if (clamped > 0 && muted) setMuted(false)
  }

  function toggleMute() {
    setMuted((m) => !m)
  }

  function dismissAutoplayPrompt() {
    setPromptDismissed(true)
  }

  // Apply volume/mute to the element whenever they change.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  // Load the current track whenever song or version changes (including mount).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    if (isFirstSrcSyncRef.current) {
      isFirstSrcSyncRef.current = false
      const seed = stored && stored.songId === currentSongId && stored.version === version ? stored.currentTime : 0
      pendingSeekRef.current = seed
      wasPlayingRef.current = false
      setHasError(false)
      setIsLoading(true)
      audio.src = srcFor(currentSong, version)
      audio.load()
      return
    }

    const { resetTime, intent } = pendingLoadOptsRef.current
    pendingLoadOptsRef.current = { resetTime: false, intent: 'continue' }
    const wasPlaying = intent === 'play' ? true : !audio.paused
    pendingSeekRef.current = resetTime ? 0 : audio.currentTime
    wasPlayingRef.current = wasPlaying
    setHasError(false)
    setIsLoading(true)
    audio.src = srcFor(currentSong, version)
    audio.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongId, version])

  // Wire native <audio> events once.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
      if (pendingSeekRef.current != null) {
        audio.currentTime = pendingSeekRef.current
        pendingSeekRef.current = null
      }
      if (wasPlayingRef.current) {
        wasPlayingRef.current = false
        audio.play().catch(() => setAutoplayBlocked(true))
      }
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => nextRef.current('play')
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)
    const onError = () => {
      setHasError(true)
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
    }
  }, [])

  // Attempt autoplay once, after the initial source is assigned above.
  useEffect(() => {
    if (autoplayAttemptedRef.current) return
    autoplayAttemptedRef.current = true
    const audio = audioRef.current
    if (!audio || stored?.userPaused) return
    audio
      .play()
      .then(() => setAutoplayBlocked(false))
      .catch(() => setAutoplayBlocked(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist lightweight session state on change.
  useEffect(() => {
    writeStored({
      songId: currentSongId,
      version,
      volume,
      muted,
      desktopMinimized,
      userPaused: !isPlaying,
      currentTime,
    })
  }, [currentSongId, version, volume, muted, desktopMinimized, isPlaying, currentTime])

  // Snapshot playback position on tab hide/close, so a reload can resume near it.
  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current
      writeStored({
        songId: currentSongId,
        version,
        volume,
        muted,
        desktopMinimized,
        userPaused: audio?.paused ?? true,
        currentTime: audio?.currentTime ?? currentTime,
      })
    }
    window.addEventListener('pagehide', handler)
    document.addEventListener('visibilitychange', handler)
    return () => {
      window.removeEventListener('pagehide', handler)
      document.removeEventListener('visibilitychange', handler)
    }
  }, [currentSongId, version, volume, muted, desktopMinimized, currentTime])

  const value: PlayerContextValue = {
    currentSong,
    version,
    isPlaying,
    isLoading,
    hasError,
    currentTime,
    duration,
    volume,
    muted,
    desktopMinimized,
    autoplayBlocked,
    showAutoplayPrompt: autoplayBlocked && !promptDismissed && !isPlaying,
    playSong,
    togglePlay,
    next: () => next('continue'),
    previous,
    seek,
    changeVolume,
    toggleMute,
    setDesktopMinimized,
    toggleVersion,
    dismissAutoplayPrompt,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} preload="metadata" />
    </PlayerContext.Provider>
  )
}
