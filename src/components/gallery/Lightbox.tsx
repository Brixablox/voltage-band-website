import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryImage } from '../../data/gallery'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

type Props = {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const isOpen = index !== null

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && index !== null) onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft' && index !== null) onNavigate((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, index, images.length, onClose, onNavigate])

  const image = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <ImagePlaceholder
              src={image.src}
              alt={image.alt}
              label={image.id}
              aspectClassName="aspect-[4/3]"
              priority
              className="max-h-[75svh] w-full object-contain"
            />
            {image.caption && (
              <p className="mt-4 text-center font-body text-sm text-paper-dim">{image.caption}</p>
            )}

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="absolute -top-4 -right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink text-paper transition-colors hover:border-volt hover:text-volt"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={() => onNavigate((index! - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/80 text-paper transition-colors hover:border-volt hover:text-volt sm:-left-6"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => onNavigate((index! + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/80 text-paper transition-colors hover:border-volt hover:text-volt sm:-right-6"
            >
              ›
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
