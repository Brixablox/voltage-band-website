import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'

/**
 * News-ticker style announcement bar. Lives inside Navbar's fixed header
 * (see Navbar.tsx) so it scrolls the marquee track continuously.
 *
 * The animated track renders the sequence twice back-to-back —
 * `.marquee-track` / `marquee-scroll` (index.css) slides it exactly one
 * sequence-width to the left, on repeat, so it loops seamlessly. Both
 * copies are real links (not one real + one dummy) so whichever copy is
 * on screen at any moment is clickable — with only one copy interactive,
 * the mouse would spend most of the loop hovering the inert twin.
 *
 * That animated track is entirely `aria-hidden` with every link pulled
 * out of the tab order (`tabIndex={-1}`): duplicated + constantly moving
 * text is unusable for keyboard/screen-reader users regardless. A
 * separate static, non-animated list right after it carries the same
 * items for them instead.
 *
 * EDITABLE: add, remove, or edit entries in `items` below. `to` jumps to
 * an in-page element by id (e.g. a specific show card); `href` links out.
 */
const items: { key: string; text: string; to?: string; href?: string }[] = [
  {
    key: 'show',
    text: 'Watch our Phoenix Theater gig!',
    to: '/#phoenix-gig',
  },
  { key: 'welcome', text: 'Welcome to Napa Voltage!' },
  { key: 'instagram', text: `Find us on Instagram — ${site.instagramHandle}`, href: site.instagramUrl },
  { key: 'youtube', text: 'Subscribe to us on YouTube', href: site.youtubeUrl },
]

/** `inert` = rendered inside the aria-hidden animated track: still fully clickable, just tabIndex-less. */
function renderItem(item: (typeof items)[number], inert: boolean): ReactNode {
  const tabIndex = inert ? -1 : undefined
  if (item.to) {
    return (
      <Link to={item.to} tabIndex={tabIndex} className="ticker-link">
        {item.text}
      </Link>
    )
  }
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} className="ticker-link">
        {item.text}
      </a>
    )
  }
  return <span>{item.text}</span>
}

function Sequence() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item.key} className="flex shrink-0 items-center gap-8 pr-8">
          {renderItem(item, true)}
          <span className="text-ink/30" aria-hidden="true">
            ●
          </span>
        </span>
      ))}
    </div>
  )
}

/** News-ticker bar — rendered as the top row of Navbar's fixed header. */
export function NewsTicker() {
  return (
    <div className="flex h-9 items-stretch border-b border-ink/10 bg-volt text-ink" role="region" aria-label="Announcements">
      <span className="hidden shrink-0 items-center gap-1.5 border-r border-ink/15 bg-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-volt sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse motion-reduce:animate-none" aria-hidden="true" />
        News
      </span>
      <div className="relative flex flex-1 overflow-hidden">
        <div
          className="marquee-track flex w-max items-center pl-8 font-mono text-[11px] font-bold uppercase tracking-wide sm:text-xs"
          aria-hidden="true"
        >
          <Sequence />
          <Sequence />
        </div>
        {/* Static, accessible equivalent for keyboard/screen-reader users — the animated track above is aria-hidden. */}
        <ul className="sr-only">
          {items.map((item) => (
            <li key={item.key}>{renderItem(item, false)}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
