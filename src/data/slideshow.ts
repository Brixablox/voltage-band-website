/**
 * Homepage hero slideshow.
 *
 * Add, remove, or reorder slides by editing this array — the hero
 * slideshow on the homepage picks it up automatically. Each `src`
 * should point at a real photo (landscape works best, since the
 * slideshow container is wide) in `public/images/`. `objectPosition`
 * is optional — only set it if the default center crop cuts off
 * something important (e.g. `'top'` to favor the top of the frame).
 */

export type SlideshowImage = {
  id: string
  src: string
  alt: string
  objectPosition?: string
}

export const heroSlides: SlideshowImage[] = [
  {
    id: 'hero-live',
    src: '/images/hero/hero-band-photo.jpg',
    alt: 'Voltage performing live on stage',
  },
  {
    id: 'hero-full-band',
    src: '/images/gallery/performance-03.jpg',
    alt: 'Voltage performing together on an outdoor stage',
  },
  {
    id: 'hero-lineup',
    src: '/images/gallery/band-02.jpg',
    alt: 'Voltage lineup posing together at a Napa School of Music event',
  },
  {
    id: 'hero-group',
    src: '/images/gallery/group-04.jpg',
    alt: 'Band members together outdoors at an event',
  },
]
