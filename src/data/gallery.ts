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

export type GalleryImage = {
  id: string
  src: string
  alt: string
  caption?: string
  category: 'performance' | 'behind-the-scenes' | 'band' | 'promo'
  size: 'lg' | 'wide' | 'tall' | 'md'
}

export const galleryImages: GalleryImage[] = [
  { id: 'gallery-01', src: '/images/gallery/gallery-01.jpg', alt: 'Placeholder: live performance photo', caption: 'On stage', category: 'performance', size: 'lg' },
  { id: 'gallery-02', src: '/images/gallery/gallery-02.jpg', alt: 'Placeholder: band promotional photo', caption: 'Promo shoot', category: 'promo', size: 'md' },
  { id: 'gallery-03', src: '/images/gallery/gallery-03.jpg', alt: 'Placeholder: behind-the-scenes photo', caption: 'Backstage', category: 'behind-the-scenes', size: 'tall' },
  { id: 'gallery-04', src: '/images/gallery/gallery-04.jpg', alt: 'Placeholder: band member portrait', caption: '', category: 'band', size: 'md' },
  { id: 'gallery-05', src: '/images/gallery/gallery-05.jpg', alt: 'Placeholder: live performance photo', caption: 'Crowd energy', category: 'performance', size: 'wide' },
  { id: 'gallery-06', src: '/images/gallery/gallery-06.jpg', alt: 'Placeholder: band promotional photo', caption: '', category: 'promo', size: 'md' },
  { id: 'gallery-07', src: '/images/gallery/gallery-07.jpg', alt: 'Placeholder: behind-the-scenes photo', caption: 'Soundcheck', category: 'behind-the-scenes', size: 'md' },
  { id: 'gallery-08', src: '/images/gallery/gallery-08.jpg', alt: 'Placeholder: live performance photo', caption: '', category: 'performance', size: 'md' },
  { id: 'gallery-09', src: '/images/gallery/gallery-09.jpg', alt: 'Placeholder: band member portrait', caption: '', category: 'band', size: 'tall' },
  { id: 'gallery-10', src: '/images/gallery/gallery-10.jpg', alt: 'Placeholder: live performance photo', caption: 'Encore', category: 'performance', size: 'md' },
  { id: 'gallery-11', src: '/images/gallery/gallery-11.jpg', alt: 'Placeholder: behind-the-scenes photo', caption: '', category: 'behind-the-scenes', size: 'wide' },
  { id: 'gallery-12', src: '/images/gallery/gallery-12.jpg', alt: 'Placeholder: band promotional photo', caption: '', category: 'promo', size: 'md' },
  { id: 'gallery-13', src: '/images/gallery/gallery-13.jpg', alt: 'Placeholder: live performance photo', caption: '', category: 'performance', size: 'md' },
  { id: 'gallery-14', src: '/images/gallery/gallery-14.jpg', alt: 'Placeholder: band member portrait', caption: '', category: 'band', size: 'md' },
]
