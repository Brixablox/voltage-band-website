# Voltage — Band Website

The official website for Voltage. Built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Running the site

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build     # type-check + production build (outputs to dist/)
npm run preview   # preview the production build locally
npm run lint      # run oxlint
```

## Pages

| Page | Route | File |
| --- | --- | --- |
| Home | `/` | `src/pages/Home.tsx` |
| About Us | `/about` | `src/pages/About.tsx` |
| Our Performances | `/performances` | `src/pages/Performances.tsx` |
| Originals | `/originals` | `src/pages/Originals.tsx` |
| Song detail | `/originals/:songId` | `src/pages/SongDetail.tsx` |
| Gallery | `/gallery` | `src/pages/Gallery.tsx` |
| 404 | any unmatched URL | `src/pages/NotFound.tsx` |

## Editing content

Everything you're likely to edit regularly lives in `src/data/` — plain TypeScript files, no build-system knowledge required.

- **`src/data/site.ts`** — band name, hero tagline, homepage About preview text, Instagram URL/handle, contact email, nav labels.
- **`src/data/members.ts`** — the six band members (name, role, bio, optional quote, optional social link, photo path). Names/roles are fixed (Violet, Graeden, Aiden, Gavin, Leo, Tyler); edit `bio`/`quote`/`socialUrl` freely.
- **`src/data/performances.ts`** — every show. Add a new object to the array for a new performance; the Performances page (and homepage preview) automatically sorts entries into **Upcoming** / **Past** by comparing each `date` to today, and shows a polished "no shows booked" empty state if there are zero upcoming shows. Set `ticketUrl: null` to hide the ticket button on a card.
- **`src/data/gallery.ts`** — every gallery image, with a `category` (for the filter buttons) and `size` (`lg` / `wide` / `tall` / `md`, controlling how much room it gets in the grid).
- **`src/data/songs.ts`** — the two original songs (title, audio paths, cover, description/credits/lyrics/etc. — see "Music & the Originals page" below).

The About page's biography paragraphs and pull-quote are placeholder copy written directly in `src/pages/About.tsx` (search for `EDITABLE` comments) — replace them with your real story.

### Adding/replacing images

Every image on the site is a **drop-in slot**: it points at a path like `/images/gallery/gallery-01.jpg`. Until a file exists at that path, the site shows a branded placeholder card labeled with the expected filename — nothing is ever a broken image icon. Once you add a real file with the exact name to the matching folder in `public/images/`, it appears automatically. No code changes required.

See **`public/images/README.md`** for the full list of expected filenames, which page/section each one feeds, and suggested aspect ratios.

Quick summary of folders:

- `public/images/hero/` — homepage hero photo
- `public/images/band/` — group photo + supporting About-page photos
- `public/images/members/` — one photo per band member (`violet.jpg`, `graeden.jpg`, `aiden.jpg`, `gavin.jpg`, `leo.jpg`, `tyler.jpg`)
- `public/images/performances/` — one poster/photo per show
- `public/images/gallery/` — gallery grid photos
- `public/images/songs/` — original-song cover art

To add a photo beyond the starter set, add a new entry to the relevant `src/data/*.ts` file pointing at a new `/images/...` path, then drop the file in.

**Uploading new photos over time:** drop them into the top-level `Images/` folder (the intake inbox, separate from `public/`) and ask Claude to check it. It will figure out what each photo is, sort it into the right category, optimize it for web, and wire it into the relevant data file — see `Images/README.md` for the running log of what's already been integrated.

## Music & the Originals page

Voltage's two original songs — "Burn" and "Eternal Optimist" — are driven by `src/data/songs.ts` and played through a single **persistent player** that keeps playing across every page.

- **Master recordings** live untouched in the top-level `Songs/` folder (outside `public/`) — never edited or deleted by tooling.
- **Web-optimized copies** (128kbps mp3) live in `public/audio/` and are what the site actually streams — see `public/audio/README.md`.
- **Cover art**: no artwork exists yet for either song, so both show a branded placeholder built from the title (`src/components/originals/SongCover.tsx`). Add a real file at the path in each song's `cover` field (`public/images/songs/...`) to replace it.
- **Description, meaning, credits, lyrics, recording details, performance history, and notes** are intentionally empty placeholders in `songs.ts` — the Originals and song-detail pages render a "coming soon" empty state for anything left blank. Fill these in whenever you're ready; nothing was invented.

### The persistent player (`src/player/`)

- `PlayerContext.tsx` — single source of truth: which song/version is loaded, play state, time, volume, mute, minimized state. Renders one `<audio>` element, mounted once at the app root (in `App.tsx`, alongside `<Routes>`) so it's never torn down on navigation — audio keeps playing, at the same position, as you browse.
- **Instrumental vs. full song**: the player always launches on the **instrumental** version (background-music mode) — the vocal ("full song") version only ever loads from an explicit action: the Originals page's "Play Full Song" button, the song detail page, or the in-player "Switch to Full Song" toggle. A reload never silently resumes vocal playback on its own.
- **Autoplay**: attempts to start the instrumental automatically on load. If the browser blocks it (very common — this is normal browser policy, not a bug), a small "Play Voltage Music" pill appears once; pressing it starts playback. It won't nag repeatedly.
- **Session memory**: song, version, volume, mute, and desktop minimized state are saved to `sessionStorage` (cleared when the tab closes) so a reload resumes close to where you left off, without overriding a deliberate pause.
- **Desktop** (`DesktopPlayer.tsx`): floating bottom-right panel; minimizes to a small round album-art button that restores it.
- **Mobile** (`MobilePlayer.tsx`): compact bottom bar by default; tap to expand into a full player sheet. Respects safe-area insets.
- Only one `<audio>` element ever exists, so nothing can overlap or double-play.

To add a third original song: add the masters to `Songs/`, create 128kbps copies in `public/audio/` (see that folder's README for the exact `ffmpeg` command), and add an entry to `src/data/songs.ts` — the Originals page, player, and detail route pick it up automatically.

## Design decisions

- **Palette**: yellow (`--color-volt`) as the primary brand color, off-white (`--color-paper`) and near-black (`--color-ink`) for contrast, with a small amount of electric blue (`--color-spark`) as a secondary accent — matching the logo's yellow > white > black hierarchy. All tokens live in `src/index.css` under `@theme`.
- **Type**: Anton (oversized display headlines) + Inter (body text) — bold poster energy balanced with clean readability.
- **Motion**: Framer Motion powers scroll-reveal animations, the mobile menu, the gallery lightbox, and the mobile player sheet. Everything respects `prefers-reduced-motion` (see `src/components/ui/Reveal.tsx`) — reduced-motion users get the same content instantly, with no animation.
- **Image placeholders**: rather than stock photography or broken `<img>` tags, empty image slots render a branded gradient card naming the exact file to add (`src/components/ui/ImagePlaceholder.tsx`; song covers use the similar `SongCover.tsx`).

## Important files

```
src/
  data/               <- edit these for content changes (site, members, performances, gallery, songs)
  pages/              <- one file per route
  components/
    layout/           <- Navbar, MobileMenu, Footer, page shell
    ui/                <- Button, Reveal (scroll animation), ImagePlaceholder, SectionHeading, etc.
    performances/      <- PerformanceCard, EmptyState
    gallery/           <- GalleryGrid, Lightbox
    about/             <- MemberCard
    originals/         <- SongCard, SongCover
  player/              <- persistent audio player (context, desktop/mobile UI, controls, icons)
  lib/utils.ts         <- date/duration formatting + upcoming/past sorting logic
  index.css            <- design tokens (colors, fonts) + global styles
public/
  images/              <- put real photos here (see images/README.md)
  audio/               <- optimized web copies of the songs (see audio/README.md)
  voltage-mark-*.png   <- favicons generated from Voltage.png
Songs/                 <- original master recordings (untouched, not served to the web)
Images/                <- inbox for new photo uploads (see Images/README.md)
```

## Remaining placeholders to replace

- All photos (hero, band, members, performances, gallery, song covers) — currently branded placeholder cards.
- About page biography paragraphs and pull-quote (`src/pages/About.tsx`).
- Member bios, quotes, and social links (`src/data/members.ts`) — names/roles are final.
- Sample performances (`src/data/performances.ts`) — replace the "Sample Show — Replace Me" entries with real shows, or delete them so the empty state shows.
- Song descriptions, meaning, credits, release info, lyrics, recording details, performance history, and notes (`src/data/songs.ts`).
- Contact email and tagline (`src/data/site.ts`).
