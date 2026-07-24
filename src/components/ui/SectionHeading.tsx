import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/** Oversized section title used to open every major page section. */
export function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }: Props) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass} ${className}`}>
      {eyebrow && (
        <Reveal variant="fade">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-volt">
            <span className="h-px w-6 bg-volt" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="text-gradient-volt text-[clamp(2.25rem,6vw,4rem)]">{title}</h2>
      </Reveal>
      {description && (
        <Reveal index={2}>
          <p className="max-w-xl font-body text-base text-paper-dim sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
