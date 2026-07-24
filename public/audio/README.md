# Audio Files

These are optimized (128kbps) web copies used by the site's persistent
player. The original master recordings live untouched in the top-level
`Songs/` folder (outside `public/`) — these copies exist purely so the
site loads faster; they are not the masters.

| File | Source master |
| --- | --- |
| `burn-vocal.mp3` | `Songs/Burn.mp3` |
| `burn-instrumental.mp3` | `Songs/Burn_instrumental.mp3` |
| `eternal-optimist-vocal.mp3` | `Songs/Eternal_Optimist.mp3` |
| `eternal-optimist-instrumental.mp3` | `Songs/Eternal_Optimist_instrumental.mp3` |

Paths are wired up in `src/data/songs.ts`. If you add a new original
song:

1. Add the vocal + instrumental masters to `Songs/`.
2. Create optimized copies here (128kbps mp3 is a good default —
   `ffmpeg -i input.mp3 -codec:a libmp3lame -b:a 128k output.mp3`).
3. Add a new entry to `src/data/songs.ts` pointing at the new files.

The player only loads metadata up front (`preload="metadata"`) and
streams audio on demand, so file size here only affects how long a
listener waits after pressing play — keep these reasonably small.
