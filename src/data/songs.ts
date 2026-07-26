/**
 * Original songs.
 *
 * `vocalSrc` / `instrumentalSrc` / `cover` point at files served from
 * `public/`. Audio files live in `public/audio/` — optimized 128kbps
 * web copies of the masters in the repo's top-level `Songs/` folder
 * (which are left untouched). `durationSeconds` was read directly from
 * each file's embedded metadata, not guessed.
 *
 * `description`, `credits`, and `year` are editable content fields —
 * leave any of them as `''` / `undefined` to hide that field on the
 * site rather than invent content. `order` controls display order on
 * the Originals page — lower first.
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
  description: string
  credits: string
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
    description: 'The first song Voltage ever conjured. A creative twist between happiness and despair.',
    credits: 'Written and performed by all members of Voltage',
  },
  {
    id: 'eternal-optimist',
    title: 'Eternal Optimist',
    order: 2,
    vocalSrc: '/audio/eternal-optimist-vocal.mp3',
    instrumentalSrc: '/audio/eternal-optimist-instrumental.mp3',
    cover: '/images/songs/eternal-optimist-cover.jpg',
    durationSeconds: 249,
    // EDITABLE — credits/year not yet supplied by the band; left blank on purpose.
    description: 'An emotional song inspired by a riff our bassist played. One of our most performed songs!',
    credits: '',
  },
]

export const songsByOrder = [...songs].sort((a, b) => a.order - b.order)

export function getSongById(id: string | undefined | null): Song | undefined {
  return songs.find((s) => s.id === id)
}
