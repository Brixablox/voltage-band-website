/**
 * Gallery images.
 *
 * Add or remove entries to control what shows up on the Gallery page and
 * in the homepage preview. `src` should point at a file you add to
 * `public/images/gallery/` (see public/images/README.md).
 *
 * `size` controls how much room the image gets in the grid:
 *   'lg'   — large featured tile (spans 2 columns and 2 rows)
 *   'wide' — spans 2 columns
 *   'tall' — spans 2 rows
 *   'md'   — standard single tile
 */

export type GalleryCategory = 'performance' | 'behind-the-scenes' | 'band' | 'group' | 'community' | 'promo'

/**
 * Category filter labels shown on the Gallery page — the single place to
 * rename a category or add a new one. Adding a new category here doesn't
 * do anything by itself; give at least one `galleryImages` entry that
 * `category` value too.
 */
export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: 'performance', label: 'Performances' },
  { value: 'behind-the-scenes', label: 'Behind the Scenes' },
  { value: 'band', label: 'Band' },
  { value: 'group', label: 'Group Photos' },
  { value: 'community', label: 'Community' },
  { value: 'promo', label: 'Promotional' },
]

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption?: string
  category: GalleryCategory
  size: 'lg' | 'wide' | 'tall' | 'md'
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'band-02',
    src: '/images/gallery/band-02.jpg',
    alt: 'Voltage lineup posing together at a Napa School of Music event',
    category: 'band',
    size: 'lg',
  },
  {
    id: 'performance-29',
    src: '/images/gallery/performance-29.jpg',
    alt: 'Bassist playing beneath moody stage lighting',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-13',
    src: '/images/gallery/performance-13.jpg',
    alt: 'Guitarist playing a sunburst Telecaster on stage',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-03',
    src: '/images/gallery/performance-03.jpg',
    alt: 'Voltage performing together on an outdoor stage',
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-20',
    src: '/images/gallery/performance-20.jpg',
    alt: "Keyboardist playing a Roland synth in low stage light",
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-06',
    src: '/images/gallery/performance-06.jpg',
    alt: 'Lead singer performing energetically on stage',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-09',
    src: '/images/gallery/performance-09.jpg',
    alt: 'Close-up of the bassist playing beneath green stage lights',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'band-01',
    src: '/images/gallery/band-01.jpg',
    alt: 'Band members sitting together outdoors',
    category: 'band',
    size: 'wide',
  },
  {
    id: 'performance-27',
    src: '/images/gallery/performance-27.jpg',
    alt: 'Lead singer mid-spin with her hair flying under blue stage light',
    category: 'performance',
    size: 'lg',
  },
  {
    id: 'group-04',
    src: '/images/gallery/group-04.jpg',
    alt: 'Band members together outdoors at an event',
    category: 'group',
    size: 'wide',
  },
  {
    id: 'performance-11',
    src: '/images/gallery/performance-11.jpg',
    alt: 'Drummer mid-hit on the electronic kit',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-02',
    src: '/images/gallery/performance-02.jpg',
    alt: 'Guitarist performing live on stage',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-16',
    src: '/images/gallery/performance-16.jpg',
    alt: "Guitarist playing a sunburst Telecaster in a Battle of the Bands t-shirt",
    category: 'performance',
    size: 'md',
  },
  {
    id: 'behind-the-scenes-01',
    src: '/images/gallery/behind-the-scenes-01.jpg',
    alt: "Voltage's lightning bolt mascot plushie perched on an amp backstage",
    category: 'behind-the-scenes',
    size: 'md',
  },
  {
    id: 'band-03',
    src: '/images/gallery/band-03.jpg',
    alt: 'Band members relaxing together with award trophies',
    category: 'band',
    size: 'md',
  },
  {
    id: 'performance-23',
    src: '/images/gallery/performance-23.jpg',
    alt: 'Lead singer belting into the mic on stage',
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'group-05',
    src: '/images/gallery/group-05.jpg',
    alt: 'Band members gathered together at an event',
    category: 'group',
    size: 'md',
  },
  {
    id: 'performance-08',
    src: '/images/gallery/performance-08.jpg',
    alt: 'Bassist performing live with the guitarist in the background',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'community-fundraising-01',
    src: '/images/gallery/community-fundraising-01.jpg',
    alt: 'Band members volunteering with donated food bags',
    category: 'community',
    size: 'md',
  },
  {
    id: 'performance-30',
    src: '/images/gallery/performance-30.jpg',
    alt: 'Drummer lit by a single warm spotlight mid-song',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-14',
    src: '/images/gallery/performance-14.jpg',
    alt: "Guitarist performing beneath the venue's stage lights",
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-01',
    src: '/images/gallery/performance-01.jpg',
    alt: 'Guitarist performing live on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-25',
    src: '/images/gallery/performance-25.jpg',
    alt: 'Lead singer captured mid-note between verses',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-10',
    src: '/images/gallery/performance-10.jpg',
    alt: 'Drummer keeping time on stage during a live set',
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-04',
    src: '/images/gallery/performance-04.jpg',
    alt: 'Lead singer performing with guitarist on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-17',
    src: '/images/gallery/performance-17.jpg',
    alt: 'Guitarist focused on a chord change during a live set',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-05',
    src: '/images/gallery/performance-05.jpg',
    alt: 'Bassist performing live on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'group-06',
    src: '/images/gallery/group-06.jpg',
    alt: 'Bassist and guitarist playing side by side on stage',
    category: 'group',
    size: 'wide',
  },
  {
    id: 'performance-22',
    src: '/images/gallery/performance-22.jpg',
    alt: 'Lead singer performing with the drummer behind her',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-19',
    src: '/images/gallery/performance-19.jpg',
    alt: 'Guitarist smiling mid-solo on stage',
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-12',
    src: '/images/gallery/performance-12.jpg',
    alt: 'Drummer glancing offstage between songs',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-21',
    src: '/images/gallery/performance-21.jpg',
    alt: 'Keyboardist performing on a Roland Juno-DS',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'promo-sonoma-announcement',
    src: '/images/gallery/promo-sonoma-announcement.jpg',
    alt: 'Promotional graphic announcing the Sonoma Battle of the Bands',
    category: 'promo',
    size: 'md',
  },
  {
    id: 'performance-15',
    src: '/images/gallery/performance-15.jpg',
    alt: 'Guitarist playing a black electric guitar mid-song',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-26',
    src: '/images/gallery/performance-26.jpg',
    alt: 'Lead singer whipping her hair during a high-energy moment',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-18',
    src: '/images/gallery/performance-18.jpg',
    alt: "Guitarist performing under a green spotlight with the band behind him",
    category: 'performance',
    size: 'wide',
  },
  {
    id: 'performance-31',
    src: '/images/gallery/performance-31.jpg',
    alt: 'Guitarist smiling mid-riff on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-07',
    src: '/images/gallery/performance-07.jpg',
    alt: 'Bassist playing beneath colorful stage lighting',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'performance-24',
    src: '/images/gallery/performance-24.jpg',
    alt: "Lead singer mid-lyric with her hair catching the stage light",
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-28',
    src: '/images/gallery/performance-28.jpg',
    alt: 'Lead singer singing passionately into the microphone',
    category: 'performance',
    size: 'wide',
  },
]
