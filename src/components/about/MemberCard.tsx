import type { Member } from '../../data/members'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Reveal } from '../ui/Reveal'

type Props = { member: Member; index: number }

function LinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 14.5 14.5 9.5M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MemberCard({ member, index }: Props) {
  return (
    <Reveal index={index % 3} variant="up" className="group">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-400 hover:-translate-y-1.5 hover:border-volt/40">
        <div className="relative overflow-hidden">
          <ImagePlaceholder
            src={member.photo}
            alt={`Portrait of ${member.name}, ${member.role}`}
            label={member.name}
            aspectClassName="aspect-[4/5]"
            rounded="rounded-none"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-card via-ink-card/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">{member.role}</p>
            <h3 className="font-display text-2xl tracking-wide">{member.name}</h3>
          </div>

          {/* EDITABLE placeholder — set bio in src/data/members.ts */}
          <p className="font-body text-sm leading-relaxed text-paper-dim">{member.bio}</p>

          {member.quote && (
            <p className="font-body text-sm italic leading-relaxed text-paper-dim/90">&ldquo;{member.quote}&rdquo;</p>
          )}

          {member.socialUrl && (
            <a
              href={member.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s social link (opens in a new tab)`}
              className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 font-mono text-xs font-bold uppercase tracking-wide text-volt transition-colors hover:text-volt-pale"
            >
              <LinkIcon />
              Social
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}
