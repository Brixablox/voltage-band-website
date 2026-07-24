# Image Folder Guide

Drop real photos into the folders below using the **exact filenames**
listed. Each placeholder on the site already looks for that path — once
the file exists, the placeholder graphic is automatically replaced with
your photo. No code changes needed.

Recommended formats: `.jpg` for photos, `.png` only if you need
transparency. Keep files reasonably sized (under ~500KB each) for fast
loading — most photo editors and free tools like Squoosh.app can
compress/export at the right size.

> **Uploading new photos?** Don't drop them straight into these folders.
> Put them in the top-level `Images/` inbox folder instead and ask
> Claude to check it — see "Adding new photos" below.

## `hero/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `hero-band-photo.jpg` | Homepage hero (right-hand image) | Wide, ~16:9 |

## `band/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `band-group-photo.jpg` | Homepage "About" preview + About page group shot | Landscape, wide |
| `supporting-1.jpg` | About page, "Behind the Music" | Portrait, ~4:5 |
| `supporting-2.jpg` | About page, "Behind the Music" | Portrait, ~4:5 |
| `supporting-3.jpg` | About page, "Behind the Music" | Portrait, ~4:5 |

## `members/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `violet.jpg` | Violet — Lead Singer | Portrait, ~4:5 |
| `graeden.jpg` | Graeden — Drums | Portrait, ~4:5 |
| `aiden.jpg` | Aiden — Bass | Portrait, ~4:5 |
| `gavin.jpg` | Gavin — Guitar | Portrait, ~4:5 |
| `leo.jpg` | Leo — Guitar | Portrait, ~4:5 |
| `tyler.jpg` | Tyler — Guitar | Portrait, ~4:5 |

Member names/roles/photos live in `src/data/members.ts`.

## `performances/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `botb-2026.jpg` | Battle of the Bands 2026 performance card | Portrait poster, ~3:4 |

Filenames are whatever you set in the `poster` field of each entry in
`src/data/performances.ts` — add more files there as you add shows.
Performance cards are sized for portrait event-poster flyers (~3:4);
a landscape photo will still work fine, just cropped a bit more.

## `gallery/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `gallery-01.jpg` … `gallery-14.jpg` | Gallery page grid + homepage gallery preview | Varies — see below |

Each gallery entry in `src/data/gallery.ts` has a `size` field
(`lg`, `wide`, `tall`, `md`) that controls its shape in the grid, and a
`category` field (`performance`, `behind-the-scenes`, `band`, `promo`)
used by the filter buttons. Add as many entries as you like.

## `songs/`

| Filename | Used on | Suggested size / aspect |
| --- | --- | --- |
| `burn-cover.jpg` | "Burn" cover art (player, Originals page, song detail) | Square, 1:1 |
| `eternal-optimist-cover.jpg` | "Eternal Optimist" cover art | Square, 1:1 |

Paths live in the `cover` field of each entry in `src/data/songs.ts`.
Until a real cover exists, each song shows a branded placeholder built
from its title.

---

## Adding new photos

The top-level `Images/` folder (repo root, outside `public/`) is the
**inbox** for new uploads — drop new photos there any time. When asked
to check it, Claude will:

1. Look at every file in `Images/` and figure out what it most likely
   shows (filename, dimensions, and visual content).
2. Move/copy it into the right folder above, resizing/compressing for
   web as needed.
3. Update the matching `src/data/*.ts` file (and captions) so it
   actually appears on the site.
4. Note what was integrated in `Images/README.md` so the same photo
   isn't processed twice.

If you already know where a photo belongs (e.g. "this is a photo for
the Gallery, behind-the-scenes"), say so — otherwise it'll be placed
using best judgment.

**Tip:** you can also add photos beyond this starter list at any time —
just add a new entry in the matching data file (`src/data/*.ts`)
pointing at `/images/...` and a new placeholder + slot appears
automatically.
