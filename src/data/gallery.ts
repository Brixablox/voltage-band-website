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
    id: 'performance-03',
    src: '/images/gallery/performance-03.jpg',
    alt: 'Voltage performing together on an outdoor stage',
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
    id: 'band-01',
    src: '/images/gallery/band-01.jpg',
    alt: 'Band members sitting together outdoors',
    category: 'band',
    size: 'wide',
  },
  {
    id: 'group-04',
    src: '/images/gallery/group-04.jpg',
    alt: 'Band members together outdoors at an event',
    category: 'group',
    size: 'wide',
  },
  {
    id: 'performance-02',
    src: '/images/gallery/performance-02.jpg',
    alt: 'Guitarist performing live on stage',
    category: 'performance',
    size: 'tall',
  },
  {
    id: 'band-03',
    src: '/images/gallery/band-03.jpg',
    alt: 'Band members relaxing together with award trophies',
    category: 'band',
    size: 'md',
  },
  {
    id: 'group-05',
    src: '/images/gallery/group-05.jpg',
    alt: 'Band members gathered together at an event',
    category: 'group',
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
    id: 'performance-01',
    src: '/images/gallery/performance-01.jpg',
    alt: 'Guitarist performing live on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-04',
    src: '/images/gallery/performance-04.jpg',
    alt: 'Lead singer performing with guitarist on stage',
    category: 'performance',
    size: 'md',
  },
  {
    id: 'performance-05',
    src: '/images/gallery/performance-05.jpg',
    alt: 'Bassist performing live on stage',
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
]
