/**
 * Original songs.
 *
 * `vocalSrc` / `instrumentalSrc` / `cover` point at files served from
 * `public/`. Audio files live in `public/audio/` — optimized 128kbps
 * web copies of the masters in the repo's top-level `Songs/` folder
 * (which are left untouched). `durationSeconds` and `year` were read
 * directly from each file's embedded metadata, not guessed.
 *
 * Every text field below other than title/order/paths/duration/year is
 * a placeholder for the band to fill in — leave a field as `''` to
 * render nothing (e.g. an empty state) rather than invent content.
 * `relatedImages` and `performanceHistory` can stay empty until there's
 * real material to add.
 *
 * `order` controls display order on the Originals page — lower first.
 */

export type Song = {
  id: string
  title: string
  order: number
  vocalSrc: string
  instrumentalSrc: string
  cover: string
  durationSeconds: number
  year?: number
  shortDescription: string
  description: string
  meaning: string
  credits: string
  releaseInfo: string
  lyrics: string
  recordingDetails: string
  performanceHistory: string
  notes: string
  relatedImages: string[]
}

export const songs: Song[] = [
  {
    id: 'burn',
    title: 'Burn',
    order: 1,
    vocalSrc: '/audio/burn-vocal.mp3',
    instrumentalSrc: '/audio/burn-instrumental.mp3',
    cover: '/images/songs/burn-cover.jpg',
    durationSeconds: 262,
    year: 2025,
    // EDITABLE — all fields below are placeholders for the band to write.
    shortDescription: '',
    description: '',
    meaning: '',
    credits: '',
    releaseInfo: '',
    lyrics: '',
    recordingDetails: '',
    performanceHistory: '',
    notes: '',
    relatedImages: [],
  },
  {
    id: 'eternal-optimist',
    title: 'Eternal Optimist',
    order: 2,
    vocalSrc: '/audio/eternal-optimist-vocal.mp3',
    instrumentalSrc: '/audio/eternal-optimist-instrumental.mp3',
    cover: '/images/songs/eternal-optimist-cover.jpg',
    durationSeconds: 249,
    year: 2025,
    // EDITABLE — all fields below are placeholders for the band to write.
    shortDescription: '',
    description: '',
    meaning: '',
    credits: '',
    releaseInfo: '',
    lyrics: '',
    recordingDetails: '',
    performanceHistory: '',
    notes: '',
    relatedImages: [],
  },
]

export const songsByOrder = [...songs].sort((a, b) => a.order - b.order)

export function getSongById(id: string | undefined | null): Song | undefined {
  return songs.find((s) => s.id === id)
}
