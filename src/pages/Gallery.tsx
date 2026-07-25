import { useMemo, useState } from 'react'
import { galleryImages, galleryCategories, type GalleryCategory } from '../data/gallery'
import { Reveal } from '../components/ui/Reveal'
import { GalleryGrid } from '../components/gallery/GalleryGrid'
import { Lightbox } from '../components/gallery/Lightbox'

type FilterValue = GalleryCategory | 'all'

export default function Gallery() {
  const [active, setActive] = useState<FilterValue>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Only show filter buttons for categories that actually have photos yet.
  const filters = useMemo(() => {
    const present = new Set(galleryImages.map((img) => img.category))
    return [
      { label: 'All', value: 'all' as FilterValue },
      ...galleryCategories.filter((c) => present.has(c.value)).map((c) => ({ label: c.label, value: c.value as FilterValue })),
    ]
  }, [])

  const filtered = useMemo(
    () => (active === 'all' ? galleryImages : galleryImages.filter((img) => img.category === active)),
    [active],
  )

  return (
    <>
      {/* ============================== PAGE HEADER ============================== */}
      <section className="bg-stage-glow relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="container-voltage">
          <Reveal trigger="mount" variant="fade">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
              <span className="h-px w-6 bg-volt" aria-hidden="true" />
              Visuals
            </span>
          </Reveal>
          <Reveal trigger="mount" index={1}>
            <h1 className="text-gradient-volt mt-4 text-[clamp(3rem,9vw,6rem)]">Gallery</h1>
          </Reveal>
          <Reveal trigger="mount" index={2}>
            <p className="mt-4 max-w-xl font-body text-base text-paper-dim sm:text-lg">
              {/* EDITABLE: manage images in src/data/gallery.ts */}
              Live shots, behind-the-scenes moments, and promo photography.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== FILTERS ============================== */}
      <section className="pb-8">
        <div className="container-voltage">
          <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = active === f.value
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActive(f.value)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 font-body text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'border-volt bg-volt text-ink'
                      : 'border-white/15 text-paper/80 hover:border-volt/50 hover:text-paper'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================== GRID ============================== */}
      <section className="pb-24 sm:pb-32">
        <div className="container-voltage">
          {filtered.length > 0 ? (
            <GalleryGrid images={filtered} onOpen={setOpenIndex} />
          ) : (
            <p className="py-16 text-center font-body text-paper-dim">No images in this category yet.</p>
          )}
        </div>
      </section>

      <Lightbox
        images={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  )
}
