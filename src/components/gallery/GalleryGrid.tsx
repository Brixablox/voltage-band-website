import type { GalleryImage } from '../../data/gallery'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Reveal } from '../ui/Reveal'

type Props = {
  images: GalleryImage[]
  onOpen: (index: number) => void
}

const spanClasses: Record<GalleryImage['size'], string> = {
  lg: 'sm:col-span-2 sm:row-span-2',
  wide: 'sm:col-span-2',
  tall: 'row-span-2',
  md: '',
}

const aspectBySize: Record<GalleryImage['size'], string> = {
  lg: 'aspect-square',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4]',
  md: 'aspect-square',
}

export function GalleryGrid({ images, onOpen }: Props) {
  return (
    <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
      {images.map((image, i) => (
        <Reveal key={image.id} index={i % 6} variant="scale" className={`h-full ${spanClasses[image.size]}`}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open full size: ${image.caption || image.alt}`}
            className="group relative block h-full w-full overflow-hidden rounded-xl border border-white/10 text-left"
          >
            <ImagePlaceholder
              src={image.src}
              alt={image.alt}
              label={image.id}
              aspectClassName={`${aspectBySize[image.size]} h-full`}
              rounded="rounded-none"
              className="h-full transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {image.caption && (
              <p className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 font-body text-sm font-semibold text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {image.caption}
              </p>
            )}
            <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-paper-dim opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              {image.category.replace('-', ' ')}
            </span>
          </button>
        </Reveal>
      ))}
    </div>
  )
}
